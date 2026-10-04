export interface NasaImageResult {
  nasaId: string;
  title: string;
  description: string;
  dateCreated: string;
  imageUrl: string;
  detailUrl: string;
  center?: string;
  photographer?: string;
}

// In-memory cache to prevent repetitive network requests
const imageCache = new Map<string, NasaImageResult | null>();
const orbitalImageCache = new Map<string, NasaImageResult[]>();

/**
 * Queries the public NASA Image and Video Library without an API key
 * Endpoint: https://images-api.nasa.gov/search?q=...&media_type=image
 */
export async function fetchNasaImageForMission(searchQuery: string): Promise<NasaImageResult | null> {
  const query = searchQuery.trim();
  if (!query) return null;

  if (imageCache.has(query)) {
    return imageCache.get(query) ?? null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const encoded = encodeURIComponent(query);
    const url = `https://images-api.nasa.gov/search?q=${encoded}&media_type=image`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      imageCache.set(query, null);
      return null;
    }

    const data = await response.json();
    const items = data?.collection?.items;

    if (!Array.isArray(items) || items.length === 0) {
      imageCache.set(query, null);
      return null;
    }

    // Find the first valid item with data and links
    for (const item of items) {
      const itemData = item.data?.[0];
      const previewLink = item.links?.find((l: { rel?: string; render?: string }) => l.rel === 'preview' || l.render === 'image')?.href;

      if (itemData && previewLink) {
        // High quality fallback: replace ~thumb.jpg with ~medium.jpg or ~small.jpg if available
        const imageUrl = previewLink.replace(/~thumb\.(jpg|png)$/i, '~medium.jpg');
        const nasaId = itemData.nasa_id || itemData.title;

        const result: NasaImageResult = {
          nasaId,
          title: itemData.title || query,
          description: itemData.description || 'Фотография из открытого архива NASA Image and Video Library.',
          dateCreated: itemData.date_created ? itemData.date_created.slice(0, 10) : 'Архив NASA',
          imageUrl,
          detailUrl: `https://images.nasa.gov/details/${encodeURIComponent(nasaId)}`,
          center: itemData.center || 'NASA',
          photographer: itemData.photographer,
        };

        imageCache.set(query, result);
        return result;
      }
    }

    imageCache.set(query, null);
    return null;
  } catch {
    clearTimeout(timeoutId);
    // Network failure or timeout: save null in cache to prevent endless retry
    imageCache.set(query, null);
    return null;
  }
}

/**
 * Searches the NASA Image and Video Library for orbital imagery (LROC, HiRISE, etc.)
 * Filters results by relevance according to keywords in title or description.
 */
export async function fetchOrbitalImagesForMission(
  searchQuery: string,
  keywords: string[] = []
): Promise<NasaImageResult[]> {
  const query = searchQuery.trim();
  if (!query) return [];

  const cacheKey = `${query}::${keywords.join(',')}`;
  if (orbitalImageCache.has(cacheKey)) {
    return orbitalImageCache.get(cacheKey) || [];
  }

  const runQuery = async (q: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    try {
      const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=image`;
      const response = await fetch(url, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' },
      });
      clearTimeout(timeoutId);
      if (!response.ok) return [];
      const data = await response.json();
      return (data?.collection?.items as any[]) || [];
    } catch {
      clearTimeout(timeoutId);
      return [];
    }
  };

  let items = await runQuery(query);

  // If query had 0 results, try a broader fallback query (e.g. without LROC / HiRISE prefix)
  if (items.length === 0) {
    const fallbackQuery = query
      .replace(/^(LROC|HiRISE|MGS|MRO)\s+/i, '')
      .replace(/\s+landing\s+site$/i, ' landing')
      .trim();
    if (fallbackQuery && fallbackQuery !== query) {
      items = await runQuery(fallbackQuery);
    }
  }

  const results: NasaImageResult[] = [];
  const lowerKeywords = keywords.map((k) => k.toLowerCase().trim()).filter(Boolean);

  for (const item of items) {
    const itemData = item.data?.[0];
    const previewLink = item.links?.find(
      (l: { rel?: string; render?: string }) => l.rel === 'preview' || l.render === 'image'
    )?.href;

    if (!itemData || !previewLink) continue;

    const title = itemData.title || '';
    const desc = itemData.description || '';
    const textToMatch = `${title} ${desc}`.toLowerCase();

    // Check relevance: if keywords provided, title/description must contain keywords
    const isRelevant =
      lowerKeywords.length === 0 ||
      lowerKeywords.some((k) => title.toLowerCase().includes(k)) ||
      lowerKeywords.some((k) => textToMatch.includes(k));

    if (isRelevant) {
      const imageUrl = previewLink.replace(/~thumb\.(jpg|png)$/i, '~medium.jpg');
      const nasaId = itemData.nasa_id || itemData.title;

      results.push({
        nasaId,
        title,
        description: desc || 'Орбитальный снимок из архива NASA (LROC / HiRISE / PDS).',
        dateCreated: itemData.date_created ? itemData.date_created.slice(0, 10) : 'Архив NASA',
        imageUrl,
        detailUrl: `https://images.nasa.gov/details/${encodeURIComponent(nasaId)}`,
        center: itemData.center || 'NASA',
        photographer: itemData.photographer,
      });

      if (results.length >= 6) break;
    }
  }

  orbitalImageCache.set(cacheKey, results);
  return results;
}

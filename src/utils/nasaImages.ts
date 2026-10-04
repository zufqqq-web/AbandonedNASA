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

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { missionsData } from '../data/missionsData';
import { Mission, Destination } from '../types/mission';
import { spaceAudio } from '../utils/audio';
import { MapPin, Globe, Compass, ExternalLink, Layers, Navigation } from 'lucide-react';

interface MapSectionProps {
  activeWorld: Destination;
  onSelectWorld: (world: Destination) => void;
  onSelectMission: (mission: Mission) => void;
}

export const MapSection: React.FC<MapSectionProps> = ({
  activeWorld,
  onSelectWorld,
  onSelectMission,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [selectedPinMission, setSelectedPinMission] = useState<Mission | null>(null);

  // Filter missions for the active planetary world that have valid numeric coordinates
  const worldMissions = missionsData.filter(
    (m) => m.destination === activeWorld && m.coordinates.latNum !== undefined && m.coordinates.lonNum !== undefined
  );

  // Tile endpoints configuration
  const tileConfigs = {
    Moon: {
      url: 'https://trek.nasa.gov/tiles/Moon/EQ/LRO_WAC_Mosaic_Global_303ppd_v02/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
      fallbackUrl: 'https://cartocdn_gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm:moon_basemap_v0-1/all/{z}/{x}/{y}.png',
      attribution: 'NASA Moon Trek / LRO WAC Global Mosaic (USGS / NASA)',
      maxZoom: 7,
      minZoom: 1,
      center: [10, 15] as [number, number],
      zoom: 2,
    },
    Mars: {
      url: 'https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg',
      fallbackUrl: 'https://cartocdn_gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm:mars_basemap_v0-2/all/{z}/{x}/{y}.png',
      attribution: 'NASA Mars Trek / MGS MOLA & Viking MDIM (NASA / JPL / USGS)',
      maxZoom: 7,
      minZoom: 1,
      center: [5, 50] as [number, number],
      zoom: 2,
    },
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy previous map instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const cfg = tileConfigs[activeWorld];

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: cfg.center,
      zoom: cfg.zoom,
      minZoom: cfg.minZoom,
      maxZoom: cfg.maxZoom,
      zoomControl: false,
      attributionControl: false,
    });

    // Add zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Primary NASA Trek Tile layer with fallback
    const tileLayer = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
      noWrap: true,
      errorTileUrl: cfg.fallbackUrl,
    });

    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;

    // Layer group for pins
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    // Add markers
    worldMissions.forEach((mission) => {
      const lat = mission.coordinates.latNum!;
      const lon = mission.coordinates.lonNum!;

      const isMars = mission.destination === 'Mars';
      const markerColor = isMars ? '#ef4444' : '#38bdf8';
      const pulseColor = isMars ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.4)';

      // Custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: 'custom-nasa-pin',
        html: `
          <div style="position: relative; width: 28px; height: 28px; cursor: pointer; display: flex; items-center; justify-content: center;">
            <div style="position: absolute; inset: 0; border-radius: 9999px; background-color: ${pulseColor}; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 14px; height: 14px; border-radius: 9999px; background-color: ${markerColor}; border: 2px solid white; box-shadow: 0 0 10px ${markerColor};"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      });

      const marker = L.marker([lat, lon], { icon: customIcon });

      // Popup Content with Clean Dark Aerospace Typography & High Contrast
      const popupHtml = `
        <div style="background-color: #090d16; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; min-width: 220px; padding: 2px;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 4px;">
            <span style="font-size: 10px; font-family: monospace; font-weight: 700; text-transform: uppercase; color: ${isMars ? '#f87171' : '#38bdf8'}; letter-spacing: 0.05em;">
              ${mission.type} · ${isMars ? 'МАРС' : 'ЛУНА'}
            </span>
            <span style="font-size: 10px; font-family: monospace; color: #cbd5e1; background: #1e293b; padding: 1px 6px; border-radius: 4px; font-weight: 600;">
              ${mission.activeSpan.split('—')[0].trim()}
            </span>
          </div>
          <div style="font-size: 15px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 4px; line-height: 1.2;">
            ${mission.name}
          </div>
          <div style="font-size: 12px; font-weight: 500; color: #e2e8f0; margin-bottom: 6px;">
            ${mission.locationName}
          </div>
          <div style="font-size: 10px; font-family: monospace; color: #cbd5e1; background: #0f172a; padding: 4px 6px; border-radius: 4px; border: 1px solid #1e293b; margin-bottom: 10px;">
            📍 ${mission.coordinates.formatted}
          </div>
          <button id="popup-btn-${mission.id}" style="width: 100%; padding: 8px 12px; background-color: #e11d48; color: #ffffff; border: none; border-radius: 6px; font-size: 11px; font-family: monospace; text-transform: uppercase; cursor: pointer; font-weight: 700; letter-spacing: 0.05em; transition: background 0.2s;">
            ОТКРЫТЬ ДОСЬЕ МИССИИ →
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'nasa-leaflet-popup',
      });

      marker.on('popupopen', () => {
        spaceAudio.playTelemetryBeep(1300, 0.04);
        setSelectedPinMission(mission);
        setTimeout(() => {
          const btn = document.getElementById(`popup-btn-${mission.id}`);
          if (btn) {
            btn.onclick = () => {
              spaceAudio.playTelemetryBeep(1400, 0.05);
              onSelectMission(mission);
            };
          }
        }, 50);
      });

      marker.addTo(markersLayer);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [activeWorld]);

  const handleFocusMission = (m: Mission) => {
    if (!mapInstanceRef.current || m.coordinates.latNum === undefined || m.coordinates.lonNum === undefined) return;
    spaceAudio.playTelemetryBeep(1200, 0.04);
    setSelectedPinMission(m);
    mapInstanceRef.current.flyTo([m.coordinates.latNum, m.coordinates.lonNum], 4, {
      duration: 1.5,
    });
  };

  return (
    <section id="map-section" className="relative isolate z-0 py-20 bg-[#05070b] border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Compass className="w-3.5 h-3.5" />
              КАРТОГРАФИЧЕСКИЙ СЕРВЕР // NASA TREK WMTS
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
              Интерактивная карта посадок
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Точные координаты и спутниковые мозаики NASA Moon Trek и Mars Trek. Кликайте на точки посадок для открытия досье.
            </p>
          </div>

          {/* Quick World Toggle */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono self-start md:self-auto">
            <button
              onClick={() => {
                onSelectWorld('Mars');
                spaceAudio.playTelemetryBeep(1300, 0.04);
              }}
              className={`px-4 py-2 rounded flex items-center gap-2 transition-all ${
                activeWorld === 'Mars'
                  ? 'bg-red-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <span>Карта Марса (MGS MOLA)</span>
            </button>

            <button
              onClick={() => {
                onSelectWorld('Moon');
                spaceAudio.playTelemetryBeep(1100, 0.04);
              }}
              className={`px-4 py-2 rounded flex items-center gap-2 transition-all ${
                activeWorld === 'Moon'
                  ? 'bg-slate-200 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Карта Луны (LRO WAC)</span>
            </button>
          </div>
        </div>

        {/* Map Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Leaflet Map Viewport */}
          <div className="lg:col-span-9 relative rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 shadow-2xl">
            {/* Top Telemetry HUD Overlay */}
            <div className="absolute top-3 left-3 z-10 bg-black/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] font-mono text-slate-200 flex items-center gap-2 shadow-lg pointer-events-none">
              <Navigation className="w-3.5 h-3.5 text-red-500" />
              <span>СЕКТОР: {activeWorld === 'Mars' ? 'MARS TREK (463m/px)' : 'MOON TREK LRO (303ppd)'}</span>
            </div>

            <div className="absolute top-3 right-3 z-10 hidden sm:flex items-center gap-2 bg-black/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-300 shadow-lg pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ПОСАДОК НА КАРТЕ: {worldMissions.length}</span>
            </div>

            {/* The Actual Leaflet Map Canvas */}
            <div
              ref={mapContainerRef}
              className="w-full h-[520px] sm:h-[600px] z-0"
              style={{ background: '#070a0f' }}
            />

            {/* Bottom Layer Attribution Line */}
            <div className="p-3 bg-slate-950/90 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                Тайловый слой: <span className="text-slate-400">{tileConfigs[activeWorld].attribution}</span>
              </div>
              <div className="text-slate-600">
                Проекция: Equirectangular (EQ) / Leaflet 1.9
              </div>
            </div>
          </div>

          {/* Side List of Landing Sites */}
          <div className="lg:col-span-3 space-y-2 max-h-[640px] overflow-y-auto pr-1">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Объекты в секторе ({worldMissions.length})</span>
            </div>

            {worldMissions.map((m) => {
              const isSelected = selectedPinMission?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => handleFocusMission(m)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-red-500/80 shadow-lg'
                      : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span className="truncate">{m.type}</span>
                    <span className="text-slate-500 font-mono-tabular">{m.activeSpan.split('—')[0]}</span>
                  </div>

                  <div className="text-sm font-display font-bold text-white uppercase group-hover:text-red-400 transition-colors">
                    {m.name}
                  </div>

                  <div className="text-xs text-slate-400 mt-1 truncate">
                    {m.locationName}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">{m.coordinates.lat}, {m.coordinates.lon}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        spaceAudio.playTelemetryBeep(1400, 0.05);
                        onSelectMission(m);
                      }}
                      className="text-red-400 hover:text-red-300 font-semibold"
                    >
                      Досье →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

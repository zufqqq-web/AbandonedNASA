import React from 'react';

interface SchematicViewProps {
  type: 'rover' | 'lander' | 'rover-buggy' | 'helicopter' | 'station';
  className?: string;
  accentColor?: string;
}

export const SchematicView: React.FC<SchematicViewProps> = ({
  type,
  className = 'w-full h-48',
  accentColor = '#e11d48',
}) => {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-slate-950/70 border border-slate-800/80 rounded-lg p-4 ${className}`}>
      {/* Background technical coordinate crosshairs & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
        NASA SPEC // FIG.{type.toUpperCase()}
      </div>
      <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-500 pointer-events-none">
        SCALE 1:25
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-600 pointer-events-none">
        ORTHOGRAPHIC PROJECTION
      </div>

      {type === 'rover' && (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-48 drop-shadow-[0_0_12px_rgba(255,255,255,0.06)]" fill="none" stroke="currentColor">
          {/* Surface Horizon */}
          <line x1="10" y1="180" x2="310" y2="180" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
          
          {/* Rocker-Bogie Chassis & Wheels */}
          <circle cx="60" cy="170" r="14" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="60" cy="170" r="5" fill="#475569" />
          <circle cx="150" cy="170" r="14" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="150" cy="170" r="5" fill="#475569" />
          <circle cx="250" cy="170" r="14" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="250" cy="170" r="5" fill="#475569" />
          
          {/* Suspension Struts */}
          <path d="M60 170 L110 135 L150 170" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M110 135 L200 135 L250 170" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="110" cy="135" r="4" fill={accentColor} />
          <circle cx="200" cy="135" r="4" fill={accentColor} />

          {/* Warm Electronics Box Body */}
          <rect x="90" y="95" width="130" height="42" rx="3" stroke="#e2e8f0" strokeWidth="2" fill="#0f172a" fillOpacity="0.8" />
          <line x1="90" y1="108" x2="220" y2="108" stroke="#334155" strokeWidth="1" />
          <line x1="140" y1="95" x2="140" y2="137" stroke="#334155" strokeWidth="1" />

          {/* Remote Sensing Mast (Pancam / Navcam) */}
          <path d="M195 95 L195 38" stroke="#f1f5f9" strokeWidth="2.5" />
          <rect x="180" y="32" width="30" height="12" rx="2" stroke="#f8fafc" strokeWidth="2" fill="#1e293b" />
          <circle cx="188" cy="38" r="3" fill={accentColor} />
          <circle cx="202" cy="38" r="3" fill="#38bdf8" />
          <line x1="195" y1="32" x2="195" y2="24" stroke="#94a3b8" strokeWidth="1.5" />

          {/* High Gain Antenna Dish */}
          <ellipse cx="120" cy="75" rx="14" ry="7" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(-20 120 75)" />
          <line x1="120" y1="82" x2="120" y2="95" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Robotic Arm / APXS Turret */}
          <path d="M90 120 L55 125 L45 150" stroke="#f8fafc" strokeWidth="2" />
          <circle cx="45" cy="150" r="5" stroke={accentColor} strokeWidth="1.5" fill="#1e293b" />

          {/* Dimension indicator lines */}
          <line x1="285" y1="32" x2="285" y2="180" stroke="#475569" strokeWidth="0.8" strokeDasharray="2 2" />
          <text x="290" y="110" fill="#64748b" fontSize="8" fontFamily="monospace">H: 1.5m</text>
        </svg>
      )}

      {type === 'lander' && (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-48 drop-shadow-[0_0_12px_rgba(255,255,255,0.06)]" fill="none" stroke="currentColor">
          {/* Surface Horizon */}
          <line x1="10" y1="180" x2="310" y2="180" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />

          {/* 4 Landing Footpads & Struts */}
          <ellipse cx="40" cy="180" rx="12" ry="3" stroke="#f59e0b" strokeWidth="1.5" fill="#78350f" fillOpacity="0.5" />
          <ellipse cx="280" cy="180" rx="12" ry="3" stroke="#f59e0b" strokeWidth="1.5" fill="#78350f" fillOpacity="0.5" />
          <path d="M40 180 L105 130" stroke="#fcd34d" strokeWidth="2.5" />
          <path d="M280 180 L215 130" stroke="#fcd34d" strokeWidth="2.5" />
          
          {/* Secondary A-frame struts */}
          <path d="M70 180 L115 145" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M250 180 L205 145" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Octagonal Descent Stage Body with Mylar thermal blanket facets */}
          <polygon points="100,100 130,75 190,75 220,100 220,140 190,155 130,155 100,140" stroke="#f59e0b" strokeWidth="2" fill="#1e1b18" />
          <line x1="130" y1="75" x2="130" y2="155" stroke="#b45309" strokeWidth="1" />
          <line x1="190" y1="75" x2="190" y2="155" stroke="#b45309" strokeWidth="1" />
          <line x1="100" y1="120" x2="220" y2="120" stroke="#b45309" strokeWidth="1" strokeDasharray="4 2" />

          {/* DPS Descent Engine Nozzle */}
          <path d="M145 155 L135 174 L185 174 L175 155 Z" stroke="#e2e8f0" strokeWidth="2" fill="#0f172a" />
          <ellipse cx="160" cy="174" rx="25" ry="3" stroke="#94a3b8" strokeWidth="1" />

          {/* Egress Ladder */}
          <line x1="103" y1="85" x2="62" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="97" y1="88" x2="56" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="90" y1="110" x2="98" y2="110" stroke="#e2e8f0" strokeWidth="1.2" />
          <line x1="80" y1="130" x2="88" y2="130" stroke="#e2e8f0" strokeWidth="1.2" />
          <line x1="70" y1="152" x2="78" y2="152" stroke="#e2e8f0" strokeWidth="1.2" />

          {/* Comm Antenna */}
          <line x1="205" y1="75" x2="215" y2="40" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="215" cy="40" r="3" fill={accentColor} />

          {/* Commemorative Plaque indicator */}
          <rect x="75" y="132" width="12" height="7" stroke="#f8fafc" strokeWidth="0.8" fill="#334155" />
        </svg>
      )}

      {type === 'rover-buggy' && (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-48 drop-shadow-[0_0_12px_rgba(255,255,255,0.06)]" fill="none" stroke="currentColor">
          <line x1="10" y1="180" x2="310" y2="180" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
          
          {/* Wire Mesh Wheels */}
          <circle cx="70" cy="165" r="18" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="70" cy="165" r="6" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="245" cy="165" r="18" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="245" cy="165" r="6" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Tubular Aluminum Chassis */}
          <path d="M70 165 L100 148 L220 148 L245 165" stroke="#f1f5f9" strokeWidth="2.5" />
          <rect x="95" y="138" width="130" height="10" stroke="#e2e8f0" strokeWidth="1.5" fill="#1e293b" />

          {/* Two Foldable Seats */}
          <path d="M125 138 L130 95 L145 95" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M165 138 L170 95 L185 95" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="130" y1="115" x2="155" y2="138" stroke="#64748b" strokeWidth="1.5" />

          {/* T-bar Steering Controller */}
          <line x1="150" y1="138" x2="150" y2="110" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="144" y1="110" x2="156" y2="110" stroke={accentColor} strokeWidth="2.5" />

          {/* High-gain Umbrella Mesh Antenna Dish */}
          <ellipse cx="90" cy="80" rx="16" ry="8" stroke="#38bdf8" strokeWidth="1.8" transform="rotate(-30 90 80)" />
          <line x1="90" y1="88" x2="95" y2="138" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Color TV Camera at front */}
          <rect x="235" y="118" width="18" height="12" rx="2" stroke="#e2e8f0" strokeWidth="1.5" fill="#0f172a" />
          <circle cx="248" cy="124" r="2.5" fill={accentColor} />
          <line x1="240" y1="130" x2="235" y2="148" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      )}

      {type === 'helicopter' && (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-48 drop-shadow-[0_0_12px_rgba(255,255,255,0.06)]" fill="none" stroke="currentColor">
          <line x1="10" y1="180" x2="310" y2="180" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />

          {/* Top Solar Panel */}
          <rect x="130" y="30" width="60" height="8" rx="1" stroke="#38bdf8" strokeWidth="1.5" fill="#0369a1" />
          <line x1="150" y1="30" x2="150" y2="38" stroke="#0ea5e9" strokeWidth="1" />
          <line x1="170" y1="30" x2="170" y2="38" stroke="#0ea5e9" strokeWidth="1" />

          {/* Central Mast */}
          <line x1="160" y1="38" x2="160" y2="120" stroke="#f1f5f9" strokeWidth="2.5" />

          {/* Upper Counter-Rotating Rotor Blade */}
          <path d="M50 56 L270 56" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="160" cy="56" r="4" fill={accentColor} />

          {/* Lower Counter-Rotating Rotor Blade */}
          <path d="M60 76 L260 76" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="160" cy="76" r="4" fill="#64748b" />

          {/* Fuselage (Cube with batteries and avionics) */}
          <rect x="142" y="105" width="36" height="34" rx="2" stroke="#e2e8f0" strokeWidth="2" fill="#0f172a" />
          <circle cx="160" cy="122" r="4" fill="#22c55e" />
          <line x1="148" y1="130" x2="172" y2="130" stroke="#334155" strokeWidth="1" />

          {/* 4 Carbon Fiber Landing Legs */}
          <path d="M142 125 L90 180" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M178 125 L230 180" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="90" cy="180" r="3" fill={accentColor} />
          <circle cx="230" cy="180" r="3" fill={accentColor} />

          {/* Antenna */}
          <line x1="168" y1="30" x2="185" y2="14" stroke="#94a3b8" strokeWidth="1.2" />
        </svg>
      )}

      {type === 'station' && (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-48 drop-shadow-[0_0_12px_rgba(255,255,255,0.06)]" fill="none" stroke="currentColor">
          <line x1="10" y1="180" x2="310" y2="180" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />

          {/* Twin Round UltraFlex Solar Arrays */}
          <ellipse cx="65" cy="115" rx="42" ry="18" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" fill="#082f49" fillOpacity="0.6" />
          <ellipse cx="255" cy="115" rx="42" ry="18" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" fill="#082f49" fillOpacity="0.6" />
          <line x1="107" y1="115" x2="135" y2="115" stroke="#f1f5f9" strokeWidth="2" />
          <line x1="185" y1="115" x2="213" y2="115" stroke="#f1f5f9" strokeWidth="2" />

          {/* Central Lander Deck & Legs */}
          <polygon points="135,100 185,100 195,130 125,130" stroke="#e2e8f0" strokeWidth="2" fill="#0f172a" />
          <path d="M130 130 L105 180" stroke="#94a3b8" strokeWidth="2" />
          <path d="M190 130 L215 180" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="105" cy="180" rx="8" ry="2" fill="#475569" />
          <ellipse cx="215" cy="180" rx="8" ry="2" fill="#475569" />

          {/* Robotic Arm IDA deploying SEIS */}
          <path d="M175 105 L200 90 L210 130 L220 170" stroke="#f8fafc" strokeWidth="2" />
          
          {/* SEIS Wind and Thermal Shield (WTS Dome on ground) */}
          <path d="M208 180 C208 165, 232 165, 232 180 Z" stroke="#f59e0b" strokeWidth="2" fill="#78350f" fillOpacity="0.4" />
          <circle cx="220" cy="172" r="2" fill={accentColor} />

          {/* Weather Mast and Antennas */}
          <line x1="160" y1="100" x2="160" y2="60" stroke="#e2e8f0" strokeWidth="1.8" />
          <line x1="155" y1="60" x2="165" y2="60" stroke={accentColor} strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};

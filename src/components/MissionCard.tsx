import React from 'react';
import { motion } from 'motion/react';
import { Mission } from '../types/mission';
import { SchematicView } from './SchematicView';
import { Compass, Clock, MapPin, ArrowUpRight, Activity } from 'lucide-react';
import { spaceAudio } from '../utils/audio';

interface MissionCardProps {
  mission: Mission;
  onOpenDetail: (mission: Mission) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, onOpenDetail }) => {
  const getStatusColor = (statusType: string) => {
    switch (statusType) {
      case 'active':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-700/50';
      case 'silent':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'complete':
      default:
        return 'text-slate-300 bg-slate-900 border-slate-700/60';
    }
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative rounded-xl border border-slate-800/90 bg-slate-950/90 p-5 flex flex-col justify-between overflow-hidden transition-colors hover:border-slate-600 hover:shadow-2xl hover:shadow-red-950/20 cursor-pointer"
      onClick={() => {
        spaceAudio.playTelemetryBeep(1300, 0.04);
        onOpenDetail(mission);
      }}
    >
      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                mission.destination === 'Mars' ? 'bg-red-500' : 'bg-slate-300'
              }`}
            />
            <span>{mission.destination === 'Mars' ? 'МАРС' : 'ЛУНА'}</span>
            <span aria-hidden="true">·</span>
            <span>{mission.type}</span>
          </div>

          <div
            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getStatusColor(
              mission.statusType
            )}`}
          >
            {mission.activeSpan}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight group-hover:text-red-400 transition-colors flex items-center justify-between">
          <span>{mission.name}</span>
          <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all opacity-0 group-hover:opacity-100" />
        </h3>

        <div className="text-xs font-mono text-slate-400 mt-0.5 truncate">
          {mission.englishName} // {mission.designation}
        </div>
      </div>

      {/* Schematic / Visual Preview */}
      <div className="my-4">
        <SchematicView
          type={mission.schematicType}
          accentColor={mission.destination === 'Mars' ? '#e11d48' : '#38bdf8'}
          className="h-40 group-hover:border-slate-700 transition-colors"
        />
      </div>

      {/* Body Metadata */}
      <div>
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {mission.shortDescription}
        </p>

        {/* Technical Footer specs */}
        <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px] font-mono text-slate-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Координаты:
            </span>
            <span className="text-slate-300 font-mono-tabular truncate max-w-[170px]">
              {mission.coordinates.lat}, {mission.coordinates.lon}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Длительность:
            </span>
            <span className="text-slate-200 font-mono-tabular truncate max-w-[170px]">
              {mission.missionDuration.split('(')[0]}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Activity className="w-3.5 h-3.5 text-red-400" />
              Статус:
            </span>
            <span
              className={`font-semibold truncate max-w-[170px] ${
                mission.statusType === 'active'
                  ? 'text-emerald-400'
                  : mission.statusType === 'silent'
                  ? 'text-amber-400'
                  : 'text-slate-300'
              }`}
            >
              {mission.status}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

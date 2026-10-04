import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-[#030508] py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span className="font-display text-sm font-bold text-slate-200 uppercase tracking-wider">
            ABANDONED ARCHIVE
          </span>
          <span className="text-slate-400">·</span>
          <span>NASA Space Apps Challenge</span>
        </div>

        <div className="text-center md:text-right text-slate-400 text-[11px] leading-relaxed">
          <div>Проект «Брошенная, но не забытая» (Abandoned but not Forgotten)</div>
          <div>Материалы и телеметрия основаны на открытых данных NASA / JPL-Caltech / PDS.</div>
        </div>
      </div>
    </footer>
  );
};

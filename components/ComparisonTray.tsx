'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { INSTITUTIONS } from '@/lib/data';
import { Scale, X, ArrowRight } from 'lucide-react';

export default function ComparisonTray() {
  const { compared, toggleCompare, clearCompared } = useApp();

  if (compared.length === 0) return null;

  const comparedInstitutions = compared
    .map(id => INSTITUTIONS.find(i => i.id === id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl p-3 md:p-4 border border-slate-700/60 flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center gap-3 overflow-x-auto py-1">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500 text-white shrink-0 font-bold">
          <Scale className="w-5 h-5" />
        </div>
        <div className="hidden sm:block">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">Сравнение вузов</div>
          <div className="text-xs text-slate-400">Выбрано {compared.length} из 4</div>
        </div>

        <div className="flex items-center gap-2">
          {comparedInstitutions.map(inst => (
            <div
              key={inst!.id}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700 text-xs shrink-0"
            >
              <span className="font-medium truncate max-w-[120px]">{inst!.abbreviation}</span>
              <button
                onClick={() => toggleCompare(inst!.id)}
                className="text-slate-400 hover:text-white p-0.5"
                title="Удалить из сравнения"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={clearCompared}
          className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5 transition-colors hidden md:block"
        >
          Очистить
        </button>
        <Link
          href="/compare"
          className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md shadow-brand-500/20"
        >
          <span>Сравнить</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

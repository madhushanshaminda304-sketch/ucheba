'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RANKINGS, INSTITUTIONS } from '@/lib/data';
import { useApp } from '@/lib/AppContext';
import { 
  Award, 
  TrendingUp, 
  Building2, 
  Scale, 
  Heart, 
  ArrowRight, 
  MapPin, 
  BarChart3,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function RankingsPage() {
  const { toggleFavorite, isFavorite, toggleCompare, isCompared } = useApp();
  const [rankingTab, setRankingTab] = useState<'total' | 'quality' | 'demand' | 'science'>('total');

  const sortedRankings = [...RANKINGS].sort((a, b) => {
    if (rankingTab === 'quality') return b.qualityScore - a.qualityScore;
    if (rankingTab === 'demand') return b.demandScore - a.demandScore;
    if (rankingTab === 'science') return b.scienceScore - a.scienceScore;
    return a.rank - b.rank;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <Link href="/vuz" className="hover:text-brand-600 transition-colors">Вузы</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Рейтинги вузов</span>
      </nav>

      {/* Hero Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200/60">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Национальный рейтинг университетов 2026 (RAEX)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Рейтинг лучших вузов России 2026 года
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Ежегодный независимый рейтинг агентства RAEX («РАЭКС-Аналитика»): оценка качества образования, востребованности выпускников у ведущих работодателей и научно-исследовательской активности.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'total', label: 'Сводный рейтинг RAEX' },
          { id: 'demand', label: 'Востребованность у работодателей' },
          { id: 'quality', label: 'Качество преподавания' },
          { id: 'science', label: 'Научная деятельность' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setRankingTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              rankingTab === tab.id
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rankings Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-400">
                <th className="p-4 sm:p-5 w-16 text-center">Место</th>
                <th className="p-4 sm:p-5">Университет</th>
                <th className="p-4 sm:p-5 text-center">Итоговый балл</th>
                <th className="p-4 sm:p-5 text-center">Качество образования</th>
                <th className="p-4 sm:p-5 text-center">Спрос работодателей</th>
                <th className="p-4 sm:p-5 text-center">Проходной балл</th>
                <th className="p-4 sm:p-5 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {sortedRankings.map((item, index) => {
                const inst = INSTITUTIONS.find(i => i.id === item.institutionId);
                const isFav = isFavorite(item.institutionId);
                const isComp = isCompared(item.institutionId);

                return (
                  <tr
                    key={item.institutionId}
                    className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Rank */}
                    <td className="p-4 sm:p-5 text-center">
                      <span className={`w-8 h-8 rounded-xl font-black text-xs inline-flex items-center justify-center ${
                        index === 0 
                          ? 'bg-amber-400 text-amber-950 shadow-md' 
                          : index === 1 
                          ? 'bg-slate-200 text-slate-800' 
                          : index === 2 
                          ? 'bg-amber-700/20 text-amber-900' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        #{index + 1}
                      </span>
                    </td>

                    {/* University info */}
                    <td className="p-4 sm:p-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${inst?.logoBg || 'bg-brand-700'} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                          {inst?.logoLetter || item.abbreviation.slice(0, 3)}
                        </div>
                        <div>
                          <Link
                            href={`/vuz/${item.institutionId}`}
                            className="font-bold text-slate-900 text-sm hover:text-brand-600 transition-colors block leading-snug"
                          >
                            {item.institutionName}
                          </Link>
                          <span className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {item.city}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Total Score */}
                    <td className="p-4 sm:p-5 text-center">
                      <span className="font-black text-brand-700 text-sm">
                        {item.scoreTotal}
                      </span>
                    </td>

                    {/* Quality */}
                    <td className="p-4 sm:p-5 text-center">
                      <span className="font-semibold text-slate-700 text-xs">
                        {item.qualityScore}
                      </span>
                    </td>

                    {/* Demand */}
                    <td className="p-4 sm:p-5 text-center">
                      <span className="font-semibold text-slate-700 text-xs">
                        {item.demandScore}
                      </span>
                    </td>

                    {/* Min Score */}
                    <td className="p-4 sm:p-5 text-center">
                      <span className="font-black text-slate-800 text-xs bg-slate-100 px-2 py-1 rounded-md">
                        от {item.minBudgetScore}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 sm:p-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => toggleCompare(item.institutionId)}
                          className={`p-2 rounded-lg border transition-colors ${
                            isComp ? 'bg-brand-50 border-brand-300 text-brand-600' : 'border-slate-200 text-slate-400 hover:text-slate-600'
                          }`}
                          title="Сравнить"
                        >
                          <Scale className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(item.institutionId)}
                          className={`p-2 rounded-lg border transition-colors ${
                            isFav ? 'bg-rose-50 border-rose-300 text-rose-500' : 'border-slate-200 text-slate-400 hover:text-rose-500'
                          }`}
                          title="В избранное"
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                        </button>
                        <Link
                          href={`/vuz/${item.institutionId}`}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 transition-colors"
                          title="Открыть профиль"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { INSTITUTIONS, PROGRAMS, COLLEGES, PROFESSIONS } from '@/lib/data';
import { 
  Heart, 
  Trash2, 
  ArrowRight, 
  Award, 
  MapPin, 
  Scale, 
  GraduationCap,
  Briefcase,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function FavoritesPage() {
  const { savedFavorites, toggleFavorite, toggleCompare, isCompared } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'institution' | 'program' | 'college'>('all');

  const filteredFavorites = savedFavorites.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  if (savedFavorites.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl mx-auto flex items-center justify-center shadow-inner">
          <Heart className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            В избранном пока ничего нет
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Нажимайте на сердечко на страницах вузов, программ или колледжей, чтобы сохранить их в вашем локальном пространстве на этом устройстве.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/vuz"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/20 transition-all"
          >
            <span>Каталог вузов</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all"
          >
            <span>Каталог колледжей</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-20">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Избранное</span>
      </nav>

      {/* Title & Filter Tabs */}
      <div className="space-y-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Избранные объекты ({savedFavorites.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ваш персональный список программ, вузов и колледжей (сохраняется на этом устройстве)
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 'all', label: `Все (${savedFavorites.length})` },
            { id: 'program', label: `Программы (${savedFavorites.filter(f => f.type === 'program').length})` },
            { id: 'institution', label: `Вузы (${savedFavorites.filter(f => f.type === 'institution').length})` },
            { id: 'college', label: `Колледжи (${savedFavorites.filter(f => f.type === 'college').length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === tab.id 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFavorites.map(fav => {
          if (fav.type === 'program') {
            const prog = PROGRAMS.find(p => p.id === fav.id);
            const isComp = isCompared(fav.id, 'program');

            return (
              <div
                key={fav.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 uppercase">
                      Программа обучения
                    </span>
                    <button
                      onClick={() => toggleFavorite({ type: 'program', id: fav.id, title: fav.title }, fav.title)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Удалить из избранного"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 text-base leading-snug">
                      <Link href={`/program/${fav.id}`} className="hover:text-brand-600 transition-colors">
                        {prog?.name || fav.title || fav.id}
                      </Link>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {prog ? `${prog.institutionName} • ${prog.code}` : fav.subtitle}
                    </p>
                  </div>

                  {prog && (
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Порог 2024</span>
                        <span className="font-black text-slate-800 text-sm">
                          {prog.minScoreBudget !== null ? `${prog.minScoreBudget} б.` : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Стоимость</span>
                        <span className="font-black text-slate-800 text-sm">
                          {prog.tuitionPerYear !== null ? `${(prog.tuitionPerYear / 1000).toFixed(0)} тыс. ₽/г` : '—'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleCompare({ type: 'program', id: fav.id, title: fav.title }, fav.title)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                      isComp ? 'bg-brand-50 border-brand-300 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isComp ? 'В сравнении' : 'Сравнить'}</span>
                  </button>

                  <Link
                    href={`/program/${fav.id}`}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                  >
                    <span>Учебный план</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          }

          if (fav.type === 'college') {
            const col = COLLEGES.find(c => c.id === fav.id);
            return (
              <div
                key={fav.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 uppercase">
                      Колледж (СПО)
                    </span>
                    <button
                      onClick={() => toggleFavorite({ type: 'college', id: fav.id, title: fav.title }, fav.title)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Удалить из избранного"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900 text-base leading-snug">
                      <Link href={`/colleges/${fav.id}`} className="hover:text-brand-600 transition-colors">
                        {col?.name || fav.title || fav.id}
                      </Link>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">{col?.city || fav.subtitle}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <Link
                    href={`/colleges/${fav.id}`}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          }

          // Default: Institution
          const inst = INSTITUTIONS.find(i => i.id === fav.id);
          const isComp = isCompared(fav.id, 'institution');

          return (
            <div
              key={fav.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${inst?.logoBg || 'bg-slate-900'} text-white font-black text-xs flex items-center justify-center tracking-wider shadow-md`}>
                      {inst?.logoLetter || 'У'}
                    </div>
                    <div>
                      {inst?.ratingRaex && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60 inline-flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-600" />
                          #{inst.ratingRaex} RAEX
                        </span>
                      )}
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {inst?.city || fav.subtitle}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite({ type: 'institution', id: fav.id, title: fav.title }, fav.title)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Удалить из избранного"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h2 className="font-bold text-slate-900 text-base leading-snug">
                    <Link href={`/vuz/${fav.id}`} className="hover:text-brand-600 transition-colors">
                      {inst?.name || fav.title || fav.id}
                    </Link>
                  </h2>
                </div>

                {inst && (
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Порог 2024</span>
                      <span className="font-black text-slate-800 text-sm">
                        {inst.minBudgetScore !== null ? `от ${inst.minBudgetScore}` : '—'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Стоимость в год</span>
                      <span className="font-black text-slate-800 text-sm">
                        {inst.tuitionFeeFrom !== null ? `от ${(inst.tuitionFeeFrom / 1000).toFixed(0)} тыс. ₽` : '—'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleCompare({ type: 'institution', id: fav.id, title: fav.title }, fav.title)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                    isComp ? 'bg-brand-50 border-brand-300 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isComp ? 'В сравнении' : 'Сравнить'}</span>
                </button>

                <Link
                  href={`/vuz/${fav.id}`}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  <span>Подробнее</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { INSTITUTIONS, PROFESSIONS } from '@/lib/data';
import { 
  Heart, 
  Trash2, 
  ArrowRight, 
  Award, 
  MapPin, 
  Scale, 
  GraduationCap,
  Briefcase
} from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, toggleFavorite, toggleCompare, isCompared } = useApp();

  const savedInstitutions = INSTITUTIONS.filter(i => favorites.includes(i.id));

  if (savedInstitutions.length === 0) {
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
            Нажимайте на сердечко в каталоге вузов или на страницах университетов, чтобы сохранить понравившиеся варианты и вернуться к ним позже.
          </p>
        </div>
        <Link
          href="/vuz"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/20 transition-all"
        >
          <span>Перейти в каталог вузов</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
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

      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Избранные учебные заведения ({savedInstitutions.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Ваш персональный шорт-лист вузов для поступления в 2026 году
          </p>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedInstitutions.map(inst => {
          const isComp = isCompared(inst.id);

          return (
            <div
              key={inst.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${inst.logoBg} text-white font-black text-xs flex items-center justify-center tracking-wider shadow-md`}>
                      {inst.logoLetter}
                    </div>
                    <div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60 inline-flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-600" />
                        #{inst.ratingRaex} RAEX
                      </span>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {inst.city}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFavorite(inst.id)}
                    className="p-2 text-rose-500 hover:text-slate-400 rounded-lg hover:bg-slate-50 transition-colors"
                    title="Удалить из избранного"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h2 className="font-bold text-slate-900 text-base leading-snug">
                    <Link href={`/vuz/${inst.id}`} className="hover:text-brand-600 transition-colors">
                      {inst.name}
                    </Link>
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Балл на бюджет</span>
                    <span className="font-black text-slate-800 text-sm">от {inst.minBudgetScore}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Стоимость в год</span>
                    <span className="font-black text-slate-800 text-sm">от {(inst.tuitionFeeFrom / 1000).toFixed(0)} тыс. ₽</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleCompare(inst.id)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                    isComp ? 'bg-brand-50 border-brand-300 text-brand-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isComp ? 'В сравнении' : 'Сравнить'}</span>
                </button>

                <Link
                  href={`/vuz/${inst.id}`}
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

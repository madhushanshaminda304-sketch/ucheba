'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/data';
import { BookOpen, Clock, Calendar, ArrowRight, User } from 'lucide-react';

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Поступление', 'Выбор траектории', 'Подготовка к ЕГЭ'];

  const filteredArticles = ARTICLES.filter(art => {
    if (selectedCategory === 'all') return true;
    return art.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Журнал поступления</span>
      </nav>

      {/* Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Образовательный медиа-журнал</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Полезные статьи, инструкции и советы абитуриентам
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Разбираем изменения в правилах приема 2026, секреты успешной сдачи экзаменов, льготы и тонкости выбора будущей профессии.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Все статьи' : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArticles.map(art => (
          <Link
            key={art.id}
            href={`/journal/${art.slug}`}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover hover:border-brand-300 transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-brand-600 px-2.5 py-0.5 rounded-md bg-brand-50">
                  {art.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {art.readTimeMinutes} мин
                </span>
              </div>

              <h2 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-brand-600 transition-colors">
                {art.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {art.date}
              </span>
              <span className="font-bold text-brand-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Читать</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PROFESSIONS } from '@/lib/data';
import { 
  Search, 
  Briefcase, 
  TrendingUp, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  DollarSign
} from 'lucide-react';

export default function ProfessionsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Все сферы' },
    { id: 'it', label: 'Информационные технологии' },
    { id: 'economics', label: 'Экономика и управление' },
    { id: 'medicine', label: 'Медицина' },
    { id: 'creative', label: 'Дизайн и творчество' },
  ];

  const filteredProfessions = useMemo(() => {
    return PROFESSIONS.filter(prof => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = prof.title.toLowerCase().includes(q);
        const matchesDesc = prof.shortDescription.toLowerCase().includes(q);
        const matchesSkills = prof.keySkills.some(s => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesSkills) return false;
      }
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'it' && !prof.category.toLowerCase().includes('информ')) return false;
        if (selectedCategory === 'economics' && !prof.category.toLowerCase().includes('эконом')) return false;
        if (selectedCategory === 'medicine' && !prof.category.toLowerCase().includes('мед')) return false;
        if (selectedCategory === 'creative' && !prof.category.toLowerCase().includes('дизайн')) return false;
      }
      return true;
    });
  }, [search, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Атлас профессий</span>
      </nav>

      {/* Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Карьерный навигатор 2026</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Каталог востребованных профессий
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Узнайте, какие навыки требуются работодателям, сколько зарабатывают начинающие и опытные специалисты и в какие вузы поступить для успешного старта карьеры.
        </p>
      </div>

      {/* Search & Categories Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Поиск профессии или навыка (Python, Data Scientist, Хирург, Финансист)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Professions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProfessions.map(prof => (
          <div
            key={prof.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover hover:border-brand-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-brand-50 text-brand-700">
                  {prof.category}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  Спрос: {prof.demandLevel}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                <Link href={`/prof/${prof.slug}`} className="hover:text-brand-600 transition-colors">
                  {prof.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {prof.shortDescription}
              </p>

              {/* Salary Bar */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Средняя зарплата в России:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Junior (старт)</span>
                    <span className="font-bold text-slate-800">от {(prof.salaryJunior / 1000).toFixed(0)} тыс. ₽</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Middle (опыт)</span>
                    <span className="font-black text-brand-700">от {(prof.salaryMiddle / 1000).toFixed(0)} тыс. ₽</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Senior (профи)</span>
                    <span className="font-bold text-slate-800">от {(prof.salarySenior / 1000).toFixed(0)} тыс. ₽</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Ключевые навыки:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {prof.keySkills.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer: Where to study */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {prof.educationLevels.join(' • ')}
              </span>
              <Link
                href={`/prof/${prof.slug}`}
                className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
              >
                <span>Где учиться</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

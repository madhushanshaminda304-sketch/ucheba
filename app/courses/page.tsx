'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { COURSES } from '@/lib/data';
import { 
  Laptop, 
  Search, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Briefcase, 
  ChevronRight,
  Filter
} from 'lucide-react';

export default function CoursesPage() {
  const { showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jobGuaranteeOnly, setJobGuaranteeOnly] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Все курсы' },
    { id: 'it', label: 'Программирование' },
    { id: 'analytics', label: 'Data Science и аналитика' },
    { id: 'design', label: 'Дизайн и UX/UI' },
    { id: 'marketing', label: 'Маркетинг' },
    { id: 'languages', label: 'Иностранные языки' },
    { id: 'management', label: 'Управление и Product' },
  ];

  const filteredCourses = COURSES.filter(course => {
    if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;
    if (jobGuaranteeOnly && !course.hasJobGuarantee) return false;
    if (selectedLevel !== 'all' && course.level !== selectedLevel) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchProvider = course.provider.toLowerCase().includes(q);
      const matchTags = course.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchProvider && !matchTags) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-800 transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">Курсы и дополнительное образование (ДПО)</span>
          </div>

          <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Проверенные онлайн-школы и университеты</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Курсы профессий и дополнительное образование
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Сравните программы профессиональной переподготовки в IT, дизайне, аналитике и маркетинге. Официальный диплом установленного образца, стажировки и помощь в трудоустройстве.
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-sm overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по названию курса, школе или навыкам (React, Python, Figma)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Любой уровень</option>
              <option value="С нуля">С нуля</option>
              <option value="Для продолжающих">Для продолжающих</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={jobGuaranteeOnly}
                onChange={(e) => setJobGuaranteeOnly(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>С гарантией трудоустройства</span>
            </label>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-800">
                    {course.provider}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.reviewsCount})</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.durationMonths} месяцев
                    </span>
                    <span>•</span>
                    <span>{course.level}</span>
                    {course.hasJobGuarantee && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          Трудоустройство
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {course.description}
                </p>

                {/* Skills badges */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Ключевые навыки:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {course.skillsAcquired.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-black text-slate-900">
                    {course.pricePerMonthInstallment.toLocaleString('ru-RU')} ₽ <span className="text-xs font-normal text-slate-400">/ мес</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    или {course.priceTotal.toLocaleString('ru-RU')} ₽ целиком
                  </div>
                </div>

                <button
                  onClick={() => showToast(`Демо-режим: запись на «${course.title}» зафиксирована локально. Для официальной записи посетите сайт школы ${course.provider}`, 'info')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                >
                  Записаться на курс
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

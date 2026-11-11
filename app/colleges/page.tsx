'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { COLLEGES, CITIES } from '@/lib/data';
import { 
  Search, 
  MapPin, 
  School, 
  Award, 
  Phone, 
  Globe, 
  CheckCircle2, 
  GraduationCap,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function CollegesPage() {
  const { selectedCity, setSelectedCity } = useApp();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState(selectedCity);

  // Sync catalog city filter when global city changes
  React.useEffect(() => {
    setCityFilter(selectedCity);
  }, [selectedCity]);
  const [onlyState, setOnlyState] = useState(false);
  const [onlyHostel, setOnlyHostel] = useState(false);

  const filteredColleges = useMemo(() => {
    return COLLEGES.filter(col => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = col.name.toLowerCase().includes(q) || col.abbreviation.toLowerCase().includes(q);
        const matchesSpecs = col.specialties.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesSpecs) return false;
      }
      if (cityFilter !== 'all') {
        const cityObj = CITIES.find(c => c.id === cityFilter);
        if (cityObj && col.city !== cityObj.name) return false;
      }
      if (onlyState && !col.isState) return false;
      if (onlyHostel && !col.hasHostel) return false;
      return true;
    });
  }, [search, cityFilter, onlyState, onlyHostel]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Колледжи и техникумы России</span>
      </nav>

      {/* Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Колледжи и техникумы: среднее профессиональное образование
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Каталог государственных и частных колледжей после 9 и 11 классов: средний балл аттестата, проходные баллы на бюджет, специальности СПО и дни открытых дверей.
        </p>
      </div>

      {/* Filters bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Поиск по названию колледжа или специальности (IT, дизайн, коммерция)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setSelectedCity(e.target.value);
              }}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyState}
              onChange={(e) => setOnlyState(e.target.checked)}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
            />
            <span>Только государственные колледжи</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyHostel}
              onChange={(e) => setOnlyHostel(e.target.checked)}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
            />
            <span>С общежитием</span>
          </label>
        </div>
      </div>

      {/* College list */}
      <div className="space-y-4">
        {filteredColleges.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            По заданным параметрам колледжи не найдены.
          </div>
        ) : (
          filteredColleges.map(col => (
            <div
              key={col.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                      Государственный колледж
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      г. {col.city}, {col.address} {col.metro && `(м. ${col.metro})`}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 leading-tight">
                    {col.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Обучение в год</span>
                    <span className="text-base font-black text-slate-800">
                      от {(col.tuitionPerYear / 1000).toFixed(0)} тыс. ₽
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {col.description}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Средний балл (бюджет)</span>
                  <span className="font-black text-slate-800 text-sm">{col.averageGpaBudget} из 5.0</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Бюджетных мест</span>
                  <span className="font-black text-slate-800 text-sm">{col.budgetPlaces} мест</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Общежитие</span>
                  <span className="font-bold text-slate-800 text-sm">{col.hasHostel ? 'Предоставляется' : 'Нет'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Основан</span>
                  <span className="font-bold text-slate-800 text-sm">{col.foundYear} год</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Специальности подготовки:
                </span>
                <div className="flex flex-wrap gap-2">
                  {col.specialties.map((spec, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Contacts */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {col.phone}
                  </span>
                  <a href={col.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-brand-600 hover:underline">
                    <Globe className="w-3.5 h-3.5" />
                    Сайт колледжа
                  </a>
                </div>

                <a
                  href={col.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Подать документы</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

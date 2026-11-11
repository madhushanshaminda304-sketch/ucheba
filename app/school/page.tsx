'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { SCHOOLS, CITIES } from '@/lib/data';
import { 
  School, 
  MapPin, 
  Award, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  SlidersHorizontal, 
  Sparkles, 
  Phone, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function SchoolsPage() {
  const { selectedCity: globalCity, setSelectedCity: setGlobalCity } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState(globalCity);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedProfile, setSelectedProfile] = useState('all');
  const [onlyFree, setOnlyFree] = useState(false);

  useEffect(() => {
    setCityFilter(globalCity);
  }, [globalCity]);

  const filteredSchools = SCHOOLS.filter(school => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = school.name.toLowerCase().includes(q) || school.shortName.toLowerCase().includes(q);
      const matchDistrict = school.district?.toLowerCase().includes(q) || false;
      const matchMetro = school.metro?.toLowerCase().includes(q) || false;
      if (!matchName && !matchDistrict && !matchMetro) return false;
    }

    if (cityFilter !== 'all') {
      const cityObj = CITIES.find(c => c.id === cityFilter);
      if (cityObj && school.city !== cityObj.name) return false;
    }
    if (selectedType !== 'all' && school.type !== selectedType) return false;
    if (onlyFree && !school.isTuitionFree) return false;
    if (selectedProfile !== 'all') {
      const match = school.profileClasses.some(p => p.toLowerCase().includes(selectedProfile.toLowerCase()));
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Breadcrumb & Hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-800 transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">Каталог школ и лицеев</span>
          </div>

          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
                <Award className="w-3.5 h-3.5" />
                <span>Официальный рейтинг школ RAEX и Департамента образования</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Школы, лицеи и гимназии Москвы и России
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Сравните ведущие общеобразовательные учреждения: профильные классы (IT-вертикаль, инженерные и медицинские), проходные баллы на вступительных испытаниях, результаты ЕГЭ и олимпиад.
              </p>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Поиск школы по названию, району, станции метро..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm transition-all"
              />
            </div>

            {/* City Filter */}
            <div className="w-full lg:w-48">
              <select
                value={cityFilter}
                onChange={(e) => {
                  setCityFilter(e.target.value);
                  setGlobalCity(e.target.value);
                }}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                {CITIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="w-full lg:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">Все типы</option>
                <option value="lyceum">Лицеи</option>
                <option value="gymnasium">Гимназии</option>
                <option value="state">Государственные</option>
                <option value="private">Частные школы</option>
              </select>
            </div>

            {/* Profile Filter */}
            <div className="w-full lg:w-56">
              <select
                value={selectedProfile}
                onChange={(e) => setSelectedProfile(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">Любой профиль</option>
                <option value="IT">IT и программирование</option>
                <option value="Инженер">Инженерный класс</option>
                <option value="Медицин">Медицинский / Биомед</option>
                <option value="Математик">Физико-математический</option>
                <option value="Гуманитар">Гуманитарный и языковой</option>
                <option value="Экономик">Экономический</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={onlyFree}
                onChange={(e) => setOnlyFree(e.target.checked)}
                className="rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Только бесплатное обучение (Госбюджет)</span>
            </label>

            <span className="text-slate-500">
              Найдено учреждений: <strong className="text-slate-900">{filteredSchools.length}</strong>
            </span>
          </div>
        </div>

        {/* Schools List */}
        <div className="space-y-4">
          {filteredSchools.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800">
                    № {school.rankingRank} в рейтинге
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                    {school.type === 'lyceum' ? 'Лицей' : school.type === 'gymnasium' ? 'Гимназия' : school.type === 'private' ? 'Частная школа' : 'Гос. школа'}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {school.city}, {school.metro}
                  </span>
                </div>

                <div>
                  <Link
                    href={`/school/${school.id}`}
                    className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors"
                  >
                    {school.shortName}
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{school.name}</p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {school.description}
                </p>

                {/* Profile classes pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {school.profileClasses.slice(0, 4).map((prof, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-medium"
                    >
                      {prof}
                    </span>
                  ))}
                  {school.profileClasses.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[11px]">
                      +{school.profileClasses.length - 4} направления
                    </span>
                  )}
                </div>
              </div>

              {/* School Metrics */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
                <div className="text-left lg:text-right space-y-1">
                  <div className="text-xs text-slate-500">Средний балл ЕГЭ</div>
                  <div className="text-xl font-black text-brand-600">{school.averageEgeScore}</div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    {school.olympiadWinnersCount} призёров ВсОШ
                  </div>
                </div>

                <div className="text-left lg:text-right space-y-2">
                  <div className="text-xs font-bold text-slate-700">
                    {school.isTuitionFree ? 'Обучение бесплатное' : `${school.tuitionPerMonth?.toLocaleString('ru-RU')} ₽ / мес`}
                  </div>
                  <Link
                    href={`/school/${school.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    <span>Подробнее о школе</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

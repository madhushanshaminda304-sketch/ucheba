'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { INSTITUTIONS, CITIES, EDUCATIONAL_DOMAINS } from '@/lib/data';
import { 
  Search, 
  Filter, 
  MapPin, 
  Scale, 
  Heart, 
  Award, 
  ArrowRight, 
  Check, 
  X, 
  ChevronDown,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';

function VuzCatalogContent() {
  const searchParams = useSearchParams();
  const { selectedCity, setSelectedCity, toggleFavorite, isFavorite, toggleCompare, isCompared } = useApp();

  // Search & Filter State
  const initialQuery = searchParams.get('q') || '';
  const initialTag = searchParams.get('tag') || '';
  const initialMilitary = searchParams.get('military') === 'true';
  const initialHostel = searchParams.get('hostel') === 'true';

  const [search, setSearch] = useState(initialQuery);
  const [cityFilter, setCityFilter] = useState(selectedCity);

  // Sync catalog city filter when global city changes
  React.useEffect(() => {
    setCityFilter(selectedCity);
  }, [selectedCity]);

  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [onlyBudget, setOnlyBudget] = useState(false);
  const [hasHostelOnly, setHasHostelOnly] = useState(initialHostel);
  const [hasMilitaryOnly, setHasMilitaryOnly] = useState(initialMilitary);
  const [maxScoreFilter, setMaxScoreFilter] = useState<number>(310);
  const [maxTuitionFilter, setMaxTuitionFilter] = useState<number>(800000);
  const [sortBy, setSortBy] = useState<'raex' | 'scoreAsc' | 'scoreDesc' | 'tuitionAsc' | 'placesDesc'>('raex');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter Logic
  const filteredInstitutions = useMemo(() => {
    return INSTITUTIONS.filter(inst => {
      // Search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = inst.name.toLowerCase().includes(q);
        const matchesAbbr = inst.abbreviation.toLowerCase().includes(q);
        const matchesCity = inst.city.toLowerCase().includes(q);
        const matchesTags = inst.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesAbbr && !matchesCity && !matchesTags) return false;
      }

      // City
      if (cityFilter !== 'all') {
        const cityObj = CITIES.find(c => c.id === cityFilter);
        if (cityObj && inst.city !== cityObj.name) return false;
      }

      // Tag / Domain
      if (selectedTag) {
        const tagMap: { [key: string]: string[] } = {
          it: ['it', 'информационные', 'компьютерные', 'физики'],
          economics: ['экономика', 'бизнес', 'вшэ'],
          medicine: ['мед', 'сеченов'],
          engineering: ['инженер', 'баумана'],
          law: ['право', 'юриспруденция'],
          humanities: ['международные', 'гуманитарные', 'мгимо'],
        };
        const keywords = tagMap[selectedTag] || [selectedTag];
        const hasKeyword = keywords.some(k => 
          inst.name.toLowerCase().includes(k) || 
          inst.tags.some(t => t.toLowerCase().includes(k))
        );
        if (!hasKeyword) return false;
      }

      // Features
      if (hasHostelOnly && !inst.hasHostel) return false;
      if (hasMilitaryOnly && !inst.isMilitaryChair) return false;
      if (onlyBudget && (inst.budgetPlacesCount === null || inst.budgetPlacesCount <= 0)) return false;

      // Scores & Tuition
      if (inst.minBudgetScore !== null && inst.minBudgetScore > maxScoreFilter) return false;
      if (inst.tuitionFeeFrom !== null && inst.tuitionFeeFrom > maxTuitionFilter) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'raex') return (a.ratingRaex || 99) - (b.ratingRaex || 99);
      if (sortBy === 'scoreDesc') return (b.minBudgetScore ?? 0) - (a.minBudgetScore ?? 0);
      if (sortBy === 'scoreAsc') return (a.minBudgetScore ?? 999) - (b.minBudgetScore ?? 999);
      if (sortBy === 'tuitionAsc') return (a.tuitionFeeFrom ?? 9999999) - (b.tuitionFeeFrom ?? 9999999);
      if (sortBy === 'placesDesc') return (b.budgetPlacesCount ?? 0) - (a.budgetPlacesCount ?? 0);
      return 0;
    });
  }, [search, cityFilter, selectedTag, onlyBudget, hasHostelOnly, hasMilitaryOnly, maxScoreFilter, maxTuitionFilter, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setCityFilter('all');
    setSelectedTag('');
    setOnlyBudget(false);
    setHasHostelOnly(false);
    setHasMilitaryOnly(false);
    setMaxScoreFilter(310);
    setMaxTuitionFilter(800000);
    setSortBy('raex');
  };

  const activeFiltersCount = (search ? 1 : 0) + 
    (cityFilter !== 'all' ? 1 : 0) + 
    (selectedTag ? 1 : 0) + 
    (onlyBudget ? 1 : 0) + 
    (hasHostelOnly ? 1 : 0) + 
    (hasMilitaryOnly ? 1 : 0) + 
    (maxScoreFilter < 310 ? 1 : 0) + 
    (maxTuitionFilter < 800000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Вузы России</span>
      </nav>

      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Вузы России: каталог университетов 2026
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Найдено {filteredInstitutions.length} аккредитованных высших учебных заведений
          </p>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-brand-50 text-brand-700 font-bold text-xs rounded-xl border border-brand-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm text-xs">
            <span className="text-slate-400 font-semibold hidden sm:inline">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer"
            >
              <option value="raex">По рейтингу RAEX</option>
              <option value="scoreDesc">По баллу на бюджет (убыв.)</option>
              <option value="scoreAsc">По баллу на бюджет (возр.)</option>
              <option value="tuitionAsc">По стоимости (сначала дешевле)</option>
              <option value="placesDesc">По количеству бюджетных мест</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Results List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Filter className="w-4 h-4 text-brand-600" />
              <span>Параметры поиска</span>
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-brand-600 hover:text-brand-800 font-semibold"
              >
                Сбросить ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Search by name input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Название или аббревиатура</label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="МГУ, ВШЭ, Бауманка..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* City selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Город</label>
            <select
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setSelectedCity(e.target.value);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              {CITIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Domain Category pills */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Направление</label>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedTag('')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedTag === '' ? 'bg-brand-500 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Все
              </button>
              {EDUCATIONAL_DOMAINS.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedTag(selectedTag === d.slug ? '' : d.slug)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedTag === d.slug ? 'bg-brand-500 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes: Features */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Особенности вуза</label>
            
            <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyBudget}
                onChange={(e) => setOnlyBudget(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Только с бюджетными местами</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasHostelOnly}
                onChange={(e) => setHasHostelOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Есть общежитие</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hasMilitaryOnly}
                onChange={(e) => setHasMilitaryOnly(e.target.checked)}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
              />
              <span>Военная кафедра</span>
            </label>
          </div>

          {/* Score range */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">Макс. балл на бюджет:</span>
              <span className="font-bold text-brand-600">{maxScoreFilter}</span>
            </div>
            <input
              type="range"
              min={200}
              max={310}
              step={5}
              value={maxScoreFilter}
              onChange={(e) => setMaxScoreFilter(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>

          {/* Tuition range */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">Обучение до:</span>
              <span className="font-bold text-brand-600">{(maxTuitionFilter / 1000).toFixed(0)} тыс. ₽</span>
            </div>
            <input
              type="range"
              min={150000}
              max={800000}
              step={25000}
              value={maxTuitionFilter}
              onChange={(e) => setMaxTuitionFilter(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
          </div>
        </aside>

        {/* Results List */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-4">
          {filteredInstitutions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-800">По вашему запросу ничего не найдено</h2>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Попробуйте изменить параметры фильтрации или сбросить настройки для просмотра всех доступных вузов.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                Сбросить все фильтры
              </button>
            </div>
          ) : (
            filteredInstitutions.map(inst => {
              const isFav = isFavorite(inst.id);
              const isComp = isCompared(inst.id);

              return (
                <div
                  key={inst.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 hover:shadow-card-hover hover:border-brand-300 transition-all space-y-4"
                >
                  {/* Top line: emblem, title, rating, actions */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${inst.logoBg} text-white font-black text-sm flex items-center justify-center tracking-wider shadow-md shrink-0`}>
                        {inst.logoLetter}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 inline-flex items-center gap-1">
                            <Award className="w-3 h-3 text-amber-600" />
                            #{inst.ratingRaex} RAEX
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {inst.city} {inst.metro && `• м. ${inst.metro.split('/')[0]}`}
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                          <Link href={`/vuz/${inst.id}`} className="hover:text-brand-600 transition-colors">
                            {inst.name}
                          </Link>
                        </h2>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => toggleCompare(inst.id)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isComp 
                            ? 'bg-brand-50 border-brand-300 text-brand-600' 
                            : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                        title="Сравнить вуз"
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(inst.id)}
                        className={`p-2.5 rounded-xl border transition-colors ${
                          isFav 
                            ? 'bg-rose-50 border-rose-300 text-rose-500' 
                            : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-50'
                        }`}
                        title="Сохранить в избранное"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {inst.description}
                  </p>

                  {/* Metrics bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-100 bg-slate-50/50 rounded-xl px-4">
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Проходной балл (бюджет)</span>
                      <span className="text-sm font-black text-slate-800">
                        {inst.minBudgetScore !== null ? `от ${inst.minBudgetScore}` : 'Уточняется'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Стоимость обучения</span>
                      <span className="text-sm font-black text-slate-800">
                        {inst.tuitionFeeFrom !== null ? `от ${(inst.tuitionFeeFrom / 1000).toFixed(0)} тыс. ₽` : 'Уточняется'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Бюджетных мест</span>
                      <span className="text-sm font-black text-slate-800">
                        {inst.budgetPlacesCount !== null ? `${inst.budgetPlacesCount}` : '—'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-medium">Программ обучения</span>
                      <span className="text-sm font-black text-brand-600">{inst.programsCount}</span>
                    </div>
                  </div>

                  {/* Bottom tags & Detail button */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {inst.hasHostel && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                          Общежитие
                        </span>
                      )}
                      {inst.isMilitaryChair && (
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium">
                          Военная кафедра
                        </span>
                      )}
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        Государственный вуз
                      </span>
                    </div>

                    <Link
                      href={`/vuz/${inst.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      <span>Программы и поступление</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </main>
      </div>

    </div>
  );
}

export default function VuzCatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Загрузка каталога вузов...</div>}>
      <VuzCatalogContent />
    </Suspense>
  );
}

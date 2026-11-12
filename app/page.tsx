'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { 
  INSTITUTIONS, 
  EDUCATIONAL_DOMAINS, 
  OPEN_DAY_EVENTS, 
  ARTICLES,
  CITIES 
} from '@/lib/data';
import { 
  Search, 
  Calculator, 
  Sparkles, 
  Award, 
  Calendar, 
  ArrowRight, 
  Compass, 
  Heart, 
  Scale, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Flame,
  Code,
  HeartPulse,
  Cpu,
  Palette,
  Shield,
  School,
  Laptop,
  Globe
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { selectedCity, selectedCityName, setIsCityModalOpen, toggleFavorite, isFavorite, toggleCompare, isCompared } = useApp();

  // Hero state
  const [activeTab, setActiveTab] = useState<'vuz' | 'college' | 'school' | 'courses' | 'prof'>('vuz');
  const [heroSearch, setHeroSearch] = useState('');

  // EGE Calculator state
  const [egeScores, setEgeScores] = useState<{ [subject: string]: number }>({
    russian: 78,
    math: 82,
    informatics: 86,
    social: 0,
    physics: 0,
    chemistry: 0,
    biology: 0,
    foreign: 0,
  });

  const totalCalculatedScore = Object.values(egeScores).reduce((acc, curr) => acc + (curr > 0 ? curr : 0), 0);

  // Rankings category filter
  const [rankingCategory, setRankingCategory] = useState<'all' | 'tech' | 'econ' | 'med'>('all');

  const filteredInstitutions = INSTITUTIONS.filter(inst => {
    if (selectedCity !== 'all') {
      const cityObj = CITIES.find(c => c.id === selectedCity);
      if (cityObj && inst.city !== cityObj.name) return false;
    }
    if (rankingCategory === 'tech') return inst.tags.some(t => t.toLowerCase().includes('it') || t.toLowerCase().includes('инженер') || t.toLowerCase().includes('физик'));
    if (rankingCategory === 'econ') return inst.tags.some(t => t.toLowerCase().includes('эконом') || inst.abbreviation.includes('ВШЭ'));
    if (rankingCategory === 'med') return inst.tags.some(t => t.toLowerCase().includes('мед'));
    return true;
  });

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'vuz') {
      router.push(`/vuz?q=${encodeURIComponent(heroSearch)}`);
    } else if (activeTab === 'college') {
      router.push(`/colleges?q=${encodeURIComponent(heroSearch)}`);
    } else if (activeTab === 'school') {
      router.push(`/school?q=${encodeURIComponent(heroSearch)}`);
    } else if (activeTab === 'courses') {
      router.push(`/courses?q=${encodeURIComponent(heroSearch)}`);
    } else {
      router.push(`/prof?q=${encodeURIComponent(heroSearch)}`);
    }
  };

  const domainIcons: { [key: string]: any } = {
    it: Code,
    economics: TrendingUp,
    medicine: HeartPulse,
    engineering: Cpu,
    law: Shield,
    creative: Palette,
    humanities: BookOpen,
    security: ShieldCheck,
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-blue-900 via-brand-800 to-brand-900 text-white">
        {/* Abstract decorative background rings */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full border-[40px] border-white/20 blur-2xl" />
          <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full border-[30px] border-white/20 blur-xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Поступление 2026: обновленные проходные баллы и бюджетные места</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Я хочу поступить
            </h1>
            
            <p className="text-base sm:text-lg text-brand-100/90 leading-relaxed font-normal">
              Найди подходящий университет, рассчитай шансы поступления на бюджет по баллам ЕГЭ и выбери специальность мечты среди 1200+ аккредитованных программ.
            </p>
          </div>

          {/* Hero Search Box Card */}
          <div className="mt-8 bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 text-slate-800 border border-slate-100">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab('vuz')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'vuz'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Вузы
              </button>
              <button
                onClick={() => setActiveTab('college')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'college'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Колледжи
              </button>
              <button
                onClick={() => setActiveTab('school')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'school'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Школы и лицеи
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'courses'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Курсы и ДПО
              </button>
              <button
                onClick={() => setActiveTab('prof')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === 'prof'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Профессии
              </button>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleHeroSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-7 relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'vuz' 
                      ? 'Название вуза, специальность (например: ПМИ, Лечебное дело)...'
                      : activeTab === 'college'
                      ? 'Название колледжа, техникума...'
                      : activeTab === 'school'
                      ? 'Лицей, гимназия, школа с IT или инженерным классом...'
                      : activeTab === 'courses'
                      ? 'Курсы Python, UX/UI дизайн, Data Science, английский...'
                      : 'Название профессии (Data Scientist, Врач, Архитектор)...'
                  }
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 text-sm font-medium text-slate-900 transition-all focus:outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={() => setIsCityModalOpen(true)}
                  className="w-full h-full min-h-[48px] flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="truncate">{selectedCityName}</span>
                  </div>
                  <span className="text-xs text-brand-600 font-semibold shrink-0">Выбрать</span>
                </button>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white rounded-xl text-sm font-bold shadow-lg shadow-brand-600/30 transition-all"
                >
                  <span>Найти</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Pills */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Часто ищут:</span>
              <Link href="/vuz?tag=it" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors">
                IT и программирование
              </Link>
              <Link href="/vuz?tag=medicine" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors">
                Медицинские вузы
              </Link>
              <Link href="/vuz?military=true" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors">
                С военной кафедрой
              </Link>
              <Link href="/vuz?hostel=true" className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors">
                С общежитием
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE EGE SCORE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
                <Calculator className="w-3.5 h-3.5" />
                <span>Калькулятор баллов ЕГЭ</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Узнай, куда ты проходишь на бюджет
              </h2>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                Введите свои реальные или ожидаемые баллы ЕГЭ. Наш алгоритм моментально сравнит их с проходными баллами прошлого года и покажет вузы с высокими шансами зачисления.
              </p>

              {/* Score Display Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Ваша сумма баллов</div>
                  <div className="text-3xl font-black text-amber-400 mt-0.5">{totalCalculatedScore} / 300+</div>
                </div>
                <Link
                  href={`/vuz?maxScore=${totalCalculatedScore > 0 ? totalCalculatedScore : 250}`}
                  className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/20 flex items-center gap-1.5"
                >
                  <span>Подобрать вузы</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Subject Inputs Grid */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
                Укажите баллы по предметам:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: 'russian', label: 'Русский язык' },
                  { key: 'math', label: 'Проф. математика' },
                  { key: 'informatics', label: 'Информатика' },
                  { key: 'social', label: 'Обществознание' },
                  { key: 'physics', label: 'Физика' },
                  { key: 'chemistry', label: 'Химия' },
                  { key: 'biology', label: 'Биология' },
                  { key: 'foreign', label: 'Иностр. язык' },
                ].map(sub => (
                  <div key={sub.key} className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                    <label className="text-[11px] font-medium text-slate-400 block truncate mb-1">
                      {sub.label}
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={egeScores[sub.key] || ''}
                      placeholder="0"
                      onChange={(e) => {
                        const val = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                        setEgeScores(prev => ({ ...prev, [sub.key]: val }));
                      }}
                      className="w-full bg-slate-900 border border-slate-700 text-white font-bold text-sm px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-brand-400"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5. EDUCATIONAL ECOSYSTEM SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Единая экосистема</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Все ступени и форматы образования</h2>
          </div>
          <span className="text-xs text-slate-500">От предпрофильных классов до магистратуры и MBA</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/school"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <School className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-700 mb-1">Школьникам</div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                Школы, лицеи и гимназии
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Рейтинг школ Москвы и России, IT-вертикаль, инженерные и медицинские классы.
              </p>
            </div>
            <div className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-1">
              <span>Смотреть школы</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/courses"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Laptop className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-700 mb-1">Новая профессия</div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                Курсы и IT-профессии
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Программы профессиональной переподготовки с гарантией трудоустройства.
              </p>
            </div>
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 pt-1">
              <span>Каталог курсов</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/master"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-indigo-300 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-700 mb-1">Выпускникам вузов</div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">
                Магистратура и гранты
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Флагманские программы НИУ ВШЭ, МГУ, МФТИ с партнерскими кафедрами.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 flex items-center gap-1 pt-1">
              <span>Программы магистратуры</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/for-teachers"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-purple-700 mb-1">Педагогам и тьюторам</div>
              <h3 className="font-bold text-base text-slate-900 group-hover:text-purple-700 transition-colors">
                Платформа для репетиторов
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Онлайн-доска, официальный банк заданий ФИПИ, CRM учеников и приём оплат.
              </p>
            </div>
            <div className="text-xs font-bold text-purple-600 flex items-center gap-1 pt-1">
              <span>Для преподавателей</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. EDUCATIONAL DOMAINS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Направления обучения</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Каталог по специальностям</h2>
          </div>
          <Link href="/vuz" className="text-sm font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
            <span>Все направления</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EDUCATIONAL_DOMAINS.map(domain => {
            const IconComponent = domainIcons[domain.slug] || Code;
            return (
              <Link
                key={domain.id}
                href={`/vuz?tag=${domain.slug}`}
                className="group p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-brand-500/40 hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${domain.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-full text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                    {domain.count} вузов
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors text-base leading-snug">
                    {domain.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Программы бакалавриата и магистратуры</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. TOP UNIVERSITIES IN RANKINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Национальный рейтинг 2026</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Лучшие вузы России</h2>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {[
              { id: 'all', label: 'Все вузы' },
              { id: 'tech', label: 'Технические / IT' },
              { id: 'econ', label: 'Экономические' },
              { id: 'med', label: 'Медицинские' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRankingCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  rankingCategory === tab.id
                    ? 'bg-white text-brand-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Institution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstitutions.slice(0, 6).map(inst => {
            const isFav = isFavorite(inst.id);
            const isComp = isCompared(inst.id);

            return (
              <div
                key={inst.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-brand-300 hover:shadow-card-hover transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-4">
                  {/* Top Bar with Emblem & Actions */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl ${inst.logoBg} text-white font-black text-xs flex items-center justify-center tracking-wider shadow-md shrink-0`}>
                        {inst.logoLetter}
                      </div>
                      <div>
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 inline-flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-600" />
                          #{inst.ratingRaex} в рейтинге
                        </span>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{inst.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleCompare(inst.id, inst.abbreviation)}
                        className={`p-2 rounded-xl transition-colors ${
                          isComp ? 'bg-brand-50 text-brand-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                        title="Сравнить"
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(inst.id, inst.abbreviation)}
                        className={`p-2 rounded-xl transition-colors ${
                          isFav ? 'bg-rose-50 text-rose-500' : 'text-slate-400 hover:text-rose-500 hover:bg-slate-50'
                        }`}
                        title="В избранное"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* University Name */}
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-600 transition-colors">
                      <Link href={`/vuz/${inst.id}`}>
                        {inst.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {inst.description}
                    </p>
                  </div>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[11px]">Балл на бюджет</span>
                      <span className="font-black text-slate-800 text-sm">
                        {inst.minBudgetScore !== null ? `от ${inst.minBudgetScore}` : 'Уточняется'}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-slate-400 block text-[11px]">Обучение в год</span>
                      <span className="font-black text-slate-800 text-sm">
                        {inst.tuitionFeeFrom !== null ? `от ${(inst.tuitionFeeFrom / 1000).toFixed(0)} тыс. ₽` : 'Уточняется'}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
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
                      {inst.budgetPlacesCount !== null ? `${inst.budgetPlacesCount} мест` : 'По запросу'}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {inst.programsCount} программ
                  </span>
                  <Link
                    href={`/vuz/${inst.id}`}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Подробнее</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/vuz"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-md transition-colors"
          >
            <span>Смотреть все вузы в каталоге</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. CAREER GUIDANCE TEST TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
              <Compass className="w-4 h-4" />
              <span>Бесплатный онлайн-тест</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Не знаешь, кем стать? Пройди тест на профориентацию
            </h2>
            
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">
              Ответь на 10 простых вопросов за 5 минут. Наш психологический тест определит ваши сильные стороны и составит персональный список подходящих профессий и вузов.
            </p>

            <div className="pt-2">
              <Link
                href="/proftest"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-orange-600 hover:bg-orange-50 text-sm font-black shadow-lg transition-transform active:scale-95"
              >
                <span>Начать тест бесплатно</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. UPCOMING OPEN DOORS DAYS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">События для абитуриентов</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Дни открытых дверей</h2>
          </div>
          <span className="text-xs text-slate-500">Встречи с ректорами, деканами и экскурсии по лабораториям</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {OPEN_DAY_EVENTS.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:shadow-card-hover transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    event.format === 'очно' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {event.format === 'очно' ? 'Очно в кампусе' : 'Онлайн-трансляция'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{event.city}</span>
                </div>

                <div className="flex items-center gap-2 text-brand-600 font-black text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}, {event.time}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  {event.institutionName}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  href={event.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-brand-50 hover:text-brand-700 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Зарегистрироваться</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ARTICLES & ADMISSION JOURNAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Полезные советы</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Журнал поступления</h2>
          </div>
          <Link href="/journal" className="text-sm font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
            <span>Все статьи</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map(art => (
            <Link
              key={art.id}
              href={`/journal/${art.slug}`}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-brand-300 hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-brand-600 px-2 py-0.5 rounded-md bg-brand-50">
                    {art.category}
                  </span>
                  <span>{art.readTimeMinutes} мин чтения</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-brand-600 transition-colors">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>{art.date}</span>
                <span className="font-semibold text-brand-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Читать
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

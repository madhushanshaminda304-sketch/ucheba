'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { INSTITUTIONS, getProgramsByInstitutionId, getProfessionById } from '@/lib/data';
import { 
  Award, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Heart, 
  Scale, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Building2, 
  Home, 
  MessageSquare,
  Users,
  Briefcase
} from 'lucide-react';

export default function UniversityDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { toggleFavorite, isFavorite, toggleCompare, isCompared } = useApp();

  const inst = INSTITUTIONS.find(i => i.id === id);
  if (!inst) {
    notFound();
  }

  const universityPrograms = getProgramsByInstitutionId(inst.id);
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'admission' | 'dormitory' | 'reviews'>('overview');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [reviewSent, setReviewSent] = useState(false);
  const [questionText, setQuestionText] = useState('');

  const isFav = isFavorite(inst.id, 'institution');
  const isComp = isCompared(inst.id, 'institution');

  const filteredPrograms = universityPrograms.filter(p => {
    if (programFilter === 'all') return true;
    return p.fieldId === programFilter;
  });

  return (
    <div className="space-y-8 pb-20">
      
      {/* 1. HERO HEADER */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/vuz" className="hover:text-brand-600 transition-colors">Вузы</Link>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-sm">{inst.abbreviation}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${inst.logoBg} text-white font-black text-xl sm:text-2xl flex items-center justify-center tracking-widest shadow-xl shrink-0`}>
                {inst.logoLetter}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200/80 inline-flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    #{inst.ratingRaex} в рейтинге вузов России (RAEX)
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    Основан в {inst.foundYear} г.
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700">
                    Государственный
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {inst.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-brand-600" />
                    г. {inst.city}, {inst.address} {inst.metro && `(м. ${inst.metro})`}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => toggleCompare({ type: 'institution', id: inst.id, title: inst.name, subtitle: `${inst.city} • Вуз` }, inst.abbreviation)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isComp 
                    ? 'bg-brand-50 border-brand-300 text-brand-700 shadow-sm' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{isComp ? 'В сравнении' : 'Сравнить'}</span>
              </button>

              <button
                onClick={() => toggleFavorite({ type: 'institution', id: inst.id, title: inst.name, subtitle: `${inst.city} • Вуз` }, inst.abbreviation)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  isFav 
                    ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-sm' 
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isFav ? 'В избранном' : 'Сохранить'}</span>
              </button>

              <a
                href={inst.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Сайт вуза</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div>
              <span className="text-xs text-slate-500 block font-medium">Проходной балл (бюджет)</span>
              <span className="text-xl font-black text-slate-900">
                {inst.minBudgetScore !== null ? `от ${inst.minBudgetScore}` : 'Уточняется'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block font-medium">Стоимость обучения</span>
              <span className="text-xl font-black text-slate-900">
                {inst.tuitionFeeFrom !== null ? `от ${(inst.tuitionFeeFrom / 1000).toFixed(0)} тыс. ₽` : 'Уточняется'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block font-medium">Бюджетных мест</span>
              <span className="text-xl font-black text-slate-900">
                {inst.budgetPlacesCount !== null ? inst.budgetPlacesCount : '—'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block font-medium">Программ высшего образования</span>
              <span className="text-xl font-black text-brand-600">{inst.programsCount}</span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto border-t border-slate-100 pt-3">
            {[
              { id: 'overview', label: 'Обзор вуза', icon: Building2 },
              { id: 'programs', label: `Программы (${universityPrograms.length || inst.programsCount})`, icon: BookOpen },
              { id: 'admission', label: 'Условия поступления', icon: ShieldCheck },
              { id: 'dormitory', label: 'Общежитие и кампус', icon: Home },
              { id: 'reviews', label: `Отзывы (${inst.reviewsCount})`, icon: MessageSquare },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 2. TAB CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              
              {/* Description Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Об университете</h2>
                <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                  {inst.description}
                </p>
                {inst.campusDescription && (
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base pt-2">
                    {inst.campusDescription}
                  </p>
                )}
              </div>

              {/* Key Advantages */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Преимущества обучения</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inst.advantages.map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-800 font-medium leading-snug">{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Features */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">Инфраструктура и статус</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-400 block font-medium">Общежитие</span>
                    <span className="text-sm font-bold text-slate-800">{inst.hasHostel ? 'Предоставляется' : 'Нет'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-400 block font-medium">Военная кафедра</span>
                    <span className="text-sm font-bold text-slate-800">{inst.isMilitaryChair ? 'Есть ВУЦ' : 'Отсутствует'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs text-slate-400 block font-medium">Форма собственности</span>
                    <span className="text-sm font-bold text-slate-800">{inst.isState ? 'Государственный' : 'Частный'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar: Contacts & Admission Office */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-slate-900">Приёмная комиссия</h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{inst.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                    <span>{inst.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Globe className="w-4 h-4 text-brand-600 shrink-0" />
                    <a href={inst.website} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                      Официальный сайт
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                  <div><strong>Лицензия:</strong> {inst.license}</div>
                  <div><strong>Аккредитация:</strong> {inst.accreditation}</div>
                </div>
              </div>

              {/* Quiz Banner */}
              <div className="bg-gradient-to-br from-brand-600 to-blue-800 text-white rounded-2xl p-6 space-y-3 shadow-md">
                <h4 className="font-bold text-base leading-snug">Подходит ли вам {inst.abbreviation}?</h4>
                <p className="text-xs text-brand-100 leading-relaxed">
                  Пройдите быстрый тест и узнайте, совпадает ли ваш психотип с выпускниками этого университета.
                </p>
                <Link
                  href="/proftest"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-brand-700 rounded-xl text-xs font-bold shadow transition-all hover:bg-brand-50"
                >
                  <span>Пройти тест</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROGRAMS */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            {/* Filter buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setProgramFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  programFilter === 'all' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Все программы ({universityPrograms.length})
              </button>
              <button
                onClick={() => setProgramFilter('it')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  programFilter === 'it' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Информационные технологии
              </button>
              <button
                onClick={() => setProgramFilter('economics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  programFilter === 'economics' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Экономика
              </button>
              <button
                onClick={() => setProgramFilter('medicine')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  programFilter === 'medicine' ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Медицина
              </button>
            </div>

            {/* Programs List */}
            {filteredPrograms.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                По данному фильтру программы не найдены.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPrograms.map(prog => (
                  <div
                    key={prog.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card-hover transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono">
                            {prog.code}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                            {prog.degreeLevel === 'bachelor' ? 'Бакалавриат' : prog.degreeLevel === 'specialist' ? 'Специалитет' : 'Магистратура'}
                          </span>
                          <span className="text-xs text-slate-400">
                            {prog.durationYears} года обучения (Очно)
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">
                          {prog.name}
                        </h3>
                      </div>

                      <div className="text-right sm:text-right">
                        <span className="text-xs text-slate-400 block font-medium">Стоимость в год</span>
                        <span className="text-lg font-black text-slate-800">
                          {prog.tuitionPerYear !== null ? `${(prog.tuitionPerYear / 1000).toFixed(0)} тыс. ₽` : 'Уточняется'}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Requirements & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Балл на бюджет:</span>
                        <span className="font-bold text-slate-800 text-sm">
                          {prog.minScoreBudget !== null ? `${prog.minScoreBudget} баллов` : 'Не указан'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Бюджетных мест:</span>
                        <span className="font-bold text-slate-800 text-sm">
                          {prog.budgetPlaces !== null ? `${prog.budgetPlaces} мест` : 'По запросу'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Экзамены ЕГЭ:</span>
                        <span className="font-medium text-slate-800 truncate block">
                          {prog.subjectsRequired.join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-slate-500">
                        <strong>Кем работать:</strong>{' '}
                        {prog.careers.length > 0
                          ? prog.careers.map(cId => getProfessionById(cId)?.title ?? cId).join(', ')
                          : 'Уточняется в описании профиля'}
                      </div>
                      <Link
                        href={`/program/${prog.id}`}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 shrink-0"
                      >
                        <span>Подробнее</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ADMISSION */}
        {activeTab === 'admission' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Правила и этапы поступления 2026</h2>
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Поступление в {inst.name} осуществляется на конкурсной основе в соответствии с правилами приема Министерства науки и высшего образования РФ.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-brand-600 font-black text-sm">20 июня 2026</div>
                  <div className="font-bold text-slate-800 text-sm">Старт приема документов</div>
                  <div className="text-xs text-slate-500">Подача через Госуслуги или личный кабинет абитуриента</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-brand-600 font-black text-sm">25 июля 2026</div>
                  <div className="font-bold text-slate-800 text-sm">Окончание приема документов</div>
                  <div className="text-xs text-slate-500">Завершение приема заявлений от поступающих по ЕГЭ</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="text-brand-600 font-black text-sm">3–9 августа 2026</div>
                  <div className="font-bold text-slate-800 text-sm">Приказы о зачислении</div>
                  <div className="text-xs text-slate-500">Публикация приказов о зачислении на бюджет</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs sm:text-sm text-blue-900 space-y-1 mt-6">
                <strong>Учет индивидуальных достижений (до 10 дополнительных баллов):</strong>
                <ul className="list-disc pl-5 space-y-1 pt-1 text-xs">
                  <li>Аттестат с отличием (золотая или серебряная медаль) — до 5 баллов</li>
                  <li>Золотой значок ГТО соответствующей возрастной ступени — 2 балла</li>
                  <li>Победители и призеры профильных олимпиад школьников — до 10 баллов или БВИ</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DORMITORY */}
        {activeTab === 'dormitory' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Общежития и студенческий городок</h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {inst.dormitoryInfo || 'Университет предоставляет места в студенческих общежитиях блочного и коридорного типа всем иногородним студентам очной формы обучения, поступившим как на бюджетные, так и на платные места.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 block font-medium">Стоимость проживания</span>
                <span className="text-base font-bold text-slate-800">от 950 до 3 200 ₽/мес.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 block font-medium">Оснащение</span>
                <span className="text-base font-bold text-slate-800">Wi-Fi, прачечные, спортзал</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-400 block font-medium">Безопасность</span>
                <span className="text-base font-bold text-slate-800">Электронный пропуск, охрана 24/7</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Отзывы студентов и выпускников</h2>
                  <p className="text-xs text-slate-500 mt-1">Основано на {inst.reviewsCount} проверенных отзывах</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl font-black text-brand-600">{inst.ratingScore}</div>
                  <div className="text-xs text-slate-500">
                    <div>Общий рейтинг</div>
                    <div className="text-amber-500 font-bold">★★★★★</div>
                  </div>
                </div>
              </div>

              {/* Sample Review Cards */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Александр, выпускник факультета ВМК</span>
                    <span className="text-slate-400">2 недели назад</span>
                  </div>
                  <div className="text-amber-500 text-xs">★★★★★</div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    «Уровень математической и алгоритмической подготовки просто космический. Преподаватели требуют строго, но после 3 курса офферы в топовые IT-компании пришли сами собой.»
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">Мария, студентка 3 курса</span>
                    <span className="text-slate-400">1 месяц назад</span>
                  </div>
                  <div className="text-amber-500 text-xs">★★★★★</div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    «Потрясающая академическая атмосфера, библиотека и кампус. Общежитие отремонтировано, до метро 10 минут пешком. Поступать было сложно, но оно того стоило на 100%.»
                  </p>
                </div>
              </div>

              {/* Ask / Review Form */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-2">Задать вопрос о вузе или оставить отзыв</h3>
                {reviewSent ? (
                  <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Спасибо! Ваше сообщение отправлено и появится после модерации.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <textarea
                      rows={3}
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Напишите ваш вопрос приёмной комиссии или студентам..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                    <button
                      onClick={() => {
                        if (questionText.trim()) setReviewSent(true);
                      }}
                      className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                    >
                      Отправить вопрос
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { COLLEGES } from '@/lib/data';
import { 
  School, 
  MapPin, 
  Phone, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  FileText,
  Calendar,
  Home
} from 'lucide-react';

export default function CollegeDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const college = COLLEGES.find(c => c.id === id);
  if (!college) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <Link href="/colleges" className="hover:text-brand-600 transition-colors">Колледжи</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-sm">{college.abbreviation}</span>
      </nav>

      {/* Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              Государственный колледж
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
              Основан в {college.foundYear} г.
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
              г. {college.city}
            </span>
          </div>

          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Официальный сайт</span>
          </a>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {college.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
            <span>г. {college.city}, {college.address} {college.metro && `(м. ${college.metro})`}</span>
          </p>
        </div>

        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {college.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Средний балл аттестата</span>
            <span className="text-xl font-black text-slate-900">{college.averageGpaBudget} из 5.0</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Стоимость обучения</span>
            <span className="text-xl font-black text-slate-900">от {(college.tuitionPerYear / 1000).toFixed(0)} тыс. ₽</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Бюджетных мест</span>
            <span className="text-xl font-black text-slate-900">{college.budgetPlaces} мест</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Общежитие</span>
            <span className="text-xl font-black text-slate-900">{college.hasHostel ? 'Есть' : 'Нет'}</span>
          </div>
        </div>
      </div>

      {/* Specialties list */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Специальности СПО</div>
          <h2 className="text-2xl font-black text-slate-900">Программы подготовки специалистов</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Обучение после 9 и 11 классов с выдачей государственного диплома
          </p>
        </div>

        <div className="space-y-3">
          {college.specialties.map((spec, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-bold text-slate-900 text-sm">{spec}</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-600 font-medium shrink-0">
                3 г. 10 мес. (после 9 кл.)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Admission Rules for College */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600 mb-1">Приём 2026</div>
          <h2 className="text-2xl font-black text-slate-900">Как поступить в колледж</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-brand-600 block">1. Без экзаменов и ОГЭ</span>
            <p className="text-xs text-slate-600">
              Зачисление в колледж проводится исключительно по конкурсу среднего балла школьного аттестата. Экзамены ОГЭ/ЕГЭ не требуются.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-brand-600 block">2. Подача документов</span>
            <p className="text-xs text-slate-600">
              С 20 июня по 15 августа через региональный портал Госуслуг или лично в приёмную комиссию колледжа.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="font-bold text-brand-600 block">3. Переход в вуз</span>
            <p className="text-xs text-slate-600">
              После окончания колледжа выпускники могут поступить в профильный университет по внутренним экзаменам вуза без сдачи ЕГЭ.
            </p>
          </div>
        </div>
      </div>

      {/* Contacts footer */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base sm:text-lg">Контакты приёмной комиссии</h3>
          <span className="text-xs text-slate-400 block mt-0.5">{college.phone} • {college.address}</span>
        </div>
        <a
          href={college.website}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold shrink-0 text-center transition-all shadow-md"
        >
          Подать заявление онлайн
        </a>
      </div>

    </div>
  );
}

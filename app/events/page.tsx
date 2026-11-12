'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { OPEN_DAY_EVENTS, CITIES, INSTITUTIONS } from '@/lib/data';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  X, 
  Search,
  BellRing
} from 'lucide-react';

export default function EventsCalendarPage() {
  const { selectedCity, setSelectedCity, showToast } = useApp();
  const [cityFilter, setCityFilter] = useState(selectedCity);
  const [formatFilter, setFormatFilter] = useState<'all' | 'онлайн' | 'очно'>('all');
  const [search, setSearch] = useState('');
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  useEffect(() => {
    setCityFilter(selectedCity);
  }, [selectedCity]);

  const filteredEvents = useMemo(() => {
    return OPEN_DAY_EVENTS.filter(ev => {
      if (search.trim()) {
        const q = search.toLowerCase();
        if (!ev.title.toLowerCase().includes(q) && !ev.institutionName.toLowerCase().includes(q)) return false;
      }
      if (cityFilter !== 'all') {
        const cityObj = CITIES.find(c => c.id === cityFilter);
        if (cityObj && ev.city !== cityObj.name) return false;
      }
      if (formatFilter !== 'all' && ev.format !== formatFilter) return false;
      return true;
    });
  }, [search, cityFilter, formatFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Дни открытых дверей</span>
      </nav>

      {/* Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Календарь абитуриента 2026</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Дни открытых дверей в университетах России
        </h1>
        <p className="text-sm text-slate-500 max-w-3xl">
          Лично познакомьтесь с преподавателями, ректорами и студентами, посетите научные лаборатории кампусов и узнайте подробности поступления 2026 года из первых уст.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Поиск по вузу или теме мероприятия..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="md:col-span-3">
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

          <div className="md:col-span-3">
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-brand-500 cursor-pointer"
            >
              <option value="all">Все форматы участия</option>
              <option value="очно">Очно в кампусе</option>
              <option value="онлайн">Онлайн-трансляция</option>
            </select>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                  event.format === 'очно' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {event.format === 'очно' ? <Building2 className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                  <span>{event.format === 'очно' ? 'Очный день открытых дверей' : 'Онлайн-стрим с деканатом'}</span>
                </span>

                <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {event.city}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 text-brand-600 font-black text-sm mb-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date} • {event.time}</span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {event.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  {event.institutionName}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                <div><strong>Место проведения:</strong> {event.location}</div>
                <div><strong>Программа:</strong> Презентация программ бакалавриата, правила приёма 2026, консультации с экспертами ЕГЭ.</div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                href={`/vuz/${event.institutionId}`}
                className="text-xs font-bold text-slate-600 hover:text-brand-600 transition-colors"
              >
                О вузе
              </Link>

              {registeredEventId === event.id ? (
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Вы зарегистрированы!</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setRegisteredEventId(event.id);
                    showToast(`Демо-регистрация на «${event.title}» сохранена локально. Официальная ссылка: ${event.registrationUrl}`, 'info');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-brand-500/20 inline-flex items-center gap-1.5"
                >
                  <BellRing className="w-3.5 h-3.5" />
                  <span>Зарегистрироваться бесплатно</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

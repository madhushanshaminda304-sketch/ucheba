'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Award, 
  PhoneCall, 
  ArrowRight, 
  Clock, 
  HelpCircle,
  FileCheck,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function AdmissionSupportPage() {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      setSubmitted(true);
      showToast('Демо-заявка сформирована (сохранена локально). Контакт: +7 (800) 200-84-42', 'info');
    }
  };

  const tariffs = [
    {
      title: 'Базовый',
      price: '14 900 ₽',
      popular: false,
      description: 'Идеально для тех, кто уже знает свои баллы и хочет избежать ошибок при расстановке приоритетов.',
      features: [
        'Аудит баллов ЕГЭ и индивидуальных достижений',
        'Подбор индивидуального списка из 5 вузов и направлений',
        'Оптимальная расстановка приоритетов зачисления',
        '1 консультация с ведущим экспертом по поступлению'
      ]
    },
    {
      title: 'Оптимальный',
      price: '29 900 ₽',
      popular: true,
      description: 'Полное сопровождение с личным экспертом на протяжении всей приемной кампании.',
      features: [
        'Всё из тарифа «Базовый»',
        'Личный эксперт на связи 7 дней в неделю в Telegram/WhatsApp',
        'Проверка всех документов и контроль подачи через Госуслуги',
        'Ежедневный мониторинг конкурсных списков в дни зачисления',
        'Стратегическое перераспределение согласий в критические часы'
      ]
    },
    {
      title: 'Премиум под ключ',
      price: '49 900 ₽',
      popular: false,
      description: 'Максимальный уровень надежности с финансовой гарантией поступления на бюджет по договору.',
      features: [
        'Всё из тарифа «Оптимальный»',
        'Финансовая гарантия поступления на бюджет по договору',
        'Персональный куратор — действующий член приемной комиссии вуза',
        'Помощь с апелляциями и олимпиадами',
        'Помощь в оформлении образовательного кредита с господдержкой 3%'
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-brand-950 to-blue-900 text-white pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex items-center gap-2 text-xs text-brand-200/80 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-white font-bold">Сопровождение при поступлении</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Приемная кампания 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Экспертное сопровождение при поступлении в вуз
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Поможем поступить на бюджет в желаемый университет без стресса, очередей и риска потерять год. Проанализируем конкурсные списки и подберем выигрышную стратегию приоритетов.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">98.4%</div>
                  <div className="text-xs text-slate-400 mt-1">Поступили на бюджет</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">4 200+</div>
                  <div className="text-xs text-slate-400 mt-1">Семей доверились нам</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
                  <div className="text-xs text-slate-400 mt-1">Официальный договор</div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Form Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
              {submitted ? (
                <div className="text-center py-6 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-brand-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    <span>Демонстрационный режим</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Форма зафиксирована локально</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    В данном экспериментальном интерфейсе персональные данные не отправляются на внешний сервер. Для официальной консультации используйте прямые контакты:
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
                    <div>Информационный центр: <strong>+7 (800) 200-84-42</strong></div>
                    <div>Email приёмной комиссии: <strong>priem@ucheba.ru</strong></div>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-brand-600 hover:underline pt-2 block mx-auto"
                  >
                    ← Заполнить другую заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Бесплатная диагностика шансов</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Оставьте контакты, чтобы эксперт рассчитал ваши вероятности поступления
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Номер телефона</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Целевой город поступления</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500 cursor-pointer"
                    >
                      <option value="Москва">Москва</option>
                      <option value="Санкт-Петербург">Санкт-Петербург</option>
                      <option value="Казань">Казань</option>
                      <option value="Новосибирск">Новосибирск</option>
                      <option value="Другой">Другой регион РФ</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Записаться на разбор</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных (152-ФЗ)
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Методология</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Как мы приводим к бюджету</h2>
          <p className="text-sm text-slate-500">Четыре последовательных шага, исключающих риск непоступления</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Глубокий аудит баллов',
              desc: 'Оцениваем ваши реальные баллы ЕГЭ, олимпиады и достижения. Сверяем с конкурсом прошлых лет.'
            },
            {
              step: '02',
              title: 'Стратегия 5 вузов',
              desc: 'Формируем сбалансированную пирамиду: 2 вуза мечты, 2 реалистичных варианта и 1 надёжная страховка.'
            },
            {
              step: '03',
              title: 'Подача через Госуслуги',
              desc: 'Помогаем загрузить документы без ошибок, подтвердить электронный оригинал и выставить приоритеты.'
            },
            {
              step: '04',
              title: 'Мониторинг до приказа',
              desc: 'Анализируем конкурсные списки в режиме реального времени. Переставляем согласия в решающие часы.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3 relative">
              <span className="text-3xl font-black text-brand-100">{item.step}</span>
              <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. TARIFFS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Тарифы</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Выберите подходящий формат поддержки</h2>
          <p className="text-sm text-slate-500">Фиксированная стоимость без скрытых доплат</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tariffs.map((t, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative transition-all ${
                t.popular 
                  ? 'bg-gradient-to-b from-brand-900 to-slate-900 text-white shadow-xl ring-2 ring-brand-500' 
                  : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-500 text-white text-[11px] font-bold uppercase tracking-wider shadow">
                  Самый популярный выбор
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{t.title}</h3>
                  <p className={`text-xs mt-1 leading-relaxed ${t.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                    {t.description}
                  </p>
                </div>

                <div className="text-3xl font-black tracking-tight">{t.price}</div>

                <ul className="space-y-2.5 pt-4 border-t border-slate-100/20 text-xs">
                  {t.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 leading-snug">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${t.popular ? 'text-brand-400' : 'text-brand-600'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => {
                    const el = document.querySelector('form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                    t.popular
                      ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Выбрать этот тариф
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

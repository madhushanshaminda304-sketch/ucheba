'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Clock, 
  CreditCard, 
  Laptop, 
  PenTool, 
  BookOpen, 
  HelpCircle,
  FileCheck,
  Star
} from 'lucide-react';

export default function ForTeachersPage() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Математика',
    experience: '3–5 лет'
  });
  const [submitted, setSubmitted] = useState(false);

  // Demo Task Creator state
  const [demoSubject, setDemoSubject] = useState<'math' | 'rus' | 'inf'>('math');
  const [demoAnswer, setDemoAnswer] = useState('');
  const [demoFeedback, setDemoFeedback] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Заявка на подключение к кабинету репетитора зарегистрирована!', 'success');
  };

  const checkDemoAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoSubject === 'math') {
      if (demoAnswer.trim() === '14' || demoAnswer.trim() === '14.0') {
        setDemoFeedback('Верно! Ответ 14. Балл начислен в журнал ученика.');
      } else {
        setDemoFeedback('Неверно. Правильный ответ: 14. Проверьте дискриминант.');
      }
    } else if (demoSubject === 'rus') {
      if (demoAnswer.trim().toLowerCase() === 'потому что') {
        setDemoFeedback('Правильно! Союз «потому что» образует верное придаточное причины.');
      } else {
        setDemoFeedback('Неверно. Ожидался составной союз причины «потому что».');
      }
    } else {
      if (demoAnswer.trim() === '48') {
        setDemoFeedback('Верно! Значение переменной s равно 48.');
      } else {
        setDemoFeedback('Неверно. Скрипт выдает 48.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Единая рабочая среда преподавателя</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Платформа для репетиторов и онлайн-преподавателей
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Интерактивная онлайн-доска, официальный банк заданий КИМ ФИПИ с автопроверкой, CRM для учёта расписания и приём платежей с комиссией 0%.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#register"
                className="px-8 py-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all text-center"
              >
                Начать преподавать бесплатно
              </a>
              <a
                href="#demo"
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all text-center border border-white/15"
              >
                Попробовать интерактивный банк задач
              </a>
            </div>
          </div>
        </div>

        {/* 4 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <PenTool className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Интерактивная доска</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Бесконечный холст без задержек. Встроенный редактор LaTeX-формул, графиков функций и загрузка PDF-вариантов за секунду.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Банк задач ФИПИ 2026</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Свыше 15 000 верифицированных заданий ЕГЭ и ОГЭ. Автоматическая проверка ответов первой части и официальные критерии для второй.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">CRM и электронный журнал</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Учет посещаемости, наглядный график прогресса каждого ученика и автоматические напоминания о занятиях в Telegram.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Приём платежей (0% комиссии)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ученики платят картой, СБП или по подписке. Фискальные чеки формируются автоматически по 54-ФЗ для самозанятых и ИП.
            </p>
          </div>
        </div>

        {/* Interactive Demo Sandbox */}
        <div id="demo" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Интерактивный симулятор</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                Как ученик решает задания на онлайн-платформе
              </h2>
            </div>

            {/* Subject Selector */}
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => { setDemoSubject('math'); setDemoFeedback(null); setDemoAnswer(''); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  demoSubject === 'math' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Математика профиль
              </button>
              <button
                onClick={() => { setDemoSubject('rus'); setDemoFeedback(null); setDemoAnswer(''); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  demoSubject === 'rus' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Русский язык
              </button>
              <button
                onClick={() => { setDemoSubject('inf'); setDemoFeedback(null); setDemoAnswer(''); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  demoSubject === 'inf' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Информатика
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            {demoSubject === 'math' && (
              <div>
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">Задание №6 (Планиметрия)</span>
                <p className="text-sm text-slate-800 font-medium mt-2">
                  В прямоугольном треугольнике гипотенуза равна 26, а один из катетов равен 24. Найдите второй катет этого треугольника.
                </p>
              </div>
            )}
            {demoSubject === 'rus' && (
              <div>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">Задание №25 (Связь предложений)</span>
                <p className="text-sm text-slate-800 font-medium mt-2">
                  Подберите подчинительный союз причины, который должен стоять на месте пропуска в предложении: «Мы решили отложить поход, (...) синоптики обещали штормовое предупреждение».
                </p>
              </div>
            )}
            {demoSubject === 'inf' && (
              <div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">Задание №6 (Исполнитель Черепаха)</span>
                <p className="text-sm text-slate-800 font-medium mt-2">
                  Исполнитель повторяет 4 раза алгоритм: Вперёд(12), Направо(90). Определите периметр полученной фигуры.
                </p>
              </div>
            )}

            <form onSubmit={checkDemoAnswer} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <input
                type="text"
                placeholder={demoSubject === 'math' ? 'Введите число (например, 14)' : demoSubject === 'rus' ? 'Введите союз' : 'Введите результат'}
                value={demoAnswer}
                onChange={(e) => setDemoAnswer(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                required
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Проверить ответ
              </button>
            </form>

            {demoFeedback && (
              <div className={`p-3.5 rounded-xl text-xs font-semibold ${
                demoFeedback.startsWith('Верно') || demoFeedback.startsWith('Правильно') 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {demoFeedback}
              </div>
            )}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Прозрачные тарифы для педагогов</h2>
            <p className="text-sm text-slate-500">
              Начните с бесплатного тарифа. Подключайте расширенные функции и поток учеников по мере роста нагрузки.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Для старта</span>
                <h3 className="text-xl font-bold text-slate-900">Базовый</h3>
                <div className="text-3xl font-black text-slate-900">0 ₽ <span className="text-xs font-normal text-slate-400">/ навсегда</span></div>
                <ul className="space-y-2.5 text-xs text-slate-600 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>До 5 активных учеников</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Интерактивная доска без лимита времени</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Банк базовых заданий ФИПИ</span>
                  </li>
                </ul>
              </div>

              <a
                href="#register"
                className="w-full py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 font-bold text-xs text-slate-700 text-center block transition-colors"
              >
                Подключить бесплатно
              </a>
            </div>

            {/* Pro */}
            <div className="bg-gradient-to-b from-brand-50/60 to-white rounded-3xl p-6 sm:p-8 border-2 border-brand-500 shadow-lg space-y-5 flex flex-col justify-between relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Самый популярный
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Для профессионалов</span>
                <h3 className="text-xl font-bold text-slate-900">PRO Преподаватель</h3>
                <div className="text-3xl font-black text-slate-900">1 490 ₽ <span className="text-xs font-normal text-slate-400">/ мес</span></div>
                <ul className="space-y-2.5 text-xs text-slate-600 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Неограниченное число учеников и групп</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Все 15 000 заданий ФИПИ с автопроверкой</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Приём платежей по СБП с авточеками</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SMS и Telegram уведомления ученикам</span>
                  </li>
                </ul>
              </div>

              <a
                href="#register"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs text-center block shadow-md shadow-brand-500/20 transition-all"
              >
                Попробовать 14 дней бесплатно
              </a>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-600">С потоком заявок</span>
                <h3 className="text-xl font-bold text-slate-900">Премиум + Лиды</h3>
                <div className="text-3xl font-black text-slate-900">3 990 ₽ <span className="text-xs font-normal text-slate-400">/ мес</span></div>
                <ul className="space-y-2.5 text-xs text-slate-600 pt-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Все преимущества тарифа PRO</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Профиль в топе каталога репетиторов Учёба.ру</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Гарантированный поток заявок от учеников</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Персональный менеджер поддержки</span>
                  </li>
                </ul>
              </div>

              <a
                href="#register"
                className="w-full py-3 rounded-xl border-2 border-purple-200 hover:border-purple-300 font-bold text-xs text-purple-700 text-center block transition-colors"
              >
                Оставить заявку
              </a>
            </div>

          </div>
        </div>

        {/* Registration Form */}
        <div id="register" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Регистрация репетитора</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Заполните анкету за 1 минуту и получите доступ ко всем возможностям платформы
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900">Анкета успешно принята!</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Мы отправили ссылку для входа в кабинет преподавателя на {formData.email || formData.phone}. Добро пожаловать на Учёба.ру!
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                  ФИО преподавателя
                </label>
                <input
                  type="text"
                  placeholder="Иванов Сергей Викторович"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="tutor@mail.ru"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Основной предмет
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option>Математика (профиль/база)</option>
                    <option>Русский язык</option>
                    <option>Информатика и программирование</option>
                    <option>Обществознание</option>
                    <option>Физика</option>
                    <option>Химия и биология</option>
                    <option>Английский язык</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1.5">
                    Опыт преподавания
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option>Менее 2 лет</option>
                    <option>3–5 лет</option>
                    <option>6–10 лет</option>
                    <option>Более 10 лет</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 transition-all"
              >
                Создать кабинет преподавателя
              </button>

              <p className="text-[10px] text-slate-400 text-center">
                Нажимая кнопку, вы принимаете пользовательское соглашение и политику обработки персональных данных.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  ShieldCheck, 
  Mail, 
  Phone,
  Laptop
} from 'lucide-react';

export default function ForClientsPage() {
  const { showToast } = useApp();
  const [instName, setInstName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-16 pb-24">
      
      {/* 1. HERO */}
      <section className="relative bg-slate-950 text-white pt-12 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-white font-bold">Для учебных заведений</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              B2B-решения для университетов и колледжей
            </span>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Всё, что нужно для успешного привлечения абитуриентов
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Учёба.ру — главная точка контакта школьников и их родителей с учебными заведениями. Подключайтесь к единой платформе и получайте целевые заявки на обучение.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">2.4 млн</div>
                <div className="text-xs text-slate-400 mt-0.5">Посетителей в месяц</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-brand-400">850+</div>
                <div className="text-xs text-slate-400 mt-0.5">Вузов-партнеров</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">1.8 млн</div>
                <div className="text-xs text-slate-400 mt-0.5">Заявок абитуриентов</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Целевая аудитория</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-600">Возможности платформы</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Инструменты приёмной комиссии</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Building2,
              title: 'Профиль вуза и каталог программ',
              desc: 'Размещение подробных карточек образовательных программ, направлений бакалавриата, стоимости, правил приема и фотоэкскурсий.'
            },
            {
              icon: Users,
              title: 'Сбор целевых лидов',
              desc: 'Получение контактов мотивированных абитуриентов, выбравших ваши специальности в калькуляторе баллов ЕГЭ.'
            },
            {
              icon: Laptop,
              title: 'Специализированная CRM',
              desc: 'Удобная панель управления заявками, автоматические SMS и Email уведомления абитуриентам о днях открытых дверей.'
            },
            {
              icon: BarChart3,
              title: 'Аналитика спроса в реальном времени',
              desc: 'Сравнительные отчеты: какие специальности наиболее востребованы у поступающих в вашем регионе.'
            },
            {
              icon: TrendingUp,
              title: 'Баннерное продвижение',
              desc: 'Таргетированное размещение промо-баннеров в каталоге вузов по заданным регионам и предметам ЕГЭ.'
            },
            {
              icon: ShieldCheck,
              title: 'Верифицированный статус',
              desc: 'Официальный знак подлинности образовательного учреждения, повышающий доверие абитуриентов и родителей.'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. B2B PARTNERSHIP FORM */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Подключите ваш вуз или колледж к Учёба.ру</h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Оставьте заявку на подключение. Наш B2B-менеджер подготовит индивидуальный медиаплан под вашу приемную кампанию.
            </p>
          </div>

          {sent ? (
            <div className="p-6 bg-blue-50 rounded-2xl text-center space-y-3 text-slate-900 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-brand-600 mx-auto" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-700 text-xs font-bold border border-blue-100">
                <span>Демонстрационный режим</span>
              </div>
              <h4 className="font-bold text-base">Демо-заявка сформирована</h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                В демонстрационном режиме данные сохранены локально на устройстве. Для официального подключения учебного заведения напишите в B2B-отдел:
              </p>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 space-y-1">
                <div>Отдел по работе с вузами: <strong>clients@ucheba.ru</strong></div>
                <div>Телефон для партнеров: <strong>+7 (495) 797-84-42</strong></div>
              </div>
              <button
                onClick={() => setSent(false)}
                className="text-xs font-bold text-brand-600 hover:underline pt-2 block mx-auto"
              >
                ← Заполнить снова
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (instName && contactName && email) {
                  setSent(true);
                  showToast('Демо-заявка зафиксирована локально. Контакт: clients@ucheba.ru', 'info');
                }
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Название учебного заведения</label>
                  <input
                    type="text"
                    required
                    placeholder="МГУ / Колледж связи"
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Контактное лицо (ФИО)</label>
                  <input
                    type="text"
                    required
                    placeholder="Петров Сергей Иванович"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Рабочий Email</label>
                  <input
                    type="email"
                    required
                    placeholder="priem@university.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Рабочий телефон</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (495) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Отправить заявку на подключение
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}

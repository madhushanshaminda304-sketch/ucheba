import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  School, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Calendar, 
  Sliders, 
  Award, 
  ShieldCheck,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function ForAbiturientsPage() {
  const tools = [
    {
      title: 'Вузы России',
      desc: 'Каталог из 1240+ университетов с проходными баллами, бюджетными местами и общежитиями.',
      href: '/vuz',
      icon: GraduationCap,
      color: 'bg-brand-50 text-brand-600 border-brand-200'
    },
    {
      title: 'Колледжи и техникумы',
      desc: 'Среднее профессиональное образование (СПО) после 9 и 11 классов с конкурсом аттестатов.',
      href: '/colleges',
      icon: School,
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      title: 'Школы и лицеи',
      desc: 'Рейтинг общеобразовательных школ Москвы и РФ, профильные классы и вступительные экзамены.',
      href: '/school',
      icon: Award,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Специальности ОКСО',
      desc: 'Официальный классификатор направлений подготовки бакалавриата и специалитета.',
      href: '/speciality',
      icon: BookOpen,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      title: 'Трекер и калькулятор поступления',
      desc: 'Моделирование зачисления по новой 5-приоритетной системе Минобрнауки РФ.',
      href: '/admission-tracker',
      icon: Sliders,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: 'Олимпиады и льготы БВИ',
      desc: 'Перечень олимпиад РСОШ и ВсОШ для поступления без вступительных испытаний.',
      href: '/olympiads',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Дни открытых дверей',
      desc: 'Календарь очных и онлайн-встреч с ректорами, деканами и студентами университетов.',
      href: '/events',
      icon: Calendar,
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    },
    {
      title: 'Онлайн-тренажёр ЕГЭ',
      desc: 'Интерактивная тренировка актуальных заданий КИМ ФИПИ 2026 с мгновенной проверкой.',
      href: '/training',
      icon: Award,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200'
    },
    {
      title: 'Профориентационный тест',
      desc: '10 психометрических вопросов для определения личностного архетипа и подходящих профессий.',
      href: '/proftest',
      icon: Compass,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Hero */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-800 transition-colors">Главная</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">Навигатор абитуриента 2026</span>
          </div>

          <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Все сервисы для поступающих в одном окне</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Поступление в вузы и колледжи 2026
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Полный комплекс инструментов для успешного поступления на бюджет: калькулятор шансов, рейтинги вузов, каталоги программ и официальные правила приёма.
              </p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link
                key={idx}
                href={tool.href}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-400 transition-all space-y-3 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${tool.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-brand-600 pt-2">
                  <span>Перейти в раздел</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

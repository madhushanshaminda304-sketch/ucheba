import React from 'react';
import Link from 'next/link';
import { 
  Laptop, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  Sparkles, 
  Award, 
  TrendingUp, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function ForSpecialistsPage() {
  const sections = [
    {
      title: 'Курсы и ДПО',
      desc: 'Профессиональная переподготовка и повышение квалификации в IT, маркетинге, дизайне и аналитике.',
      href: '/courses',
      icon: Laptop,
      badge: 'Новая профессия',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      title: 'Магистратура',
      desc: 'Второй уровень высшего образования: академические и прикладные программы ведущих университетов.',
      href: '/master',
      icon: GraduationCap,
      badge: 'Бюджет и гранты',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      title: 'MBA и бизнес-школы',
      desc: 'Executive MBA и General MBA для топ-менеджеров, директоров и собственников бизнеса с аккредитацией AMBA.',
      href: '/mba',
      icon: Briefcase,
      badge: 'Лидерство',
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Учёба за рубежом',
      desc: 'Магистерские программы и международные стажировки с полным покрытием расходов стипендиальными фондами.',
      href: '/abroad',
      icon: Globe,
      badge: 'Стипендии',
      color: 'bg-sky-50 text-sky-700 border-sky-200'
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
            <span className="text-slate-800 font-semibold">Для специалистов и продолжающих обучение</span>
          </div>

          <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-indigo-950 rounded-3xl p-6 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="max-w-3xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold border border-white/10">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Карьерный рост и развитие компетенций</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Непрерывное образование для специалистов
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Повышайте квалификацию, осваивайте востребованные IT-профессии, поступайте в магистратуру ведущих технологических вузов или получайте степень MBA.
              </p>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <Link
                key={idx}
                href={sec.href}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${sec.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      {sec.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {sec.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 pt-3 border-t border-slate-100">
                  <span>Перейти в каталог</span>
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

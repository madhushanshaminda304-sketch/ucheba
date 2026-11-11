import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SCHOOLS } from '@/lib/data';
import { 
  School, 
  MapPin, 
  Award, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  BookOpen, 
  ChevronRight, 
  Sparkles, 
  Users, 
  Building,
  ExternalLink
} from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SCHOOLS.map((school) => ({
    id: school.id,
  }));
}

export default async function SchoolDetailPage({ params }: Props) {
  const { id } = await params;
  const school = SCHOOLS.find((s) => s.id === id);

  if (!school) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition-colors">Главная</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/school" className="hover:text-slate-800 transition-colors">Школы и лицеи</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">{school.shortName}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950">
                  № {school.rankingRank} в рейтинге школ России
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  Основана в {school.foundYear} г.
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                  {school.isTuitionFree ? 'Госбюджет (бесплатно)' : 'Частная школа'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {school.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{school.city}, {school.district} • {school.address} (м. {school.metro})</span>
              </p>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                🏆 {school.ratingDepartment}
              </div>
            </div>

            {/* Key stats panel */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-72 shrink-0">
              <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-100 text-center">
                <span className="text-xs text-slate-500 block">Средний балл ЕГЭ</span>
                <span className="text-2xl font-black text-brand-700">{school.averageEgeScore}</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 text-center">
                <span className="text-xs text-slate-500 block">Призёры ВсОШ</span>
                <span className="text-2xl font-black text-amber-800">{school.olympiadWinnersCount}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 text-center">
                <span className="text-xs text-slate-500 block">Учеников</span>
                <span className="text-lg font-bold text-slate-900">{school.studentCount}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 text-center">
                <span className="text-xs text-slate-500 block">Обучение</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">
                  {school.isTuitionFree ? 'Бесплатное' : `${school.tuitionPerMonth?.toLocaleString('ru-RU')} ₽/мес`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main 2 cols: Profile classes & description */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-600" />
                <span>Об учреждении</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {school.description}
              </p>
            </div>

            {/* Profile Classes */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Профильные классы и направления подготовки</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {school.profileClasses.map((prof, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{prof}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Углубленная программа и спецкурсы</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admission Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Правила приёма и вступительные испытания</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {school.admissionExamInfo}
              </p>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                Приём документов в профильные 8–10 классы открывается весной. Рекомендуется участие в олимпиадах перечня РСОШ, которые могут засчитываться в качестве максимального балла на вступительных испытаниях.
              </div>
            </div>

            {/* Clubs and Activities */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Кружки, секции и внеурочная деятельность</span>
              </h2>
              <div className="flex flex-wrap gap-2 pt-1">
                {school.clubs.map((club, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
                  >
                    {club}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right sidebar: Contacts and Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Контакты приемной комиссии
              </h3>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                  <a href={`tel:${school.phone}`} className="font-semibold hover:text-brand-600">
                    {school.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                  <a href={`mailto:${school.email}`} className="font-semibold hover:text-brand-600">
                    {school.email}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-brand-600 shrink-0" />
                  <a href={school.website} target="_blank" rel="noreferrer" className="font-semibold hover:text-brand-600 truncate">
                    {school.website}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={school.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Официальный сайт школы</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-50 to-indigo-50 rounded-3xl p-6 border border-brand-100 space-y-3 text-xs text-brand-900">
              <h4 className="font-bold text-sm text-brand-950">Поступление в профильный класс</h4>
              <p className="leading-relaxed">
                Наши эксперты помогут подготовить портфолио и успешно сдать комплексные вступительные экзамены по математике, физике и информатике.
              </p>
              <Link
                href="/admission-support"
                className="inline-block font-bold text-brand-600 hover:underline pt-1"
              >
                Записаться на консультацию →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

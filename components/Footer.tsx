import React from 'react';
import Link from 'next/link';
import { GraduationCap, ShieldCheck, HeartHandshake, BookOpen, School, Laptop, Globe, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Учёба<span className="text-brand-400">.ру</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Главный образовательный навигатор России. Помогаем абитуриентам выбрать вуз, колледж или школу, подготовиться к ЕГЭ и ОГЭ и построить карьеру.
            </p>
            <div className="space-y-1.5 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Лицензированные учреждения РФ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                <span>Актуальные проходные баллы 2026</span>
              </div>
            </div>
          </div>

          {/* Col 2: Абитуриентам */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Абитуриентам</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/vuz" className="hover:text-white transition-colors">Вузы России</Link>
              </li>
              <li>
                <Link href="/colleges" className="hover:text-white transition-colors">Колледжи и техникумы</Link>
              </li>
              <li>
                <Link href="/school" className="hover:text-white transition-colors text-amber-300 font-semibold">Школы и лицеи</Link>
              </li>
              <li>
                <Link href="/speciality" className="hover:text-white transition-colors">Специальности ОКСО</Link>
              </li>
              <li>
                <Link href="/vuz/rankings" className="hover:text-white transition-colors">Рейтинг вузов RAEX</Link>
              </li>
              <li>
                <Link href="/olympiads" className="hover:text-white transition-colors">Олимпиады и БВИ</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">Дни дверей</Link>
              </li>
              <li>
                <Link href="/admission-tracker" className="hover:text-white transition-colors">Трекер поступления</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Непрерывное образование & Карьера */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Специалистам & MBA</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors text-emerald-400 font-semibold">Курсы профессий и ДПО</Link>
              </li>
              <li>
                <Link href="/master" className="hover:text-white transition-colors">Магистратура ведущих вузов</Link>
              </li>
              <li>
                <Link href="/mba" className="hover:text-white transition-colors">Программы MBA и Сколково</Link>
              </li>
              <li>
                <Link href="/abroad" className="hover:text-white transition-colors text-sky-300 font-semibold">Учёба за рубежом и гранты</Link>
              </li>
              <li>
                <Link href="/prof" className="hover:text-white transition-colors">Каталог профессий</Link>
              </li>
              <li>
                <Link href="/proftest" className="hover:text-white transition-colors">Тест профориентации</Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-white transition-colors">Статьи и гайды</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Подготовка к экзаменам */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Подготовка к ЕГЭ</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/training" className="hover:text-white transition-colors text-amber-400 font-semibold">★ Онлайн-тренажёр ФИПИ</Link>
              </li>
              <li>
                <Link href="/ege/mathematics" className="hover:text-white transition-colors">Профильная математика</Link>
              </li>
              <li>
                <Link href="/ege/russian" className="hover:text-white transition-colors">Русский язык</Link>
              </li>
              <li>
                <Link href="/ege/informatics" className="hover:text-white transition-colors">Информатика и КЕГЭ</Link>
              </li>
              <li>
                <Link href="/ege/physics" className="hover:text-white transition-colors">Физика</Link>
              </li>
              <li>
                <Link href="/ege/social" className="hover:text-white transition-colors">Обществознание</Link>
              </li>
              <li>
                <Link href="/ege/chemistry" className="hover:text-white transition-colors">Химия и биология</Link>
              </li>
              <li>
                <Link href="/ege/english" className="hover:text-white transition-colors">Английский язык</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Преподавателям и Партнерам */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Партнёрам</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/for-teachers" className="hover:text-white transition-colors text-purple-400 font-semibold">Платформа репетиторам</Link>
              </li>
              <li>
                <Link href="/for-clients" className="hover:text-white transition-colors">Вузам и колледжам</Link>
              </li>
              <li>
                <Link href="/admission-support" className="hover:text-white transition-colors">Консалтинг по поступлению</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors">Личный кабинет</Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">Поиск по каталогу</Link>
              </li>
              <li>
                <Link href="/agreement" className="hover:text-white transition-colors">Пользовательское соглашение</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Учёба.ру — Официальный образовательный портал. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <Link href="/agreement" className="hover:text-slate-400 transition-colors">Пользовательское соглашение</Link>
            <Link href="/agreement" className="hover:text-slate-400 transition-colors">Политика конфиденциальности (152-ФЗ)</Link>
            <Link href="/for-clients" className="hover:text-slate-400 transition-colors">Реклама на портале</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

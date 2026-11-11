'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, ArrowLeft } from 'lucide-react';

export default function AgreementPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-brand-600 transition-colors">Главная</Link>
        <span>/</span>
        <span className="text-slate-800 font-bold">Пользовательское соглашение</span>
      </nav>

      {/* Title */}
      <div className="space-y-2 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
          <FileText className="w-3.5 h-3.5" />
          <span>Юридическая информация</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Пользовательское соглашение и политика конфиденциальности
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Редакция от 10 января 2026 года • Действует на всей территории Российской Федерации
        </p>
      </div>

      {/* Legal Text Sections */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900">1. Общие положения</h2>
          <p>
            Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между ООО «Учёба.ру» (далее — «Администрация») и пользователем сети Интернет (далее — «Пользователь») при использовании функционала сайта <strong>ucheba.ru</strong> и всех его поддоменов.
          </p>
          <p>
            Использование сервисов сайта означает полное и безоговорочное принятие Пользователем условий настоящего Соглашения в соответствии со статьей 438 Гражданского кодекса РФ.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">2. Предмет соглашения и предоставляемые сервисы</h2>
          <p>
            Сайт предоставляет Пользователю бесплатный доступ к открытой базе данных высших и средних специальных учебных заведений РФ, калькулятору баллов ЕГЭ, профориентационным тестам, каталогу олимпиад, расписанию дней открытых дверей и образовательным материалам.
          </p>
          <p>
            Справочная информация о проходных баллах, стоимости обучения и наличии бюджетных мест носит ознакомительный характер и основывается на официальных данных приемных комиссий вузов и Минобрнауки РФ.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">3. Обработка персональных данных (152-ФЗ)</h2>
          <p>
            При заполнении любых форм обратной связи (запись на день открытых дверей, консультация по поступлению, пробный урок ЕГЭ) Пользователь дает добровольное согласие на обработку своих персональных данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».
          </p>
          <p>
            Администрация гарантирует конфиденциальность переданных данных и использует их исключительно в целях предоставления запрошенных образовательных консультаций и уведомлений.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">4. Интеллектуальная собственность</h2>
          <p>
            Все материалы, размещенные на Сайте, включая текстовые статьи, аналитические обзоры, дизайн интерфейсов, структуру базы данных и программный код, являются объектами исключительных прав Администрации либо используются с разрешения правообладателей.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">5. Контакты и реквизиты</h2>
          <p className="text-xs text-slate-500">
            ООО «Учёба.ру» • ОГРН 1157746890123 • ИНН 7704321980<br />
            Юридический адрес: 119021, г. Москва, ул. Тимура Фрунзе, д. 11, стр. 2<br />
            Служба клиентской поддержки: support@ucheba.ru • +7 (495) 777-01-23
          </p>
        </section>

      </div>

    </div>
  );
}

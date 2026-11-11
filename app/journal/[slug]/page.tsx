'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ARTICLES, INSTITUTIONS } from '@/lib/data';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Share2, 
  Bookmark,
  GraduationCap
} from 'lucide-react';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      
      {/* Breadcrumbs & Back */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <Link href="/journal" className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-800 font-bold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Все статьи</span>
        </Link>
        <span className="text-slate-400">{article.date}</span>
      </div>

      {/* Article Container */}
      <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-md bg-brand-50 text-brand-700">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} минут чтения
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-500 pt-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-800">{article.author}</div>
              <div className="text-[11px] text-slate-400">Редакция Учёба.ру</div>
            </div>
          </div>
        </div>

        {/* Lead Excerpt */}
        <div className="p-5 rounded-2xl bg-brand-50/60 border border-brand-100 text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
          {article.excerpt}
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2">
          {article.tags.map((tag, idx) => (
            <span key={idx} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
              #{tag}
            </span>
          ))}
        </div>

      </article>

      {/* Recommended universities CTA */}
      <div className="bg-gradient-to-br from-slate-900 to-brand-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="space-y-1 max-w-lg">
          <h3 className="text-lg font-bold">Готовы выбрать университет?</h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Воспользуйтесь нашим интерактивным каталогом для сравнения проходных баллов и бюджетных мест.
          </p>
        </div>
        <Link
          href="/vuz"
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all shrink-0 text-center"
        >
          В каталог вузов
        </Link>
      </div>

    </div>
  );
}

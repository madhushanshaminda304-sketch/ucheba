import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CityModal from '@/components/CityModal';
import ComparisonTray from '@/components/ComparisonTray';
import Toast from '@/components/Toast';
import MobileNav from '@/components/MobileNav';

export const metadata: Metadata = {
  title: 'Учёба.ру — Вузы, колледжи, школы, профессии и подготовка к ЕГЭ в России',
  description: 'Крупнейший навигатор высшего, среднего и дополнительного образования в России: рейтинг вузов и школ, проходные баллы на бюджет, каталог профессий, курсы ДПО, калькулятор ЕГЭ и дни открытых дверей.',
  keywords: 'вузы России, поступление в вуз, школы Москвы, колледжи, курсы программирования, магистратура, MBA, профессии, подготовка к ЕГЭ, Учёба.ру',
  openGraph: {
    title: 'Учёба.ру — Образовательный навигатор и карьерный атлас',
    description: 'Найди свой идеальный университет, проверь шансы поступления на бюджет и выбери будущую профессию.',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-surface-bg text-slate-900 antialiased selection:bg-brand-500 selection:text-white">
        <AppProvider>
          <Header />
          <main className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
          <CityModal />
          <ComparisonTray />
          <MobileNav />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}

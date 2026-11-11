import { MetadataRoute } from 'next';
import { INSTITUTIONS, PROFESSIONS, ARTICLES, COLLEGES, PROGRAMS, SCHOOLS, SUBJECT_PREP_DATA } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ucheba.ru';

  const staticPages = [
    '',
    '/vuz',
    '/colleges',
    '/school',
    '/speciality',
    '/prof',
    '/courses',
    '/master',
    '/mba',
    '/abroad',
    '/for-teachers',
    '/for-abiturients',
    '/for-specialists',
    '/search',
    '/profile',
    '/proftest',
    '/olympiads',
    '/events',
    '/vuz/rankings',
    '/training',
    '/admission-tracker',
    '/admission-support',
    '/ege',
    '/for-clients',
    '/agreement',
    '/compare',
    '/favorites',
    '/journal',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const institutionPages = INSTITUTIONS.map((inst) => ({
    url: `${baseUrl}/vuz/${inst.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const schoolPages = SCHOOLS.map((school) => ({
    url: `${baseUrl}/school/${school.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const programPages = PROGRAMS.map((prog) => ({
    url: `${baseUrl}/program/${prog.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const collegePages = COLLEGES.map((col) => ({
    url: `${baseUrl}/colleges/${col.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const professionPages = PROFESSIONS.map((prof) => ({
    url: `${baseUrl}/prof/${prof.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const subjectPages = Object.keys(SUBJECT_PREP_DATA).map((slug) => ({
    url: `${baseUrl}/ege/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const articlePages = ARTICLES.map((art) => ({
    url: `${baseUrl}/journal/${art.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    ...staticPages, 
    ...institutionPages, 
    ...schoolPages,
    ...programPages, 
    ...collegePages, 
    ...professionPages, 
    ...subjectPages,
    ...articlePages
  ];
}

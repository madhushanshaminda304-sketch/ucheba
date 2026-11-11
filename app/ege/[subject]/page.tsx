import React from 'react';
import { notFound } from 'next/navigation';
import { SUBJECT_PREP_DATA } from '@/lib/data';
import SubjectView from './SubjectView';

interface Props {
  params: Promise<{ subject: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SUBJECT_PREP_DATA).map((subject) => ({
    subject,
  }));
}

export default async function SubjectPrepPage({ params }: Props) {
  const { subject } = await params;
  const data = SUBJECT_PREP_DATA[subject];

  if (!data) {
    notFound();
  }

  return <SubjectView data={data} subject={subject} />;
}

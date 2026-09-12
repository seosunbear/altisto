import { notFound } from 'next/navigation';

import CareerView, { careerMetadata } from '@/views/CareerView';
import { isPrefixedLocale } from '@/i18n';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return careerMetadata(lang);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <CareerView locale={lang} />;
}

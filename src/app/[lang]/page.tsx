import { notFound } from 'next/navigation';

import HomeView, { homeMetadata } from '@/views/HomeView';
import { isPrefixedLocale } from '@/i18n';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return homeMetadata(lang);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <HomeView locale={lang} />;
}

import { notFound } from 'next/navigation';

import MerryView, { merryMetadata } from '@/views/MerryView';
import { isPrefixedLocale } from '@/i18n';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return merryMetadata(lang);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <MerryView locale={lang} />;
}

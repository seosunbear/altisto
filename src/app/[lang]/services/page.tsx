import { notFound } from 'next/navigation';

import ServicesView, { servicesMetadata } from '@/views/ServicesView';
import { isPrefixedLocale } from '@/i18n';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return servicesMetadata(lang);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <ServicesView locale={lang} />;
}

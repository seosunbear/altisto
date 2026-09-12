import { notFound } from 'next/navigation';

import ContactView, { contactMetadata } from '@/views/ContactView';
import { isPrefixedLocale } from '@/i18n';

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return contactMetadata(lang);
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <ContactView locale={lang} />;
}

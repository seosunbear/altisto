import ContactView, { contactMetadata } from '@/views/ContactView';

export const metadata = contactMetadata('ko');

export default function Page() {
  return <ContactView locale="ko" />;
}

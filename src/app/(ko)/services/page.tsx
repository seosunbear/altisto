import ServicesView, { servicesMetadata } from '@/views/ServicesView';

export const metadata = servicesMetadata('ko');

export default function Page() {
  return <ServicesView locale="ko" />;
}

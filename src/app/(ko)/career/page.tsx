import CareerView, { careerMetadata } from '@/views/CareerView';

export const metadata = careerMetadata('ko');

export default function Page() {
  return <CareerView locale="ko" />;
}

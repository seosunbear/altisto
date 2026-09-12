import MerryView, { merryMetadata } from '@/views/MerryView';

export const metadata = merryMetadata('ko');

export default function Page() {
  return <MerryView locale="ko" />;
}

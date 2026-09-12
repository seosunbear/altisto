import HomeView, { homeMetadata } from '@/views/HomeView';

export const metadata = homeMetadata('ko');

export default function Page() {
  return <HomeView locale="ko" />;
}

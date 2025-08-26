import Hero from '@/components/home/Hero';
import Row from '@/components/home/Row';
import { HERO, ROW_TOP10, ROW_CONTINUE } from '@/data/mockHome';

export default async function Home() {
  return (
    <main className="pt-[72px]"> {/* 헤더 높이만큼 여백 */}
      <Hero item={HERO} />
      <div className="mt-6 space-y-8">
        <Row title="오늘 대한민국의 TOP 10 시리즈" items={ROW_TOP10} ranked />
        <Row title="김형준 님이 시청 중인 콘텐츠" items={ROW_CONTINUE} />
        <Row title="몰아보기 추천 시리즈" items={[...ROW_CONTINUE, ...ROW_CONTINUE]} />
      </div>
    </main>
  );
}

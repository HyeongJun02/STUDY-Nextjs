import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '중고거래 마켓',
  description: 'Next.js로 만든 간단한 중고거래 앱',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

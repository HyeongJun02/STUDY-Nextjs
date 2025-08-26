import './globals.css';
import type { Metadata } from 'next';
import AppHeader from '@/components/layout/AppHeader';

export const metadata: Metadata = {
  title: 'Netflix',
  description: 'Clone',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-black text-neutral-200 antialiased">
        <AppHeader />
        {children}
      </body>
    </html>
  );
}

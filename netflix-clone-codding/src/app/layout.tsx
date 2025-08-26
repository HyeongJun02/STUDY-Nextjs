import './globals.css';
import type { Metadata } from 'next';
import AppHeader from '@/components/layout/AppHeader';

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Home',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-black text-gray-100 antialiased">
        <AppHeader />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Toolbit - Fast & Secure Web Utilities',
  description: 'Browser-based privacy-first web tools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <LanguageProvider>
          <ScrollToTop />
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
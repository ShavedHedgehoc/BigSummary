import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Geist } from 'next/font/google';
import { AppProvider } from './_providers/app-provider';
import { cn } from '@/shared/lib';
import './globals.css';

export const metadata: Metadata = {
  title: 'Summary 2.0',
  description: 'Summary application',
};

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistMono = localFont({
  src: './fonts/GeistMono[wght].woff2',
  variable: '--font-mono',
  weight: '100 900',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={cn(geist.variable, geistMono.variable)} suppressHydrationWarning>
      <body
        className={cn(
          'bg-background text-foreground font-sans antialiased',
          'min-h-screen min-w-full flex flex-col',
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

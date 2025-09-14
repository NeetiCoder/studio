import type { Metadata } from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { AppHeader } from '@/components/common/header';
import { Toaster } from "@/components/ui/toaster";
import { ThreeBackground } from '@/components/common/three-background';

const fontBody = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'AstraPlan',
  description: 'Plan Your Goals, Achieve Your Future',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className={cn(
          "font-body antialiased",
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <ThreeBackground />
        <div className="relative z-10">
          <AppHeader />
          <main>{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}

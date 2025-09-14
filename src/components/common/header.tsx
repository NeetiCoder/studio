'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/plan', label: 'Create Plan' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/roadmap', label: 'Roadmap' },
];

export function AppHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-white">
            <Rocket className="w-7 h-7 text-accent" />
            AstraPlan
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  pathname === link.href ? 'text-accent' : 'text-gray-300'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glassmorphism border-t border-gray-700">
          <nav className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'text-lg font-medium transition-colors hover:text-accent',
                  pathname === link.href ? 'text-accent' : 'text-gray-200'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Menu, X, Rocket, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { checkUserSession, handleSignOut } from '@/app/auth/actions';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/plan', label: 'Create Plan' },
  { href: '/dashboard', label: 'Dashboard' },
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    checkUserSession().then(setIsLoggedIn);
  }, [pathname]);

  React.useEffect(() => {
    if (headerRef.current) {
      document.body.style.paddingTop = `${headerRef.current.offsetHeight}px`;
    }
    
    const handleResize = () => {
      if (headerRef.current) {
        document.body.style.paddingTop = `${headerRef.current.offsetHeight}px`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.paddingTop = '0';
    }
  }, []);

  const onSignOut = async () => {
    await handleSignOut();
    setIsLoggedIn(false);
    router.push('/signin');
  }

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 glassmorphism">
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
             {isLoggedIn ? (
              <Button variant="ghost" size="icon" onClick={onSignOut} title="Sign Out">
                <LogOut className="h-5 w-5 text-white" />
              </Button>
            ) : (
                <>
                 <Link href="/signin" className="text-sm font-medium text-gray-300 hover:text-accent transition-colors">Sign In</Link>
                 <Link href="/signup">
                    <Button size="sm" className="font-bold bg-accent hover:bg-primary transition-all duration-300 transform hover:scale-105">
                        Sign Up
                    </Button>
                </Link>
                </>
            )}
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
             {isLoggedIn ? (
                <Button variant="ghost" onClick={() => { onSignOut(); setIsMenuOpen(false); }} className="text-gray-200 hover:text-accent">
                    <LogOut className="mr-2 h-5 w-5" />
                    Sign Out
                </Button>
            ) : (
                <>
                    <Link href="/signin" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-200 hover:text-accent transition-colors">Sign In</Link>
                    <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                        <Button size="sm" className="font-bold bg-accent hover:bg-primary transition-all duration-300">
                            Sign Up
                        </Button>
                    </Link>
                </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

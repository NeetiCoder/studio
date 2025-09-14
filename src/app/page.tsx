'use client';

import { ThreeBackground } from '@/components/common/three-background';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <ThreeBackground />
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 animated-gradient-text">
          Plan Your Goals, Achieve Your Future
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-8">
          Harness the power of AI to transform your aspirations into actionable strategies. Welcome to the future of personal planning.
        </p>
        <Link href="/plan">
          <Button size="lg" className="group font-bold text-lg bg-accent hover:bg-primary transition-all duration-300 transform hover:scale-105 neon-border-glow">
            Start Planning
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

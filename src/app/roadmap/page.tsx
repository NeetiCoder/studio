import { roadMapData } from './data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check, Milestone, PartyPopper } from 'lucide-react';

const getIcon = (status: string) => {
    switch (status) {
        case 'completed':
            return <Check className="w-6 h-6 text-green-400" />;
        case 'in-progress':
            return <Milestone className="w-6 h-6 text-primary" />;
        case 'planned':
            return <PartyPopper className="w-6 h-6 text-accent" />;
        default:
            return <Milestone className="w-6 h-6 text-primary" />;
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'border-green-400/50 hover:border-green-400';
        case 'in-progress':
            return 'border-primary/50 hover:border-primary';
        case 'planned':
            return 'border-accent/50 hover:border-accent';
        default:
            return 'border-border/50';
    }
}

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <header className="text-center mb-20">
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter animated-gradient-text">
            Product Roadmap
          </h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
            Our journey to revolutionize personal planning. See what we've accomplished and what's coming next.
          </p>
        </header>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border/20"></div>

          <div className="space-y-16">
            {roadMapData.map((item, index) => (
              <div key={index} className="relative flex items-center justify-center">
                <div className={cn("absolute w-full flex", index % 2 === 0 ? 'justify-start' : 'justify-end')}>
                    <div className={cn("w-1/2 p-8", index % 2 === 0 ? 'pr-16' : 'pl-16')}>
                        <Card className={cn(
                            "glassmorphism transition-all duration-300 transform-style-3d",
                            getStatusColor(item.status),
                            index % 2 === 0 ? 'hover:-translate-y-2 hover:[transform:rotateY(-5deg)]' : 'hover:-translate-y-2 hover:[transform:rotateY(5deg)]'
                        )}>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-xl font-bold font-headline">{item.title}</CardTitle>
                                    <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">{item.quarter}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{item.description}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="z-10 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center">
                    {getIcon(item.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import type { GenerateStrategySuggestionsOutput } from "@/ai/flows/generate-strategy-suggestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb, Rocket } from "lucide-react";

type StrategyDisplayProps = {
    strategy: GenerateStrategySuggestionsOutput | null;
    isLoading: boolean;
};

export function StrategyDisplay({ strategy, isLoading }: StrategyDisplayProps) {
    if (isLoading) {
        return <LoadingSkeleton />;
    }

    if (!strategy) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 h-full glassmorphism rounded-lg">
                <Rocket className="w-16 h-16 text-accent mb-4" />
                <h2 className="font-headline text-2xl font-bold text-white">Your Strategy Awaits</h2>
                <p className="text-muted-foreground mt-2">Fill out the form to generate your personalized plan and see it appear here.</p>
            </div>
        );
    }
    
    // Simple parsing of the strategy text. Assumes steps start with a number.
    const steps = strategy.strategySuggestions.split('\n').filter(line => /^\d+\./.test(line.trim()));

    return (
        <div>
            <h2 className="font-headline text-3xl font-bold text-white mb-6">Your AI-Powered Strategy</h2>
            <div className="space-y-4">
                {steps.map((step, index) => (
                    <Card 
                        key={index}
                        className="glassmorphism animate-fade-in-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <CardHeader className="flex flex-row items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <Lightbulb className="w-5 h-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg text-gray-200 pt-1"><div>{step.replace(/^\d+\.\s*/, '')}</div></CardTitle>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div>
            <Skeleton className="h-8 w-3/4 mb-6" />
            <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                    <Card key={index} className="glassmorphism">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <div className="space-y-2 flex-grow pt-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

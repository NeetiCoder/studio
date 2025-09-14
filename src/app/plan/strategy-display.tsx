
'use client';

import type { GenerateStrategySuggestionsOutput } from "@/ai/flows/generate-strategy-suggestions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Rocket } from "lucide-react";
import React from "react";

type StrategyDisplayProps = {
    strategy: GenerateStrategySuggestionsOutput | null;
    isLoading: boolean;
};

// A simple markdown to React component renderer.
const MarkdownRenderer = ({ content }: { content: string }) => {
    const lines = content.split('\n');

    const renderLine = (line: string) => {
        line = line.trim();

        if (line.startsWith('### ')) {
            return <h3 className="text-xl font-semibold mt-4 mb-2 text-primary">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 className="text-2xl font-bold mt-6 mb-3 border-b-2 border-primary/30 pb-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
            return <h1 className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('* ')) {
            return <li className="ml-5 list-disc text-gray-300">{line.substring(2)}</li>;
        }
        if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
            return <li className="ml-5 list-decimal text-gray-300">{line.substring(3)}</li>;
        }
        if (line.includes('**')) {
             const parts = line.split('**');
             return <p>{parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-white">{part}</strong> : <React.Fragment key={i}>{part}</React.Fragment>)}</p>
        }

        return <p className="text-gray-400 my-1">{line}</p>;
    };

    return (
        <div className="prose prose-invert">
            {lines.map((line, index) => <div key={index}>{renderLine(line)}</div>)}
        </div>
    );
};


export function StrategyDisplay({ strategy, isLoading }: StrategyDisplayProps) {
    if (isLoading) {
        return (
             <div className="flex flex-col items-center justify-center text-center p-8 h-full glassmorphism rounded-lg animate-pulse">
                <Rocket className="w-16 h-16 text-accent mb-4 animate-bounce" />
                <h2 className="font-headline text-2xl font-bold text-white">Generating Your Future...</h2>
                <p className="text-muted-foreground mt-2">The AI is crafting your personalized path to success. Please wait a moment.</p>
            </div>
        );
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

    return (
        <Card className="glassmorphism animate-fade-in-slide-up w-full">
            <CardHeader>
                <CardTitle>
                    <div className="flex items-center gap-3 font-headline text-3xl font-bold text-white">
                        <Lightbulb className="w-8 h-8 text-primary" />
                        Your AI-Powered Strategy
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                   <MarkdownRenderer content={strategy.strategySuggestions} />
                </div>
            </CardContent>
        </Card>
    );
}

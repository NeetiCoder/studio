
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Rocket } from "lucide-react";
import React from "react";

type StrategyDisplayProps = {
    strategy: string;
    isLoading: boolean;
};

// A simple markdown to React component renderer.
const MarkdownRenderer = ({ content }: { content: string }) => {
    const renderableContent = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.startsWith('### ')) {
            renderableContent.push(<h3 key={i} className="text-xl font-semibold mt-4 mb-2 text-primary">{line.substring(4)}</h3>);
        } else if (line.startsWith('## ')) {
            renderableContent.push(<h2 key={i} className="text-2xl font-bold mt-6 mb-3 border-b-2 border-primary/30 pb-2">{line.substring(3)}</h2>);
        } else if (line.startsWith('# ')) {
            renderableContent.push(<h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>);
        } else if (line.startsWith('* ')) {
            const listItems = [];
            while (i < lines.length && lines[i].startsWith('* ')) {
                listItems.push(<li key={`li-${i}`} className="text-gray-300">{lines[i].substring(2)}</li>);
                i++;
            }
            i--; // Decrement to account for the outer loop's increment
            renderableContent.push(<ul key={`ul-${i}`} className="list-disc pl-5 my-2 space-y-1">{listItems}</ul>);
        } else if (line.match(/^\d+\. /)) {
            const listItems = [];
            while (i < lines.length && lines[i].match(/^\d+\. /)) {
                listItems.push(<li key={`li-${i}`} className="text-gray-300">{lines[i].substring(lines[i].indexOf(' ') + 1)}</li>);
                i++;
            }
            i--; // Decrement to account for the outer loop's increment
            renderableContent.push(<ol key={`ol-${i}`} className="list-decimal pl-5 my-2 space-y-1">{listItems}</ol>);
        } else if (line.includes('**')) {
            const parts = line.split('**');
            renderableContent.push(
                <p key={i}>
                    {parts.map((part, index) =>
                        index % 2 === 1 ? <strong key={index} className="font-bold text-white">{part}</strong> : <React.Fragment key={index}>{part}</React.Fragment>
                    )}
                </p>
            );
        } else if (line.trim() !== '') {
            renderableContent.push(<p key={i} className="text-gray-400 my-1">{line}</p>);
        }
    }

    return (
        <div className="prose prose-invert">
            {renderableContent}
        </div>
    );
};


export function StrategyDisplay({ strategy, isLoading }: StrategyDisplayProps) {
    if (isLoading && !strategy) {
        return (
             <div className="flex flex-col items-center justify-center text-center p-8 h-full glassmorphism rounded-lg animate-pulse">
                <Rocket className="w-16 h-16 text-accent mb-4 animate-bounce" />
                <h2 className="font-headline text-2xl font-bold text-white">Generating Your Future...</h2>
                <p className="text-muted-foreground mt-2">The AI is crafting your personalized path to success. Please wait a moment.</p>
            </div>
        );
    }

    if (!strategy && !isLoading) {
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
                   <MarkdownRenderer content={strategy} />
                </div>
            </CardContent>
        </Card>
    );
}

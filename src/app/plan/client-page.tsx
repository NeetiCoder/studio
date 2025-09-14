'use client';

import { useState } from 'react';
import { GoalForm } from './goal-form';
import { StrategyDisplay } from './strategy-display';
import type { GenerateStrategySuggestionsOutput } from '@/ai/flows/generate-strategy-suggestions';

export function PlanClientPage() {
    const [strategy, setStrategy] = useState<GenerateStrategySuggestionsOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleStrategyGenerated = (newStrategy: GenerateStrategySuggestionsOutput) => {
        setStrategy(newStrategy);
    }

    return (
        <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
                <GoalForm 
                    onStrategyGenerated={handleStrategyGenerated}
                    setIsLoading={setIsLoading}
                />
            </div>
            <div className="lg:w-2/3">
                <StrategyDisplay strategy={strategy} isLoading={isLoading} />
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { GoalForm } from './goal-form';
import { StrategyDisplay } from './strategy-display';

export function PlanClientPage() {
    const [strategy, setStrategy] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleStrategyUpdate = (newStrategyChunk: string) => {
        setStrategy(prev => prev + newStrategyChunk);
    }

    const clearStrategy = () => {
        setStrategy('');
    }
    
    return (
        <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
                <GoalForm 
                    onStrategyUpdate={handleStrategyUpdate}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    clearStrategy={clearStrategy}
                />
            </div>
            <div className="lg:w-2/3">
                <StrategyDisplay strategy={strategy} isLoading={isLoading} />
            </div>
        </div>
    );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { handleGoalSubmission } from './actions';
import { useToast } from '@/hooks/use-toast';
import type { GenerateStrategySuggestionsOutput } from '@/ai/flows/generate-strategy-suggestions';
import { Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { readStreamableValue } from 'ai/rsc';

const formSchema = z.object({
  goalType: z.string().min(2, {
    message: 'Goal type must be at least 2 characters.',
  }),
  timeFrame: z.enum(['monthly', 'yearly', 'custom']),
  details: z.string().min(10, {
    message: 'Please provide more details about your goal.',
  }),
  currentStatus: z.string().optional(),
});

type GoalFormProps = {
    onStrategyUpdate: (strategy: GenerateStrategySuggestionsOutput) => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
}

export function GoalForm({ onStrategyUpdate, setIsLoading, isLoading }: GoalFormProps) {
  const { toast } = useToast();
  const [goalType, setGoalType] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goalType: '',
      timeFrame: 'monthly',
      details: '',
      currentStatus: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await handleGoalSubmission(values);
    
    if (result.success && result.data) {
        let finalState: any = {};
        for await (const-child in a list should have a unique "key" prop.
> 
> Check the render method of `MarkdownRenderer`. See https://react.dev/link/warning-keys for more information.. Error source: src/app/plan/strategy-display.tsx (40:35) @ <anonymous>
> 
>   38 |         const listItems = [];
>   39 |         while (i < lines.length && lines[i].startsWith('* ')) {
> > 40 |             listItems.push(<li>{lines[i].substring(2)}</li>);
>      |                                   ^
>   41 |             i++;
>   42 |         }
>   43 |         i--; // Decrement to account for the outer loop's increment
> 
> Call Stack
> 29
> 
> Show 19 ignore-listed frame(s)
> <unknown>
> src/app/plan/strategy-display.tsx (40:35)
> MarkdownRenderer
> src/app/plan/strategy-display.tsx (39:13)
> StrategyDisplay
> src/app/plan/strategy-display.tsx (88:20)
> PlanClientPage
> src/app/plan/client-page.tsx (18:17)
> PlanPage
> src/app/plan/page.tsx (15:17)
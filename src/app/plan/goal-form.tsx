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
    onStrategyUpdate: (strategyChunk: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    isLoading: boolean;
    clearStrategy: () => void;
}

export function GoalForm({ onStrategyUpdate, setIsLoading, isLoading, clearStrategy }: GoalFormProps) {
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
    clearStrategy();
    const result = await handleGoalSubmission(values);
    
    if (result.success && result.data) {
        try {
            for await (const delta of readStreamableValue(result.data)) {
                if (delta.strategySuggestions) {
                    onStrategyUpdate(delta.strategySuggestions);
                }
            }
        } catch(e) {
            toast({
                title: "Error",
                description: "There was an error generating your strategy. Please try again.",
                variant: 'destructive',
            });
        }
    } else {
        toast({
            title: "Error",
            description: result.error || "An unknown error occurred.",
            variant: 'destructive',
        });
    }
    setIsLoading(false);
  }

  const getPlaceholder = () => {
    switch (goalType.toLowerCase()) {
      case 'fitness':
        return 'e.g., current weight, height, workout frequency';
      case 'career':
        return 'e.g., current job title, years of experience';
      case 'study':
        return 'e.g., current grade, subjects, study habits';
      case 'finance':
        return 'e.g., current savings, income, financial goals';
      default:
        return 'e.g., current situation, skills, or progress';
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 glassmorphism p-6 rounded-lg">
        <FormField
          control={form.control}
          name="goalType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Goal Type</FormLabel>
              <Input 
                placeholder="e.g., Fitness, Career, Study" 
                {...field}
                onChange={(e) => {
                    field.onChange(e);
                    setGoalType(e.target.value);
                }}
                className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-400"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeFrame"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Time Frame</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800/60 border-gray-700 text-white">
                    <SelectValue placeholder="Select a time frame" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-900 text-white border-gray-700">
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Goal Details</FormLabel>
              <Textarea
                placeholder="Describe your goal in detail. What do you want to achieve?"
                {...field}
                className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-400"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Current Status (Optional)</FormLabel>
              <Input 
                placeholder={getPlaceholder()}
                {...field}
                className="bg-gray-800/60 border-gray-700 text-white placeholder:text-gray-400"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
            type="submit" 
            className={cn(
                "w-full font-bold text-lg bg-accent hover:bg-primary transition-all duration-300 transform hover:scale-105 neon-border-glow",
                { 'opacity-50 cursor-not-allowed': isLoading }
            )}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Zap className="mr-2 h-5 w-5" />
                    Generate My Strategy
                </>
            )}
        </Button>
      </form>
    </Form>
  );
}

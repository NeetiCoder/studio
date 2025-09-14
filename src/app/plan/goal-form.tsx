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
    onStrategyGenerated: (strategy: GenerateStrategySuggestionsOutput) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export function GoalForm({ onStrategyGenerated, setIsLoading }: GoalFormProps) {
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

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await handleGoalSubmission(values);
    setIsLoading(false);
    
    if (result.success && result.data) {
      onStrategyGenerated(result.data);
      toast({
        title: "Strategy Generated!",
        description: "Your new path to success is ready.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "There was a problem with your request.",
      });
    }
  }

  const inputStyles = "bg-background/50 border-border/50 focus-visible:ring-accent focus-visible:ring-offset-0 focus:neon-border-glow transition-all";

  const getPlaceholderForCurrentStatus = () => {
    switch (goalType.toLowerCase()) {
        case 'fitness':
            return 'e.g., Current weight 90kg, height 6ft. I can do 5 pushups.';
        case 'study':
            return 'e.g., I am a 1st year computer science university student.';
        case 'career':
            return 'e.g., I am a Junior Software Engineer with 1 year of experience.';
        case 'finance':
            return 'e.g., I have $500 in savings and $2000 in debt.';
        default:
            return 'Describe your starting point.';
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 glassmorphism p-8 rounded-lg">
        <FormField
          control={form.control}
          name="goalType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-gray-300">Goal Type</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Fitness, Study, Career" 
                  {...field} 
                  onChange={(e) => {
                      field.onChange(e);
                      setGoalType(e.target.value);
                  }}
                  className={cn(inputStyles)} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {goalType && (
           <FormField
            control={form.control}
            name="currentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-gray-300">Current Status</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={getPlaceholderForCurrentStatus()}
                    className={cn(inputStyles, 'min-h-[100px]')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="timeFrame"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-semibold text-gray-300">Time Frame</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={cn(inputStyles)}>
                        <SelectValue placeholder="Select a time frame" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='glassmorphism'>
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
              <FormLabel className="text-lg font-semibold text-gray-300">Goal Details</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your goal in detail. What does success look like?"
                  className={cn(inputStyles, 'min-h-[120px]')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full text-lg font-bold bg-accent hover:bg-primary transition-all duration-300 transform hover:scale-105 neon-border-glow">
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Zap className="mr-2 h-5 w-5" />
          )}
          Generate Strategy
        </Button>
      </form>
    </Form>
  );
}

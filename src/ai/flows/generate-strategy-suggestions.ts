'use server';

/**
 * @fileOverview An AI agent for generating personalized strategy suggestions based on user goals.
 *
 * - generateStrategySuggestions - A function that generates strategy suggestions.
 * - GenerateStrategySuggestionsInput - The input type for the generateStrategySuggestions function.
 * - GenerateStrategySuggestionsOutput - The return type for the generateStrategySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStrategySuggestionsInputSchema = z.object({
  goalType: z.string().describe('The type of goal (career, fitness, study, finance, personal growth, etc.)'),
  timeFrame: z.enum(['monthly', 'yearly', 'custom']).describe('The timeframe for the goal (monthly, yearly, or custom)'),
  details: z.string().describe('Specific details about the goal.'),
});
export type GenerateStrategySuggestionsInput = z.infer<typeof GenerateStrategySuggestionsInputSchema>;

const GenerateStrategySuggestionsOutputSchema = z.object({
  strategySuggestions: z.string().describe('AI-powered strategy suggestions based on the goal, timeframe, and details.'),
});
export type GenerateStrategySuggestionsOutput = z.infer<typeof GenerateStrategySuggestionsOutputSchema>;

export async function generateStrategySuggestions(input: GenerateStrategySuggestionsInput): Promise<GenerateStrategySuggestionsOutput> {
  return generateStrategySuggestionsFlow(input);
}

const generateStrategySuggestionsPrompt = ai.definePrompt({
  name: 'generateStrategySuggestionsPrompt',
  input: {schema: GenerateStrategySuggestionsInputSchema},
  output: {schema: GenerateStrategySuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized strategy suggestions based on user goals, timeframe, and details.

  Goal Type: {{{goalType}}}
  Timeframe: {{{timeFrame}}}
  Details: {{{details}}}

  Please generate a strategy plan with actionable steps.
  Consider using a tool to incorporate domain-specific resources and planning strategies when helpful.`,
});

const generateStrategySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateStrategySuggestionsFlow',
    inputSchema: GenerateStrategySuggestionsInputSchema,
    outputSchema: GenerateStrategySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await generateStrategySuggestionsPrompt(input);
    return output!;
  }
);

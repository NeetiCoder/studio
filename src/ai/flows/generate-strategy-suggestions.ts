'use server';

/**
 * @fileOverview An AI agent for generating personalized strategy suggestions based on user goals.
 *
 * - generateStrategySuggestionsFlow - A function that generates strategy suggestions.
 * - GenerateStrategySuggestionsInput - The input type for the generateStrategySuggestions function.
 * - GenerateStrategySuggestionsOutput - The return type for the generateStrategySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStrategySuggestionsInputSchema = z.object({
  goalType: z.string().describe('The type of goal (career, fitness, study, finance, personal growth, etc.)'),
  timeFrame: z.enum(['monthly', 'yearly', 'custom']).describe('The timeframe for the goal (monthly, yearly, or custom)'),
  details: z.string().describe('Specific details about the goal.'),
  currentStatus: z.string().optional().describe('The user\'s current status, e.g., for fitness: current weight/height; for study: current grade/topic.'),
});
export type GenerateStrategySuggestionsInput = z.infer<typeof GenerateStrategySuggestionsInputSchema>;

const GenerateStrategySuggestionsOutputSchema = z.object({
  strategySuggestions: z.string().describe('AI-powered strategy suggestions based on the goal, timeframe, and details.'),
});
export type GenerateStrategySuggestionsOutput = z.infer<typeof GenerateStrategySuggestionsOutputSchema>;

const generateStrategySuggestionsPrompt = ai.definePrompt({
  name: 'generateStrategySuggestionsPrompt',
  input: {schema: GenerateStrategySuggestionsInputSchema},
  output: {schema: GenerateStrategySuggestionsOutputSchema},
  config: {
    maxOutputTokens: 8192,
  },
  prompt: `You are an expert life coach and strategist. Your task is to create a detailed, actionable roadmap for the user based on their goals.

Analyze the user's goal, their current status, and the timeframe. Then, generate a comprehensive plan.

**User's Goal:**
- **Goal Type:** {{{goalType}}}
- **Timeframe:** {{{timeFrame}}}
- **Current Status:** {{#if currentStatus}} {{{currentStatus}}} {{else}} Not provided {{/if}}
- **Goal Details:** {{{details}}}

**Your Output Must Be:**
A detailed, step-by-step roadmap. For each period (e.g., month), provide:
1.  **A Clear Theme/Focus:** What is the main objective for that period?
2.  **Specific, Measurable Targets:** List quantifiable targets (e.g., "Lose 2kg," "Complete 3 chapters," "Save $500").
3.  **Actionable Steps:** Provide a list of concrete actions the user should take to achieve the targets.
4.  **Milestones:** Define key milestones to track progress.

Structure your response clearly. Use markdown for formatting, including headings for each period and bullet points for targets and actions. Make it motivating and encouraging.`,
});

export const generateStrategySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateStrategySuggestionsFlow',
    inputSchema: GenerateStrategySuggestionsInputSchema,
    outputSchema: GenerateStrategySuggestionsOutputSchema,
    stream: {
      schema: z.object({
        strategySuggestions: z.string(),
      }),
    },
  },
  async (input) => {
    const { stream } = await generateStrategySuggestionsPrompt(input, { stream: true });

    return stream.pipe(chunk => {
        if (!chunk.output) return;
        return { strategySuggestions: chunk.output.strategySuggestions };
    });
  }
);
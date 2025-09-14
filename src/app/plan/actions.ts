'use server';

import { generateStrategySuggestions, type GenerateStrategySuggestionsInput } from '@/ai/flows/generate-strategy-suggestions';
import { z } from 'zod';

const formSchema = z.object({
  goalType: z.string().min(2),
  timeFrame: z.enum(['monthly', 'yearly', 'custom']),
  details: z.string().min(10),
});

export async function handleGoalSubmission(values: GenerateStrategySuggestionsInput) {
    const parsed = formSchema.safeParse(values);

    if (!parsed.success) {
        return { success: false, error: "Invalid form data." };
    }

    try {
        const result = await generateStrategySuggestions(parsed.data);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error generating strategy:", error);
        return { success: false, error: "Failed to generate strategy. Please try again." };
    }
}

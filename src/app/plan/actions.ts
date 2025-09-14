'use server';

import { generateStrategySuggestionsFlow, type GenerateStrategySuggestionsInput } from '@/ai/flows/generate-strategy-suggestions';

export async function handleGoalSubmission(values: GenerateStrategySuggestionsInput) {
    try {
        const result = await generateStrategySuggestionsFlow(values);
        return { strategySuggestions: result.strategySuggestions };
    } catch (error) {
        console.error("Error generating strategy:", error);
        return { error: "Failed to generate strategy. Please try again." };
    }
}

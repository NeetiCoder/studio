'use server';

import { generateStrategySuggestionsFlow, type GenerateStrategySuggestionsInput } from '@/ai/flows/generate-strategy-suggestions';
import { createStreamableValue } from 'ai/rsc';

export async function handleGoalSubmission(values: GenerateStrategySuggestionsInput) {
    const streamable = createStreamableValue();

    (async () => {
        try {
            const result = await generateStrategySuggestionsFlow(values);
            streamable.update({ strategySuggestions: result.strategySuggestions });
        } catch (error) {
            console.error("Error generating strategy:", error);
            streamable.update({ error: "Failed to generate strategy. Please try again." });
        } finally {
            streamable.done();
        }
    })();

    return { output: streamable.value };
}

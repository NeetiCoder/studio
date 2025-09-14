'use server';

import { generateStrategySuggestionsFlow, type GenerateStrategySuggestionsInput } from '@/ai/flows/generate-strategy-suggestions';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

const formSchema = z.object({
  goalType: z.string().min(2),
  timeFrame: z.enum(['monthly', 'yearly', 'custom']),
  details: z.string().min(10),
  currentStatus: z.string().optional(),
});

export async function handleGoalSubmission(values: GenerateStrategySuggestionsInput) {
    const streamable = createStreamableValue();

    (async () => {
        const parsed = formSchema.safeParse(values);

        if (!parsed.success) {
            streamable.done({ success: false, error: "Invalid form data." });
            return;
        }

        try {
            const stream = await generateStrategySuggestionsFlow(parsed.data);
            for await (const chunk of stream) {
                if (chunk.strategySuggestions) {
                    streamable.update({ strategySuggestions: chunk.strategySuggestions });
                }
            }
        } catch (error) {
            console.error("Error generating strategy:", error);
            streamable.done({ success: false, error: "Failed to generate strategy. Please try again." });
            return;
        }
        
        streamable.done({ success: true });
    })();

    return { success: true, data: streamable.value };
}


import { GoogleGenAI } from "@google/genai";

// The API key MUST be set in the environment variables.
// The platform should handle injecting `process.env.API_KEY`.
if (!process.env.API_KEY) {
    // This provides a clear error message in the developer console
    // if the API key is not configured, aiding in debugging.
    console.error("API_KEY environment variable not set. Please configure it in your environment.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateStrategy = async (productDesc: string, targetAudience: string, mainMessage: string): Promise<string> => {
    
    const masterPrompt = `
    Act as an expert media buying strategist for the "Media Buying Academy" community.
    Your task is to create a comprehensive 5-stage marketing funnel strategy (Awareness, Engagement, Consideration, Conversion, Retention) based on the following ad description.
    For each stage, you must fill out an 8-column table with creative, high-value, and practical ideas.
    The columns are: "المرحلة", "Cible (الجمهور المستهدف)", "Objectif (الهدف)", "Stratégie (الاستراتيجية)", "Format choisi (الشكل المختار)", "Texte dans la photo (النص في الصورة)", "Message CTA (رسالة الحث)", "Canal (القناة)".
    The final output MUST be only a single, clean Markdown table and nothing else.
    The language for the table content must be professional Arabic.

    Here is the ad description:
    - Product/Service: ${productDesc}
    - Target Audience: ${targetAudience}
    - Main Message: ${mainMessage}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: masterPrompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating strategy with Gemini:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while generating the strategy.");
    }
};

import { GoogleGenerativeAI } from "@google/generative-ai";

// This is the correct way to get the API key in a Vite/React project
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("VITE_GEMINI_API_KEY environment variable not set.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
        
        const result = await model.generateContent(masterPrompt);
        const response = await result.response;
        const text = response.text();

        return text;

    } catch (error) {
        console.error("Error generating strategy with Gemini:", error);
        if (error instanceof Error) {
             throw new Error("حدث خطأ أثناء إنشاء الاستراتيجية. تأكد من صحة مفتاح API الخاص بك وأن حساب الفوترة مفعل.");
        }
        throw new Error("An unknown error occurred while generating the strategy.");
    }
};


import { GoogleGenAI } from "@google/genai";

// The API key MUST be set in the environment variables.
// The platform should handle injecting `process.env.API_KEY`.
if (!process.env.API_KEY) {
    // This provides a clear error message in the developer console
    // if the API key is not configured, aiding in debugging.
    console.error("API_KEY environment variable not set. Please configure it in your environment.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const getFrameworkInstructions = (framework: string): string => {
    if (!framework || framework === 'بدون إطار محدد') return '';

    const instructions: { [key: string]: string } = {
        'AIDA': `
### Framework: AIDA (Attention, Interest, Desire, Action)
- **For the Awareness stage:** Focus exclusively on grabbing **Attention (A)**. Your goal is to be disruptive and stop the user.
- **For the Engagement stage:** Focus on building **Interest (I)**. Provide value, tell a story, and make them curious to learn more.
- **For the Consideration stage:** Focus on creating intense **Desire (D)**. Showcase the benefits, use social proof, and make the product irresistible.
- **For the Conversion stage:** Focus 100% on driving **Action (A)**. The CTA must be powerful, clear, and direct.
- **For the Retention stage:** Reinforce the value of their **Action** and build loyalty.
`,
        'PAS': `
### Framework: PAS (Problem, Agitate, Solve)
- **For the Awareness stage:** Focus exclusively on the **Problem (P)**. Define it clearly and make the audience aware of a pain point they have.
- **For the Engagement stage:** Shift focus to **Agitate (A)** the problem. Describe the negative consequences of not solving it. Make them feel the pain.
- **For the Consideration stage:** Continue to **Agitate (A)**, but begin to hint at a way out. Build the tension and the need for a solution.
- **For the Conversion stage:** Focus 100% on presenting your product as the definitive **Solution (S)**. Show how it resolves the agitated problem perfectly.
- **For the Retention stage:** Remind them how your **Solution (S)** has improved their lives.
`,
        'Before-After-Bridge': `
### Framework: Before-After-Bridge
- **For the Awareness stage:** Focus exclusively on the **'Before'** state. Paint a vivid, painful, and relatable picture of the user's world with the problem.
- **For the Engagement stage:** Continue detailing the **'Before'** state, but start contrasting it with hints of a better future.
- **For the Consideration stage:** Focus entirely on the **'After'** state. Describe the ideal, aspirational world the user will live in after solving the problem. Create a strong craving for this result.
- **For the Conversion stage:** Position the product as the **'Bridge'**. Explain clearly how it is the only vehicle to get them from their painful 'Before' to their desired 'After'.
- **For the Retention stage:** Celebrate their arrival in the **'After'** state, thanks to your 'Bridge'.
`,
        'FAB': `
### Framework: FAB (Features, Advantages, Benefits)
- **For the Awareness stage:** Lead with the most powerful and surprising **Benefit (B)**. Don't explain how, just show the amazing result to create curiosity.
- **For the Engagement stage:** Explain the **Advantage (A)** your product has that delivers this benefit. Why is your way better?
- **For the Consideration stage:** Detail the specific **Features (F)** that create the advantage. This is for the logical brain, providing proof.
- **For the Conversion stage:** Return to the **Benefits (B)**. Connect every feature and advantage back to a tangible, emotional gain for the user. Answer "What's in it for me?".
- **For the Retention stage:** Highlight advanced **Features (F)** or new **Benefits (B)** to ensure they get maximum value.
`,
        '4U\'s': `
### Framework: 4U's (Useful, Urgent, Unique, Ultra-specific)
- **For the Awareness stage:** Focus on being **Unique** and **Useful**. Why is this different, and why should they care?
- **For the Engagement stage:** Focus on being **Useful** and **Ultra-specific**. Provide tangible value and concrete details.
- **For the Consideration stage:** Focus on being **Unique** and **Ultra-specific**. Prove with specifics why you are the best choice over competitors.
- **For the Conversion stage:** Focus on being **Urgent** and **Ultra-specific**. Create a clear, compelling, time-sensitive reason to act NOW.
- **For the Retention stage:** Provide **Useful** and **Unique** content to reinforce the value of their decision and build community.
`,
        'SLAP': `
### Framework: SLAP (Stop, Look, Act, Purchase)
- **For the Awareness stage:** Your only goal is to make them **Stop** scrolling. Use a visually arresting image or a shocking headline.
- **For the Engagement stage:** Now that you have their attention, make them **Look**. Draw them in with intriguing copy that explains the big idea.
- **For the Consideration stage:** Drive a preliminary, low-commitment **Act**. Examples: 'Download a free guide', 'Watch a demo', 'Take a quiz'.
- **For the Conversion stage:** Drive the final **Purchase**. The offer and CTA must be direct and focused on the sale.
- **For the Retention stage:** Encourage another **Act** (e.g., leave a review, join the community) or a repeat **Purchase**.
`,
    };

    return instructions[framework] || '';
};

export const generateStrategy = async (productDesc: string, targetAudience: string, mainMessage: string, copywritingFramework: string): Promise<string> => {
    
    const frameworkInstructions = getFrameworkInstructions(copywritingFramework);
    
    const masterPrompt = `
    As an expert media buying strategist from the "Media Buying Academy," your mission is to create a powerful, highly effective 5-stage marketing funnel strategy (Awareness, Engagement, Consideration, Conversion, Retention).

    The final output MUST be a single, clean Markdown table in professional Arabic, and nothing else.
    The table columns are: "المرحلة", "Cible (الجمهور المستهدف)", "Objectif (الهدف)", "Stratégie (الاستراتيجية)", "Format choisi (الشكل المختار)", "Texte dans la photo (النص في الصورة)", "Message CTA (رسالة الحث)", "Canal (القناة)".

    ---
    **CRITICAL MANDATORY RULES (APPLY TO EVERY ROW):**

    **1. Column-Specific Creative Directives:**

    - **For "Texte dans la photo" (Image Text):**
        - **Rule 1:** Must be emotionally impactful and motivational.
        - **Rule 2:** Must be clear, direct, and follow the KISS principle (Keep It Short and Simple), but with enough depth to fully convey the idea. Avoid texts that are too short or vague.
        - **Rule 3:** Must be perfectly aligned with the chosen framework and the current funnel stage.

    - **For "Message CTA" (Call to Action):**
        - **Rule 1:** MUST be less than 3 words.
        - **Rule 2:** Must be direct and clear.
        - **Rule 3 (CRUCIAL):** The style MUST adapt to the funnel stage as follows:
            - **Awareness Stage CTA:** Create curiosity and urgency to consume content. Examples: "اكتشف السر", "شاهد قبل الحذف", "اعرف الحقيقة".
            - **Engagement Stage CTA:** Ask a direct question to encourage participation. Examples: "ما رأيك؟", "شاركنا تجربتك", "هل توافق؟".
            - **Consideration Stage CTA:** Build trust and provide proof. Examples: "شاهد التقييمات", "حمل دراسة الحالة", "اقرأ الشهادات".
            - **Conversion Stage CTA:** A strong, direct command to purchase. Examples: "اطلب الآن", "احصل على عرضك", "إبدأ التحول".
            - **Retention Stage CTA:** Focus on loyalty and community. Examples: "انضم لنادينا", "فعّل خصمك", "كن سفيراً".

    - **For "Stratégie", "Objectif", "Format choisi":**
        - **Rule:** The content MUST be Creative & Remarkable. Do not provide generic definitions. Provide a clear, innovative strategic intent.

    **2. Overall Cohesion Rule:**
    - All 8 columns within a single row must work together as one cohesive, integrated unit.
    - The "Message CTA" must be the logical conclusion of the "Texte dans la photo".
    - The "Texte dans la photo" must be the creative translation of the "Stratégie" and "Objectif".
    - The "Cible" must be specifically described for that stage.

    ---
    
    ${frameworkInstructions ? `
    **STRATEGY MATRIX: FRAMEWORK + FUNNEL STAGE**
    You MUST intelligently combine the selected framework with the specific marketing funnel stage you are generating for. This must deeply influence the content of the "Objectif", "Stratégie", and "Texte dans la photo" columns, following the specific instructions below, in addition to all the creative rules above.
    ${frameworkInstructions}
    ` : `
    **STRATEGY GUIDANCE:**
    Even without a specific framework, generate a creative and coherent strategy across the funnel stages. Ensure the messaging evolves logically from introducing the product to encouraging purchase and loyalty, while adhering to all creative rules.
    `}
    ---

    **AD DESCRIPTION:**
    - Product/Service: ${productDesc}
    - Target Audience: ${targetAudience}
    - Main Message: ${mainMessage}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
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

const { GoogleGenerativeAI } = require("@google/generative-ai");

// This is where you will put your Gemini API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { productDesc, targetAudience, mainMessage } = JSON.parse(event.body);

        if (!productDesc || !targetAudience || !mainMessage) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'المرجو ملء جميع الخانات.' })
            };
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

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

        const result = await model.generateContent(masterPrompt);
        const response = await result.response;
        const strategyText = response.text();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ strategy: strategyText })
        };

    } catch (error) {
        console.error("Error generating strategy:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'حدث خطأ داخلي، المرجو المحاولة لاحقاً.' })
        };
    }
};
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({})

const NOTE_GENERATOR_CONFIG = {
    model: "gemini-3.5-flash-lite",
    config: {
        systemInstruction: `
            You are a knowledgable librarian.
            Given the user's topic, generate concise educational jot notes.
            Use short bullet points.
            Do not include unnecessary introductions or conclusions.
        `
    }
}

export async function generateNote(input) {
    const response = await ai.models.generateContent({
        ...NOTE_GENERATOR_CONFIG,
        contents: input,
    });
    return response.text;
}

console.log(await generateNote("Hypoglycemia"));
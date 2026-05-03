import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function fetchWords() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      'Generate jumble words with 3 words each for easy (4 letters), medium (5 letters), and hard (6 letters). Return ONLY valid JSON (no backticks, no code block, no export, no comments). Format: [{"answer":"WORD","letters":["W","O","R","D"],"difficulty":"easy"}]',
  });
 
  return response.text;
}

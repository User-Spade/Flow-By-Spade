import { GoogleGenAI, Type } from "@google/genai";
import { Technique, BeltRank } from "../types";
import Constants from "expo-constants";

/**
 * SECURITY WARNING: For production apps, NEVER ship API keys in the client bundle.
 * 
 * This implementation is for DEVELOPMENT/DEMO purposes only.
 * 
 * For production:
 * 1. Create a backend API (Node.js, Python, etc.) that handles Gemini calls
 * 2. Store the API key securely on the server (environment variables)
 * 3. Have your mobile app call YOUR backend API
 * 4. Implement rate limiting and authentication on your backend
 * 
 * Example backend endpoint:
 *   POST /api/suggest-moves
 *   Body: { techniqueId, beltRank }
 *   Server makes Gemini call, returns suggestions
 */

// Get API key from app.config.js extra field (set via environment)
const getClient = () => {
  const API_KEY = Constants.expoConfig?.extra?.geminiApiKey;
  
  if (!API_KEY) {
    throw new Error(
      "Missing API key. For development, set EXPO_PUBLIC_GEMINI_API_KEY in your .env file. " +
      "For production, implement a backend API to handle AI requests securely."
    );
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

const modelFlash = 'gemini-2.5-flash';
const modelPro = 'gemini-2.5-pro';

const suggestionsSchema = {
  type: Type.OBJECT,
  properties: {
    moves: {
      type: Type.ARRAY,
      description: "A list of 3 to 5 suggested BJJ moves.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the Jiu-Jitsu technique.",
          },
          reasoning: {
            type: Type.STRING,
            description: "A brief explanation of why this move is a good option.",
          },
        },
        required: ["name", "reasoning"],
      },
    },
  },
  required: ["moves"],
};

export const suggestMoves = async (technique: Technique, beltRank: BeltRank) => {
  const prompt = `As a BJJ black belt coach, I am advising a ${beltRank} student. They are currently in the '${technique.name}' position. What are 3-5 high-percentage next moves (submissions or transitions) from here? Provide the move name and a brief reasoning for each.`;

  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: modelFlash,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: suggestionsSchema,
        temperature: 0.7,
      }
    });
    
    const jsonText = response.text?.trim() || '{}';
    const parsed = JSON.parse(jsonText);
    return parsed.moves || [];
  } catch (error) {
    console.error("Error fetching suggestions from Gemini:", error);
    throw new Error("Failed to get suggestions from AI.");
  }
};

export const analyzePath = async (path: Technique[], beltRank: BeltRank) => {
  if (path.length < 2) {
    return "A path needs at least two techniques to be analyzed.";
  }
  const pathString = path.map(t => t.name).join(' -> ');
  const prompt = `You are a world-class Jiu-Jitsu instructor. Analyze the following sequence of moves for a ${beltRank}: ${pathString}.
  
  Provide your analysis in Markdown format. Address the following points:
  - **Overall Flow:** How logical is this sequence?
  - **Strengths:** What makes this a good combination?
  - **Potential Gaps/Weaknesses:** Where might a practitioner struggle? What are common counters to watch out for?
  - **Alternative Techniques:** Suggest 1-2 alternative moves at key transition points.
  - **Conclusion:** A summary of your feedback.`;

  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: modelPro,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching analysis from Gemini:", error);
    throw new Error("Failed to get analysis from AI.");
  }
};

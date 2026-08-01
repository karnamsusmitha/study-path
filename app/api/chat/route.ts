import { NextResponse } from 'next/server';
import { AIPrompts } from '@/lib/ai/prompts';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { history, message } = body; 
    // history is expected to be an array of { role: 'user' | 'model', parts: [{ text: string }] }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Fallback mock response for Hackathon demo if API key is missing
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Returning mocked chat response.");
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate typing delay
      return NextResponse.json({
        text: "That's a fantastic question! Since I'm currently running in **Demo Mode** (without my API key), I can't give you a live response. However, normally I would analyze your context, explain this concept simply with analogies, and recommend some great **YouTube videos** or **Documentation** to help you out. Keep up the amazing work!"
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction = AIPrompts.getAIMentorSystemInstruction();

    // Construct the payload by appending the new user message to the history array
    const formattedHistory = [
      ...(history || []),
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini API");
    }

    return NextResponse.json({ text: response.text });

  } catch (error) {
    console.error("Error generating chat response:", error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}

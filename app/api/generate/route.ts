import { NextResponse } from 'next/server';
import { AIPrompts } from '@/lib/ai/prompts';
import { GoogleGenAI } from '@google/genai';

// Fallback mock data in case API key is missing
import { mockRoadmapData } from '@/lib/mockData';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, targetCareer, currentSkills, hoursPerDay, duration, learningStyle } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key is provided, return mock data to ensure the hackathon demo works
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. Returning mocked roadmap data.");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
      return NextResponse.json(mockRoadmapData);
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = AIPrompts.getRoadmapPrompt(
      studentName,
      targetCareer,
      currentSkills,
      hoursPerDay,
      duration,
      learningStyle
    );

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    if (!response.text) {
      throw new Error("Empty response from Gemini API");
    }

    const jsonResult = JSON.parse(response.text);
    return NextResponse.json(jsonResult);

  } catch (error) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json({ error: 'Failed to generate roadmap' }, { status: 500 });
  }
}

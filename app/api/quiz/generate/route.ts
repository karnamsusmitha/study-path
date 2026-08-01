import { NextResponse } from 'next/server';
import { mockQuizData } from '@/lib/mockData';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return NextResponse.json({
      message: "Quiz generated",
      data: mockQuizData
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 400 }
    );
  }
}

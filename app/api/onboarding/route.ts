import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { goal, level } = await req.json();
    
    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    return NextResponse.json({
      success: true,
      message: 'Learning path generated successfully',
      data: { goal, level }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}

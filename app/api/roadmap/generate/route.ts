import { NextResponse } from 'next/server';
import { mockRoadmapData } from '@/lib/mockData';

export async function POST(req: Request) {
  // Simulate AI generation delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return the mock roadmap data inside a 'data' wrapper as expected by the frontend
  return NextResponse.json({
    message: "Roadmap generated",
    data: mockRoadmapData
  });
}

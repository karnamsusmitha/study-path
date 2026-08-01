import { NextResponse } from 'next/server';

export async function GET() {
  // Mock data for MVP
  const mockRoadmap = {
    progress: 25,
    modules: [
      { id: 1, title: 'Introduction to React', completed: true },
      { id: 2, title: 'Understanding JSX', completed: false },
      { id: 3, title: 'State and Props', completed: false },
      { id: 4, title: 'React Hooks', completed: false },
    ]
  };
  
  return NextResponse.json(mockRoadmap);
}

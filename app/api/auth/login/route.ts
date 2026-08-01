import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      token: "mock-jwt-token-xyz",
      user: { email: body.email, name: body.email.split('@')[0] }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}

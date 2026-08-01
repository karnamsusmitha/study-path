import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      message: "User created successfully",
      user: { email: body.email, name: body.student_name }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to sign up" },
      { status: 400 }
    );
  }
}

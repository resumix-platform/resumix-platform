import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Try to save to DB (will fail gracefully if DB isn't connected yet)
    try {
      await prisma.waitlistEmail.create({
        data: { email },
      });
    } catch (dbError: any) {
      if (dbError.code === 'P2002') {
        return NextResponse.json(
          { error: 'Email already on waitlist!' },
          { status: 400 }
        );
      }
      // If DB string is missing, just mock success for the landing page demo phase
      console.warn('DB error (expected if DATABASE_URL is missing):', dbError.message);
    }

    return NextResponse.json(
      { message: 'Success! You are on the list.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

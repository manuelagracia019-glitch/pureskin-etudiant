import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('🔐 Forwarding login request to backend:', { email: body.email, password: '***' });
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/admin/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();
    console.log('� Backend response:', data);
    
    // Return the response from the backend
    return NextResponse.json(data, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error('❌ Backend connection error:', error);
    
    return NextResponse.json(
      { success: false, message: 'Backend injoignable' },
      { status: 502 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/lib/backend-url';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('🔐 Forwarding login request to backend:', { email: body.email, password: '***' });
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_URL}/api/admin/auth/login`, {
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

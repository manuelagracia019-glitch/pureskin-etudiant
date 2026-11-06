import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { BACKEND_URL } from '@/lib/backend-url';
=======
import { BACKEND_ORIGIN } from '@/lib/backend-url';
>>>>>>> 20452f22025a409c3bc9b142c94441513bb64a27

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
<<<<<<< HEAD
    
    console.log('🔐 Forwarding login request to backend:', { email: body.email, password: '***' });
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_URL}/api/admin/auth/login`, {
=======

    console.log('🔐 Forwarding admin login request to backend:', { email: body.email });
    const backendResponse = await fetch(`${BACKEND_ORIGIN}/api/admin/auth/login`, {
>>>>>>> 20452f22025a409c3bc9b142c94441513bb64a27
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });

    const responseText = await backendResponse.text();
    return new NextResponse(responseText, {
      status: backendResponse.status,
      headers: { 'Content-Type': backendResponse.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error('❌ Backend connection error during admin login:', error);
    return NextResponse.json(
      { success: false, message: 'Backend inaccessible. Vérifiez le déploiement Railway et BACKEND_URL sur Vercel.' },
      { status: 502 },
    );
  }
}

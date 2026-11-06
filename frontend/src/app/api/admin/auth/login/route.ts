import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_ORIGIN } from '@/lib/backend-url';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('🔐 Forwarding admin login request to backend:', { email: body.email });
    const backendResponse = await fetch(`${BACKEND_ORIGIN}/api/admin/auth/login`, {
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

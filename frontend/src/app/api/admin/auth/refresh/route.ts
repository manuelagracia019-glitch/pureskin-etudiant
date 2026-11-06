import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_ORIGIN } from '@/lib/backend-url';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendResponse = await fetch(`${BACKEND_ORIGIN}/api/admin/auth/refresh`, {
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
    console.error('Backend connection error during token refresh:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur de connexion au serveur backend.' },
      { status: 502 },
    );
  }
}

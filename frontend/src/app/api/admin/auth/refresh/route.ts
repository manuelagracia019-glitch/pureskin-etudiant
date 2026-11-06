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
    
    // Forward the request to the backend
    const backendResponse = await fetch(`${BACKEND_URL}/api/admin/auth/refresh`, {
=======
    const backendResponse = await fetch(`${BACKEND_ORIGIN}/api/admin/auth/refresh`, {
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
    console.error('Backend connection error during token refresh:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur de connexion au serveur backend.' },
      { status: 502 },
    );
  }
}

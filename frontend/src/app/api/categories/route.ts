import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_API_URL } from '@/lib/backend-url';

export async function GET(_request: NextRequest) {
  try {
    const backendResponse = await fetch(`${BACKEND_API_URL}/categories`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });

    const body = await backendResponse.text();
    return new NextResponse(body, {
      status: backendResponse.status,
      headers: { 'Content-Type': backendResponse.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error('Category backend request failed:', error);
    return NextResponse.json(
      { success: false, message: 'Backend inaccessible lors du chargement des catégories.' },
      { status: 502 },
    );
  }
}

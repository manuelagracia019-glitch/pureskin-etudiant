import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { BACKEND_URL } from '@/lib/backend-url';
=======
import { BACKEND_API_URL } from '@/lib/backend-url';
>>>>>>> 20452f22025a409c3bc9b142c94441513bb64a27

export async function GET(_request: NextRequest) {
  try {
<<<<<<< HEAD
    console.log('📂 Fetching categories...');
    
    // Try to get from backend first
    try {
      const backendResponse = await fetch(`${BACKEND_URL}/api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
=======
    const backendResponse = await fetch(`${BACKEND_API_URL}/categories`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
>>>>>>> 20452f22025a409c3bc9b142c94441513bb64a27

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

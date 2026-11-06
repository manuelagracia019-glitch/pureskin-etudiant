import { NextRequest, NextResponse } from 'next/server';
import { BACKEND_ORIGIN } from '@/lib/backend-url';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const token = request.headers.get('authorization');
    const headers = new Headers();
    if (token) headers.set('Authorization', token);

    const backendResponse = await fetch(`${BACKEND_ORIGIN}/api/admin/products`, {
      method: 'POST',
      headers,
      body: formData,
      signal: AbortSignal.timeout(30000),
    });

    const body = await backendResponse.text();
    return new NextResponse(body, {
      status: backendResponse.status,
      headers: { 'Content-Type': backendResponse.headers.get('content-type') || 'application/json' },
    });
  } catch (error) {
    console.error('Product backend request failed:', error);
    return NextResponse.json(
      { success: false, message: 'Backend inaccessible lors de la création du produit.' },
      { status: 502 },
    );
  }
}

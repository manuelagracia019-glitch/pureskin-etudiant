import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { BACKEND_URL } from '@/lib/backend-url';
=======
import { BACKEND_ORIGIN } from '@/lib/backend-url';
>>>>>>> 20452f22025a409c3bc9b142c94441513bb64a27

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

<<<<<<< HEAD
    // Try to save to backend first
    try {
      const backendFormData = new FormData();
      backendFormData.append('name', name);
      backendFormData.append('slug', slug);
      backendFormData.append('description', description);
      backendFormData.append('price', price);
      if (original_price) backendFormData.append('original_price', original_price);
      if (category_id) backendFormData.append('category_id', category_id);
      if (badge) backendFormData.append('badge', badge);
      backendFormData.append('stock_quantity', stock_quantity);
      backendFormData.append('is_active', is_active.toString());
      backendFormData.append('is_featured', is_featured.toString());
      if (imagePath) backendFormData.append('image', imagePath);
      
      // Add categories
      categoryIds.forEach(catId => {
        backendFormData.append('categoryIds[]', catId);
      });

      const backendResponse = await fetch(`${BACKEND_URL}/api/admin/products`, {
        method: 'POST',
        body: backendFormData,
      });

      if (backendResponse.ok) {
        const result = await backendResponse.json();
        console.log('✅ Product created in backend:', result);
        return NextResponse.json(result);
      } else {
        console.log('⚠️ Backend not available, using fallback');
      }
    } catch (backendError) {
      console.log('⚠️ Backend connection failed, using fallback');
    }

    // Fallback: Create product locally
    const newProduct = {
      id: Date.now(),
      name,
      slug,
      description,
      price: parseFloat(price),
      original_price: original_price ? parseFloat(original_price) : null,
      category_id: category_id ? parseInt(category_id) : null,
      categoryIds: categoryIds.map(id => parseInt(id)),
      badge,
      stock_quantity: parseInt(stock_quantity),
      is_active,
      is_featured,
      image: imagePath || '/images/products/placeholder.jpg',
      rating_average: 0,
      review_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('✅ Product created locally:', newProduct);
    return NextResponse.json(newProduct);
    
=======
    const body = await backendResponse.text();
    return new NextResponse(body, {
      status: backendResponse.status,
      headers: { 'Content-Type': backendResponse.headers.get('content-type') || 'application/json' },
    });
>>>>>>> 20452f22025a409c3bc9b142c94441513bb64a27
  } catch (error) {
    console.error('Product backend request failed:', error);
    return NextResponse.json(
      { success: false, message: 'Backend inaccessible lors de la création du produit.' },
      { status: 502 },
    );
  }
}

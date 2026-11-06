// Utilitaire pour gérer les URLs des images de produits
import { BACKEND_ORIGIN } from '@/lib/backend-url';

export const getProductImageUrl = (product?: any): string | null => {
  if (typeof product === 'string') {
    if (!product) return null;
    if (product.startsWith('http')) return product;
    if (product.startsWith('/api/admin/products/images/')) return `${BACKEND_ORIGIN}${product}`;
    return null;
  }

  if (!product) return null;
  const imageUrl = product.imageUrl || product.image;
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('/api/admin/products/images/')) return `${BACKEND_ORIGIN}${imageUrl}`;
  if (imageUrl.includes('api/admin/products/images/')) {
    return `${BACKEND_ORIGIN}/${imageUrl.replace(/^\/+/, '')}`;
  }
  return null;
};

import { BACKEND_URL } from "@/lib/backend-url";

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
<<<<<<< HEAD

  // Si l'URL est déjà une URL complète (commence par http), la retourner telle quelle
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // Si l'URL commence par /api/admin/products/images/, c'est une image du backend
  if (imageUrl.startsWith('/api/admin/products/images/')) {
    return BACKEND_URL + imageUrl;
  }

  // Si l'URL contient api/admin/products/images/, c'est une image du backend
  if (imageUrl.includes('api/admin/products/images/')) {
    return imageUrl.startsWith('http') ? imageUrl : `${BACKEND_URL}/${imageUrl.replace(/^\/+/, '')}`;
=======
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('/api/admin/products/images/')) return `${BACKEND_ORIGIN}${imageUrl}`;
  if (imageUrl.includes('api/admin/products/images/')) {
    return `${BACKEND_ORIGIN}/${imageUrl.replace(/^\/+/, '')}`;
>>>>>>> 20452f22025a409c3bc9b142c94441513bb64a27
  }
  return null;
};

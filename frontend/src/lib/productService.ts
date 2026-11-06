import { BACKEND_API_URL } from './backend-url';
import { Product } from './api';

class ProductService {
  private readonly API_BASE_URL = BACKEND_API_URL;

  // Récupérer tous les produits depuis le backend
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  // Récupérer un produit par son ID
  async getProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      return null;
    }
  }

  // Mettre à jour les prix des articles dans le panier depuis le backend
  async updateCartPrices(): Promise<void> {
    try {
      console.log('🔄 Mise à jour des prix du panier depuis le backend...');
      const backendProducts = await this.getAllProducts();
      const productMap = new Map(backendProducts.map(p => [p.id, p]));
      const cartState = cartService.getCart();
      let updatedItems = false;

      for (const item of cartState.items) {
        const backendProduct = productMap.get(item.id);
        if (backendProduct && backendProduct.price !== item.price) {
          console.log(`🔄 Mise à jour prix pour ${item.name}: ${item.price} → ${backendProduct.price}`);
          item.price = backendProduct.price;
          updatedItems = true;
        }
      }

      if (updatedItems) {
        cartService.getCart();
        console.log('✅ Prix du panier mis à jour');
      } else {
        console.log('ℹ️ Les prix du panier sont déjà à jour');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour des prix:', error);
    }
  }
}

export const productService = new ProductService();

// Importer cartService pour éviter les dépendances circulaires
import { cartService } from './cart';

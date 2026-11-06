BEGIN;

-- Catégories
INSERT INTO public.categories (name, slug, description, icon)
VALUES
    ('Nettoyants', 'nettoyants', 'Produits pour nettoyer le visage.', 'sparkles'),
    ('Hydratants', 'hydratants', 'Crèmes et soins hydratants.', 'droplet'),
    ('Sérums', 'serums', 'Sérums pour compléter la routine de soin.', 'flask'),
    ('Protection solaire', 'protection-solaire', 'Produits de protection solaire.', 'sun'),
    ('Masques', 'masques', 'Masques et soins ponctuels pour le visage.', 'mask')
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    updated_at = CURRENT_TIMESTAMP;

-- Produits
INSERT INTO public.products (
    category_id,
    name,
    slug,
    description,
    price,
    original_price,
    image,
    image_url,
    badge,
    stock_quantity,
    is_active,
    is_featured,
    rating_average,
    review_count,
    category,
    is_promotional
)
SELECT
    c.id,
    p.name,
    p.slug,
    p.description,
    p.price,
    NULL,
    NULL,
    NULL,
    NULL,
    p.stock_quantity,
    TRUE,
    p.is_featured,
    0,
    0,
    c.name,
    FALSE
FROM (
    VALUES
        ('Gel nettoyant doux', 'gel-nettoyant-doux',
         'Nettoyant visage doux pour le soin quotidien.',
         4500.00, 25, TRUE, 'nettoyants'),

        ('Mousse nettoyante visage', 'mousse-nettoyante-visage',
         'Mousse légère pour nettoyer la peau.',
         5000.00, 20, FALSE, 'nettoyants'),

        ('Crème hydratante quotidienne', 'creme-hydratante-quotidienne',
         'Crème visage hydratante pour une utilisation quotidienne.',
         6500.00, 30, TRUE, 'hydratants'),

        ('Lait corporel nourrissant', 'lait-corporel-nourrissant',
         'Lait corporel pour hydrater et adoucir la peau.',
         7000.00, 18, FALSE, 'hydratants'),

        ('Sérum éclat vitamine C', 'serum-eclat-vitamine-c',
         'Sérum visage pour compléter une routine beauté.',
         8500.00, 15, TRUE, 'serums'),

        ('Sérum hydratant à l’acide hyaluronique', 'serum-hydratant-acide-hyaluronique',
         'Sérum hydratant à appliquer avant la crème.',
         8000.00, 20, FALSE, 'serums'),

        ('Crème solaire visage SPF 50', 'creme-solaire-visage-spf-50',
         'Crème solaire visage à utiliser selon les indications du produit.',
         9000.00, 22, TRUE, 'protection-solaire'),

        ('Fluide solaire léger SPF 30', 'fluide-solaire-leger-spf-30',
         'Fluide solaire léger pour la routine de jour.',
         7500.00, 16, FALSE, 'protection-solaire'),

        ('Masque visage à l’argile', 'masque-visage-argile',
         'Masque visage à utiliser occasionnellement selon les indications.',
         5500.00, 12, FALSE, 'masques'),

        ('Masque hydratant visage', 'masque-hydratant-visage',
         'Masque de soin hydratant pour le visage.',
         6000.00, 14, FALSE, 'masques')
) AS p(name, slug, description, price, stock_quantity, is_featured, category_slug)
JOIN public.categories c ON c.slug = p.category_slug
ON CONFLICT (slug) DO UPDATE SET
    category_id = EXCLUDED.category_id,
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    stock_quantity = EXCLUDED.stock_quantity,
    is_active = EXCLUDED.is_active,
    is_featured = EXCLUDED.is_featured,
    category = EXCLUDED.category,
    is_promotional = EXCLUDED.is_promotional,
    updated_at = CURRENT_TIMESTAMP;

-- Associer les produits à leurs catégories
INSERT INTO public.products_categories (product_id, category_id)
SELECT id, category_id
FROM public.products
WHERE category_id IS NOT NULL
ON CONFLICT (product_id, category_id) DO NOTHING;

COMMIT;
# Rakan web (React MVP)
Run: `npm install` then `npm run dev`. Check types and build: `npm run build`.

## Where things live
- `src/components`  reusable pieces (Navbar, ProductCard, CartDrawer...)
- `src/pages`       one file per page, routes are listed in `src/App.tsx`
- `src/services`    the ONLY place that talks to data. Swap the mock for `fetch` when the API exists
- `src/hooks`       React Query hooks that components use
- `src/data`        mock categories and products
- `src/types`       shared types, they mirror the future database models
- `src/config.ts`   store name, phone, free-delivery amount

## Common changes
- Add a product: add a line in `src/data/rawProducts.ts`. Add its photo by setting `image` in `products.ts`.
- Change page width: `src/components/Container.tsx`.
- Change colors: `@theme` block in `src/index.css`.

## Pages
- `/` Home: hero, category cards, 10 products (`FeaturedProducts.tsx`)
- `/shop` Shop: every product with filters. Category cards link to `/shop?category=veg` etc.
- Category photos: put images in `public/categories/` and set `image: '/categories/veg.jpg'` in `src/data/categories.ts`.

import { CategoryGrid } from "../components/CategoryGrid";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { HeroBanner } from "../components/HeroBanner";

// Home: hero, then categories, then a short list of products.
export function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
}

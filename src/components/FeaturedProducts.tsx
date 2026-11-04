import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Container } from "./Container";
import { Message } from "./Message";
import { ProductGrid, ProductGridSkeleton } from "./ProductGrid";

const HOME_PRODUCT_COUNT = 10; // how many products the Home page shows. Use 8 or 12 if you prefer.

export function FeaturedProducts() {
  const { data, isLoading, isError, refetch } = useProducts({ sort: "rating" });

  return (
    <Container className="mt-14">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold text-brand">Fresh picks for you</h2>
      </div>
      {isLoading && <ProductGridSkeleton />}
      {isError && (
        <Message
          title="Could not load products"
          text="Check your connection and try again."
          action={{ label: "Try again", onClick: () => refetch() }}
        />
      )}
      {data && <ProductGrid products={data.slice(0, HOME_PRODUCT_COUNT)} />}
      <div className="mt-12 text-center">
        <Link
          to="/shop"
          className="inline-block rounded-xl bg-brand px-12 py-4  font-semibold text-white transition hover:bg-brand-light"
        >
          Explore all products
        </Link>
      </div>
    </Container>
  );
}

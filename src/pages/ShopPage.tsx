import { useSearchParams } from "react-router-dom";
import { Container } from "../components/Container";
import { FilterBar } from "../components/FilterBar";
import { Message } from "../components/Message";
import { ProductGrid, ProductGridSkeleton } from "../components/ProductGrid";
import { CATEGORIES } from "../data/categories";
import { useProducts } from "../hooks/useProducts";
import type { ProductQuery, SortKey } from "../types";

export function ShopPage() {
  const [params, setParams] = useSearchParams();
  const query: ProductQuery = {
    category: params.get("category") ?? undefined,
    q: params.get("q") ?? undefined,
    sort: (params.get("sort") ?? "featured") as SortKey,
    offersOnly: params.get("offers") === "1",
    price: (params.get("price") ?? undefined) as ProductQuery["price"],
    minRating: params.get("rating") ? Number(params.get("rating")) : undefined,
  };
  const { data, isLoading, isError, refetch } = useProducts(query);

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const title = query.q
    ? `Results for "${query.q}"`
    : (CATEGORIES.find((c) => c.id === query.category)?.name ?? "All products");

  return (
    <>
      <Container className="mt-10">
        <h2 id="products" className="mb-4 scroll-mt-32 text-3xl font-bold">
          {title}
        </h2>
        <FilterBar
          params={params}
          onChange={update}
          total={data?.length ?? 0}
        />
        {isLoading && <ProductGridSkeleton />}
        {isError && (
          <Message
            title="Could not load products"
            text="Check your connection and try again."
            action={{ label: "Try again", onClick: () => refetch() }}
          />
        )}
        {data && data.length === 0 && (
          <Message
            title="No products found"
            text="Clear a filter or try a shorter search word."
            action={{ label: "Clear filters", onClick: () => setParams({}) }}
          />
        )}
        {data && data.length > 0 && <ProductGrid products={data} />}
      </Container>
    </>
  );
}

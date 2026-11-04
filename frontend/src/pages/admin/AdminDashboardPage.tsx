import { Link } from "react-router-dom";
import { useAdminCategories, useAdminProducts } from "../../hooks/useAdmin";
import { formatPrice } from "../../utils/format";
import { PageHeader } from "../../components/admin/PageHeader";

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-3xl font-bold text-brand">{value}</p>
    </div>
  );
}

export function AdminDashboardPage() {
  const { data: categories = [], isLoading: loadingC } = useAdminCategories();
  const { data: products = [], isLoading: loadingP } = useAdminProducts();

  if (loadingC || loadingP) {
    return <div className="h-64 animate-pulse rounded-2xl bg-white" />;
  }

  const counts = categories.map((category) => ({
    ...category,
    total: products.filter((product) => product.categoryId === category.id)
      .length,
  }));

  const biggest = Math.max(1, ...counts.map((category) => category.total));

  const latest = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  const productsWithStockThreshold = products.filter(
    (product) => product.minQuantity > 0,
  ).length;

  return (
    <>
      <PageHeader
        title="Dashboard"
        text="A quick look at your store’s products and categories."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Products" value={products.length} />
        <Stat label="Categories" value={categories.length} />
        <Stat
          label="Products with stock thresholds"
          value={productsWithStockThreshold}
        />
        <Stat
          label="Empty categories"
          value={counts.filter((category) => category.total === 0).length}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Products per category</h2>
            <Link
              to="/admin/categories"
              className="text-sm font-semibold text-brand hover:underline"
            >
              Manage
            </Link>
          </div>

          <ul className="space-y-3">
            {counts.map((category) => (
              <li key={category.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="text-muted">{category.total}</span>
                </div>

                <div className="h-2 rounded-full bg-card">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(category.total / biggest) * 100}%`,
                      background: category.color,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Latest products</h2>
            <Link
              to="/admin/products"
              className="text-sm font-semibold text-brand hover:underline"
            >
              Manage
            </Link>
          </div>

          <ul className="divide-y divide-line">
            {latest.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                <span className="truncate">{product.name}</span>
                <span className="shrink-0 font-semibold">
                  {formatPrice(product.price)} JOD
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

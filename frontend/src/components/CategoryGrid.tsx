import { Apple, Beef, Carrot, CupSoda, Milk, Wheat } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import { useProducts } from "../hooks/useProducts";
import { Container } from "./Container";

const ICONS = { Carrot, Apple, Beef, Milk, CupSoda, Wheat };

// A row of colored category cards. It scrolls sideways on small screens.
// Clicking a card opens the Shop page filtered by that category.
export function CategoryGrid() {
  const { data } = useProducts({});
  const countOf = (id: string) =>
    data?.filter((p) => p.categoryId === id).length;

  return (
    <Container className="mt-12">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-brand">Shop by categories</h2>
      </div>

      <ul className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4">
        {CATEGORIES.map((c) => {
          const Icon = ICONS[c.icon];
          const count = countOf(c.id);
          return (
            <li
              key={c.id}
              className="w-40 shrink-0 sm:w-44 xl:w-auto xl:flex-1"
            >
              <Link
                to={`/shop?category=${c.id}`}
                className="group relative block h-60 overflow-hidden rounded-2xl text-center text-white transition hover:-translate-y-1 hover:shadow-lg"
                style={{ background: c.color }}
              >
                <div className="relative z-10 px-3 pt-5">
                  <h3 className="text-lg font-semibold leading-tight">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs text-white/80">
                    {count !== undefined ? `${count} items` : "\u00A0"}
                  </p>
                </div>

                {c.image ? (
                  <img
                    src={c.image}
                    alt=""
                    className="absolute inset-x-0 bottom-0 h-3/5 w-full object-contain object-bottom transition group-hover:scale-105"
                  />
                ) : (
                  <Icon
                    size={72}
                    strokeWidth={1.3}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/35 transition group-hover:scale-110"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

// import { MapPin, Search, ShoppingCart } from "lucide-react";
// import type { FormEvent } from "react";
// import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";

// import { STORE } from "../config";
// import { useCart } from "../context/CartContext";
// import { Container } from "./Container";

// export function Navbar() {
//   const { count, open } = useCart();
//   const navigate = useNavigate();
//   const [params] = useSearchParams();

//   const onSearch = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
//     navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
//   };

//   return (
//     <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
//       {/* Full-width main navbar */}
//       <div className="border-b border-neutral-100">
//         <Container>
//           <div className="flex items-center gap-3 py-3 sm:gap-6">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="flex shrink-0 items-center gap-2 text-xl font-extrabold text-brand"
//             >
//               <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-base text-accent">
//                 R
//               </span>
//               <span>{STORE.name}</span>
//             </Link>

//             {/* Delivery Location */}
//             <div className="hidden shrink-0 items-center gap-2 sm:flex">
//               <MapPin size={19} className="text-brand" strokeWidth={2} />
//               <div className="leading-tight">
//                 <span className="block text-[11px] text-muted">
//                   Delivering to
//                 </span>
//                 <span className="block text-sm font-semibold text-neutral-900">
//                   Irbid, Jordan
//                 </span>
//               </div>
//             </div>

//             {/* Search */}
//             <form
//               onSubmit={onSearch}
//               role="search"
//               className="ml-auto flex h-10 min-w-0 max-w-[620px] flex-1 items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-4 transition focus-within:border-brand/30 focus-within:bg-white"
//             >
//               <Search size={17} className="shrink-0 text-muted" />
//               <input
//                 key={params.get("q") ?? ""}
//                 name="q"
//                 defaultValue={params.get("q") ?? ""}
//                 placeholder="Search products..."
//                 className="w-full min-w-0 bg-transparent text-sm text-black outline-none placeholder:text-neutral-500"
//               />
//             </form>

//             {/* Cart */}
//             <button
//               onClick={open}
//               aria-label={`Open cart, ${count} items`}
//               className="relative flex h-10 shrink-0 items-center gap-2 rounded-full bg-brand px-3 text-white transition hover:bg-brand-light sm:px-4"
//             >
//               <ShoppingCart size={19} strokeWidth={2} />
//               <span className="hidden text-sm font-semibold sm:inline">
//                 Cart
//               </span>

//               {count > 0 && (
//                 <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-brand">
//                   {count}
//                 </span>
//               )}
//             </button>
//           </div>
//         </Container>
//       </div>

//       {/* Full-width secondary navigation */}
//       <nav aria-label="Main navigation" className="bg-white">
//         <Container>
//           <div className="flex items-center gap-2 py-1 sm:gap-6">
//             <NavLink
//               to="/"
//               end
//               className={({ isActive }) =>
//                 `border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
//                   isActive
//                     ? "border-brand text-brand"
//                     : "border-transparent text-neutral-600 hover:text-brand"
//                 }`
//               }
//             >
//               Home
//             </NavLink>

//             <NavLink
//               to="/shop"
//               className={({ isActive }) =>
//                 `border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
//                   isActive
//                     ? "border-brand text-brand"
//                     : "border-transparent text-neutral-600 hover:text-brand"
//                 }`
//               }
//             >
//               Shop
//             </NavLink>
//           </div>
//         </Container>
//       </nav>
//     </header>
//   );
// }

import { MapPin, Search, ShoppingCart } from "lucide-react";
import type { FormEvent } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";

import { STORE } from "../config";
import { useCart } from "../context/CartContext";
import { Container } from "./Container";

export function Navbar() {
  const { count, open } = useCart();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const q = String(new FormData(e.currentTarget).get("q") ?? "").trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      {/* Main Navbar */}
      <div className="bg-neutral-50/90 backdrop-blur-md ">
        <Container>
          <div className="flex items-center gap-3 py-3 sm:gap-6">
            {/* Logo */}
            <Link
              to="/"
              className="flex shrink-0 items-center gap-2 text-xl font-extrabold text-brand"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-base font-bold text-white">
                R
              </span>
              <span>{STORE.name}</span>
            </Link>

            {/* Delivery Location */}
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <MapPin size={19} className="text-brand" strokeWidth={2} />
              <div className="leading-tight">
                <span className="block text-[11px] text-neutral-500">
                  Delivering to
                </span>
                <span className="block text-sm font-semibold text-neutral-900">
                  Irbid, Jordan
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <form
              onSubmit={onSearch}
              role="search"
              className="ml-auto flex h-10 min-w-0 max-w-[620px] flex-1 items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100/80 px-4 transition focus-within:border-brand focus-within:bg-white focus-within:ring-2 focus-within:ring-brand/10"
            >
              <Search size={17} className="shrink-0 text-neutral-400" />
              <input
                key={params.get("q") ?? ""}
                name="q"
                defaultValue={params.get("q") ?? ""}
                placeholder="Search products..."
                className="w-full min-w-0 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
              />
            </form>

            {/* Cart Button */}
            <button
              onClick={open}
              aria-label={`Open cart, ${count} items`}
              className="relative flex h-10 shrink-0 items-center gap-2 rounded-full bg-brand px-4 text-white transition hover:bg-brand/90"
            >
              <ShoppingCart size={19} strokeWidth={2} />
              <span className="hidden text-sm font-semibold sm:inline">
                Cart
              </span>

              {count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-brand">
                  {count}
                </span>
              )}
            </button>
          </div>
        </Container>
      </div>

      {/* Secondary Navigation */}
      <nav aria-label="Main navigation" className="bg-white">
        <Container>
          <div className="flex items-center gap-2 py-1 sm:gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-brand text-brand"
                    : "border-transparent text-neutral-600 hover:text-brand"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-brand text-brand"
                    : "border-transparent text-neutral-600 hover:text-brand"
                }`
              }
            >
              Shop
            </NavLink>
          </div>
        </Container>
      </nav>
    </header>
  );
}

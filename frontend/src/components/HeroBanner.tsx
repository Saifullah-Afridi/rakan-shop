import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "./Container";

export function HeroBanner() {
  return (
    <Container className="mt-10">
      <section className="flex items-center justify-between gap-6 overflow-hidden rounded-3xl bg-brand px-6 py-8 text-white sm:px-12 sm:py-10 xl:px-16 xl:py-12">
        {/* Hero Content */}
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl xl:text-5xl">
            Fresh groceries, <span className="text-accent">delivered</span> to
            your door.
          </h1>

          <p className="mt-4 max-w-md text-sm text-green-100/80">
            From fresh vegetables and juicy fruits to local Baladi meats, dairy,
            and everyday essentials, Rakan&apos;s brings quality groceries and
            fresh ingredients to your home.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-brand transition hover:brightness-95"
          >
            Shop fresh products
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grocery Basket Illustration */}
        <svg
          viewBox="0 0 360 240"
          role="img"
          aria-label="Basket of fresh vegetables and fruit"
          className="hidden w-[38%] max-w-md shrink-0 sm:block"
        >
          <path
            d="M78 130c0-120 204-120 204 0"
            fill="none"
            stroke="#9c6329"
            strokeWidth="11"
          />

          <circle cx="96" cy="100" r="30" fill="#3a9d4a" />
          <circle cx="135" cy="112" r="34" fill="#d62828" />
          <circle cx="195" cy="100" r="38" fill="#e23a2e" />
          <circle cx="160" cy="68" r="27" fill="#f5a623" />

          <ellipse cx="245" cy="105" rx="38" ry="27" fill="#f4d03f" />

          <ellipse
            cx="228"
            cy="62"
            rx="48"
            ry="14"
            fill="#2f7d32"
            transform="rotate(-22 228 62)"
          />

          <path d="M52 122h256l-30 104H82z" fill="#c98a45" />

          <path
            d="M70 150h220M76 178h208M82 206h196"
            stroke="#a96d2e"
            strokeWidth="5"
          />
        </svg>
      </section>
    </Container>
  );
}

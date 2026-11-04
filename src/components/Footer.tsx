import { Container } from "./Container";
import { STORE } from "../config";
import { MapPin, Phone, Clock, CreditCard } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20">
      {/* Main Footer */}
      <div className="border-t border-white/10 bg-brand text-white">
        <Container>
          <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold text-white">{STORE.name}</h3>

              <p className="mt-4 text-sm leading-relaxed text-white/80">
                Fresh vegetables, seasonal fruits, local Baladi meats, dairy
                products, and everyday essentials — all in one place.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Your trusted grocery store in Irbid, bringing fresh products
                from local farms and suppliers to your home.
              </p>
            </div>

            {/* Store Information */}
            <div>
              <h4 className="text-sm font-semibold text-white">
                Store Information
              </h4>

              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-2">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-accent" />
                  <span>University Street, near Al-Qubbah Circle, Irbid</span>
                </li>

                <li className="flex items-start gap-2">
                  <Clock size={17} className="mt-0.5 shrink-0 text-accent" />
                  <span>Daily, 7:00 AM – 12:00 midnight</span>
                </li>
              </ul>
            </div>

            {/* Delivery & Payment */}
            <div>
              <h4 className="text-sm font-semibold text-white">
                Delivery & Payment
              </h4>

              <p className="mt-4 text-sm leading-relaxed text-white/80">
                We deliver across Irbid, including Aidoun, Husn, Sarih, and
                surrounding districts.
              </p>

              <div className="mt-4 flex items-start gap-2">
                <CreditCard size={17} className="mt-0.5 shrink-0 text-accent" />

                <p className="text-sm leading-relaxed text-white/80">
                  Cash or card on delivery, CliQ, Visa, and MasterCard.
                </p>
              </div>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="text-sm font-semibold text-white">
                Customer Support
              </h4>

              <p className="mt-4 text-sm text-white/80">
                Have a question about your order?
              </p>

              <a
                href={`tel:${STORE.phone}`}
                className="mt-2 inline-block text-sm font-semibold text-accent transition hover:text-white"
              >
                <Phone size={14} className="mr-1 inline" />
                {STORE.phone}
              </a>

              <p className="mt-3 text-sm leading-relaxed text-white/80">
                We're here to help with your shopping and delivery needs.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright Section */}
      <div className="bg-white text-neutral-600">
        <Container>
          <div className="flex flex-col gap-3 border-t border-line py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {STORE.name}. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="/privacy" className="transition hover:text-brand">
                Privacy Policy
              </a>

              <a href="/terms" className="transition hover:text-brand">
                Terms of Service
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

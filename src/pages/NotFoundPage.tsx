import { Link } from "react-router-dom";
import { Container } from "../components/Container";
export function NotFoundPage() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white"
      >
        Back to the store
      </Link>
    </Container>
  );
}

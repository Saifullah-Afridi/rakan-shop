import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FormField, inputClass } from "../../components/admin/FormField";
import { STORE } from "../../config";
import { useAuth } from "../../context/AuthContext";

export function AdminLoginPage() {
  const { user, login } = useAuth();
  const from = (useLocation().state as { from?: string } | null)?.from ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Already signed in: go straight to the dashboard (or the page they asked for).
  if (user) return <Navigate to={from} replace />;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-brand p-12 text-white lg:flex">
        <div className="flex items-center gap-2 text-2xl font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-lg text-brand">R</span>
          {STORE.name}
        </div>
        <div>
          <h1 className="max-w-md text-4xl font-bold leading-tight">
            Manage your <span className="text-accent">fresh market</span> in one place
          </h1>
          <p className="mt-4 max-w-sm text-sm text-green-100/80">
            Add categories, update products and keep prices current for shoppers across Irbid.
          </p>
        </div>
        <p className="text-xs text-green-100/60">© 2026 {STORE.name}</p>
      </div>

      <div className="grid place-items-center bg-card p-6">
        <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl border border-line bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-brand">Admin sign in</h2>
            <p className="mt-1 text-sm text-muted">Enter your details to continue.</p>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-sale">
              {error}
            </p>
          )}

          <FormField label="Email">
            <input
              type="email"
              required
              autoFocus
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="admin@gmail.com"
            />
          </FormField>

          <FormField label="Password">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-0 top-0 grid h-10 w-11 place-items-center text-muted hover:text-black"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </FormField>

          <button
            type="submit"
            disabled={busy}
            className="h-11 w-full rounded-lg bg-brand font-semibold text-white transition hover:bg-brand-light disabled:opacity-50"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>

          {import.meta.env.DEV && (
            <p className="rounded-lg bg-card px-3 py-2 text-xs text-muted">
              Development login: admin@gmail.com / admin@gmail.com
            </p>
          )}
          <Link to="/" className="block text-center text-sm font-medium text-brand hover:underline">
            Back to the store
          </Link>
        </form>
      </div>
    </div>
  );
}

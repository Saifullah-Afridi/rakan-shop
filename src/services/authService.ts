// Mock login for the React-only stage.
// LATER: replace the body with  fetch("/api/auth/login", ...)  and let the server check a hashed password.
// The email and password below are visible in the browser code, so never reuse them for the real site.
const ADMIN = { email: "admin@gmail.com", password: "admin@gmail.com" };

export interface AdminUser {
  email: string;
  name: string;
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  await new Promise((r) => setTimeout(r, 400)); // pretend to be a network call
  if (email.trim().toLowerCase() !== ADMIN.email || password !== ADMIN.password) {
    throw new Error("Wrong email or password.");
  }
  return { email: ADMIN.email, name: "Admin" };
}

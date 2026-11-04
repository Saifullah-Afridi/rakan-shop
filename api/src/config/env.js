import "dotenv/config";

const required = ["DATABASE_URL", "JWT_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing environment variables: ${missing.join(", ")}\nCopy .env.example to .env and fill them in.`);
  process.exit(1);
}

// Every setting the app reads comes from here, so there is one place to look.
export const env = {
  port: Number(process.env.PORT ?? 4000),
  clientOrigins: (process.env.CLIENT_ORIGIN ?? "http://localhost:5173").split(","),
  jwtSecret: process.env.JWT_SECRET,
  adminEmail: process.env.ADMIN_EMAIL.trim().toLowerCase(),
  adminPassword: process.env.ADMIN_PASSWORD,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  bucket: process.env.SUPABASE_BUCKET ?? "rakan",
};

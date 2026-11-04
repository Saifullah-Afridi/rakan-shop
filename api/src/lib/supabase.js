import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

// Uses the service role key, so it must only ever run on the server.
export const supabase = createClient(env.supabaseUrl, env.supabaseKey, { auth: { persistSession: false } });

// One place that talks to the Rakan API. Services call api(); nothing else uses fetch directly.
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";
const TOKEN_KEY = "rakan-admin-token";
const SESSION_KEY = "rakan-admin-session"; // same key AuthContext uses

export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

interface Options {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown; // a FormData (files) or any object (sent as JSON)
}

export async function api<T>(path: string, { method = "GET", body }: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers.Authorization = `Bearer ${token}`;

  let payload: BodyInit | undefined;
  if (body instanceof FormData) {
    payload = body; // the browser sets the multipart header itself
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, { method, headers, body: payload });
  } catch {
    throw new Error("Cannot reach the server. Check that the API is running.");
  }

  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // An expired or invalid session: sign out and go to the login page.
    if (response.status === 401 && token) {
      clearToken();
      localStorage.removeItem(SESSION_KEY);
      window.location.assign("/admin/login");
    }
    throw new Error(data?.message ?? "Something went wrong. Try again.");
  }
  return data as T;
}

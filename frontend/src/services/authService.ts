import { api, setToken } from "./apiClient";

export interface AdminUser {
  email: string;
  name: string;
}

// The API checks the email and password and sends back a token for later requests.
export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  const { token, user } = await api<{ token: string; user: AdminUser }>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setToken(token);
  return user;
}

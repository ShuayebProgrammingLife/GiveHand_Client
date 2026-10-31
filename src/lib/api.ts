import {authClient} from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const { data } = await authClient.token();
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(data?.token ? { Authorization: `Bearer ${data.token}` } : {}),
      ...options.headers,
    },
  });
}

// Public API call (no token needed)
export async function publicFetch(path:string, options: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, options);
}
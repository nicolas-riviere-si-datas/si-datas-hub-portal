const BFF_URL = process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:3002';

export async function bffFetch<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BFF_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? `BFF error ${res.status}`);
  }
  return res.json();
}

export const bff = {
  get:    <T>(path: string, token: string) => bffFetch<T>(path, token),
  post:   <T>(path: string, token: string, body: unknown) =>
    bffFetch<T>(path, token, { method: 'POST', body: JSON.stringify(body) }),
  patch:  <T>(path: string, token: string, body: unknown) =>
    bffFetch<T>(path, token, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string, token: string) =>
    bffFetch<T>(path, token, { method: 'DELETE' }),
};

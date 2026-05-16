"use client";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export function useBff() {
  const { data: session } = useSession();
  const token = (session as any)?.accessToken as string | undefined;
  const bffUrl = process.env.NEXT_PUBLIC_BFF_URL ?? "http://localhost:3002";

  const get = useCallback(async (path: string) => {
    if (!token) throw new Error("No token");
    const res = await fetch(`${bffUrl}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`BFF error ${res.status}`);
    return res.json();
  }, [token, bffUrl]);

  const post = useCallback(async (path: string, body: unknown) => {
    if (!token) throw new Error("No token");
    const res = await fetch(`${bffUrl}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`BFF error ${res.status}`);
    return res.json();
  }, [token, bffUrl]);

  const patch = useCallback(async (path: string, body: unknown) => {
    if (!token) throw new Error("No token");
    const res = await fetch(`${bffUrl}${path}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`BFF error ${res.status}`);
    return res.json();
  }, [token, bffUrl]);

  return { get, post, patch, token };
}

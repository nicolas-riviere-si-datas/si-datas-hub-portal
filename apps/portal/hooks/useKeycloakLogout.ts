"use client";
import { useSession, signOut } from "next-auth/react";

export function useKeycloakLogout() {
  const { data: session } = useSession();

  return async () => {
    const idToken = (session as any)?.idToken;
    const keycloakLogoutUrl = `http://keycloak.si-datas.local/realms/client-a/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent("http://localhost:3000/login")}&id_token_hint=${idToken}`;
    await signOut({ redirect: false });
    window.location.href = keycloakLogoutUrl;
  };
}

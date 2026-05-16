"use client";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    signIn("keycloak", { callbackUrl: "/dashboard" });
  }, []);

  return (
    <div style={{
      height: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#fffdf9"
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "#f59e0b", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 20, fontWeight: 800, color: "#78350f",
          margin: "0 auto 16px"
        }}>W</div>
        <p style={{ color: "#78716c", fontSize: 14, fontFamily: "Arial" }}>
          Redirection vers Keycloak...
        </p>
      </div>
    </div>
  );
}

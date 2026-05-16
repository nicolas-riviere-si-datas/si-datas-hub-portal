"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { useKeycloakLogout } from "../../hooks/useKeycloakLogout";

const SIDEBAR_COLOR = "#78350f";
const ACCENT_COLOR  = "#f59e0b";
const TENANT_NAME   = "WIS Advantage Client A";
const CLIENT_ID     = "client-a";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const logout = useKeycloakLogout();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fffdf9" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#78350f", margin: "0 auto 16px" }}>W</div>
          <p style={{ color: "#78716c", fontSize: 14, fontFamily: "Arial" }}>Chargement...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;
  const userName = user?.name ?? "Utilisateur";
  const initials = userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        tenantName={TENANT_NAME}
        clientId={CLIENT_ID}
        logoIcon="W-A"
        logoIconUrl="/logos/client-a-icon.svg"
        logoUrl="/logos/client-a-full.svg"
        userName={userName}
        userRole="hub-admin"
        userInitials={initials}
        sidebarColor={SIDEBAR_COLOR}
        accentColor={ACCENT_COLOR}
        onSignOut={logout}
      />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <Topbar
          title="Dashboard"
          userRole="hub-admin"
          accentColor={ACCENT_COLOR}
          badgeBg="#fffbeb"
          badgeColor="#78350f"
        />
        <main style={{ flex: 1, overflowY: "auto", padding: 16, background: "var(--bg-main)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

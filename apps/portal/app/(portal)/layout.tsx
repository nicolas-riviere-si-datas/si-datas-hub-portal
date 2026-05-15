"use client";
import { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const CLIENT = {
    sidebarColor: "#78350f",
    accentColor:  "#f59e0b",
    clientId:     "client-a",
    tenantName:   "WIS Advantage Client A",
    logoIcon:     "W-A",
    logoIconUrl:  "/logos/client-a-icon.svg",
    logoUrl:      "/logos/client-a-full.svg",
    userName:     "Nicolas R.",
    userRole:     "hub-admin",
    userInitials: "NR",
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        tenantName={CLIENT.tenantName}
        clientId={CLIENT.clientId}
        logoIcon={CLIENT.logoIcon}
        logoIconUrl={CLIENT.logoIconUrl}
        logoUrl={CLIENT.logoUrl}
        userName={CLIENT.userName}
        userRole={CLIENT.userRole}
        userInitials={CLIENT.userInitials}
        sidebarColor={CLIENT.sidebarColor}
        accentColor={CLIENT.accentColor}
      />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <Topbar
          title="Dashboard"
          userRole={CLIENT.userRole}
          accentColor={CLIENT.accentColor}
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

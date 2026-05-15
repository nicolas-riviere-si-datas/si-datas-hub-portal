"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  {
    label: "Données",
    items: [
      { href: "/dashboard",      icon: "ti-layout-dashboard", label: "Dashboard"      },
      { href: "/golden-records", icon: "ti-database",         label: "Golden Records" },
      { href: "/monitoring",     icon: "ti-chart-bar",        label: "Monitoring"     },
    ],
  },
  {
    label: "Intégration",
    items: [
      { href: "/transcodification", icon: "ti-arrows-right-left", label: "Transcodification" },
      { href: "/gr-referential",    icon: "ti-list",              label: "GR Référentiel"    },
      { href: "/gouvernance",       icon: "ti-shield-check",      label: "Gouvernance"       },
    ],
  },
  {
    label: "Admin",
    items: [
      { href: "/users",       icon: "ti-users",    label: "Utilisateurs" },
      { href: "/parametrage", icon: "ti-settings", label: "Paramétrage"  },
    ],
  },
];

interface SidebarProps {
  tenantName: string;
  clientId: string;
  userName: string;
  userRole: string;
  userInitials: string;
  sidebarColor: string;
  accentColor: string;
  logoUrl?: string;       // URL logo complet (mode expanded)
  logoIconUrl?: string;   // URL logo icône/sigle (mode collapsed)
}

export default function Sidebar({
  tenantName, clientId, userName, userRole, userInitials,
  sidebarColor, accentColor, logoUrl, logoIconUrl
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const LogoCollapsed = () => (
    logoIconUrl
      ? <img src={logoIconUrl} alt="logo" style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 6 }} />
      : <div style={{ background: accentColor, color: sidebarColor, width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
          {tenantName.charAt(0)}
        </div>
  );

  const LogoExpanded = () => (
    logoUrl
      ? <img src={logoUrl} alt={tenantName} style={{ height: 32, maxWidth: 130, objectFit: "contain", objectPosition: "left" }} />
      : <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ background: accentColor, color: sidebarColor, width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
            {tenantName.charAt(0)}
          </div>
          <div>
            <div style={{ color: "white", fontSize: 12, fontWeight: 500 }}>{tenantName}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>{clientId}</div>
          </div>
        </div>
  );

  return (
    <div style={{ position: "relative", display: "flex", flexShrink: 0 }}>
      <aside style={{
        background: sidebarColor,
        width: collapsed ? 52 : 200,
        transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", minHeight: 56, display: "flex", alignItems: "center", padding: "0 12px" }}>
          {collapsed
            ? <LogoCollapsed />
            : <LogoExpanded />
          }
        </div>

        <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          {NAV.map((section) => (
            <div key={section.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", padding: "8px 12px 2px", opacity: collapsed ? 0 : 1, height: collapsed ? 0 : "auto", overflow: "hidden", transition: "opacity 0.15s" }}>
                {section.label}
              </div>
              {section.items.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "8px 0" : "7px 12px", justifyContent: collapsed ? "center" : "flex-start", minHeight: 36, textDecoration: "none", background: active ? "rgba(255,255,255,0.18)" : "transparent", transition: "background 0.12s" }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    title={collapsed ? item.label : undefined}
                  >
                    <i className={`ti ${item.icon}`} style={{ fontSize: 17, color: active ? "white" : "rgba(255,255,255,0.65)", flexShrink: 0, textAlign: "center", width: collapsed ? "auto" : 20 }} />
                    <span style={{ fontSize: 12, color: active ? "white" : "rgba(255,255,255,0.8)", fontWeight: active ? 500 : 400, opacity: collapsed ? 0 : 1, width: collapsed ? 0 : "auto", overflow: "hidden", whiteSpace: "nowrap", transition: "opacity 0.15s, width 0.25s" }}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: collapsed ? "8px 0" : "8px 12px", justifyContent: collapsed ? "center" : "flex-start", cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: accentColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: sidebarColor, flexShrink: 0 }}>
              {userInitials}
            </div>
            <div style={{ overflow: "hidden", opacity: collapsed ? 0 : 1, transition: "opacity 0.15s", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.9)" }}>{userName}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{userRole}</div>
            </div>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{ position: "absolute", top: 16, right: -12, width: 24, height: 24, borderRadius: "50%", background: sidebarColor, border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        aria-label="Toggle sidebar"
      >
        <i className={`ti ${collapsed ? "ti-chevron-right" : "ti-chevron-left"}`} style={{ fontSize: 11 }} />
      </button>
    </div>
  );
}

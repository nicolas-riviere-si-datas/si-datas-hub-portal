"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBff } from "../../../hooks/useBff";

export default function DashboardPage() {
  const { get } = useBff();
  const router = useRouter();
  const [grCount, setGrCount] = useState<number | null>(null);
  const [grActifs, setGrActifs] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get("/gr-referential")
      .then((data: any[]) => {
        setGrCount(data.length);
        setGrActifs(data.filter(g => g.is_active).length);
      })
      .catch(() => { setGrCount(0); setGrActifs(0); })
      .finally(() => setLoading(false));
  }, [get]);

  const tiles = [
    {
      label: "Golden Records",
      value: loading ? "..." : `${grActifs}`,
      sub: loading ? "" : `${grCount} déployés`,
      up: true,
      href: "/gr-referential",
      icon: "ti-database",
    },
    {
      label: "Clients actifs",
      value: "2",
      sub: "client-a + client-b",
      up: true,
      href: null,
      icon: "ti-building",
    },
    {
      label: "BFF Routes",
      value: "18",
      sub: "sécurisées JWT",
      up: true,
      href: null,
      icon: "ti-plug",
    },
    {
      label: "Keycloak",
      value: "OK",
      sub: "2 realms actifs",
      up: true,
      href: null,
      icon: "ti-shield-check",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {tiles.map((t) => (
          <div
            key={t.label}
            onClick={() => t.href && router.push(t.href)}
            style={{
              background: "var(--bg-surface)",
              border: "0.5px solid var(--border)",
              borderRadius: 8,
              padding: 14,
              cursor: t.href ? "pointer" : "default",
              transition: "opacity 0.15s",
              position: "relative",
            }}
            onMouseEnter={e => { if (t.href) (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ color: "var(--text-secondary)", fontSize: 11 }}>{t.label}</div>
              <i className={`ti ${t.icon}`} style={{ fontSize: 16, color: "var(--text-secondary)" }} />
            </div>
            <div style={{ color: "var(--text-primary)", fontSize: 24, fontWeight: 500 }}>{t.value}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
              <div style={{ fontSize: 10, color: t.up ? "#10b981" : "#ef4444" }}>{t.sub}</div>
              {t.href && <i className="ti ti-arrow-right" style={{ fontSize: 12, color: "var(--text-secondary)" }} />}
            </div>
          </div>
        ))}
      </div>

      <div style={{ border: "0.5px solid var(--border)", borderRadius: 8, padding: 24, textAlign: "center", background: "var(--bg-surface)" }}>
        <i className="ti ti-chart-bar" style={{ fontSize: 32, color: "var(--text-secondary)", marginBottom: 8, display: "block" }} />
        <div style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Monitoring des flux</div>
        <div style={{ color: "var(--text-secondary)", fontSize: 12 }}>Disponible après déploiement de Prometheus + Grafana</div>
      </div>
    </div>
  );
}

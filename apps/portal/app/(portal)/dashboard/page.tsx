"use client";
import { useEffect, useState } from "react";
import { useBff } from "../../../hooks/useBff";

interface GrRef {
  object_type: string;
  target_table: string;
  kafka_topic_raw: string | null;
  kafka_topic_golden: string | null;
  is_active: boolean;
  current_schema_version: string;
}

export default function DashboardPage() {
  const { get } = useBff();
  const [grList, setGrList] = useState<GrRef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    get("/gr-referential")
      .then(setGrList)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [get]);

  const actifs = grList.filter(g => g.is_active).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Métriques */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {[
          { label: "GR Actifs",    value: actifs.toString(),              trend: `sur ${grList.length} total`, up: true  },
          { label: "Clients",      value: "2",                            trend: "client-a + client-b",        up: true  },
          { label: "BFF Routes",   value: "18",                           trend: "securisees JWT",             up: true  },
          { label: "Keycloak",     value: "OK",                           trend: "2 realms actifs",            up: true  },
        ].map((m) => (
          <div key={m.label} style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border)", borderRadius: 8, padding: 12 }}>
            <div style={{ color: "var(--text-secondary)", fontSize: 10, marginBottom: 4 }}>{m.label}</div>
            <div style={{ color: "var(--text-primary)", fontSize: 22, fontWeight: 500 }}>{m.value}</div>
            <div style={{ fontSize: 10, marginTop: 4, color: m.up ? "#10b981" : "#ef4444" }}>{m.trend}</div>
          </div>
        ))}
      </div>

      {/* Tableau GR Référentiel */}
      <div style={{ border: "0.5px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ background: "var(--bg-surface)", borderBottom: "0.5px solid var(--border)", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "var(--text-primary)", fontSize: 13, fontWeight: 500 }}>Golden Records — Référentiel</span>
          {loading && <span style={{ color: "var(--text-secondary)", fontSize: 11 }}>Chargement...</span>}
          {error && <span style={{ color: "#ef4444", fontSize: 11 }}>{error}</span>}
        </div>

        <div style={{ display: "flex", padding: "6px 14px", background: "var(--bg-surface)", borderBottom: "0.5px solid var(--border)" }}>
          {["Type GR", "Table cible", "Topic Kafka RAW", "Version", "Statut"].map((h, i) => (
            <span key={h} style={{ color: "var(--text-secondary)", fontSize: 10, fontWeight: 500, flex: i === 0 ? 2 : 1 }}>{h}</span>
          ))}
        </div>

        {grList.length === 0 && !loading && (
          <div style={{ padding: 24, textAlign: "center", color: "var(--text-secondary)", fontSize: 13 }}>
            Aucune donnée — vérifiez la connexion BFF
          </div>
        )}

        {grList.map((gr, i) => (
          <div key={gr.object_type} style={{
            display: "flex", padding: "8px 14px", alignItems: "center",
            borderBottom: i < grList.length - 1 ? "0.5px solid var(--border)" : "none",
            background: "var(--bg-main)"
          }}>
            <span style={{ color: "var(--text-primary)", fontSize: 11, flex: 2, fontWeight: 500 }}>{gr.object_type}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 10, flex: 1 }}>{gr.target_table}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 10, flex: 1 }}>{gr.kafka_topic_raw ?? "—"}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 10, flex: 1 }}>{gr.current_schema_version}</span>
            <span style={{ flex: 1 }}>
              <span style={{
                fontSize: 9, padding: "2px 8px", borderRadius: 10,
                background: gr.is_active ? "#DCFCE7" : "#FEE2E2",
                color: gr.is_active ? "#166534" : "#991B1B"
              }}>
                {gr.is_active ? "Actif" : "Inactif"}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


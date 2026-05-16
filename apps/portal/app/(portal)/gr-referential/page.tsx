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
  retention_days: number;
}

export default function GrReferentialPage() {
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ color: "var(--text-primary)", fontSize: 16, fontWeight: 500, margin: 0 }}>GR Référentiel</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 12, margin: "4px 0 0" }}>
            {grList.length} Golden Records configurés — {grList.filter(g => g.is_active).length} actifs
          </p>
        </div>
        {loading && <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>Chargement...</span>}
        {error && <span style={{ color: "#ef4444", fontSize: 12 }}>{error}</span>}
      </div>

      <div style={{ border: "0.5px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "flex", padding: "8px 14px", background: "var(--bg-surface)", borderBottom: "0.5px solid var(--border)" }}>
          {["Type GR", "Table cible", "Topic RAW", "Topic Golden", "Version", "Rétention", "Statut"].map((h, i) => (
            <span key={h} style={{ color: "var(--text-secondary)", fontSize: 10, fontWeight: 500, flex: i === 0 ? 2 : 1 }}>{h}</span>
          ))}
        </div>

        {grList.length === 0 && !loading && (
          <div style={{ padding: 32, textAlign: "center", color: "var(--text-secondary)", fontSize: 13 }}>
            Aucune donnée
          </div>
        )}

        {grList.map((gr, i) => (
          <div key={gr.object_type} style={{
            display: "flex", padding: "10px 14px", alignItems: "center",
            borderBottom: i < grList.length - 1 ? "0.5px solid var(--border)" : "none",
            background: "var(--bg-main)"
          }}>
            <span style={{ color: "var(--text-primary)", fontSize: 12, flex: 2, fontWeight: 500 }}>{gr.object_type}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 11, flex: 1 }}>{gr.target_table}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 11, flex: 1 }}>{gr.kafka_topic_raw ?? "—"}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 11, flex: 1 }}>{gr.kafka_topic_golden ?? "—"}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 11, flex: 1 }}>{gr.current_schema_version}</span>
            <span style={{ color: "var(--text-secondary)", fontSize: 11, flex: 1 }}>{gr.retention_days}j</span>
            <span style={{ flex: 1 }}>
              <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 10,
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

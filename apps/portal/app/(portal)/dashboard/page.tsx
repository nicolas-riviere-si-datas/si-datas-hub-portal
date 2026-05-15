export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Commandes",  value: "1 247", trend: "↑ 12%",  up: true  },
          { label: "Clients",    value: "843",   trend: "↑ 4%",   up: true  },
          { label: "Flux OK",    value: "99.2%", trend: "↓ 0.3%", up: false },
          { label: "Transco",    value: "9",     trend: "stable",  up: true  },
        ].map((m) => (
          <div
            key={m.label}
            style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border)" }}
            className="rounded-lg p-3"
          >
            <div style={{ color: "var(--text-secondary)" }} className="text-[10px] mb-1">{m.label}</div>
            <div style={{ color: "var(--text-primary)" }} className="text-xl font-medium">{m.value}</div>
            <div className={`text-[10px] mt-1 ${m.up ? "text-emerald-500" : "text-red-500"}`}>{m.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ border: "0.5px solid var(--border)" }} className="rounded-lg overflow-hidden">
        <div style={{ background: "var(--bg-surface)", borderBottom: "0.5px solid var(--border)" }}
          className="flex px-3 py-2">
          {["Identifiant", "Type", "Source", "Statut"].map((h, i) => (
            <span key={h} style={{ color: "var(--text-secondary)" }}
              className={`text-[10px] font-medium ${i === 0 ? "flex-[2]" : "flex-1"}`}>{h}</span>
          ))}
        </div>
        {[
          { id: "ORD-2026-001", type: "SALES_ORDER", source: "SYLIUS",  status: "OK",     pill: "pill-ok"   },
          { id: "ORD-2026-002", type: "SALES_ORDER", source: "EGO_WMS", status: "Attente",pill: "pill-warn" },
          { id: "CUST-001",     type: "CUSTOMER",    source: "SYLIUS",  status: "OK",     pill: "pill-ok"   },
          { id: "PCL-001",      type: "PARCEL",      source: "EGO_WMS", status: "Erreur", pill: "pill-err"  },
        ].map((row) => (
          <div key={row.id} style={{ borderBottom: "0.5px solid var(--border)", background: "var(--bg-main)" }}
            className="flex px-3 py-2 items-center hover:opacity-90 cursor-pointer">
            <span style={{ color: "var(--text-primary)" }} className="text-[11px] flex-[2]">{row.id}</span>
            <span style={{ color: "var(--text-secondary)" }} className="text-[10px] flex-1">{row.type}</span>
            <span style={{ color: "var(--text-secondary)" }} className="text-[10px] flex-1">{row.source}</span>
            <span className="flex-1">
              <span className={`text-[9px] px-2 py-0.5 rounded-full ${
                row.pill === "pill-ok"   ? "bg-green-100 text-green-800"  :
                row.pill === "pill-warn" ? "bg-yellow-100 text-yellow-800" :
                                          "bg-red-100 text-red-800"
              }`}>{row.status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

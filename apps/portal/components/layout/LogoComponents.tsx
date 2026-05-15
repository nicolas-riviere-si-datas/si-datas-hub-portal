  const LogoCollapsed = () => (
    logoIconUrl
      ? <img src={logoIconUrl} alt="logo" style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 6 }} />
      : <div style={{ background: accentColor, color: sidebarColor, width: 32, height: 32, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0, letterSpacing: "-0.5px" }}>
          {tenantName.charAt(0)}
        </div>
  );

  const LogoExpanded = () => (
    logoUrl
      ? <img src={logoUrl} alt={tenantName} style={{ height: 36, maxWidth: 160, objectFit: "contain", objectPosition: "left" }} />
      : <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ background: accentColor, color: sidebarColor, width: 32, height: 32, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, flexShrink: 0 }}>
            {tenantName.charAt(0)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <span style={{ color: "white", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
              {tenantName}
            </span>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 9, whiteSpace: "nowrap", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {clientId}
            </span>
          </div>
        </div>
  );

"use client";
import { useEffect, useState } from "react";
import { applyUserTheme, getStoredTheme, type Theme } from "../../lib/theme";

interface TopbarProps {
  title: string;
  userRole: string;
  accentColor: string;
  badgeBg: string;
  badgeColor: string;
  onNewGR?: () => void;
}

export default function Topbar({ title, userRole, accentColor, badgeBg, badgeColor, onNewGR }: TopbarProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = getStoredTheme();
    setTheme(stored);
    applyUserTheme(stored);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
    applyUserTheme(next);
  }

  const themeIcon = theme === "dark" ? "ti-sun" : theme === "system" ? "ti-device-laptop" : "ti-moon";

  return (
    <header
      style={{ borderBottomColor: "var(--border)", background: "var(--bg-main)" }}
      className="h-12 flex items-center px-4 gap-3 border-b flex-shrink-0"
    >
      <h1 style={{ color: "var(--text-primary)" }} className="text-sm font-medium">{title}</h1>
      <span style={{ background: badgeBg, color: badgeColor }} className="text-[10px] px-2 py-0.5 rounded-full">
        {userRole}
      </span>
      <div className="ml-auto flex items-center gap-2">
        <button
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          className="text-[11px] px-3 py-1 rounded-md border bg-transparent flex items-center gap-1 hover:opacity-80"
        >
          <i className="ti ti-filter text-xs" /> Filtrer
        </button>
        {onNewGR && (
          <button
            style={{ background: accentColor }}
            className="text-[11px] px-3 py-1 rounded-md text-white flex items-center gap-1 hover:opacity-85"
            onClick={onNewGR}
          >
            <i className="ti ti-plus text-xs" /> Nouveau GR
          </button>
        )}
        <button
          onClick={toggleTheme}
          style={{ color: "var(--text-secondary)" }}
          className="w-8 h-8 rounded-md flex items-center justify-center hover:opacity-70"
          aria-label="Changer le thème"
        >
          <i className={`ti ${themeIcon} text-base`} />
        </button>
        <button
          style={{ color: "var(--text-secondary)" }}
          className="w-8 h-8 rounded-md flex items-center justify-center hover:opacity-70"
          aria-label="Notifications"
        >
          <i className="ti ti-bell text-base" />
        </button>
      </div>
    </header>
  );
}

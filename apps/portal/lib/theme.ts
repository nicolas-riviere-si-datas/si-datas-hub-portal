export type Theme = 'light' | 'dark' | 'system';

export const THEMES: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: 'Clair',   icon: 'ti-sun'    },
  { value: 'dark',  label: 'Sombre',  icon: 'ti-moon'   },
  { value: 'system',label: 'Système', icon: 'ti-device-laptop' },
];

export const TENANT_THEMES = [
  { name: 'amber',   sidebar: '#78350f', accent: '#f59e0b', badgeBg: '#fffbeb', label: 'Ambre'    },
  { name: 'indigo',  sidebar: '#1e1b4b', accent: '#4f46e5', badgeBg: '#eef2ff', label: 'Indigo'   },
  { name: 'emerald', sidebar: '#064e3b', accent: '#10b981', badgeBg: '#ecfdf5', label: 'Émeraude' },
  { name: 'rose',    sidebar: '#881337', accent: '#e11d48', badgeBg: '#fff1f2', label: 'Rose'      },
  { name: 'slate',   sidebar: '#0f172a', accent: '#3b82f6', badgeBg: '#eff6ff', label: 'Slate'     },
];

export function applyTenantTheme(sidebar: string, accent: string, badgeBg: string) {
  const root = document.documentElement;
  root.style.setProperty('--sidebar-bg', sidebar);
  root.style.setProperty('--accent', accent);
  root.style.setProperty('--badge-bg', badgeBg);
  root.style.setProperty('--badge-color', sidebar);
}

export function applyUserTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', theme);
  }
  localStorage.setItem('wilow-theme', theme);
}

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('wilow-theme') as Theme) ?? 'light';
}

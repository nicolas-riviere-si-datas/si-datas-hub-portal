import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TENANT_NAME ?? "WILOW SEOH",
  description: "Portail SI-DATAS — Hub de Golden Records",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

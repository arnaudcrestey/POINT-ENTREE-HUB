import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orientation stratégique | Arnaud Crestey",
  description: "Interface d'orientation entre SYSTIA, Cabinet Astraé et QLYK."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-sans">{children}</body>
    </html>
  );
}

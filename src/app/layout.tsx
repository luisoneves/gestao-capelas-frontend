// src/app/layout.tsx - VERSÃO COM DEBUG
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics 
          debug={true}
          mode={process.env.NODE_ENV === 'development' ? 'development' : 'production'}
        />
        <SpeedInsights />
      </body>
    </html>
  );
}

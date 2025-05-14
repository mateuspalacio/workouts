import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { GTM_ID } from "@/lib/gtm";
import { SidebarProvider } from "@/context/SidebarContext";
import LayoutShell from "@/components/LayoutShell";
import { dark } from "@clerk/themes";
import { ptBR } from "@clerk/localizations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SeuTreino — Treinos mensais com personal",
  description: "Treinos online mensais com vídeos, plano grátis e suporte do Alexandre Melo — personal com 30 anos de experiência.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR} appearance={{ baseTheme: dark }}>
      <html lang="pt-BR">
        <head>
          {/* GTM Script */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        </head>
        <body
          className={`
            ${geistSans.variable} ${geistMono.variable} antialiased
            bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]
            text-slate-100 min-h-screen relative
          `}
        >
          {/* Optional grain overlay */}
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0 pointer-events-none" />

          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

          <SidebarProvider>
            <LayoutShell>{children}</LayoutShell>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

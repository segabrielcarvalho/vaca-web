import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VACA - Ambiente Virtual de Correção de Avaliações",
  description:
    "Painel administrativo da Vaca-Web: crie, gerencie e acompanhe provas e gabaritos em tempo real.",
  authors: [{ name: "Equipe Vaca-Web", url: "https://vaca-web.com.br" }],
  openGraph: {
    title: "Vaca-Web • Painel Administrativo",
    description:
      "Gerencie avaliações, gabaritos e métricas em tempo real com o painel administrativo da Vaca-Web.",
    url: "https://admin.vaca-web.com.br",
    siteName: "Vaca-Web",
    images: [
      {
        url: "/og-image-admin.png",
        width: 1200,
        height: 630,
        alt: "Dashboard administrativo da Vaca-Web",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "light",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-br"
      className={`${inter.variable} light antialiased h-full w-full overflow-x-hidden`}
    >
      <meta name="color-scheme" content="light" />
      <body className="min-w-0 h-full w-full overflow-x-hidden bg-white text-zinc-900 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

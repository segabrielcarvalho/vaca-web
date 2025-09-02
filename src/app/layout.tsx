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
  title: "Vaca-Web | Admin",
  description:
    "Painel de administração da Vaca-Web: gerencie, crie e analise provas e gabaritos em tempo real.",
  authors: [{ name: "Equipe Vaca-Web", url: "https://vaca-web.com.br" }],
  openGraph: {
    title: "Vaca-Web Admin • Admin",
    description:
      "Painel de controle para gerenciar provas e gabaritos da Vaca-Web: crie avaliações, acompanhe métricas e performance em tempo real.",
    url: "https://admin.vaca-web.com.br",
    siteName: "Vaca-Web Admin",
    images: [
      {
        url: "/og-image-admin.png",
        width: 1200,
        height: 630,
        alt: "Vaca-Web Admin Dashboard",
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
  colorScheme: "dark",
  themeColor: "black",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-br"
      className={`${inter.variable} dark antialiased h-full w-full bg-brand-800 overflow-x-hidden`}
    >
      <meta name="color-scheme" content="dark" />
      <body className="min-w-0 h-full w-full overflow-x-hidden scrollbar-thin scrollbar-thumb-brand-600 scrollbar-track-transparent">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

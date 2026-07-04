import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/barlow-condensed/600-italic.css";
import "@fontsource/barlow-condensed/700-italic.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sockets.com.ar"),
  title: "Sockets — Basta de medias medias",
  description:
    "Medias imantadas que se mantienen juntas incluso durante el lavado. Nunca más pierdas una media.",
  keywords: [
    "medias imantadas",
    "medias con imán",
    "medias Sockets",
    "medias Argentina",
  ],
  openGraph: {
    title: "Sockets — Basta de medias medias",
    description:
      "Medias imantadas que se mantienen juntas incluso durante el lavado.",
    url: "https://www.sockets.com.ar",
    siteName: "Sockets",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/assets/doypack-white.jpg",
        width: 1448,
        height: 1086,
        alt: "Packaging blanco de Sockets con dos pares de medias",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sockets — Basta de medias medias",
    description: "Nunca más pierdas una media.",
    images: ["/assets/doypack-white.jpg"],
  },
  icons: {
    icon: "/assets/logo-diamond.png",
    apple: "/assets/logo-diamond.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#a92c48",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

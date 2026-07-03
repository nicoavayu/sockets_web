import type { Metadata, Viewport } from "next";
import "@fontsource/bebas-neue/latin-400.css";
import "@fontsource-variable/space-grotesk";
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
        url: "/assets/packaging-front.png",
        width: 1248,
        height: 1800,
        alt: "Packaging de medias imantadas Sockets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sockets — Basta de medias medias",
    description: "Nunca más pierdas una media.",
    images: ["/assets/packaging-front.png"],
  },
  icons: {
    icon: "/assets/logo-sockets.png",
    apple: "/assets/logo-sockets.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ef0b25",
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

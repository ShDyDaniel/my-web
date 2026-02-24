import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ds.Productions | צילום ועריכת וידאו",
  description:
    "Ds.Productions - סטודיו לצילום ועריכת וידאו ברמה גבוהה: קמפיינים, תוכן לסושיאל, פרומואים ותוצרים מודרניים לעסקים ומותגים.",
  icons: {
    icon: [
      { url: "/assets/danielmovie-tab.png?v=1", type: "image/png", sizes: "64x64" },
      { url: "/assets/danielmovie.svg?v=4", type: "image/svg+xml" },
      { url: "/assets/danielmovie.png?v=4", type: "image/png" },
    ],
    shortcut: "/assets/danielmovie-tab.png?v=1",
    apple: "/assets/danielmovie.png?v=4",
  },
  keywords:
    "Ds.Productions, video production, video editing, עריכת וידאו, צילום וידאו, רילס, סרטוני סושיאל, הפקות וידאו, עריכת סרטונים, סטודיו וידאו",
  openGraph: {
    title: "Ds.Productions | צילום ועריכת וידאו",
    description:
      "סטודיו וידאו מודרני לקמפיינים, פרומואים ותוכן לרשתות חברתיות.",
    images: [
      {
        url: "/assets/IMG_3117.jpg",
        width: 512,
        height: 512,
        alt: "Ds.Productions",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Shalts - Movie Editor ",
  description: "Professional and passionate photo and movie editor.",
  keywords:
    "photo editor, movie editor, Daniel Shalts, Daniel Shalts photo editor, Daniel Shalts movie editor,דניאל שלץ, דניאל, שלץ, עריכת וידיאו, עריכת סרטים, סרטים, וידיאו, צילום סרטים, צילום, צלם ",
  openGraph: {
    images: [
      {
        url: "https://danielshalts.netlify.app/favicon.ico",
        width: 512,
        height: 512,
        alt: "Daniel Shalts logo",
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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

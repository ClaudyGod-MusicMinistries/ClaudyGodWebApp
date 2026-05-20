import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://claudygod.com'),
  title: {
    template: "%s | ClaudyGod Music Ministries",
    default: "ClaudyGod Music Ministries",
  },
  description:
    "Official website of ClaudyGod — Gospel music artist, minister, and worship leader spreading the love of God through music.",
  keywords: [
    "ClaudyGod",
    "gospel music",
    "Christian music",
    "worship",
    "ministry",
    "Nigerian gospel",
  ],
  openGraph: {
    type: "website",
    siteName: "ClaudyGod Music Ministries",
    images: [{ url: "/ClaudySocial.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/ClaudySocial.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

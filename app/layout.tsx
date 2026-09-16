import type { Metadata } from "next";
import "./globals.css";
import { weddingConfig } from "@/data/weddingConfig";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  title: `Thiệp Cưới ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`,
  description: `Trân trọng kính mời quý khách đến tham dự lễ thành hôn của ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}.`,
  openGraph: {
    title: `Thiệp Cưới ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`,
    description: `Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi.`,
    images: [
      {
        url: weddingConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `Thiệp Cưới ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`
      }
    ],
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

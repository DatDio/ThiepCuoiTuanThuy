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
  title: "Thiệp Cưới Quốc Tuấn & Đinh Thuỷ | 10.10.2026",
  description: "Trân trọng kính mời quý khách đến tham dự lễ thành hôn và tiệc cưới của Quốc Tuấn & Đinh Thuỷ.",
  openGraph: {
    title: "Thiệp Cưới Quốc Tuấn & Đinh Thuỷ",
    description: "Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi vào lúc 18:00 ngày 10/10/2026 tại xóm 6, xã Giao Minh, tỉnh Ninh Bình.",
    images: [
      {
        url: weddingConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Thiệp Cưới Quốc Tuấn & Đinh Thuỷ"
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

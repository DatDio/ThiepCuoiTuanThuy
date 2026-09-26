import type { Metadata } from "next";
import "./globals.css";
import { weddingConfig } from "@/data/weddingConfig";

// URL gốc của website - thay bằng domain thực tế của bạn
const BASE_URL = "https://thiep-cuoi-tuan-thuy.vercel.app";
const OG_IMAGE_URL = `${BASE_URL}${weddingConfig.ogImage}?v=20260926`;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: `Thiệp Cưới ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`,
  description: `Trân trọng kính mời quý khách đến tham dự lễ thành hôn của ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}.`,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `Thiệp Cưới ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`,
    description: `Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi.`,
    url: BASE_URL,
    siteName: `Thiệp Cưới ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`,
    locale: "vi_VN",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1376,
        height: 768,
        type: "image/jpeg",
        alt: `Thiệp Cưới ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `Thiệp Cưới ${weddingConfig.groom.fullName} & ${weddingConfig.bride.fullName}`,
    description: "Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi.",
    images: [OG_IMAGE_URL]
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

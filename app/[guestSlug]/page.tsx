import type { Metadata } from "next";
import WeddingInvitationView from "@/components/WeddingInvitationView";
import { decodeSlugToName } from "@/lib/guestUtils";
import { weddingConfig } from "@/data/weddingConfig";

interface PageProps {
  params: {
    guestSlug: string;
  };
  searchParams?: {
    to?: string;
    guest?: string;
    name?: string;
  };
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const queryGuest = searchParams?.to || searchParams?.guest || searchParams?.name;
  const guestName = queryGuest ? decodeURIComponent(queryGuest) : decodeSlugToName(params.guestSlug);
  const canonicalPath = `/${encodeURIComponent(params.guestSlug)}`;
  const ogImageUrl = `${weddingConfig.ogImage}?v=20260926`;

  return {
    title: `Thiệp Cưới Tuấn & Thuỷ - Trân trọng kính mời ${guestName}`,
    description: `Trân trọng kính mời ${guestName} đến tham dự lễ thành hôn và tiệc cưới của Quốc Tuấn & Đinh Thuỷ vào lúc 18:00 ngày 10/10/2026.`,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: `Thiệp Cưới Tuấn & Thuỷ - Kính mời ${guestName}`,
      description: `Sự hiện diện của ${guestName} là niềm vinh hạnh cho gia đình chúng tôi.`,
      url: canonicalPath,
      siteName: "Thiệp Cưới Phạm Quốc Tuấn & Đinh Thị Thủy",
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1376,
          height: 768,
          type: "image/jpeg",
          alt: "Thiệp Cưới Quốc Tuấn & Đinh Thuỷ"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `Thiệp Cưới Tuấn & Thuỷ - Kính mời ${guestName}`,
      description: `Sự hiện diện của ${guestName} là niềm vinh hạnh cho gia đình chúng tôi.`,
      images: [ogImageUrl]
    }
  };
}

export default function GuestPage({ params, searchParams }: PageProps) {
  const queryGuest = searchParams?.to || searchParams?.guest || searchParams?.name;
  const guestName = queryGuest ? decodeURIComponent(queryGuest) : decodeSlugToName(params.guestSlug);

  return <WeddingInvitationView guestName={guestName} />;
}

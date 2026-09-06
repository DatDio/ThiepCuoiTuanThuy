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

  return {
    title: `Thiệp Cưới Tuấn & Thuỷ - Trân trọng kính mời ${guestName}`,
    description: `Trân trọng kính mời ${guestName} đến tham dự lễ thành hôn và tiệc cưới của Quốc Tuấn & Đinh Thuỷ vào lúc 18:00 ngày 10/10/2026.`,
    openGraph: {
      title: `Thiệp Cưới Tuấn & Thuỷ - Kính mời ${guestName}`,
      description: `Sự hiện diện của ${guestName} là niềm vinh hạnh cho gia đình chúng tôi.`,
      images: [
        {
          url: weddingConfig.ogImage,
          width: 1200,
          height: 630,
          alt: "Thiệp Cưới Quốc Tuấn & Đinh Thuỷ"
        }
      ]
    }
  };
}

export default function GuestPage({ params, searchParams }: PageProps) {
  const queryGuest = searchParams?.to || searchParams?.guest || searchParams?.name;
  const guestName = queryGuest ? decodeURIComponent(queryGuest) : decodeSlugToName(params.guestSlug);

  return <WeddingInvitationView guestName={guestName} />;
}

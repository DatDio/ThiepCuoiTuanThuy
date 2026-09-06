import WeddingInvitationView from "@/components/WeddingInvitationView";

interface PageProps {
  searchParams?: {
    to?: string;
    guest?: string;
    name?: string;
  };
}

export default function HomePage({ searchParams }: PageProps) {
  const queryGuest = searchParams?.to || searchParams?.guest || searchParams?.name;
  const guestName = queryGuest ? decodeURIComponent(queryGuest) : "Quý Khách";

  return <WeddingInvitationView guestName={guestName} />;
}

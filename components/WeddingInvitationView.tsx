"use client";

import React, { useState } from "react";
import FallingPetals from "@/components/FallingPetals";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import CeremonyInfo from "@/components/CeremonyInfo";
import PhotoGallery from "@/components/PhotoGallery";
import ReceptionInfo from "@/components/ReceptionInfo";
import VenueSection from "@/components/VenueSection";
import DressCodeSection from "@/components/DressCodeSection";
import TimelineSection from "@/components/TimelineSection";
import GuestbookSection from "@/components/GuestbookSection";
import LuckyMoneyModal from "@/components/LuckyMoneyModal";
import RsvpModal from "@/components/RsvpModal";
import { Gift, Settings2, Heart } from "lucide-react";
import Link from "next/link";

interface WeddingInvitationViewProps {
  guestName: string;
}

export default function WeddingInvitationView({ guestName }: WeddingInvitationViewProps) {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isMoneyOpen, setIsMoneyOpen] = useState(false);

  return (
    <div className="wedding-wrapper">
      {/* Falling romantic white petals */}
      <FallingPetals />

      <main className="wedding-card">
        {/* Hero Section with Welcome Arch & Guest Badge */}
        <HeroSection guestName={guestName} />

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Thông tin Lễ Cưới (Ceremony) */}
        <CeremonyInfo />

        {/* Album Ảnh (Gallery 2x2) */}
        <PhotoGallery />

        {/* Thông tin Tiệc Cưới (Reception & Calendar) */}
        <ReceptionInfo onOpenRsvp={() => setIsRsvpOpen(true)} />

        {/* Địa điểm tổ chức & Bản đồ chỉ đường (Venue & Maps) */}
        <VenueSection />

        {/* Dress Code (3 swatches) */}
        <DressCodeSection />

        {/* Lịch trình hôn lễ (Timeline) */}
        <TimelineSection />

        {/* Hộp mừng cưới online Banner */}
        <div style={{ padding: "10px 24px 20px", textAlign: "center" }}>
          <button
            onClick={() => setIsMoneyOpen(true)}
            className="btn-primary-pill"
            style={{
              backgroundColor: "#C5A059",
              color: "#FFFFFF",
              fontSize: "13px",
              boxShadow: "0 4px 14px rgba(197, 160, 89, 0.3)"
            }}
          >
            <Gift size={16} /> HỘP MỪNG CƯỚI ONLINE (VIETQR)
          </button>
        </div>

        {/* Sổ Lưu Bút (Guestbook) */}
        <GuestbookSection defaultGuestName={guestName} />

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "30px 20px 10px", color: "var(--text-muted)", fontSize: "11px" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "var(--color-forest)", fontWeight: 700, marginBottom: "4px" }}>
            Quốc Tuấn & Đinh Thuỷ
          </div>
          <div>Thank you for being part of our special day!</div>
          <div style={{ marginTop: "12px", fontSize: "11px", color: "#A8B4AA" }}>
            Made with <Heart size={10} fill="#C5A059" color="#C5A059" style={{ display: "inline" }} /> for Tuấn & Thuỷ
          </div>
        </footer>
      </main>

      {/* Floating Action Buttons */}
      <div className="floating-widget">
        {/* VietQR Quick Button */}
        <button
          onClick={() => setIsMoneyOpen(true)}
          className="btn-circle-fab"
          style={{ backgroundColor: "#C5A059" }}
          title="Mừng cưới online"
        >
          <Gift size={20} />
        </button>

        {/* Music Player */}
        <MusicPlayer />

        {/* Shortcut to Link Generator Tool */}
        <Link
          href="/danh-sach"
          className="btn-circle-fab"
          style={{ backgroundColor: "var(--color-forest-dark)" }}
          title="Trang quản lý & tạo link khách mời"
        >
          <Settings2 size={18} />
        </Link>
      </div>

      {/* Modals */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        defaultGuestName={guestName}
      />

      <LuckyMoneyModal
        isOpen={isMoneyOpen}
        onClose={() => setIsMoneyOpen(false)}
      />
    </div>
  );
}

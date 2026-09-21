"use client";

import React, { useState, useEffect, useRef } from "react";
import FallingPetals from "@/components/FallingPetals";
import MusicPlayer from "@/components/MusicPlayer";
import HeroSection from "@/components/HeroSection";
import CoupleSection from "@/components/CoupleSection";
import LoveStorySection from "@/components/LoveStorySection";
import CeremonyInfo from "@/components/CeremonyInfo";
import VenueSection from "@/components/VenueSection";
import PhotoGallery from "@/components/PhotoGallery";
import CountdownTimer from "@/components/CountdownTimer";

import RsvpModal from "@/components/RsvpModal";
import { Heart, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { weddingConfig } from "@/data/weddingConfig";
import confetti from "canvas-confetti";

interface WeddingInvitationViewProps {
  guestName: string;
}

export default function WeddingInvitationView({ guestName }: WeddingInvitationViewProps) {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  // Removed wish states and functions

  const handleHearts = () => {
    // Burst hearts confetti
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.85, x: 0.7 },
      colors: ["#E8B4B8", "#D4848A", "#FF6B6B", "#F5D5D8"],
      shapes: ["circle"],
      scalar: 1.2
    });
  };

  return (
    <div className="wedding-wrapper">
      {/* Falling cherry blossom petals */}
      <FallingPetals />

      {/* Music button (top-right) */}
      <MusicPlayer />

      <main className="wedding-card">
        {/* 1. Hero: Save The Date + Calendar */}
        <HeroSection />

        {/* 2. Couple Introduction */}
        <CoupleSection />

        {/* 3. Our Love Story */}
        <LoveStorySection />

        {/* 4. Family + Ceremony Details */}
        <CeremonyInfo />

        {/* 5. Map & Venue */}
        <VenueSection />

        {/* 6. Photo Gallery */}
        <PhotoGallery />

        {/* 7. Countdown */}
        <CountdownTimer />

        {/* 8. RSVP Button */}
        <div style={{ padding: "0 20px 24px", textAlign: "center" }}>
          <button
            onClick={() => setIsRsvpOpen(true)}
            className="btn-primary-pill"
            id="btn-rsvp-trigger"
          >
            <CheckCircle2 size={16} />
            XÁC NHẬN THAM DỰ
          </button>
        </div>



        {/* Removed Guestbook */}

        {/* Footer */}
        <footer className="wedding-footer">
          <div className="footer-names">
            {weddingConfig.groom.name} & {weddingConfig.bride.name}
          </div>
          <div className="footer-thanks">
            Thank you for being part of our special day!
          </div>
          <div style={{ marginTop: 12, fontSize: 11, color: "var(--text-light)" }}>
            Made with <Heart size={10} fill="#D4848A" color="#D4848A" style={{ display: "inline" }} /> for Tuấn & Thủy
          </div>
        </footer>
      </main>

      {/* Floating Bottom Bar */}
      <div className="floating-bottom-bar">
        <div className="floating-action-btns" style={{ width: "100%", justifyContent: "center" }}>
          <button
            className="btn-outline-pill"
            onClick={handleHearts}
            style={{ padding: "8px 14px", fontSize: 12, borderRadius: 20 }}
          >
            🌸 Bắn tim
          </button>

          <button
            className="floating-action-btn hearts"
            onClick={handleHearts}
            title="Bắn tim"
          >
            <Heart size={18} fill="#FFF" />
          </button>


        </div>
      </div>

      {/* Modals */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        defaultGuestName={guestName}
      />


    </div>
  );
}

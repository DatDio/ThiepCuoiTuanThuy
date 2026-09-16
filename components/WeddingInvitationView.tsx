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
import GuestbookSection from "@/components/GuestbookSection";
import LuckyMoneyModal from "@/components/LuckyMoneyModal";
import RsvpModal from "@/components/RsvpModal";
import { Gift, Heart, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { weddingConfig } from "@/data/weddingConfig";
import confetti from "canvas-confetti";

interface WeddingInvitationViewProps {
  guestName: string;
}

export default function WeddingInvitationView({ guestName }: WeddingInvitationViewProps) {
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isMoneyOpen, setIsMoneyOpen] = useState(false);
  const [showWishInput, setShowWishInput] = useState(false);
  const [quickWishName, setQuickWishName] = useState(guestName !== "Quý Khách" ? guestName : "");
  const [quickWishMsg, setQuickWishMsg] = useState("");
  const [quickWishSent, setQuickWishSent] = useState(false);
  const guestbookRef = useRef<HTMLDivElement>(null);

  // Floating wishes animation
  const [floatingWishes, setFloatingWishes] = useState<{ id: number; name: string; msg: string }[]>([]);
  const wishIndex = useRef(0);

  const sampleWishes = [
    { name: "Hùng", msg: "Chúc mừng hạnh phúc vĩnh bạn nhé" },
    { name: "Bì Tắm", msg: "Chúc mừng b tới nhé❤️" },
    { name: "Bạn Ngất hàng xóm", msg: "Chúc mừng gia đình nhỏ nhé" },
    { name: "Hằng Phạm", msg: "Chúc mừng bạn tôi hạnh phúc nhé 🌸" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const wish = sampleWishes[wishIndex.current % sampleWishes.length];
      const id = Date.now();
      setFloatingWishes(prev => [...prev.slice(-3), { id, ...wish }]);
      wishIndex.current++;

      // Remove after animation
      setTimeout(() => {
        setFloatingWishes(prev => prev.filter(w => w.id !== id));
      }, 8000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleQuickWish = () => {
    if (!quickWishName.trim() || !quickWishMsg.trim()) return;

    // Save wish
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;
    const newWish = {
      id: Date.now().toString(),
      author: quickWishName.trim(),
      message: quickWishMsg.trim(),
      createdAt: timeStr,
      likes: 1
    };

    try {
      const existing = JSON.parse(localStorage.getItem("tuan_thuy_wishes") || "[]");
      existing.unshift(newWish);
      localStorage.setItem("tuan_thuy_wishes", JSON.stringify(existing));
    } catch {
      // ignore
    }

    setQuickWishSent(true);
    setQuickWishMsg("");
    setShowWishInput(false);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.9 },
      colors: ["#E8B4B8", "#D4848A", "#F5D5D8"]
    });

    setTimeout(() => setQuickWishSent(false), 3000);
  };

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

        {/* 9. Gift Button */}
        <div style={{ padding: "0 20px 24px", textAlign: "center" }}>
          <button
            onClick={() => setIsMoneyOpen(true)}
            className="btn-outline-pill"
          >
            <Gift size={16} /> HỘP MỪNG CƯỚI ONLINE
          </button>
        </div>

        {/* 10. Guestbook */}
        <div ref={guestbookRef}>
          <GuestbookSection defaultGuestName={guestName} />
        </div>

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

      {/* Floating Wishes Bubbles */}
      <div className="floating-wishes-bar">
        {floatingWishes.map(w => (
          <div key={w.id} className="floating-wish-bubble">
            <span className="wish-bubble-name">{w.name}:</span> {w.msg}
          </div>
        ))}
      </div>

      {/* Quick Wish Input Overlay */}
      {showWishInput && (
        <div
          style={{
            position: "fixed",
            bottom: 60,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: 430,
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid var(--border-subtle)",
            padding: "12px 16px",
            zIndex: 100,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.1)"
          }}
        >
          <input
            type="text"
            placeholder="Tên của bạn"
            value={quickWishName}
            onChange={e => setQuickWishName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--border-subtle)",
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 8,
              fontFamily: "var(--font-sans)"
            }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Nhập lời chúc..."
              value={quickWishMsg}
              onChange={e => setQuickWishMsg(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleQuickWish()}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                fontSize: 13,
                fontFamily: "var(--font-sans)"
              }}
            />
            <button
              onClick={handleQuickWish}
              style={{
                background: "var(--color-pink-deep)",
                color: "#FFF",
                border: "none",
                borderRadius: 8,
                padding: "8px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                fontWeight: 600
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Bottom Bar */}
      <div className="floating-bottom-bar">
        <button
          className="floating-wish-btn"
          onClick={() => setShowWishInput(!showWishInput)}
        >
          <MessageSquare size={14} />
          {quickWishSent ? "Đã gửi! ✓" : "Gửi lời chúc..."}
        </button>

        <div className="floating-action-btns">
          <button
            className="btn-outline-pill"
            onClick={() => {
              if (guestbookRef.current) {
                guestbookRef.current.scrollIntoView({ behavior: "smooth" });
              }
            }}
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

          <button
            className="floating-action-btn gift"
            onClick={() => setIsMoneyOpen(true)}
            title="Mừng cưới online"
          >
            <Gift size={18} />
          </button>
        </div>
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

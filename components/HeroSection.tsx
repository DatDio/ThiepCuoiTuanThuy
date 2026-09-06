"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  guestName: string;
}

export default function HeroSection({ guestName }: HeroSectionProps) {
  return (
    <div className="hero-container">
      {/* Inverted Arch Header - Exactly matching Image 1 */}
      <div className="welcome-arch">
        <div className="welcome-subtitle">WELCOME TO OUR WEDDING</div>
        
        {/* Song Hỷ Symbol */}
        <div className="song-hy-symbol">囍</div>
        
        <div className="couple-title-row">
          <div className="couple-col">
            <div className="couple-role">{weddingConfig.groom.role}</div>
            <div className="couple-header-name">{weddingConfig.groom.name.toUpperCase()}</div>
          </div>
          
          <div className="couple-col">
            <div className="couple-role">{weddingConfig.bride.role}</div>
            <div className="couple-header-name">{weddingConfig.bride.name.toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* Dynamic Personalized Guest Card */}
      <div className="guest-invitation-banner">
        <div className="guest-badge-label">
          <Sparkles size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
          Trân Trọng Kính Mời
        </div>
        <div className="guest-name-highlight">{guestName}</div>
        <div className="guest-subtext">
          Đến tham dự buổi tiệc chung vui cùng gia đình chúng tôi
        </div>
      </div>

      {/* Hero Arch Photo Frame with Curved Text */}
      <div className="hero-photo-section">
        {/* Curved SVG Text "LOVE NEVER FAILS" */}
        <svg className="curved-text-svg" viewBox="0 0 300 70">
          <path
            id="archCurve"
            d="M 20,60 A 130,50 0 0,1 280,60"
            fill="none"
          />
          <text fill="#1A3D2F" fontSize="15" fontFamily="'Cinzel', Georgia, serif" fontWeight="700" letterSpacing="4">
            <textPath href="#archCurve" startOffset="50%" textAnchor="middle">
              ✦ LOVE NEVER FAILS ✦
            </textPath>
          </text>
        </svg>

        {/* Arch Photo Frame */}
        <div className="hero-arch-frame">
          <img
            src={weddingConfig.heroImage}
            alt={`${weddingConfig.groom.name} & ${weddingConfig.bride.name} Wedding`}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

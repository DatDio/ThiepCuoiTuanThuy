"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";

export default function CoupleSection() {
  const { groom, bride } = weddingConfig;

  return (
    <section className="couple-section">
      {/* Groom Card */}
      <div className="couple-card">
        <div className="couple-card-image">
          <img
            src={groom.image}
            alt={groom.fullName}
            loading="lazy"
          />
        </div>
        <div className="couple-card-info">
          <div className="couple-card-role">Chú Rể</div>
          <div className="couple-card-name">{groom.fullName}</div>
        </div>
      </div>

      {/* Bride Card */}
      <div className="couple-card">
        <div className="couple-card-image">
          <img
            src={bride.image}
            alt={bride.fullName}
            loading="lazy"
          />
        </div>
        <div className="couple-card-info">
          <div className="couple-card-role">Cô Dâu</div>
          <div className="couple-card-name">{bride.fullName}</div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";

export default function CeremonyInfo() {
  const { groom, bride, eventCeremony } = weddingConfig;

  return (
    <section className="ceremony-section">
      {/* Section Ribbon Bar */}
      <div className="section-bar">THÔNG TIN LỄ CƯỚI</div>

      <div className="ceremony-info-container">
        {/* Two-column Parents Information */}
        <div className="family-columns">
          <div className="family-side">
            <div className="family-title">Nhà Trai</div>
            <div className="family-title">Ông Bà</div>
            <div className="family-parents">{groom.fatherName}</div>
            <div className="family-parents">{groom.motherName}</div>
            <div className="family-address">{groom.address}</div>
          </div>

          <div className="family-divider"></div>

          <div className="family-side">
            <div className="family-title">Nhà Gái</div>
            <div className="family-title">Ông Bà</div>
            <div className="family-parents">{bride.fatherName}</div>
            <div className="family-parents">{bride.motherName}</div>
            <div className="family-address">{bride.address}</div>
          </div>
        </div>

        {/* Formal Announcement Notice */}
        <div className="announcement-notice">TRÂN TRỌNG BÁO TIN</div>
        <div className="announcement-subtitle">LỄ THÀNH HÔN CỦA CON CHÚNG TÔI</div>

        {/* Large Couple Names */}
        <div className="couple-formal-names">
          <div className="groom-block">
            <div className="groom-name">{groom.fullName}</div>
            <div className="role-tag">{groom.role}</div>
          </div>

          <div className="ampersand">&</div>

          <div className="bride-block">
            <div className="bride-name">{bride.fullName}</div>
            <div className="role-tag">{bride.role}</div>
          </div>
        </div>

        {/* Ceremony Location & Time */}
        <div className="ceremony-location-badge">
          {eventCeremony.title} ĐƯỢC CỬ HÀNH TẠI
        </div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 700, color: "var(--color-forest)" }}>
          {eventCeremony.location}
        </div>
        <div className="ceremony-time">VÀO LÚC {eventCeremony.time}</div>

        {/* Date Split Layout */}
        <div className="date-split-row">
          <div className="date-split-item">{eventCeremony.dayOfWeek}</div>
          <div className="date-vertical-divider"></div>
          <div className="date-day-large">{eventCeremony.day}</div>
          <div className="date-vertical-divider"></div>
          <div className="date-split-item">{eventCeremony.month}</div>
        </div>

        <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 600, color: "var(--color-forest)" }}>
          {eventCeremony.year}
        </div>
        <div className="lunar-date-text">({eventCeremony.lunarDate})</div>
      </div>
    </section>
  );
}

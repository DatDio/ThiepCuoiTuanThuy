"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";

export default function CeremonyInfo() {
  const { groom, bride, eventCeremony, eventReception } = weddingConfig;

  return (
    <section className="ceremony-section">
      {/* Family Info */}
      <div className="family-section">
        <div className="family-columns">
          <div className="family-side">
            <div className="family-title">Nhà Trai</div>
            <div className="family-parent-label">Ông.</div>
            <div className="family-parent-name">{groom.fatherName}</div>
            <div className="family-parent-label" style={{ marginTop: 4 }}>Bà.</div>
            <div className="family-parent-name">{groom.motherName}</div>
            <div className="family-address">{groom.address}</div>
          </div>

          <div className="family-side">
            <div className="family-title">Nhà Gái</div>
            <div className="family-parent-label">Ông.</div>
            <div className="family-parent-name">{bride.fatherName}</div>
            <div className="family-parent-label" style={{ marginTop: 4 }}>Bà.</div>
            <div className="family-parent-name">{bride.motherName}</div>
            <div className="family-address">{bride.address}</div>
          </div>
        </div>
      </div>

      {/* Couple Names in Calligraphy */}
      <div className="couple-names-section">
        <div className="couple-name-script">{groom.fullName}</div>
        <span className="couple-ampersand">&</span>
        <div className="couple-name-script">{bride.fullName}</div>
      </div>

      {/* Event 1: Bữa cơm thân mật */}
      <div className="ceremony-event-block">
        <div className="ceremony-event-title">TRÂN TRỌNG KÍNH MỜI</div>
        <div className="ceremony-time-text">
          TỚI DỰ BỮA CƠM THÂN MẬT CHUNG VUI
        </div>
        <div className="ceremony-time-text">
          ĐƯỢC TỔ CHỨC VÀO LÚC {eventReception.time} {eventReception.dayOfWeek}
        </div>

        <div className="date-split-row">
          <div className="date-split-item">{eventReception.dayOfWeek}</div>
          <div className="date-vertical-divider"></div>
          <div className="date-day-large">{eventReception.day}.{eventReception.month}</div>
          <div className="date-vertical-divider"></div>
          <div className="date-split-item">NĂM {eventReception.year}</div>
        </div>

        <div className="ceremony-lunar">({eventReception.lunarDate})</div>

        <div className="ceremony-location-title">TẠI: {eventReception.venue}</div>
        <div className="ceremony-location-address">{eventReception.address}</div>
      </div>

      <div className="section-divider" style={{ margin: "24px auto" }}></div>

      {/* Event 2: Lễ Thành Hôn */}
      <div className="ceremony-event-block">
        <div className="ceremony-event-title" style={{ fontFamily: "var(--font-script)", fontSize: "28px", letterSpacing: 0, textTransform: "none" }}>
          {eventCeremony.title === "LỄ THÀNH HÔN" ? "Lễ Thành Hôn" : eventCeremony.title}
        </div>
        <div className="ceremony-time-text">
          ĐƯỢC TỔ CHỨC VÀO LÚC {eventCeremony.time}
        </div>

        <div className="date-split-row">
          <div className="date-split-item">{eventCeremony.dayOfWeek}</div>
          <div className="date-vertical-divider"></div>
          <div className="date-day-large">{eventCeremony.day}</div>
          <div className="date-vertical-divider"></div>
          <div className="date-split-item">{eventCeremony.month}</div>
        </div>

        <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 600, color: "var(--text-dark)" }}>
          {eventCeremony.year}
        </div>
        <div className="ceremony-lunar">({eventCeremony.lunarDate})</div>

        <div className="ceremony-location-title">TẠI: {eventCeremony.location}</div>
        <div className="ceremony-location-address">{eventCeremony.address}</div>

        <div className="ceremony-welcome-text">
          Rất hân hạnh được đón tiếp!
        </div>
      </div>
    </section>
  );
}

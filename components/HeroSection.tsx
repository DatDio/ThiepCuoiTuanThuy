"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";

export default function HeroSection() {
  const { groom, bride, eventReception, eventCeremony } = weddingConfig;

  // Generate calendar for the wedding month
  const generateDays = () => {
    const year = eventReception.calendarYear;
    const month = eventReception.calendarMonth;
    const firstDayIndex = new Date(year, month - 1, 1).getDay();
    const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Monday start
    const daysInMonth = new Date(year, month, 0).getDate();
    const prevMonthDays = new Date(year, month - 1, 0).getDate();
    const cells: { day: number; currentMonth: boolean; isReception?: boolean; isCeremony?: boolean }[] = [];

    for (let i = 0; i < offset; i++) {
      cells.push({ day: prevMonthDays - offset + 1 + i, currentMonth: false });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        currentMonth: true,
        isReception: d === eventReception.weddingDay,
        isCeremony: d === parseInt(eventCeremony.day)
      });
    }

    const totalNeeded = cells.length > 35 ? 42 : 35;
    const remaining = totalNeeded - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ day: i, currentMonth: false });
    }

    return cells;
  };

  const calendarDays = generateDays();
  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <section className="hero-section">
      {/* Save The Date Title */}
      <div className="hero-save-the-date">
        <h2>Save The Date</h2>
      </div>

      {/* Main Hero Photo with Overlay Names */}
      <div className="hero-photo-wrapper">
        <div className="hero-photo-container">
          <img
            src={weddingConfig.heroImage}
            alt={`${groom.name} & ${bride.name}`}
            loading="eager"
          />
          <div className="hero-names-overlay">
            <div className="hero-name">{groom.fullName}</div>
            <span className="hero-ampersand">&</span>
            <div className="hero-name">{bride.fullName}</div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="hero-calendar-section">
        <div className="hero-calendar-label">Our wedding day</div>
        <div className="hero-calendar-widget">
          <div className="hero-calendar-month">Tháng {eventReception.calendarMonth}</div>
          <div className="hero-calendar-grid">
            {weekdays.map(d => (
              <div key={d} className="hero-cal-weekday">{d}</div>
            ))}
            {calendarDays.map((c, i) => (
              <div
                key={i}
                className={`hero-cal-day ${!c.currentMonth ? "muted" : ""} ${c.isReception ? "active" : ""} ${c.isCeremony ? "ceremony" : ""}`}
              >
                {c.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";

interface ReceptionInfoProps {
  onOpenRsvp: () => void;
}

export default function ReceptionInfo({ onOpenRsvp }: ReceptionInfoProps) {
  const { eventReception, groom, bride } = weddingConfig;

  // Dynamically calculate calendar days
  const generateDays = () => {
    const year = eventReception.calendarYear;
    const month = eventReception.calendarMonth;
    // JS month is 0-indexed: month - 1
    const firstDayIndex = new Date(year, month - 1, 1).getDay(); // Sunday is 0
    // In VN, Monday is 0
    const offset = (firstDayIndex + 6) % 7;
    const daysInMonth = new Date(year, month, 0).getDate();
    const prevMonthDays = new Date(year, month - 1, 0).getDate();
    const cells = [];

    // Pre-month empty cells
    for (let i = 0; i < offset; i++) {
      cells.push({ day: prevMonthDays - offset + 1 + i, currentMonth: false });
    }

    // Month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, currentMonth: true, isWeddingDay: d === eventReception.weddingDay });
    }

    // Post-month fill to complete 35 cells (or 42 if needed)
    const totalNeeded = cells.length > 35 ? 42 : 35;
    const remaining = totalNeeded - cells.length;
    for (let i = 1; i <= remaining; i++) {
      cells.push({ day: i, currentMonth: false });
    }

    return cells;
  };

  const calendarDays = generateDays();

  const handleAddToCalendar = () => {
    // Generate Google Calendar Link for 10/10/2026
    const title = encodeURIComponent(`Đám cưới ${groom.name} & ${bride.name}`);
    const details = encodeURIComponent(
      `Tiệc cưới thân mật của ${groom.fullName} & ${bride.fullName} tại ${eventReception.address}. Rất hân hạnh được đón tiếp!`
    );
    const location = encodeURIComponent(`${eventReception.venue}, ${eventReception.address}`);
    // October 10, 2026, 18:00 to 21:30 (GMT+7 is 11:00 to 14:30 UTC)
    const startIso = "20261010T110000Z";
    const endIso = "20261010T143000Z";
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;

    window.open(gCalUrl, "_blank");
  };

  return (
    <section className="reception-section">
      <div className="section-bar">THÔNG TIN TIỆC CƯỚI</div>

      <div className="reception-time-intro">TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:</div>
      <div className="reception-hour">{eventReception.time}</div>

      {/* Date Split */}
      <div className="date-split-row">
        <div className="date-split-item">{eventReception.dayOfWeek}</div>
        <div className="date-vertical-divider"></div>
        <div className="date-day-large">{eventReception.day}</div>
        <div className="date-vertical-divider"></div>
        <div className="date-split-item">{eventReception.month}</div>
      </div>

      <div style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 700, color: "var(--color-forest)", letterSpacing: "1px" }}>
        {eventReception.year}
      </div>
      <div className="lunar-date-text">({eventReception.lunarDate})</div>
      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-forest)", letterSpacing: "1.5px", marginTop: "8px" }}>
        KHAI TIỆC {eventReception.startTime}
      </div>

      {/* Calendar Widget */}
      <div className="wedding-calendar">
        <div className="calendar-header">
          Tháng {eventReception.calendarMonth} / {eventReception.calendarYear}
        </div>
        <div className="calendar-weekdays">
          <div>T2</div>
          <div>T3</div>
          <div>T4</div>
          <div>T5</div>
          <div>T6</div>
          <div>T7</div>
          <div>CN</div>
        </div>
        <div className="calendar-days-grid">
          {calendarDays.map((c, i) => (
            <div
              key={i}
              className={`cal-day ${c.isWeddingDay ? "active" : ""} ${!c.currentMonth ? "muted" : ""}`}
            >
              {c.day}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 16 }}>
        <button
          onClick={handleAddToCalendar}
          className="btn-outline-pill"
          id="btn-add-calendar"
        >
          <CalendarIcon size={16} /> Thêm vào lịch
        </button>

        <button
          onClick={onOpenRsvp}
          className="btn-primary-pill"
          id="btn-rsvp-trigger"
        >
          <CheckCircle2 size={18} />
          XÁC NHẬN THAM DỰ
        </button>
      </div>
    </section>
  );
}

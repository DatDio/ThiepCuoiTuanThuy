"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";

export default function TimelineSection() {
  const { timeline } = weddingConfig;

  return (
    <section className="timeline-section">
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "2px",
          color: "var(--color-forest)",
          textAlign: "center",
          marginBottom: "20px"
        }}
      >
        LỊCH TRÌNH NGÀY CƯỚI
      </div>

      <div className="timeline-list">
        {timeline.map((item, idx) => (
          <div key={idx} className="timeline-row">
            <div className="timeline-time">{item.time}</div>
            <div className="timeline-bullet" />
            <div className="timeline-content">
              <div className="timeline-title">{item.title}</div>
              {item.desc && <div className="timeline-desc">{item.desc}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

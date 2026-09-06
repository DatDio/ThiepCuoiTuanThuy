"use client";

import React, { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date: October 10, 2026 18:00:00 GMT+7
    const targetDate = new Date("2026-10-10T18:00:00+07:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "0 20px 20px", textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "12px",
          letterSpacing: "3px",
          color: "var(--color-gold)",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: "12px"
        }}
      >
        CÙNG ĐẾM NGƯỢC KHOẢNH KHẮC
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        {[
          { label: "NGÀY", val: timeLeft.days },
          { label: "GIỜ", val: timeLeft.hours },
          { label: "PHÚT", val: timeLeft.minutes },
          { label: "GIÂY", val: timeLeft.seconds }
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--border-gold)",
              borderRadius: "10px",
              minWidth: "62px",
              padding: "8px 4px",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "22px",
                fontWeight: 700,
                color: "var(--color-forest)",
                lineHeight: 1
              }}
            >
              {String(item.val).padStart(2, "0")}
            </div>
            <div
              style={{
                fontSize: "9px",
                color: "var(--text-muted)",
                letterSpacing: "1px",
                marginTop: "4px",
                fontWeight: 600
              }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

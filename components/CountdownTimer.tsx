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
    // Target: Lễ thành hôn 11/10/2026 10:00 GMT+7
    const targetDate = new Date("2026-10-11T10:00:00+07:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-section">
      <div className="countdown-title">
        CÙNG ĐẾM NGƯỢC KHOẢNH KHẮC
      </div>

      <div className="countdown-boxes">
        {[
          { label: "NGÀY", val: timeLeft.days },
          { label: "GIỜ", val: timeLeft.hours },
          { label: "PHÚT", val: timeLeft.minutes },
          { label: "GIÂY", val: timeLeft.seconds }
        ].map((item, idx) => (
          <div key={idx} className="countdown-box">
            <div className="countdown-number">
              {String(item.val).padStart(2, "0")}
            </div>
            <div className="countdown-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

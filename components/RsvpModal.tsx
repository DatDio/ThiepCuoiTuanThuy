"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { X, CheckCircle, HeartHandshake } from "lucide-react";

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGuestName?: string;
}

export default function RsvpModal({ isOpen, onClose, defaultGuestName }: RsvpModalProps) {
  const [name, setName] = useState(defaultGuestName && defaultGuestName !== "Quý Khách" ? defaultGuestName : "");
  const [status, setStatus] = useState<"yes-1" | "yes-2" | "yes-family" | "no">("yes-1");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Save to localStorage
    const rsvpEntry = {
      name: name.trim(),
      status,
      phone: phone.trim(),
      note: note.trim(),
      date: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem("tuan_thuy_rsvps") || "[]");
      existing.push(rsvpEntry);
      localStorage.setItem("tuan_thuy_rsvps", JSON.stringify(existing));
    } catch {
      // storage error
    }

    setIsDone(true);

    if (status !== "no") {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#1A3D2F", "#C5A059", "#7C9082"]
      });
    }

    setTimeout(() => {
      setIsDone(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Đóng">
          <X size={18} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "18px" }}>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "17px",
              fontWeight: 700,
              color: "var(--color-forest)",
              letterSpacing: "1px"
            }}
          >
            XÁC NHẬN THAM DỰ
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
            Để gia đình chuẩn bị chu đáo nhất, xin vui lòng phản hồi trước ngày 20/07/2026
          </div>
        </div>

        {isDone ? (
          <div style={{ textAlign: "center", padding: "30px 10px" }}>
            <CheckCircle size={48} color="#1A3D2F" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 700, color: "var(--color-forest)" }}>
              Xác Nhận Thành Công!
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "6px" }}>
              Cảm ơn {name} đã phản hồi. Sự hiện diện của bạn là niềm vinh hạnh cho chúng mình!
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
                Họ và tên của bạn *
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ví dụ: Anh Nam & Bạn gái"
                required
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
                Số điện thoại (tùy chọn)
              </label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Số điện thoại của bạn"
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>
                Khả năng tham dự tiệc cưới *
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="rsvpStatus"
                    checked={status === "yes-1"}
                    onChange={() => setStatus("yes-1")}
                  />
                  Sẽ tham dự (1 người)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="rsvpStatus"
                    checked={status === "yes-2"}
                    onChange={() => setStatus("yes-2")}
                  />
                  Sẽ tham dự (2 người - đi cùng người thương)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13px", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="rsvpStatus"
                    checked={status === "yes-family"}
                    onChange={() => setStatus("yes-family")}
                  />
                  Cả gia đình sẽ cùng tham dự
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "13px", cursor: "pointer", color: "#8E9E92" }}>
                  <input
                    type="radio"
                    name="rsvpStatus"
                    checked={status === "no"}
                    onChange={() => setStatus("no")}
                  />
                  Rất tiếc không thể tham dự (Gửi lời chúc phúc)
                </label>
              </div>
            </div>

            <div className="form-group">
              <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
                Lời nhắn gửi đến đôi uyên ương
              </label>
              <textarea
                className="form-control"
                rows={2}
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Ghi chú thêm (nếu có)..."
              />
            </div>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <button
                type="submit"
                className="btn-primary-pill"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <HeartHandshake size={16} /> GỬI XÁC NHẬN
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

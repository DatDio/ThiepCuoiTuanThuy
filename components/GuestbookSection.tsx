"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Send, Heart, MessageCircle, CheckCircle2 } from "lucide-react";
import { weddingConfig } from "@/data/weddingConfig";

interface Wish {
  id: string;
  author: string;
  message: string;
  createdAt: string;
  likes?: number;
}

const DEFAULT_WISHES: Wish[] = [
  {
    id: "1",
    author: "Gia đình cô Lan",
    message: "Chúc hai cháu trăm năm hạnh phúc, thuận hòa êm ấm, sớm sinh quý tử nhé!",
    createdAt: "10:50 20/07/2026",
    likes: 5
  },
  {
    id: "2",
    author: "Trần Thị Quỳnh Như",
    message: "Hy vọng tổ ấm nhỏ này sẽ sớm rộn rã tiếng cười con trẻ và hạnh phúc viên mãn cùng năm tháng.",
    createdAt: "22:08 27/07/2026",
    likes: 8
  },
  {
    id: "3",
    author: "Anh Hoàng & Hội bạn ĐH",
    message: "Chúc mừng chú rể Tuấn đã rước được nàng thơ Thuỷ về dinh! Chúc đôi bạn trăm năm răng long đầu bạc!",
    createdAt: "14:30 28/07/2026",
    likes: 12
  }
];

export default function GuestbookSection({ defaultGuestName }: { defaultGuestName?: string }) {
  const [wishes, setWishes] = useState<Wish[]>(DEFAULT_WISHES);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [lastSubmittedWish, setLastSubmittedWish] = useState<Wish | null>(null);

  useEffect(() => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem("tuan_thuy_wishes");
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch {
      // fallback
    }

    if (defaultGuestName && defaultGuestName !== "Quý Khách") {
      setAuthor(defaultGuestName);
    }
  }, [defaultGuestName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")} ${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

    const newWish: Wish = {
      id: Date.now().toString(),
      author: author.trim(),
      message: message.trim(),
      createdAt: timeStr,
      likes: 1
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem("tuan_thuy_wishes", JSON.stringify(updated));
    } catch {
      // storage error
    }

    // Optional: send to Google Sheet if webhook configured
    if (weddingConfig.googleSheetWebhookUrl) {
      try {
        fetch(weddingConfig.googleSheetWebhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWish)
        }).catch(err => console.log("Google sheet sync:", err));
      } catch {
        // ignore
      }
    }

    setLastSubmittedWish(newWish);
    setMessage("");

    // Celebratory confetti
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.8 },
      colors: ["#1A3D2F", "#C5A059", "#7C9082", "#FBF8F2"]
    });
  };

  const handleLike = (id: string) => {
    const updated = wishes.map(w => {
      if (w.id === id) {
        return { ...w, likes: (w.likes || 0) + 1 };
      }
      return w;
    });
    setWishes(updated);
    try {
      localStorage.setItem("tuan_thuy_wishes", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const groomZaloUrl = lastSubmittedWish
    ? `https://zalo.me/${weddingConfig.groom.zaloPhone}?text=${encodeURIComponent(
        `Chúc mừng đám cưới Tuấn & Thuỷ!\n\nLời chúc từ ${lastSubmittedWish.author}:\n"${lastSubmittedWish.message}"`
      )}`
    : `https://zalo.me/${weddingConfig.groom.zaloPhone}`;

  const brideZaloUrl = lastSubmittedWish
    ? `https://zalo.me/${weddingConfig.bride.zaloPhone}?text=${encodeURIComponent(
        `Chúc mừng đám cưới Tuấn & Thuỷ!\n\nLời chúc từ ${lastSubmittedWish.author}:\n"${lastSubmittedWish.message}"`
      )}`
    : `https://zalo.me/${weddingConfig.bride.zaloPhone}`;

  return (
    <section className="guestbook-section">
      <div className="section-bar">SỔ LƯU BÚT</div>

      <div className="guestbook-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên của bạn*"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Nhập lời chúc của bạn gửi đến Tuấn & Thuỷ*"
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <button
              type="submit"
              className="btn-primary-pill"
              style={{ padding: "10px 24px", fontSize: "12px" }}
              id="btn-send-wish"
            >
              <Send size={13} /> GỬI LỜI CHÚC
            </button>
          </div>

          {/* Success Banner with Direct Zalo forwarding options */}
          {lastSubmittedWish && (
            <div
              style={{
                marginTop: "16px",
                padding: "14px",
                borderRadius: "10px",
                backgroundColor: "#F3F8F4",
                border: "1px solid #C8E6C9"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-forest)", fontWeight: 600, fontSize: "13px" }}>
                <CheckCircle2 size={16} color="#2E7D32" />
                Cảm ơn bạn! Lời chúc đã được đăng lên sổ lưu bút.
              </div>
              
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                Bạn có muốn gửi lời chúc này trực tiếp qua Zalo cho cô dâu hoặc chú rể không?
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: "10px", flexWrap: "wrap" }}>
                <a
                  href={groomZaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#0068FF",
                    color: "#FFFFFF",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 600,
                    textDecoration: "none"
                  }}
                >
                  <MessageCircle size={13} /> Gửi Zalo Chú Rể ({weddingConfig.groom.name})
                </a>

                <a
                  href={brideZaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#E91E63",
                    color: "#FFFFFF",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 600,
                    textDecoration: "none"
                  }}
                >
                  <Heart size={13} fill="#FFFFFF" /> Gửi Zalo Cô Dâu ({weddingConfig.bride.name})
                </a>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Wishes List */}
      <div className="wishes-list">
        {wishes.map(wish => (
          <div key={wish.id} className="wish-card">
            <div className="wish-header">
              <div className="wish-author">{wish.author}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div className="wish-time">{wish.createdAt}</div>
                <button
                  onClick={() => handleLike(wish.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#C5A059",
                    fontSize: "11px",
                    fontWeight: 600
                  }}
                  title="Thả tim lời chúc này"
                >
                  <Heart size={12} fill="#C5A059" /> {wish.likes || 1}
                </button>
              </div>
            </div>
            <div className="wish-text">{wish.message}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

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
    message: "Chúc mừng hạnh phúc! Hai bạn thật đẹp đôi, chúc trăm năm bên nhau nhé!",
    createdAt: "22:08 27/07/2026",
    likes: 8
  },
  {
    id: "3",
    author: "Anh Hoàng & Hội bạn",
    message: "Chúc mừng chú rể Tuấn đã rước được nàng thơ Thủy về dinh! Chúc đôi bạn trăm năm hạnh phúc!",
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

    const handleNewWish = (e: Event) => {
      const customEvent = e as CustomEvent<Wish>;
      setWishes(prev => [customEvent.detail, ...prev]);
    };

    window.addEventListener("new_wish_added", handleNewWish);
    return () => window.removeEventListener("new_wish_added", handleNewWish);
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

    // Optional: send to Google Sheet
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

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.8 },
      colors: ["#E8B4B8", "#D4848A", "#F5D5D8", "#C5A059"]
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
        `Chúc mừng đám cưới Tuấn & Thủy!\n\nLời chúc từ ${lastSubmittedWish.author}:\n"${lastSubmittedWish.message}"`
      )}`
    : `https://zalo.me/${weddingConfig.groom.zaloPhone}`;

  const brideZaloUrl = lastSubmittedWish
    ? `https://zalo.me/${weddingConfig.bride.zaloPhone}?text=${encodeURIComponent(
        `Chúc mừng đám cưới Tuấn & Thủy!\n\nLời chúc từ ${lastSubmittedWish.author}:\n"${lastSubmittedWish.message}"`
      )}`
    : `https://zalo.me/${weddingConfig.bride.zaloPhone}`;

  return (
    <section className="guestbook-section">
      <div className="guestbook-title">SỔ LƯU BÚT</div>

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
              placeholder={`Nhập lời chúc gửi đến ${weddingConfig.groom.name} & ${weddingConfig.bride.name}*`}
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "right", marginTop: 10 }}>
            <button
              type="submit"
              className="btn-primary-pill"
              style={{ padding: "10px 24px", fontSize: 12 }}
              id="btn-send-wish"
            >
              <Send size={13} /> GỬI LỜI CHÚC
            </button>
          </div>

          {/* Success Banner */}
          {lastSubmittedWish && (
            <div
              style={{
                marginTop: 16,
                padding: 14,
                borderRadius: 10,
                backgroundColor: "#FDF2F3",
                border: "1px solid #F5D5D8"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-pink-deep)", fontWeight: 600, fontSize: 13 }}>
                <CheckCircle2 size={16} color="#D4848A" />
                Cảm ơn bạn! Lời chúc đã được đăng lên sổ lưu bút.
              </div>

              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                Bạn có muốn gửi lời chúc trực tiếp qua Zalo không?
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
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
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    textDecoration: "none"
                  }}
                >
                  <MessageCircle size={13} /> Zalo Chú Rể
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
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    textDecoration: "none"
                  }}
                >
                  <Heart size={13} fill="#FFFFFF" /> Zalo Cô Dâu
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
                    color: "#D4848A",
                    fontSize: 11,
                    fontWeight: 600
                  }}
                  title="Thả tim"
                >
                  <Heart size={12} fill="#D4848A" /> {wish.likes || 1}
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

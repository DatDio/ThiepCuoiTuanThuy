"use client";

import React, { useState } from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { X, Copy, Check, QrCode } from "lucide-react";

interface LuckyMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LuckyMoneyModal({ isOpen, onClose }: LuckyMoneyModalProps) {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentPerson = activeTab === "groom" ? weddingConfig.groom : weddingConfig.bride;
  const personRole = activeTab === "groom" ? "Chú rể" : "Cô dâu";

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPerson.bank.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Đóng">
          <X size={18} />
        </button>

        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "17px",
              fontWeight: 700,
              color: "var(--color-forest)",
              letterSpacing: "1px"
            }}
          >
            HỘP MỪNG CƯỚI ONLINE
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
            Gửi món quà chúc phúc ý nghĩa đến Cô dâu & Chú rể
          </div>
        </div>

        {/* Tab Selection */}
        <div className="bank-tabs">
          <button
            className={`bank-tab-btn ${activeTab === "groom" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("groom");
              setCopied(false);
            }}
          >
            Mừng Chú Rể ({weddingConfig.groom.name})
          </button>
          <button
            className={`bank-tab-btn ${activeTab === "bride" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("bride");
              setCopied(false);
            }}
          >
            Mừng Cô Dâu ({weddingConfig.bride.name})
          </button>
        </div>

        {/* QR & Bank Info Box */}
        <div className="qr-box">
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--color-gold)", fontWeight: 700, marginBottom: "8px" }}>
            Mã VietQR Chuyển Khoản Nhanh
          </div>

          <img
            src={currentPerson.bank.qrCodeUrl}
            alt={`Mã QR ${personRole}`}
            className="qr-image"
          />

          <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--color-forest)", marginTop: "4px" }}>
            {currentPerson.bank.bankName}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: "6px" }}>
            <span style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "1px", color: "var(--text-dark)" }}>
              {currentPerson.bank.accountNumber}
            </span>
          </div>

          <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
            Chủ tài khoản: <strong>{currentPerson.bank.accountName}</strong>
          </div>

          <button onClick={handleCopy} className="copy-btn">
            {copied ? (
              <>
                <Check size={14} color="#2E7D32" /> Đã sao chép STK!
              </>
            ) : (
              <>
                <Copy size={14} /> Sao chép số tài khoản
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

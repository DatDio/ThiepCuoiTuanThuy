"use client";

import React, { useState, useEffect } from "react";
import { toSlug, createZaloInvitationMessage, GuestItem } from "@/lib/guestUtils";
import {
  UserPlus,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Download,
  Share2,
  FileSpreadsheet,
  Search,
  Sparkles,
  ArrowLeft,
  Heart,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

const ACCESS_PASSWORD = "tuanthuy";
const SESSION_KEY = "wedding_guest_auth";

const INITIAL_DEMO_GUESTS: GuestItem[] = [
  {
    id: "g1",
    name: "Gia đình Bác Hùng",
    salutation: "Gia đình",
    slug: "gia-dinh-bac-hung",
    role: "Họ hàng nhà trai",
    createdAt: Date.now() - 3600000 * 24
  },
  {
    id: "g2",
    name: "Anh Tuấn & Bạn gái",
    salutation: "Anh",
    slug: "anh-tuan-va-ban-gai",
    role: "Bạn Chú rể",
    createdAt: Date.now() - 3600000 * 12
  },
  {
    id: "g3",
    name: "Khánh Linh (Bạn thân)",
    salutation: "Bạn",
    slug: "khanh-linh",
    role: "Bạn Cô dâu",
    createdAt: Date.now() - 3600000 * 6
  }
];

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      try {
        sessionStorage.setItem(SESSION_KEY, "authenticated");
      } catch {
        // ignore
      }
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F4EFE6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px"
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          border: "1px solid var(--border-gold)",
          padding: "40px 32px",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "0 12px 40px rgba(26,61,47,0.1)",
          textAlign: "center",
          animation: shake ? "shakeX 0.5s ease" : undefined
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-forest), #2D5A47)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px"
          }}
        >
          <Lock size={28} color="#FFFFFF" />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "22px",
            color: "var(--color-forest)",
            margin: "0 0 8px"
          }}
        >
          Trang Quản Lý Nội Bộ
        </h1>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 24px", lineHeight: 1.5 }}>
          Vui lòng nhập mật khẩu để truy cập danh sách khách mời và công cụ quản lý.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Nhập mật khẩu..."
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoFocus
              style={{
                textAlign: "center",
                fontSize: "16px",
                padding: "14px 48px 14px 16px",
                borderRadius: "12px",
                border: error ? "2px solid #E53935" : "1px solid var(--border-gold)",
                transition: "border-color 0.3s ease"
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                padding: "4px"
              }}
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div
              style={{
                fontSize: "12px",
                color: "#E53935",
                marginBottom: "12px",
                fontWeight: 600
              }}
            >
              ⚠️ Mật khẩu không chính xác. Vui lòng thử lại!
            </div>
          )}

          <button
            type="submit"
            className="btn-primary-pill"
            style={{
              width: "100%",
              height: "48px",
              fontSize: "14px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            <ShieldCheck size={18} /> Xác Nhận Truy Cập
          </button>
        </form>

        <div style={{ marginTop: "20px", fontSize: "11px", color: "var(--text-light)" }}>
          <Heart size={12} fill="#C5A059" color="#C5A059" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
          Thiệp Cưới Online Tuấn & Thuỷ
        </div>
      </div>

      <style>{`
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}

export default function GuestManagerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [guests, setGuests] = useState<GuestItem[]>([]);
  const [name, setName] = useState("");
  const [salutation, setSalutation] = useState("Anh");
  const [role, setRole] = useState("Bạn Chú rể");
  const [bulkText, setBulkText] = useState("");
  const [showBulk, setShowBulk] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    // Check session authentication
    if (typeof window !== "undefined") {
      try {
        const auth = sessionStorage.getItem(SESSION_KEY);
        if (auth === "authenticated") {
          setIsAuthenticated(true);
        }
      } catch {
        // ignore
      }
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    // Load guest data only when authenticated
    if (isAuthenticated && typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
      try {
        const saved = localStorage.getItem("wedding_guests_list");
        if (saved) {
          setGuests(JSON.parse(saved));
        } else {
          setGuests(INITIAL_DEMO_GUESTS);
          localStorage.setItem("wedding_guests_list", JSON.stringify(INITIAL_DEMO_GUESTS));
        }
      } catch {
        setGuests(INITIAL_DEMO_GUESTS);
      }
    }
  }, [isAuthenticated]);

  const saveGuests = (updated: GuestItem[]) => {
    setGuests(updated);
    try {
      localStorage.setItem("wedding_guests_list", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const guestName = name.trim();
    const slug = toSlug(guestName);

    const newGuest: GuestItem = {
      id: Date.now().toString(),
      name: guestName,
      salutation,
      slug: slug || "quy-khach",
      role,
      createdAt: Date.now()
    };

    const updated = [newGuest, ...guests];
    saveGuests(updated);
    setName("");
  };

  const handleBulkImport = () => {
    if (!bulkText.trim()) return;

    const lines = bulkText.split("\n").map(l => l.trim()).filter(Boolean);
    const newItems: GuestItem[] = lines.map((line, idx) => ({
      id: (Date.now() + idx).toString(),
      name: line,
      salutation: "Bạn",
      slug: toSlug(line) || "quy-khach",
      role: "Khách mời",
      createdAt: Date.now() + idx
    }));

    const updated = [...newItems, ...guests];
    saveGuests(updated);
    setBulkText("");
    setShowBulk(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách mời này?")) {
      const updated = guests.filter(g => g.id !== id);
      saveGuests(updated);
    }
  };

  const handleClearAll = () => {
    if (confirm("Bạn có chắc muốn xóa toàn bộ danh sách khách mời không?")) {
      saveGuests([]);
    }
  };

  const getGuestLink = (guest: GuestItem) => {
    // If slug is clean, use /[slug], also pass query param ?to= for accurate accents
    return `${baseUrl}/${guest.slug}?to=${encodeURIComponent(guest.name)}`;
  };

  const handleCopyLink = (guest: GuestItem) => {
    const link = getGuestLink(guest);
    navigator.clipboard.writeText(link);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyZaloMessage = (guest: GuestItem) => {
    const link = getGuestLink(guest);
    const message = createZaloInvitationMessage(guest.name, link);
    navigator.clipboard.writeText(message);
    setCopiedMessageId(guest.id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleExportCsv = () => {
    if (guests.length === 0) {
      alert("Danh sách đang trống!");
      return;
    }
    const headers = "STT,Tên khách mời,Vai trò,Đường link thiệp\n";
    const rows = guests
      .map((g, i) => `${i + 1},"${g.name}","${g.role}","${getGuestLink(g)}"`)
      .join("\n");
    const blob = new Blob(["\uFEFF" + headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Danh-sach-khach-moi-Tuan-Thuy.csv`;
    a.click();
  };

  const filteredGuests = guests.filter(g =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (g.role && g.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Show nothing while checking auth status (prevents flash)
  if (!authChecked) {
    return <div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6" }} />;
  }

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F4EFE6", padding: "24px 16px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Top Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--color-forest)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "13px",
              background: "#FFFFFF",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid var(--border-gold)"
            }}
          >
            <ArrowLeft size={16} /> Xem thiệp cưới chính
          </Link>

          <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>
            Tổng số khách: <strong>{guests.length}</strong>
          </div>
        </div>

        {/* Header Banner */}
        <div
          style={{
            background: "var(--color-forest)",
            color: "#FFFFFF",
            borderRadius: "16px",
            padding: "24px 20px",
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(26,61,47,0.15)",
            marginBottom: "24px"
          }}
        >
          <div style={{ fontSize: "11px", letterSpacing: "3px", color: "var(--color-gold-light)", textTransform: "uppercase" }}>
            CÔNG CỤ NỘI BỘ DÀNH CHO CÔ DÂU & CHÚ RỂ
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "24px", margin: "8px 0", letterSpacing: "1px" }}>
            Quản Lý & Tạo Link Khách Mời
          </h1>
          <p style={{ fontSize: "13px", color: "#D2E0D7", maxWidth: "560px", margin: "0 auto" }}>
            Nhập tên khách mời để tự động sinh link thiệp riêng kèm lời mời Zalo. Hoàn toàn không cần database, lưu trực tiếp trên thiết bị của bạn!
          </p>
        </div>

        {/* Input Forms Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid var(--border-gold)",
            padding: "20px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            marginBottom: "24px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", color: "var(--color-forest)", fontWeight: 700 }}>
              {showBulk ? "Dán Danh Sách Hàng Loạt Từ Excel" : "Thêm Từng Khách Mời"}
            </h2>
            <button
              onClick={() => setShowBulk(!showBulk)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-forest)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              {showBulk ? "Chuyển sang thêm từng người" : "Dán hàng loạt từ Excel ➔"}
            </button>
          </div>

          {!showBulk ? (
            <form onSubmit={handleAddSingle} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
                  Tên khách mời *
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="VD: Anh Nam & Bạn gái"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
                  Danh xưng
                </label>
                <select
                  className="form-control"
                  value={salutation}
                  onChange={e => setSalutation(e.target.value)}
                >
                  <option value="Anh">Anh</option>
                  <option value="Chị">Chị</option>
                  <option value="Bạn">Bạn</option>
                  <option value="Em">Em</option>
                  <option value="Gia đình">Gia đình</option>
                  <option value="Bác">Bác</option>
                  <option value="Cô chú">Cô chú</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: 4 }}>
                  Phân loại nhóm
                </label>
                <select
                  className="form-control"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="Bạn Chú rể">Bạn Chú rể</option>
                  <option value="Bạn Cô dâu">Bạn Cô dâu</option>
                  <option value="Đồng nghiệp">Đồng nghiệp</option>
                  <option value="Họ hàng nhà trai">Họ hàng nhà trai</option>
                  <option value="Họ hàng nhà gái">Họ hàng nhà gái</option>
                  <option value="Khách VIP">Khách VIP</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  type="submit"
                  className="btn-primary-pill"
                  style={{ width: "100%", height: "42px", borderRadius: "8px", fontSize: "12px" }}
                >
                  <UserPlus size={15} /> Tạo Link Mới
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: 8 }}>
                Copy một cột tên từ file Excel hoặc Google Sheet rồi dán vào đây (mỗi dòng một tên khách):
              </p>
              <textarea
                className="form-control"
                rows={5}
                placeholder={"Anh Hoàng & Vợ\nChị Mai Phương\nBạn Nam Cấp 3\nGia đình Chú Long"}
                value={bulkText}
                onChange={e => setBulkText(e.target.value)}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                <button
                  onClick={handleBulkImport}
                  className="btn-primary-pill"
                  style={{ fontSize: "12px", padding: "10px 20px" }}
                >
                  <FileSpreadsheet size={15} /> Tự Động Tạo Hàng Loạt Link
                </button>
                <button
                  onClick={() => setShowBulk(false)}
                  style={{
                    background: "#EBE6DA",
                    border: "none",
                    borderRadius: "30px",
                    padding: "10px 18px",
                    fontSize: "12px",
                    cursor: "pointer",
                    color: "var(--text-dark)"
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* List & Controls */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid var(--border-gold)",
            padding: "20px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)"
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: "16px" }}>
            <div style={{ position: "relative", minWidth: "240px", flex: 1 }}>
              <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#8E9E92" }} />
              <input
                type="text"
                className="form-control"
                style={{ paddingLeft: "36px" }}
                placeholder="Tìm kiếm khách mời..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleExportCsv}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#F3EFE6",
                  border: "1px solid var(--border-gold)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "12px",
                  color: "var(--color-forest)",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                <Download size={14} /> Xuất file CSV/Excel
              </button>

              {guests.length > 0 && (
                <button
                  onClick={handleClearAll}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#FFF0F0",
                    border: "1px solid #FFCDD2",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "#C62828",
                    cursor: "pointer",
                    fontWeight: 600
                  }}
                >
                  <Trash2 size={14} /> Xóa tất cả
                </button>
              )}
            </div>
          </div>

          {/* Table / Cards */}
          {filteredGuests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 10px", color: "var(--text-muted)", fontSize: "13px" }}>
              Không tìm thấy khách mời nào phù hợp.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filteredGuests.map((guest, idx) => {
                const link = getGuestLink(guest);
                const isCopied = copiedId === guest.id;
                const isMessageCopied = copiedMessageId === guest.id;

                return (
                  <div
                    key={guest.id}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "14px",
                      borderRadius: "10px",
                      background: idx % 2 === 0 ? "#FAFAFA" : "#FFFFFF",
                      border: "1px solid var(--border-subtle)"
                    }}
                  >
                    <div style={{ flex: "1 1 240px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "var(--font-serif)", fontSize: "16px", fontWeight: 700, color: "var(--color-forest)" }}>
                          {guest.name}
                        </span>
                        <span
                          style={{
                            fontSize: "10px",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            backgroundColor: "#E8F0EC",
                            color: "var(--color-forest)",
                            fontWeight: 600
                          }}
                        >
                          {guest.role}
                        </span>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--text-light)", marginTop: 2, wordBreak: "break-all" }}>
                        {link}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                      {/* Copy Link Button */}
                      <button
                        onClick={() => handleCopyLink(guest)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          background: isCopied ? "#E8F5E9" : "#FFFFFF",
                          border: isCopied ? "1px solid #81C784" : "1px solid var(--border-gold)",
                          color: isCopied ? "#2E7D32" : "var(--color-forest)",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {isCopied ? <Check size={13} /> : <Copy size={13} />}
                        {isCopied ? "Đã copy link!" : "Copy Link"}
                      </button>

                      {/* Copy Zalo Message Template */}
                      <button
                        onClick={() => handleCopyZaloMessage(guest)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          background: isMessageCopied ? "#E8F5E9" : "var(--color-forest)",
                          border: "none",
                          color: isMessageCopied ? "#2E7D32" : "#FFFFFF",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        {isMessageCopied ? <Check size={13} /> : <Share2 size={13} />}
                        {isMessageCopied ? "Đã copy lời mời!" : "Copy Lời Mời Zalo"}
                      </button>

                      {/* View Link */}
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "6px 8px",
                          borderRadius: "6px",
                          border: "1px solid var(--border-subtle)",
                          color: "var(--text-muted)",
                          background: "#FFFFFF"
                        }}
                        title="Xem thử thiệp"
                      >
                        <ExternalLink size={14} />
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(guest.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#C62828",
                          padding: "6px",
                          cursor: "pointer"
                        }}
                        title="Xóa"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px", color: "var(--text-muted)" }}>
          <Heart size={14} fill="#C5A059" color="#C5A059" style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
          Thiệp Cưới Online Tuấn & Thuỷ • Chúc hai bạn trăm năm hạnh phúc!
        </div>
      </div>
    </div>
  );
}

export interface GuestItem {
  id: string;
  name: string;
  salutation?: string; // Anh, Chị, Bạn, Em, Cô, Chú, Bác, Gia đình...
  slug: string;
  role?: string; // Bạn chú rể, Bạn cô dâu, Họ hàng, Đồng nghiệp...
  createdAt: number;
}

// Convert Vietnamese string to clean URL slug
export function toSlug(str: string): string {
  if (!str) return "";
  let clean = str.trim().toLowerCase();
  
  // Replace Vietnamese accents
  clean = clean.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  clean = clean.replace(/[đĐ]/g, "d");
  
  // Replace symbols and special characters with dash
  clean = clean.replace(/[^a-z0-9\s-]/g, "");
  clean = clean.replace(/\s+/g, "-");
  clean = clean.replace(/-+/g, "-");
  clean = clean.replace(/^-+|-+$/g, "");
  
  return clean;
}

// Format slug back to display title if no explicit name is found
export function decodeSlugToName(slug: string): string {
  if (!slug) return "Quý Khách";
  
  try {
    const decoded = decodeURIComponent(slug);
    // If it contains dashes and no spaces, convert kebab-case to capitalized words
    if (decoded.includes("-") && !decoded.includes(" ")) {
      return decoded
        .split("-")
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return decoded;
  } catch {
    return slug.replace(/-/g, " ");
  }
}

// Build friendly invitation message for Zalo / Messenger
export function createZaloInvitationMessage(guestName: string, inviteUrl: string): string {
  return `💌 THIỆP CƯỚI TUẤN & THUỶ 💌

Thân gửi ${guestName},
Hôn lễ là khởi đầu cho một hành trình mới đầy yêu thương của chúng mình. Sự hiện diện và lời chúc phúc của ${guestName} chính là niềm vinh hạnh và hạnh phúc lớn nhất đối với gia đình hai bên!

👉 Kính mời ${guestName} xem thiệp cưới online tại:
${inviteUrl}

⏰ Thời gian: 18:00 - Thứ Bảy, ngày 10/10/2026
📍 Địa điểm: Xóm 6, Xã Giao Minh, Tỉnh Ninh Bình

Rất hân hạnh và mong được đón tiếp ${guestName}! ✨`;
}

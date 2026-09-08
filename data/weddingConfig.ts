export interface WeddingConfig {
  groom: {
    name: string;
    fullName: string;
    role: string;
    fatherName: string;
    motherName: string;
    address: string;
    phone: string;
    zaloPhone: string;
    bank: {
      bankName: string;
      accountNumber: string;
      accountName: string;
      qrCodeUrl: string;
    };
  };
  bride: {
    name: string;
    fullName: string;
    role: string;
    fatherName: string;
    motherName: string;
    address: string;
    phone: string;
    zaloPhone: string;
    bank: {
      bankName: string;
      accountNumber: string;
      accountName: string;
      qrCodeUrl: string;
    };
  };
  googleSheetWebhookUrl?: string; // Tùy chọn: Link Google Sheet để lưu lời chúc & RSVP tự động miễn phí
  eventCeremony: {
    title: string;
    location: string;
    address: string;
    time: string;
    dayOfWeek: string;
    day: string;
    month: string;
    year: string;
    lunarDate: string;
  };
  eventReception: {
    title: string;
    venue: string;
    address: string;
    time: string;
    startTime: string;
    dayOfWeek: string;
    day: string;
    month: string;
    year: string;
    lunarDate: string;
    calendarMonth: number;
    calendarYear: number;
    weddingDay: number;
    mapUrl: string;
    mapEmbedSrc: string;
  };
  dressCode: {
    title: string;
    subtitle: string;
    colors: { name: string; hex: string; border?: string }[];
  };
  timeline: {
    time: string;
    title: string;
    desc?: string;
  }[];
  heroImage: string; // Ảnh vòm cung chính ở đầu trang
  ogImage: string;   // Ảnh đại diện khi gửi link qua Zalo / Messenger
  gallery: {
    id: number;
    url: string;
    caption: string;
  }[];
  music: {
    url: string;
    title: string;
    artist: string;
  };
}

export const weddingConfig: WeddingConfig = {
  // 1. ẢNH ĐẠI DIỆN ĐẦU TRANG & ẢNH XEM TRƯỚC TRÊN ZALO / FACEBOOK
  // Bạn có thể dán link online (https://...) HOẶC copy ảnh vào thư mục public/images/ rồi điền "/images/ten-anh.jpg"
  heroImage: "/images/photo_2026-09-08_20-05-25.jpg",
  ogImage: "/images/photo_2026-09-08_20-05-25.jpg",

  groom: {
    name: "Quốc Tuấn",
    fullName: "Võ Quốc Tuấn",
    role: "Trưởng Nam",
    fatherName: "Võ Nhật Minh",
    motherName: "Trần Thu Thảo",
    address: "Xóm 6, Xã Giao Minh, Tỉnh Ninh Bình",
    phone: "0901234567",
    zaloPhone: "0901234567",
    bank: {
      bankName: "Vietcombank",
      accountNumber: "1018999888",
      accountName: "VO QUOC TUAN",
      qrCodeUrl: "https://img.vietqr.io/image/VCB-1018999888-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Tuan%20Thuy&accountName=VO%20QUOC%20TUAN"
    }
  },
  bride: {
    name: "Đinh Thuỷ",
    fullName: "Đinh Thuỷ",
    role: "Út Nữ",
    fatherName: "Đinh Thanh Nam",
    motherName: "Nguyễn Thị Kim Oanh",
    address: "Xóm 6, Xã Giao Minh, Tỉnh Ninh Bình",
    phone: "0987654321",
    zaloPhone: "0987654321",
    bank: {
      bankName: "Techcombank",
      accountNumber: "1903666888",
      accountName: "DINH THUY",
      qrCodeUrl: "https://img.vietqr.io/image/TCB-1903666888-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Tuan%20Thuy&accountName=DINH%20THUY"
    }
  },
  googleSheetWebhookUrl: "", // Nhập link Google Apps Script Webhook nếu muốn tự động đồng bộ vào Google Sheet
  eventCeremony: {
    title: "LỄ THÀNH HÔN",
    location: "TƯ GIA",
    address: "Xóm 6, Xã Giao Minh, Tỉnh Ninh Bình",
    time: "09:00",
    dayOfWeek: "THỨ BẢY",
    day: "10",
    month: "THÁNG 10",
    year: "2026",
    lunarDate: "TỨC NGÀY 01 THÁNG 9 NĂM BÍNH NGỌ"
  },
  eventReception: {
    title: "TIỆC CƯỚI THÂN MẬT",
    venue: "Tư Gia",
    address: "Xóm 6, Xã Giao Minh, Tỉnh Ninh Bình",
    time: "18:00",
    startTime: "18:00",
    dayOfWeek: "THỨ BẢY",
    day: "10",
    month: "THÁNG 10",
    year: "2026",
    lunarDate: "TỨC NGÀY 01 THÁNG 9 NĂM BÍNH NGỌ",
    calendarMonth: 10,
    calendarYear: 2026,
    weddingDay: 10,
    mapUrl: "https://maps.google.com/?q=Xom+6+Giao+Minh+Ninh+Binh",
    mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000!2d106.3!3d20.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zR2lhbyBNaW5o!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
  },
  dressCode: {
    title: "DRESS CODE",
    subtitle: "Trang phục dự tiệc",
    colors: [
      { name: "Xanh Rêu (Forest/Sage)", hex: "#7C9082" },
      { name: "Trắng Kem (Off-white)", hex: "#F5F2EB", border: "#E0DCD3" },
      { name: "Be Vàng (Soft Beige)", hex: "#D8CCBC" }
    ]
  },
  timeline: [
    { time: "17:30", title: "Đón khách", desc: "Chụp ảnh lưu niệm cùng Cô dâu & Chú rể" },
    { time: "18:30", title: "Khai tiệc", desc: "Đón chào tân lang & tân nương vào lễ đường" },
    { time: "18:45", title: "Rót rượu, cắt bánh", desc: "Nghi thức hôn lễ trang trọng" },
    { time: "19:00", title: "Phục vụ món chính", desc: "Mời quan khách dùng tiệc cùng âm nhạc" },
    { time: "20:00", title: "Minigame & Chúc rượu", desc: "Khoảnh khắc giao lưu đầm ấm" },
    { time: "21:00", title: "Kết thúc tiệc", desc: "Cảm ơn & tiễn khách quý" }
  ],
  gallery: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
      caption: "Khoảnh khắc hạnh phúc dưới vòm hoa"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
      caption: "Nụ cười rạng rỡ của đôi uyên ương"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
      caption: "Tay trong tay hướng về tương lai"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop",
      caption: "Lời hẹn ước trọn đời"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop",
      caption: "Ánh mắt trao nhau ngọt ngào"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=1000&auto=format&fit=crop",
      caption: "Tình yêu bắt đầu từ những điều giản đơn"
    }
  ],
  music: {
    url: "/music/IDo.mp3",
    title: "I Do",
    artist: "911"
  }
};

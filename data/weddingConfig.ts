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
    image: string;
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
    image: string;
    bank: {
      bankName: string;
      accountNumber: string;
      accountName: string;
      qrCodeUrl: string;
    };
  };
  googleSheetWebhookUrl?: string;
  loveStory: string;
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
  heroImage: string;
  ogImage: string;
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
  // ẢNH ĐẠI DIỆN
  heroImage: "/images/1.jpg",
  ogImage: "/images/og-banner.jpg",

  // CHÚ RỂ
  groom: {
    name: "Quốc Tuấn",
    fullName: "Phạm Quốc Tuấn",
    role: "Chú Rể",
    fatherName: "Phạm Quốc Việt",
    motherName: "Mai Thị Riên",
    address: "Thôn Hoành Đông, Xã Giao Minh, Tỉnh Ninh Bình",
    phone: "0901234567",
    zaloPhone: "0901234567",
    image: "/images/3.jpg",
    bank: {
      bankName: "Vietcombank",
      accountNumber: "1018999888",
      accountName: "PHAM QUOC TUAN",
      qrCodeUrl: "https://img.vietqr.io/image/VCB-1018999888-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Tuan%20Thuy&accountName=PHAM%20QUOC%20TUAN"
    }
  },

  // CÔ DÂU
  bride: {
    name: "Thị Thủy",
    fullName: "Đinh Thị Thủy",
    role: "Cô Dâu",
    fatherName: "Đinh Văn Thuần",
    motherName: "Phạm Thị Quế",
    address: "Thôn Phú Thọ, Xã Giao Minh, Tỉnh Ninh Bình",
    phone: "0987654321",
    zaloPhone: "0987654321",
    image: "/images/2.jpg",
    bank: {
      bankName: "Techcombank",
      accountNumber: "1903666888",
      accountName: "DINH THI THUY",
      qrCodeUrl: "https://img.vietqr.io/image/TCB-1903666888-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Tuan%20Thuy&accountName=DINH%20THI%20THUY"
    }
  },

  googleSheetWebhookUrl: "",

  // CÂU CHUYỆN TÌNH YÊU
  loveStory: "Giữa muôn vàn gặp gỡ, chúng mình may mắn tìm thấy nhau. Từ những ngày đầu bỡ ngỡ, qua bao vui buồn và thử thách, tình yêu vẫn kiên định, hòa thành sự thấu hiểu và đồng hành. Hôm nay hạnh phúc chẳng phải điều xa xôi mà là có một người để cùng sẻ chia, cùng nắm tay đi hết chặng đường dài phía trước.\n\nVà rồi chúng mình,\nChúng mình gặp nhau giữa dòng đời.",

  // SỰ KIỆN 1: BỮA CƠM THÂN MẬT (TIỆC)
  eventReception: {
    title: "BỮA CƠM THÂN MẬT",
    venue: "TƯ GIA NHÀ TRAI",
    address: "Thôn Hoành Đông - Xã Giao Minh - Tỉnh Ninh Bình",
    time: "17:30",
    startTime: "17:30",
    dayOfWeek: "THỨ BẢY",
    day: "10",
    month: "10",
    year: "2026",
    lunarDate: "Tức ngày 01 tháng 09 năm Bính Ngọ",
    calendarMonth: 10,
    calendarYear: 2026,
    weddingDay: 10,
    mapUrl: "https://maps.google.com/?q=Thon+Hoanh+Dong+Giao+Minh+Ninh+Binh",
    mapEmbedSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000!2d106.3!3d20.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zR2lhbyBNaW5o!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
  },

  // SỰ KIỆN 2: LỄ THÀNH HÔN
  eventCeremony: {
    title: "LỄ THÀNH HÔN",
    location: "TƯ GIA NHÀ TRAI",
    address: "Thôn Hoành Đông - Xã Giao Minh - Tỉnh Ninh Bình",
    time: "10:00",
    dayOfWeek: "CHỦ NHẬT",
    day: "11",
    month: "THÁNG 10",
    year: "2026",
    lunarDate: "Tức ngày 02 tháng 09 năm Bính Ngọ"
  },

  // ALBUM ẢNH
  gallery: [
    {
      id: 1,
      url: "/images/4.jpg",
      caption: "Khoảnh khắc hạnh phúc"
    },
    {
      id: 2,
      url: "/images/5.jpg",
      caption: "Bên nhau trọn đời"
    }
  ],

  // NHẠC NỀN
  music: {
    url: "/music/VideoProject.mp3",
    title: "I Do",
    artist: "911"
  }
};

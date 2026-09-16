"use client";

import React, { useState } from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = weddingConfig.gallery;

  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="gallery-section">
      <div className="gallery-scroll">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className="gallery-full-image"
            onClick={() => setLightboxIndex(idx)}
            style={{ cursor: "pointer" }}
          >
            <img src={img.url} alt={img.caption} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <button
            className="modal-close-btn"
            onClick={closeLightbox}
            aria-label="Đóng"
            style={{ position: "absolute", top: 16, right: 16 }}
          >
            <X size={20} />
          </button>

          <button
            className="modal-close-btn"
            style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            onClick={prevImage}
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={22} />
          </button>

          <div onClick={e => e.stopPropagation()} style={{ textAlign: "center", maxWidth: "90vw" }}>
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].caption}
              className="lightbox-img"
            />
            <div style={{ color: "#FFFFFF", marginTop: 10, fontSize: 13, fontFamily: "var(--font-serif)", letterSpacing: 1 }}>
              {images[lightboxIndex].caption} ({lightboxIndex + 1}/{images.length})
            </div>
          </div>

          <button
            className="modal-close-btn"
            style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)" }}
            onClick={nextImage}
            aria-label="Ảnh tiếp"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </section>
  );
}

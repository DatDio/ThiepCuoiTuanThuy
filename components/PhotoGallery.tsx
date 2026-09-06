"use client";

import React, { useState } from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = weddingConfig.gallery;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

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
      <div className="section-bar">ALBUM ẢNH</div>

      {/* 2x2 Grid matching Image 3 */}
      <div className="gallery-grid">
        {images.slice(0, 4).map((img, idx) => {
          const isFourth = idx === 3;
          const remainingCount = images.length - 4;

          return (
            <div
              key={img.id}
              className="gallery-item"
              onClick={() => openLightbox(idx)}
            >
              <img src={img.url} alt={img.caption} loading="lazy" />
              {isFourth && remainingCount > 0 && (
                <div className="gallery-more-overlay">
                  +{remainingCount}
                  <span>XEM THÊM</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: "center", marginTop: "18px" }}>
        <button
          onClick={() => openLightbox(0)}
          className="btn-outline-pill"
        >
          <Eye size={16} /> Xem tất cả ảnh cưới
        </button>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <button
            className="modal-close-btn"
            onClick={closeLightbox}
            aria-label="Đóng"
          >
            <X size={20} />
          </button>

          <button
            className="modal-close-btn"
            style={{ right: "auto", left: "16px", top: "50%", transform: "translateY(-50%)" }}
            onClick={prevImage}
            aria-label="Ảnh trước"
          >
            <ChevronLeft size={22} />
          </button>

          <div
            onClick={e => e.stopPropagation()}
            style={{ textAlign: "center", maxWidth: "90vw" }}
          >
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].caption}
              className="lightbox-img"
            />
            <div
              style={{
                color: "#FFFFFF",
                marginTop: "10px",
                fontSize: "13px",
                fontFamily: "var(--font-serif)",
                letterSpacing: "1px"
              }}
            >
              {images[lightboxIndex].caption} ({lightboxIndex + 1}/{images.length})
            </div>
          </div>

          <button
            className="modal-close-btn"
            style={{ right: "16px", top: "50%", transform: "translateY(-50%)" }}
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

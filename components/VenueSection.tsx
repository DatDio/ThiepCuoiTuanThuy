"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { ExternalLink } from "lucide-react";

export default function VenueSection() {
  const { eventReception } = weddingConfig;

  return (
    <section className="venue-section">
      {/* Embedded Map */}
      <div className="map-embed-wrapper">
        <iframe
          src={eventReception.mapEmbedSrc}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ chỉ đường"
        />
        <a
          href={eventReception.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-open-btn"
        >
          Mở trong Maps <ExternalLink size={12} />
        </a>
      </div>

      <div className="venue-address-text">
        Địa chỉ: {eventReception.address}
      </div>
    </section>
  );
}

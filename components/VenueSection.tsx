"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";
import { MapPin, Navigation } from "lucide-react";

export default function VenueSection() {
  const { eventReception } = weddingConfig;

  return (
    <section className="venue-section">
      <div className="section-bar">TIỆC CƯỚI SẼ TỔ CHỨC TẠI</div>

      <div className="venue-name">{eventReception.venue}</div>
      <div className="venue-address">{eventReception.address}</div>

      {/* Embedded Map */}
      <div className="map-embed-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2435777726356!2d106.65775597573617!3d10.792644258893608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293671234567%3A0xabcdef123456789!2zVHJ1bmcgdMOibSBI4buZaSBuZ2jhu4sgJiBUaeG7h2MgY8aw4bubaSBHYWxhIENlbnRlcg!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ chỉ đường tiệc cưới"
        />
      </div>

      <a
        href={eventReception.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary-pill"
        style={{ fontSize: "12px", padding: "10px 22px" }}
      >
        <Navigation size={14} />
        Chỉ đường bằng Google Maps
      </a>
    </section>
  );
}

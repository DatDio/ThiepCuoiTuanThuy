"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";

export default function DressCodeSection() {
  const { dressCode } = weddingConfig;

  return (
    <section className="dresscode-section">
      <div className="dresscode-title">{dressCode.title}</div>
      <div className="dresscode-sub">{dressCode.subtitle}</div>

      <div className="dresscode-swatches">
        {dressCode.colors.map((c, i) => (
          <div key={i} className="swatch-item">
            <div
              className="swatch-circle"
              style={{
                backgroundColor: c.hex,
                border: c.border ? `1px solid ${c.border}` : "1px solid rgba(0,0,0,0.06)"
              }}
            />
            <div className="swatch-label">{c.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

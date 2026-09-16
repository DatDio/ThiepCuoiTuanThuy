"use client";

import React from "react";
import { weddingConfig } from "@/data/weddingConfig";

export default function LoveStorySection() {
  return (
    <section className="love-story-section">
      <div className="love-story-card">
        <div className="love-story-title">OUR LOVE STORY</div>
        <div className="love-story-text">
          {weddingConfig.loveStory}
        </div>
      </div>

      <div className="love-story-card-alt">
        <div className="love-story-quote">
          Và rồi chúng mình,{"\n"}
          Chúng mình gặp nhau giữa đông đời.
        </div>
      </div>
    </section>
  );
}

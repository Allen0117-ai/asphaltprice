import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(180deg, #fcfcfb 0%, #f5f5f4 100%)",
          color: "#09090b",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f4f4f5",
              fontSize: 32,
              fontWeight: 700
            }}
          >
            A
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: "#3f3f46" }}>{siteConfig.name}</div>
            <div style={{ fontSize: 18, color: "#71717a" }}>Driveway and paving estimates</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 860 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Asphalt Calculator</div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "#52525b" }}>
            Estimate tonnage, material cost, and installed cost for asphalt projects in seconds.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#3f3f46" }}>
          {["Tonnage", "Cost range", "Region pricing", "Shareable link"].map((item) => (
            <div
              key={item}
              style={{
                padding: "14px 18px",
                borderRadius: 9999,
                border: "1px solid #e4e4e7",
                background: "#ffffff"
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}


import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

function cleanText(value: string | null, fallback: string, maxLength: number) {
  const normalized = value?.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return (normalized || fallback).slice(0, maxLength);
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = cleanText(url.searchParams.get("title"), siteConfig.name, 90);
  const path = cleanText(url.searchParams.get("path"), "/", 80);

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
          background: "linear-gradient(135deg, #18181b 0%, #27272a 62%, #3f3f46 100%)",
          color: "white",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 72,
                height: 72,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 18,
                background: "#fbbf24",
                color: "#18181b",
                fontSize: 34,
                fontWeight: 800
              }}
            >
              A
            </div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{siteConfig.name}</div>
          </div>
          <div style={{ fontSize: 20, color: "#d4d4d8" }}>{path}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1040 }}>
          <div style={{ fontSize: title.length > 62 ? 54 : 68, lineHeight: 1.08, fontWeight: 800 }}>{title}</div>
          <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#e4e4e7" }}>
            <div style={{ borderRadius: 999, background: "#3f3f46", padding: "12px 18px" }}>Planning calculator</div>
            <div style={{ borderRadius: 999, background: "#3f3f46", padding: "12px 18px" }}>Formula + cost guide</div>
            <div style={{ borderRadius: 999, background: "#3f3f46", padding: "12px 18px" }}>Updated sources</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 20 }}>
          <div style={{ color: "#fbbf24", fontWeight: 700 }}>asphaltprice.com</div>
          <div style={{ color: "#a1a1aa" }}>Estimate first. Confirm locally.</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

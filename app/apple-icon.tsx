import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#f4f4f5",
          borderRadius: 36
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 24,
            border: "8px solid #f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box"
          }}
        >
          <div
            style={{
              width: 66,
              height: 44,
              borderRadius: 12,
              background: "#f4f4f5",
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              padding: 6,
              boxSizing: "border-box"
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                style={{
                  borderRadius: 5,
                  background: index < 3 ? "#0f172a" : "#d97706",
                  height: 8,
                  width: 14
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}

import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 96
        }}
      >
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: 72,
            border: "20px solid #f59e0b",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box"
          }}
        >
          <div
            style={{
              width: 190,
              height: 130,
              borderRadius: 28,
              background: "#f4f4f5",
              padding: 20,
              display: "flex",
              flexWrap: "wrap",
              gap: 15,
              boxSizing: "border-box"
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                style={{
                  borderRadius: 10,
                  background: index < 3 ? "#0f172a" : "#d97706",
                  height: 22,
                  width: 40
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

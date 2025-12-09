import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0D0D0D",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            background: "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "800px",
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            AI Integration for Real Products
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#BBBBBB",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            We embed AI into your systems in days, not months.
          </p>

          {/* Signature */}
          <p
            style={{
              fontSize: "20px",
              fontWeight: 300,
              color: "#888888",
              margin: 0,
              marginTop: "24px",
            }}
          >
            Egor Polyakov — AI & Backend Engineer
          </p>
        </div>

        {/* Decorative dots pattern */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            opacity: 0.15,
          }}
        >
          {[...Array(5)].map((_, row) => (
            <div key={row} style={{ display: "flex", gap: "16px" }}>
              {[...Array(5)].map((_, col) => (
                <div
                  key={col}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#3B82F6",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

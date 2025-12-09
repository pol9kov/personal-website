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
            background:
              "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "850px",
          }}
        >
          {/* Top line - name and role */}
          <p
            style={{
              fontSize: "18px",
              fontWeight: 400,
              color: "#FFFFFF",
              margin: 0,
              opacity: 0.7,
              letterSpacing: "0.02em",
            }}
          >
            Egor Polyakov · Backend & AI Engineer
          </p>

          {/* Headline */}
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
              fontSize: "26px",
              fontWeight: 400,
              color: "#BBBBBB",
              margin: 0,
              lineHeight: 1.5,
              marginTop: "8px",
            }}
          >
            We connect AI to your CRM, chatbots and internal tools.{" "}<br />Results in days, not months.
          </p>

          {/* Bottom tags */}
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "#666666",
              margin: 0,
              marginTop: "32px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Backend · Architecture · AI Integration
          </p>
        </div>

        {/* Decorative dots pattern with gradient */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {[...Array(5)].map((_, row) => (
            <div key={row} style={{ display: "flex", gap: "16px" }}>
              {[...Array(5)].map((_, col) => {
                // Gradient from bottom-left (light) to top-right (dark)
                // row 4 = bottom, row 0 = top; col 0 = left, col 4 = right
                const t = (col + (4 - row)) / 8; // 0 (bottom-left) to 1 (top-right)
                // Interpolate between cyan (6, 182, 212) and blue (37, 99, 235)
                const r = Math.round(6 + t * (37 - 6));
                const g = Math.round(182 + t * (99 - 182));
                const b = Math.round(212 + t * (235 - 212));
                // Light at bottom-left, dark at top-right
                const opacity = 0.7 - t * 0.4;
                return (
                  <div
                    key={col}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: `rgba(${r}, ${g}, ${b}, ${opacity})`,
                    }}
                  />
                );
              })}
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

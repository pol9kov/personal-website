import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Egor Polyakov - Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;

  const name = locale === "ru" ? "Егор Поляков" : "Egor Polyakov";
  const title = locale === "ru" ? "Software Engineer" : "Software Engineer";
  const subtitle =
    locale === "ru"
      ? "10+ лет опыта в разработке"
      : "10+ years of experience";

  // Read profile image from public folder (mobile version is cropped/zoomed)
  const profileImagePath = join(
    process.cwd(),
    "public/images/profile-mobile.jpg"
  );
  const profileImageBuffer = await readFile(profileImagePath);
  const profileImageBase64 = `data:image/jpeg;base64,${profileImageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #ffffff, #f9fafb)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(147, 51, 234, 0.08), rgba(59, 130, 246, 0.08))",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          {/* Profile photo */}
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: 32,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              border: "4px solid white",
              display: "flex",
            }}
          >
            <img
              src={profileImageBase64}
              alt={name}
              width={160}
              height={160}
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          {/* Name */}
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              background: "linear-gradient(135deg, #3b82f6, #9333ea)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            {name}
          </h1>

          {/* Title */}
          <p
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#374151",
              margin: 0,
              marginBottom: 12,
            }}
          >
            {title}
          </p>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 24,
              color: "#6b7280",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Website URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: "#9ca3af",
            }}
          >
            egor-polyakov.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/config/site";

/**
 * OpenGraph image generator
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 *
 * This generates a dynamic OG image for social sharing.
 * Customize the design to match your brand.
 */

export const runtime = "edge";

export const alt = SITE_CONFIG.NAME;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const PROTOCOL_REGEX = /^https?:\/\//;

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        position: "relative",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Logo placeholder */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            borderRadius: "20px",
            marginBottom: "32px",
            fontSize: "40px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {SITE_CONFIG.NAME.charAt(0)}
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_CONFIG.NAME}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "28px",
            color: "rgba(255, 255, 255, 0.7)",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          {SITE_CONFIG.DESCRIPTION}
        </div>
      </div>

      {/* Bottom URL */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: "20px",
        }}
      >
        {SITE_CONFIG.URL.replace(PROTOCOL_REGEX, "")}
      </div>
    </div>,
    {
      ...size,
    }
  );
}

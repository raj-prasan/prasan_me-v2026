import { ImageResponse } from "next/og"

export const alt = "Prasan Raj — I build systems that hold."
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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
          background: "#0C0C0B",
          color: "#E8E4DC",
          padding: "68px 76px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 24,
            letterSpacing: 4,
          }}
        >
          <span>PR</span>
          <span style={{ color: "#D6FF3A" }}>PRASAN.TECH</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 108,
            fontWeight: 800,
            lineHeight: 0.88,
            letterSpacing: -3,
          }}
        >
          <span>I BUILD</span>
          <span>SYSTEMS</span>
          <span style={{ display: "flex" }}>
            THAT HOLD<span style={{ color: "#D6FF3A" }}>.</span>
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#A39E95" }}>
          Prasan Raj · Full-stack developer · Tezpur University
        </div>
      </div>
    ),
    { ...size },
  )
}

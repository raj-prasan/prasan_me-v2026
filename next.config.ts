import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/posts", destination: "/", permanent: false },
      { source: "/now", destination: "/#about", permanent: false },
    ]
  },
}

export default nextConfig

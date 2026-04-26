import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
};
module.exports = {
  allowedDevOrigins: ['10.55.21.182'],
   images: {
    domains: ['res.cloudinary.com'],
  },
}

export default nextConfig;

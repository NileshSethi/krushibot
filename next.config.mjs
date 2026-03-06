import crypto from 'crypto';

// Generate a unique boot ID on every server start — invalidates all previous JWTs
const SERVER_BOOT_ID = crypto.randomUUID();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER_BOOT_ID,
  },
};

export default nextConfig;

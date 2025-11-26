/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_MEAL_API: process.env.NEXT_PUBLIC_MEAL_API,
  },

  /* config options here */
};

module.exports = nextConfig;


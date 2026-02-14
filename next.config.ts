import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // NOTE: If deploying to a project page (e.g. username.github.io/repo-name),
  // you must uncomment the following line and replace 'repo-name' with your repository name.
  // basePath: '/repo-name',
};

export default nextConfig;

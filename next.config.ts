import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig: NextConfig = {
  output: isGithubActions ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  // NOTE: If deploying to a project page (e.g. username.github.io/repo-name),
  // you must uncomment the following line and replace 'repo-name' with your repository name.
  // basePath: '/repo-name',
};

export default nextConfig;

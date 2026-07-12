import type { NextConfig } from 'next'
import path from 'path'

const isGithubPages = process.env.GITHUB_PAGES === 'true'

/** Project Pages URL: https://<org>.github.io/<repo>/ */
const basePath = isGithubPages
  ? `/${process.env.GITHUB_REPOSITORY_NAME ?? 'Promotion-Website'}`
  : ''

const nextConfig: NextConfig = {
  output: isGithubPages ? 'export' : undefined,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: isGithubPages,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: isGithubPages,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

export default nextConfig

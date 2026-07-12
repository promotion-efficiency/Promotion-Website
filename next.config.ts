import type { NextConfig } from 'next'
import path from 'path'
import { resolveSiteBasePath } from './lib/site'

const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = resolveSiteBasePath()

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
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    config.plugins.push(
      new webpack.DefinePlugin({
        __SITE_BASE_PATH__: JSON.stringify(basePath),
      }),
    )

    return config
  },
}

export default nextConfig

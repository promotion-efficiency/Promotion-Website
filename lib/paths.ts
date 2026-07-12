const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Prefix a public-folder path for GitHub Pages basePath deployments. */
export function assetPath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${normalized}`
}

export { basePath }

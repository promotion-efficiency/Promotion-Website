/** Repo folder name on GitHub Pages: https://<org>.github.io/<repo>/ */
export const GITHUB_PAGES_REPO = 'Promotion-Website'

export function resolveSiteBasePath(): string {
  if (process.env.GITHUB_PAGES === 'true') {
    const repo = process.env.GITHUB_REPOSITORY_NAME ?? GITHUB_PAGES_REPO
    return `/${repo}`
  }
  return ''
}

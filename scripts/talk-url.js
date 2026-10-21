// Public GitHub Pages URL for a talk, derived from GITHUB_REPOSITORY (CI) or the git origin remote (local).
import { execSync } from 'node:child_process'

function ownerRepo() {
  if (process.env.GITHUB_REPOSITORY) return process.env.GITHUB_REPOSITORY.split('/')
  try {
    const remote = execSync('git remote get-url origin', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    const m = remote.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/)
    return m ? [m[1], m[2]] : null
  } catch {
    return null
  }
}

export function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/?$/, '/')
  const or = ownerRepo()
  if (!or) return null
  const [owner, repo] = or
  const host = `${owner.toLowerCase()}.github.io`
  // user/org pages (<owner>.github.io) are served from the root
  return repo.toLowerCase() === host ? `https://${host}/` : `https://${host}/${repo}/`
}

export function talkUrl(talk) {
  const site = siteUrl()
  return site ? `${site}${talk}/` : undefined
}

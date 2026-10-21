// Builds every talk into dist/<talk>/ plus an index page, ready for GitHub Pages.
// BASE_PATH sets the site root, e.g. "/presentations/" for a project page.
import { spawnSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { talkUrl } from './talk-url.js'

const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/')
const talks = readdirSync('talks').filter(d => !d.startsWith('_')).sort()

const meta = talks.map(talk => {
  const res = spawnSync('npx', [
    'slidev', 'build', `talks/${talk}/slides.md`,
    '--out', `../../dist/${talk}`,
    '--base', `${base}${talk}/`,
  ], { stdio: 'inherit', env: { ...process.env, VITE_TALK_URL: talkUrl(talk) ?? '' } })
  if (res.status !== 0) process.exit(res.status ?? 1)

  const src = readFileSync(`talks/${talk}/slides.md`, 'utf8')
  const title = src.match(/^title:\s*(.+)$/m)?.[1] ?? talk
  const info = src.match(/^info:\s*\|\n\s+(.+)$/m)?.[1] ?? ''
  return { talk, title, info }
})

const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
mkdirSync('dist', { recursive: true })
writeFileSync('dist/index.html', `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Presentations</title>
<style>
  body { font: 16px/1.5 system-ui, sans-serif; max-width: 720px; margin: 3rem auto; padding: 0 1rem; color: #222; background: #fff; }
  @media (prefers-color-scheme: dark) { body { color: #ddd; background: #111; } a { color: #8ab4f8; } }
  li { margin: 1rem 0; } p { margin: .25rem 0; opacity: .7; }
</style></head><body>
<h1>Presentations</h1>
<ul>
${meta.map(m => `  <li><a href="${m.talk}/">${esc(m.title)}</a>${m.info ? `<p>${esc(m.info)}</p>` : ''}</li>`).join('\n')}
</ul>
</body></html>
`)
writeFileSync('dist/.nojekyll', '')
console.log(`Built ${talks.length} talk(s) into dist/ with base ${base}`)

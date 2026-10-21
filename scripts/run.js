// Usage: npm run <dev|export> -- <talk-name> [extra slidev args]
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { talkUrl } from './talk-url.js'

const [cmd, talk, ...rest] = process.argv.slice(2)
const talks = readdirSync('talks').filter(d => !d.startsWith('_'))

if (!talk || !existsSync(`talks/${talk}/slides.md`)) {
  console.error(`Usage: npm run ${cmd} -- <talk>\nAvailable talks: ${talks.join(', ') || '(none)'}`)
  process.exit(1)
}

const entry = `talks/${talk}/slides.md`
const args = {
  dev: [entry, '--open', ...rest],
  export: ['export', entry, '--output', `${talk}.pdf`, ...rest],
}[cmd]

const env = { ...process.env, VITE_TALK_URL: talkUrl(talk) ?? '' }
const res = spawnSync('npx', ['slidev', ...args], { stdio: 'inherit', env })
process.exit(res.status ?? 1)

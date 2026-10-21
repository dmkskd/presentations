// Usage: npm run new -- <talk-name>
import { cpSync, existsSync } from 'node:fs'

const name = process.argv[2]
if (!name || !/^[a-z0-9][a-z0-9-]*$/.test(name)) {
  console.error('Usage: npm run new -- <talk-name>  (lowercase, digits, dashes)')
  process.exit(1)
}
const dest = `talks/${name}`
if (existsSync(dest)) {
  console.error(`${dest} already exists`)
  process.exit(1)
}
cpSync('talks/_template', dest, { recursive: true })
console.log(`Created ${dest}. Start it with: npm run dev -- ${name}`)

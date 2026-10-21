# Presentations: `just` lists everything. Most recipes take an optional talk name
# and default to the most recently edited talk.

latest := `ls -td talks/*/ 2>/dev/null | grep -v '/_' | head -1 | xargs basename 2>/dev/null || true`
repo := "presentations"

# List recipes
default:
    @just --list --unsorted

# Install everything: system tools (via Homebrew if missing), npm packages, PDF-export browser
install:
    #!/usr/bin/env bash
    set -euo pipefail
    for tool in node git gh; do
      if ! command -v "$tool" >/dev/null; then
        command -v brew >/dev/null || { echo "Missing $tool and Homebrew; install $tool manually"; exit 1; }
        echo "Installing $tool..."; brew install "$tool"
      fi
    done
    gh auth status >/dev/null 2>&1 || echo "Note: run 'gh auth login' before 'just github'"
    npm install
    npx playwright install chromium
    echo "Ready. Try: just dev"

# Create a new talk from the template, e.g. `just new my-talk`
new name:
    npm run new -- {{name}}

# List talks with their public URLs
talks:
    #!/usr/bin/env bash
    for d in talks/*/; do
      t=$(basename "$d"); [[ $t == _* ]] && continue
      printf '%-45s %s\n' "$t" "$(just url "$t")"
    done

# Live preview with hot reload (press "p" for presenter mode)
dev talk=latest:
    npm run dev -- {{talk}}

# Export a talk to PDF as an offline backup
pdf talk=latest:
    npm run export -- {{talk}}

# Build all talks + index page into dist/ (as GitHub Pages would)
build:
    BASE_PATH=/ npm run build

# Build and serve the whole site locally at http://localhost:4173
preview: build
    npx --yes serve dist -l 4173

# Print the public URL a talk's QR code points to
url talk=latest:
    @node --input-type=module -e "import { talkUrl } from './scripts/talk-url.js'; console.log(talkUrl('{{talk}}') ?? '(no GitHub remote yet: run just github)')"

# One-time: create the GitHub repo, push, and enable Pages via Actions
github visibility="public":
    gh repo create {{repo}} --{{visibility}} --source . --remote origin --push
    gh api -X POST "repos/{owner}/{repo}/pages" -f build_type=workflow
    @echo "Pages enabled. First deploy: just status"

# Commit everything and push, which triggers the deploy
publish message="Update slides":
    git add -A
    git diff --cached --quiet || git commit -m "{{message}}"
    git push
    @just status

# Watch the latest deploy run
status:
    gh run watch "$(gh run list --workflow deploy.yml --limit 1 --json databaseId -q '.[0].databaseId')" --exit-status

# Open a talk's published URL in the browser
open talk=latest:
    open "$(just url {{talk}})"

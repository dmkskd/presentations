# Presentations

Conference talks built with [Slidev](https://sli.dev), published to GitHub Pages.

## Layout

```
talks/
  _template/slides.md   # copied by `npm run new`
  <talk-name>/slides.md # one folder per talk (images etc. go next to it, or in talks/<talk>/public/)
```

## Commands

Everything is wrapped in a [`justfile`](justfile); run `just` to list recipes. Talk names are optional and default to the most recently edited talk.

```bash
just install          # node/git/gh (via Homebrew if missing), npm packages, PDF browser
just new my-talk      # scaffold talks/my-talk from the template
just dev [talk]       # live preview at http://localhost:3030 (press "p" for presenter mode)
just pdf [talk]       # export <talk>.pdf, an offline backup for the venue
just preview          # build the whole site and serve it at http://localhost:4173
just talks            # list talks and their public URLs
just github           # one-time: create the GitHub repo, push, enable Pages
just publish "msg"    # commit + push (deploys) and watch the deploy
just open [talk]      # open the published talk
```

## Publishing

Every push to `main` builds all talks and deploys them via GitHub Actions:

- `https://<user>.github.io/<repo>/`: index of all talks
- `https://<user>.github.io/<repo>/<talk-name>/`: a single talk

One-time setup: `just github` (or, manually, **Settings → Pages → Source → GitHub Actions** on GitHub).

## QR code to the slides

Drop `<QrCode />` on any slide (the template has it on the title and closing slides) so the audience can scan it and open the deck on their phones.

```md
<QrCode />                          <!-- default 200px, with the URL underneath -->
<QrCode :size="120" />
<QrCode url="https://example.com" :show-url="false" />
```

It points at the talk's public GitHub Pages URL, worked out from `GITHUB_REPOSITORY` in CI or the `origin` git remote locally. A QR code shown from `npm run dev` on your laptop therefore still points at the published site, not `localhost`. Set `SITE_URL` to override (e.g. a custom domain). The component lives in `addons/qrcode/`; talks enable it with `addons: [qrcode]` in their headmatter.

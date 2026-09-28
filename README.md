# Portfolios

Personal portfolio site: a single static page with About, Projects (AI pipeline, MCP server, data infrastructure), and Contact sections.
It's plain HTML, CSS, and a small amount of JavaScript. There's no build step and no dependencies.

**Live site:** https://grocian.github.io/Portfolios/ (once GitHub Pages is enabled, see below)

## Features

- Responsive layout from 320px phones up to wide desktops
- Light and dark themes: follows the OS setting, with a toggle that remembers the choice
- Sticky header whose nav highlights the section you're reading
- Subtle scroll-reveal and hero animations that respect `prefers-reduced-motion`
- Accessible markup: semantic landmarks, skip link, visible focus styles, and ARIA labels
- One-click "copy email" button

## Structure

```
index.html                    # All page content
assets/css/style.css          # Design tokens (colors, fonts, spacing) + layout
assets/js/main.js             # Theme toggle, nav highlight, scroll reveal, copy email
assets/favicon.svg            # Site icon
.github/workflows/deploy.yml  # GitHub Pages deployment
.nojekyll                     # Serve files as-is (skip Jekyll processing)
```

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Customize

Search `index.html` for these placeholders and replace them:

| Placeholder | Where |
| --- | --- |
| `Your Name` | `<title>`, meta tags, header, hero, footer |
| `hello@example.com` | Contact button, copy button (`data-copy`), email link |
| `linkedin.com/in/your-handle` | Contact links |
| `https://github.com/Grocian` in project cards | Point each "View on GitHub" link at its repository (marked with `TODO` comments) |

The project descriptions, highlights, and stacks are written as a starting point. Edit them to match your real work.
Colors and fonts are CSS variables at the top of `assets/css/style.css`. Change `--accent` to re-theme the whole site.

## Deploy to GitHub Pages

A workflow in `.github/workflows/deploy.yml` publishes the site on every push to `main`.

1. In the repository go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Merge or push to `main`. The site deploys automatically, and you can follow progress in the **Actions** tab.
   You can also start a deploy by hand from **Actions → Deploy to GitHub Pages → Run workflow**.

The site is served at `https://<username>.github.io/<repository>/`. All asset paths are relative, so it also works on a custom domain.

> Alternatively, skip the workflow: choose **Deploy from a branch** with `main` / `(root)` as the source. The `.nojekyll` file makes GitHub serve the files as-is.

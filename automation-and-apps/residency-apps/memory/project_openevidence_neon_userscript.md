---
name: project-openevidence-neon-userscript
description: "OpenEvidence Neon Tampermonkey userscript (11/12/2026) — hides ads + AMOLED black / neon pink theme; file location, how it was built without touching the live site, install state"
metadata:
  node_type: memory
  type: project
  originSessionId: c08227ca-7fbc-44a2-a714-716b2a2c5609
  modified: 2026-11-13T02:58:57.343Z
---

**OpenEvidence Neon** userscript: `C:\Users\nav\openevidence-neon.user.js` (v1.0.0, `@match https://www.openevidence.com/*`, document-start). Navid asked 11/12/2026 for a script that hides ads on OpenEvidence and makes it "AMOLED neon pink, minimalistic".

**Hard rule from Navid (11/12/2026):** do NOT use browser automation on openevidence.com — it gets him blocked for a few hours. No Claude-in-Chrome, CDP, or the openevidence MCP for building/testing this. See [[reference-evidence-tools-access]].

**How it was built without the live site:**
- Site structure came from the saved page `Documents\Projects\openevidence-mcp\test\fixtures\openevidence-public-page.html` plus OE's JS/CSS found in Chrome's disk cache (`User Data\Default\Cache\Cache_Data\f_*`, brotli/gzip-decoded with a Node script and grepped).
- OE is Next.js + MUI + Tailwind v4/shadcn. Theme is token-driven: `.dark` on `<html>` (localStorage `mode`), `--mui-palette-*` (incl. custom `oeOrange`/`oeGrey`/`oeBlue` scales) and shadcn tokens (`--background`, `--card`, `--primary`, `--border`…). The script forces dark and overrides those tokens; stable hooks are the `brandable--*` classes.
- Ads: Google Campaign Manager `ins.dcmads[data-dcm-placement]`, ad iframes, images from `storage.googleapis.com/openevidence-prod-ad-assets/` and house ads `/house_ads/`. Script hides the creative and climbs to the box that holds only the ad (`data-oen-ad`). OE's code has an `ad_block_detected` field it can report per impression; what triggers it was not visible in the cached code.
- Offline check: served the fixture locally with the script injected + mock ad markup, viewed in the in-app browser pane (localhost only).

**State 11/12/2026:** file written and checked offline only. Not yet installed in Tampermonkey (he was working in Epic production, so keyboard takeover was held for his go-ahead) and not yet seen on the live logged-in site — real ad containers and logged-in pages (sidebar, home, settings) are unverified. Install recipe: [[reference-tampermonkey-chrome]].

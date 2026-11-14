---
name: reference-utmb-library-ezproxy
description: "UTMB library EZproxy for paywalled journal full text — prefix, no Duo, working route is the dedicated Chrome + libread.cjs; Scholar MCP proxy route loops (11/12/2026)"
metadata:
  node_type: memory
  type: reference
  originSessionId: 27412933-5874-4253-8f43-2f7f6391ace9
  modified: 2026-11-13T02:06:05.167Z
---

- Prefix: `https://login.libux.utmb.edu/login?url=<publisher or doi.org URL>`. Proxied hosts rewrite dots to dashes: `www-nejm-org.libux.utmb.edu`, `jamanetwork-com.libux.utmb.edu`.
- Library login does NOT need Duo (Navid, 11/12/2026). He still types the password himself.
- **Working route (verified 11/12/2026):** Claude's dedicated Chrome ([[reference-claude-dedicated-chrome]]), signed in to the library by him that day. `node C:\Users\nav\lit-review\libread.cjs <doi> [outfile]` opens the DOI through the proxy and returns/saves the article text. Read a JAMA review and a Lancet/ScienceDirect trial in full; both were confirmed paywalled without the proxy. The dedicated Chrome starts hidden; to let him sign in, un-hide via CDP `Browser.setWindowBounds` windowState normal.
- **Scholar MCP route does not work:** v0.10.0 (latest then) with `LIBRARY_PROXY_PREFIX` + `LIBRARY_PROXY_COOKIES` (C:\Users\nav\.scholar-private\utmb-library-cookies.txt, exported from the dedicated Chrome via Playwright `ctx.cookies()`) fails with TooManyRedirects on JAMA, Lancet and Annals, although curl with the same cookie file reaches the proxied article in 2 hops. Settings left in ~/.claude.json scholar env.
- Claude in Chrome (his real Chrome) also reads proxied pages with get_page_text, but javascript_tool cookie export got no safety verdict in auto mode; NEJM research articles from 2022 are free anyway, so they prove nothing.

Related: [[reference-evidence-tools-access]], [[reference-multi-model-bridge]]


Batch reader (11/12/2026): `node C:\Users\nav\lit-review\libbatch.cjs <list.json> <outdir> [workers] [wait-ms]` restores the saved session cookies, keeps a keeper tab open and saves each article's text; list values are DOIs or full proxied URLs. Pitfalls: closing the last tab exits the dedicated Chrome (libread.cjs does this; use libbatch); the doi.org redirect fails with ERR_BLOCKED_BY_CLIENT for JAMA, Springer and Bioscientifica, so pass the proxied publisher URL instead (JAMA: `https://jamanetwork-com.libux.utmb.edu/article.aspx?doi=<doi>`); ahajournals shows a Cloudflare check and Lancet 1979 / Brain 1983 pages carry abstracts only.

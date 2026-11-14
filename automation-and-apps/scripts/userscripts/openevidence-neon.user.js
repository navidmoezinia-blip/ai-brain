// ==UserScript==
// @name         OpenEvidence Neon
// @namespace    nav.custom
// @version      1.0.0
// @description  Hides ads on OpenEvidence and restyles it: AMOLED black, neon pink accent, minimal.
// @author       Navid
// @match        https://www.openevidence.com/*
// @match        https://openevidence.com/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

(() => {
  'use strict';

  const root = document.documentElement;

  /* ------------------------------------------------------------------ */
  /*  Dark mode: the theme is built on the site's own dark palette       */
  /* ------------------------------------------------------------------ */
  try { localStorage.setItem('mode', 'dark'); } catch {}
  const forceDark = () => {
    if (!root.classList.contains('dark')) root.classList.add('dark');
    if (root.classList.contains('light')) root.classList.remove('light');
  };
  forceDark();
  new MutationObserver(forceDark).observe(root, { attributes: true, attributeFilter: ['class'] });

  /* ------------------------------------------------------------------ */
  /*  Ads                                                                */
  /* ------------------------------------------------------------------ */
  // Ad creatives: Google Campaign Manager tags, ad iframes, OpenEvidence ad / house-ad assets.
  const AD = [
    'ins.dcmads',
    'ins[data-dcm-placement]',
    'iframe[src*="doubleclick.net"]',
    'iframe[src*="googlesyndication.com"]',
    'iframe[src*="googletagservices.com"]',
    'iframe[src*="doubleverify.com"]',
    'iframe[src*="openevidence-prod-ad-assets"]',
    'img[src*="openevidence-prod-ad-assets"]',
    'video[src*="openevidence-prod-ad-assets"]',
    'video[poster*="openevidence-prod-ad-assets"]',
    'source[src*="openevidence-prod-ad-assets"]',
    'img[src*="/house_ads/"]',
    'video[src*="/house_ads/"]',
    'a[href*="doubleclick.net"]',
  ].join(',');

  const AD_LABEL = /^(ad|ads|advertisement|sponsored|promoted|close|dismiss|learn more|×|✕|x)?$/i;
  const KEEP = 'textarea,input,select,video,canvas,iframe,img,[role="progressbar"],.MuiSkeleton-root';

  // A sibling of the ad counts as ad chrome (label, close button, spacer) when it carries nothing else.
  const isAdChrome = (el) => {
    if (el.hasAttribute('data-oen-ad') || el.matches(AD)) return true;
    if (el.matches(KEEP) || el.querySelector(KEEP)) return false;
    if (el.querySelector('svg') && !el.matches('button,[role="button"]') && !el.querySelector('button,[role="button"]')) return false;
    return AD_LABEL.test((el.textContent || '').trim());
  };

  // Climb from the creative to the outermost box that holds only the ad, so no empty frame is left.
  const adBox = (leaf) => {
    let cur = leaf.tagName === 'SOURCE' && leaf.parentElement ? leaf.parentElement : leaf;
    for (;;) {
      const p = cur.parentElement;
      if (!p || p === document.body || p === root) break;
      if (p.matches('main,nav,form,article,[id^="question-"],#ask-oe-scroll-container,[class*="brandable--"]')) break;
      let ok = true;
      for (const sib of p.children) { if (sib !== cur && !isAdChrome(sib)) { ok = false; break; } }
      if (!ok) break;
      cur = p;
    }
    return cur;
  };

  const hideAds = (scope) => {
    if (!scope.querySelectorAll) return;
    const leaves = scope.matches && scope.matches(AD) ? [scope, ...scope.querySelectorAll(AD)] : scope.querySelectorAll(AD);
    for (const leaf of leaves) {
      if (leaf.closest('[data-oen-ad]')) continue;
      adBox(leaf).setAttribute('data-oen-ad', '');
    }
  };

  /* ------------------------------------------------------------------ */
  /*  CSS                                                                */
  /* ------------------------------------------------------------------ */
  const CSS = String.raw`
/* ===== ads ========================================================== */
${AD}, [data-oen-ad] { display: none !important; }

/* ===== tokens ======================================================= */
html.dark:root {
  --oen-bg: #000000; --oen-s1: #0a0a0b; --oen-s2: #111113; --oen-s3: #19191c;
  --oen-line: #1e1e22; --oen-line-2: #2a2a30;
  --oen-text: #f4f4f6; --oen-text-2: #a3a3ad; --oen-text-3: #6e6e78;
  --oen-pink: #ff2d95; --oen-pink-hi: #ff5fae; --oen-pink-lo: #c2186b;
  --oen-pink-soft: rgba(255, 45, 149, .14); --oen-pink-glow: rgba(255, 45, 149, .32);
  color-scheme: dark;

  /* --- MUI palette ------------------------------------------------- */
  --mui-palette-primary-main: var(--oen-pink); --mui-palette-primary-light: var(--oen-pink-hi); --mui-palette-primary-dark: var(--oen-pink-lo);
  --mui-palette-primary-contrastText: #000;
  --mui-palette-primary-mainChannel: 255 45 149; --mui-palette-primary-lightChannel: 255 95 174; --mui-palette-primary-darkChannel: 194 24 107;
  --mui-palette-primary-contrastTextChannel: 0 0 0;
  --mui-palette-text-primary: var(--oen-text); --mui-palette-text-secondary: var(--oen-text-2);
  --mui-palette-text-disabled: rgba(255, 255, 255, .38); --mui-palette-text-icon: var(--oen-text-3); --mui-palette-text-blue: var(--oen-pink-hi);
  --mui-palette-text-primaryChannel: 244 244 246; --mui-palette-text-secondaryChannel: 163 163 173;
  --mui-palette-divider: var(--oen-line); --mui-palette-dividerChannel: 30 30 34;
  --mui-palette-background-default: var(--oen-bg); --mui-palette-background-paper: var(--oen-s1); --mui-palette-background-secondary: var(--oen-s2);
  --mui-palette-background-defaultChannel: 0 0 0; --mui-palette-background-paperChannel: 10 10 11;
  --mui-palette-common-background: #000; --mui-palette-common-onBackground: var(--oen-text);
  --mui-palette-action-active: var(--oen-text); --mui-palette-action-activeChannel: 244 244 246;
  --mui-palette-action-hover: var(--oen-s2); --mui-palette-action-selected: var(--oen-s3); --mui-palette-action-selectedChannel: 25 25 28;
  --mui-palette-action-disabled: var(--oen-text-3); --mui-palette-action-disabledBackground: var(--oen-s3);
  --mui-palette-action-focus: var(--oen-pink-soft);
  --mui-palette-grey-900: #0d0d0f; --mui-palette-grey-800: #16161a; --mui-palette-grey-700: #26262c; --mui-palette-grey-A700: #26262c;
  --mui-palette-oeOrange-100: #ffe4f1; --mui-palette-oeOrange-200: #ffc2df; --mui-palette-oeOrange-300: #ff94c8;
  --mui-palette-oeOrange-400: #ff5fae; --mui-palette-oeOrange-500: #ff2d95; --mui-palette-oeOrange-600: #d81b78;
  --mui-palette-oeOrange-700: #8f0f4e; --mui-palette-oeOrange-800: #5c0932; --mui-palette-oeOrange-900: #2b0418;
  --mui-palette-oeGrey-100: #f4f4f6; --mui-palette-oeGrey-200: #e4e4e9; --mui-palette-oeGrey-300: #a3a3ad;
  --mui-palette-oeGrey-400: #6e6e78; --mui-palette-oeGrey-500: #2a2a30; --mui-palette-oeGrey-600: #141417;
  --mui-palette-oeGrey-700: #0a0a0b; --mui-palette-oeGrey-800: #000000; --mui-palette-oeGrey-900: #000000;
  --mui-palette-oeBlue-50: #fff0f7; --mui-palette-oeBlue-100: #ffe4f1; --mui-palette-oeBlue-300: #ff94c8;
  --mui-palette-oeBlue-500: #ff2d95; --mui-palette-oeBlue-700: #8f0f4e; --mui-palette-oeBlue-900: #2b0418;
  --mui-palette-verbatimHighlight-background: #4a0d2c; --mui-palette-verbatimHighlight-text: #fff; --mui-palette-verbatimHighlight-underline: var(--oen-pink);
  --mui-palette-infoBox-main: var(--oen-s2);
  --mui-palette-TableCell-border: var(--oen-line); --mui-palette-Chip-defaultBorder: var(--oen-line-2);
  --mui-palette-FilledInput-bg: rgba(255, 255, 255, .04); --mui-palette-FilledInput-hoverBg: rgba(255, 255, 255, .07);
  --mui-palette-Tooltip-bg: #16161a; --mui-palette-SnackbarContent-bg: #16161a; --mui-palette-SnackbarContent-color: var(--oen-text);
  --mui-palette-AppBar-defaultBg: #000; --mui-palette-AppBar-darkBg: #000;
  --mui-palette-Button-inheritContainedBg: var(--oen-s3); --mui-palette-Button-inheritContainedHoverBg: var(--oen-line-2);
  --mui-overlays-1: none; --mui-overlays-2: none; --mui-overlays-3: none; --mui-overlays-4: none; --mui-overlays-6: none;
  --mui-overlays-8: none; --mui-overlays-12: none; --mui-overlays-16: none; --mui-overlays-24: none;

  /* --- Tailwind / shadcn tokens ------------------------------------ */
  --background: var(--oen-bg); --foreground: var(--oen-text);
  --card: var(--oen-s1); --card-foreground: var(--oen-text);
  --popover: var(--oen-s1); --popover-foreground: var(--oen-text);
  --primary: var(--oen-pink); --primary-foreground: #000;
  --secondary: var(--oen-s1); --secondary-foreground: var(--oen-text-2);
  --muted: var(--oen-s2); --muted-foreground: #8a8a94;
  --accent: var(--oen-s2); --accent-foreground: var(--oen-text);
  --surface-hover: var(--oen-s2); --surface-selected: var(--oen-s3);
  --border: var(--oen-line); --input: var(--oen-line-2); --ring: var(--oen-pink);
  --favorite: var(--oen-pink); --chart-1: var(--oen-pink);
  --sidebar-primary: var(--oen-pink); --sidebar-primary-foreground: #000; --sidebar-ring: var(--oen-pink);
  --color-orange-500: var(--oen-pink); --color-orange-700: var(--oen-pink-lo);
}

/* ===== base ========================================================= */
html.dark, html.dark body { background: #000 !important; color: var(--oen-text); }
html.dark body { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
html.dark { caret-color: var(--oen-pink); accent-color: var(--oen-pink); scrollbar-color: var(--oen-line-2) transparent; scrollbar-width: thin; }
html.dark ::selection { background: rgba(255, 45, 149, .38); color: #fff; }
html.dark ::-webkit-scrollbar { width: 10px; height: 10px; }
html.dark ::-webkit-scrollbar-track { background: transparent; }
html.dark ::-webkit-scrollbar-thumb { background: var(--oen-line-2); border-radius: 10px; border: 2px solid #000; }
html.dark ::-webkit-scrollbar-thumb:hover { background: var(--oen-pink); }
html.dark :focus-visible { outline-color: var(--oen-pink); }

/* brand orange baked into markup and utility classes */
html.dark svg [fill="#e4643d" i], html.dark svg[fill="#e4643d" i] { fill: var(--oen-pink); }
html.dark svg [stroke="#e4643d" i], html.dark svg[stroke="#e4643d" i] { stroke: var(--oen-pink); }
html.dark .bg-\[\#e4643d\], html.dark .bg-\[\#E4643D\], html.dark .bg-\[\#ef6b33\] { background-color: var(--oen-pink) !important; color: #000; }
html.dark .border-\[\#e4643d\] { border-color: var(--oen-pink) !important; }
html.dark .bg-white { background-color: var(--oen-s1) !important; }
html.dark .text-black { color: var(--oen-text) !important; }

/* ===== header ======================================================= */
html.dark [class*="layout_header"] header > div { background-color: #000 !important; }
html.dark [class*="layout_header"] header > div:first-child:not(:last-child) { border-bottom: 1px solid var(--oen-line); color: var(--oen-text-2); }
html.dark [class*="layout_header"] header > div:first-child:not(:last-child) a { color: var(--oen-pink-hi); text-decoration-color: rgba(255, 95, 174, .35); }

/* ===== surfaces ===================================================== */
html.dark .MuiPaper-root { background-image: none !important; box-shadow: none; }
html.dark .MuiMenu-paper, html.dark .MuiPopover-paper, html.dark .MuiDialog-paper, html.dark .MuiAutocomplete-paper, html.dark .MuiDrawer-paper {
  background-color: var(--oen-s1) !important; border: 1px solid var(--oen-line); box-shadow: 0 24px 64px rgba(0, 0, 0, .9) !important;
}
html.dark .MuiDialog-paper, html.dark .MuiMenu-paper, html.dark .MuiPopover-paper { border-radius: 14px; }
html.dark .MuiBackdrop-root:not(.MuiBackdrop-invisible) { background-color: rgba(0, 0, 0, .72); backdrop-filter: blur(6px); }
html.dark .MuiTooltip-tooltip { background: #16161a; color: var(--oen-text); border: 1px solid var(--oen-line-2); border-radius: 8px; }
html.dark .MuiDivider-root { border-color: var(--oen-line); }
html.dark .MuiAccordion-root { background: transparent; border-color: var(--oen-line); }
html.dark .MuiAccordion-root::before { background-color: var(--oen-line); }
html.dark .MuiMenuItem-root.Mui-selected, html.dark .MuiListItemButton-root.Mui-selected { background-color: var(--oen-s3) !important; }

/* ===== query bar ==================================================== */
html.dark .brandable--query-bar {
  background: var(--oen-s1) !important; border: 1px solid var(--oen-line-2) !important; border-radius: 18px !important;
  box-shadow: none !important; transition: border-color .18s ease, box-shadow .18s ease;
}
html.dark .brandable--query-bar:focus-within {
  border-color: var(--oen-pink) !important; box-shadow: 0 0 0 1px var(--oen-pink), 0 0 28px var(--oen-pink-glow) !important;
}
html.dark .brandable--query-bar textarea, html.dark .brandable--query-bar input { color: var(--oen-text); }
html.dark .brandable--query-bar textarea::placeholder, html.dark .brandable--query-bar input::placeholder { color: var(--oen-text-3); opacity: 1; }
html.dark .brandable--query-bar--submit-button {
  background: var(--oen-pink) !important; color: #000 !important; border-radius: 12px !important; box-shadow: none !important;
  transition: box-shadow .18s ease, background-color .18s ease;
}
html.dark .brandable--query-bar--submit-button:hover { background: var(--oen-pink-hi) !important; box-shadow: 0 0 18px var(--oen-pink-glow) !important; }
html.dark .brandable--query-bar--submit-button.Mui-disabled { background: var(--oen-s3) !important; color: var(--oen-text-3) !important; }
html.dark .brandable--query-bar--submit-button svg { color: inherit; fill: currentColor; }
html.dark .brandable--stop-generation-button { border-color: var(--oen-pink) !important; color: var(--oen-pink) !important; }

/* ===== buttons, chips =============================================== */
html.dark .MuiButton-containedPrimary { background-color: var(--oen-pink); color: #000; box-shadow: none; }
html.dark .MuiButton-containedPrimary:hover { background-color: var(--oen-pink-hi); box-shadow: 0 0 18px var(--oen-pink-glow); }
html.dark .MuiButton-outlinedPrimary { border-color: rgba(255, 45, 149, .5); color: var(--oen-pink-hi); }
html.dark .MuiButton-outlinedPrimary:hover { border-color: var(--oen-pink); background-color: var(--oen-pink-soft); }
html.dark .MuiButton-root, html.dark .MuiIconButton-root { transition: background-color .15s ease, color .15s ease, box-shadow .15s ease; }
html.dark .MuiIconButton-root:hover { color: var(--oen-pink-hi); }
html.dark .MuiChip-root { border-radius: 8px; }
html.dark .MuiChip-filledDefault { background-color: var(--oen-s2) !important; color: var(--oen-text-2); border: 1px solid var(--oen-line-2); }
html.dark .MuiSwitch-switchBase.Mui-checked { color: var(--oen-pink); }
html.dark .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track { background-color: var(--oen-pink); }
html.dark .MuiCircularProgress-root, html.dark .MuiLinearProgress-bar { color: var(--oen-pink); }
html.dark .MuiLinearProgress-root { background-color: var(--oen-s3); }
html.dark .MuiLinearProgress-bar { background-color: var(--oen-pink); }
html.dark .MuiSkeleton-root { background-color: var(--oen-s2); }

/* ===== answer ======================================================= */
html.dark .brandable--article-text { color: var(--oen-text); }
html.dark .brandable--article-text a, html.dark .brandable--references a, html.dark .brandable--citation { color: var(--oen-pink-hi) !important; text-decoration-color: rgba(255, 95, 174, .35); }
html.dark .brandable--article-text a:hover, html.dark .brandable--references a:hover { color: #fff !important; text-decoration-color: var(--oen-pink); }
html.dark .brandable--article-text strong, html.dark .brandable--article-text b { color: #fff; }
html.dark .brandable--article-text table { border-color: var(--oen-line); }
html.dark .brandable--article-text th { background: var(--oen-s2); color: var(--oen-text); }
html.dark .brandable--article-text th, html.dark .brandable--article-text td { border-color: var(--oen-line) !important; }
html.dark .brandable--article-text code, html.dark .brandable--article-text pre { background: var(--oen-s2); border: 1px solid var(--oen-line); border-radius: 8px; }
html.dark .brandable--article-text blockquote { border-left: 2px solid var(--oen-pink); color: var(--oen-text-2); }
html.dark .brandable--article-text hr { border-color: var(--oen-line); }
html.dark .markdown-article-citation-chip .MuiChip-root {
  background-color: var(--oen-s2) !important; color: var(--oen-pink-hi) !important; border: 1px solid var(--oen-line-2); border-radius: 6px;
  transition: border-color .15s ease, box-shadow .15s ease, color .15s ease;
}
html.dark .markdown-article-citation-chip:hover .MuiChip-root { border-color: var(--oen-pink); color: #fff !important; box-shadow: 0 0 12px var(--oen-pink-glow); }
html.dark .markdown-article-citation-chip [aria-hidden="true"] { color: var(--oen-text-3); }
html.dark .brandable--reference-subtitle, html.dark .brandable--reference-authors, html.dark .brandable--reference-publication-info { color: var(--oen-text-2); }
html.dark .brandable--answer-description-badges .MuiChip-root { background: transparent; border: 1px solid var(--oen-line-2); color: var(--oen-text-2); }

/* ===== follow-ups, banners ========================================== */
html.dark .brandable--follow-up-questions { background: transparent !important; }
html.dark .brandable--follow-up-questions .MuiButtonBase-root { border-radius: 10px; }
html.dark .brandable--follow-up-questions .MuiButtonBase-root:hover { background-color: var(--oen-s2); color: #fff; }
html.dark .brandable--follow-up-questions .MuiButtonBase-root:hover .brandable--follow-up-questions--chevron-right { color: var(--oen-pink); }
html.dark .brandable--follow-up-topics--chip { background: transparent !important; border: 1px solid var(--oen-line-2) !important; color: var(--oen-text-2) !important; }
html.dark .brandable--follow-up-topics--chip:hover { border-color: var(--oen-pink) !important; color: #fff !important; }
html.dark .brandable--disclaimer-banner, html.dark .brandable--phi-safe-banner, html.dark .brandable--baa-banner, html.dark .brandable--feedback-success-banner {
  background-color: var(--oen-s1) !important; color: var(--oen-text-2) !important; border: 1px solid var(--oen-line); border-radius: 12px;
}
html.dark .brandable--disclaimer-banner .MuiAlert-icon { color: var(--oen-text-3) !important; }
html.dark .brandable--callout-divider { border-color: var(--oen-line); background-color: var(--oen-line); }

/* ===== sidebar / history ============================================ */
html.dark .brandable--question-history--container { background: #000 !important; border-color: var(--oen-line) !important; }
html.dark .brandable--question-history--list-item { border-radius: 8px; color: var(--oen-text-2); }
html.dark .brandable--question-history--list-item:hover { background-color: var(--oen-s2) !important; color: var(--oen-text); }
html.dark .brandable--question-history--list-item-selected { background-color: var(--oen-s2) !important; color: #fff !important; box-shadow: inset 2px 0 0 var(--oen-pink); }
html.dark .brandable--question-history--time { color: var(--oen-text-3); }
html.dark .brandable--question-history--divider { border-color: var(--oen-line); }
html.dark .brandable--question-history--new-conversation:hover { color: var(--oen-pink-hi); }
`;

  const style = document.createElement('style');
  style.id = 'oen-style';
  style.textContent = CSS;
  const mount = () => { if (!style.isConnected) (document.head || root).appendChild(style); };
  mount();

  /* ------------------------------------------------------------------ */
  /*  Boot                                                               */
  /* ------------------------------------------------------------------ */
  let queued = false;
  const sweep = () => { queued = false; mount(); hideAds(document); };
  new MutationObserver(() => { if (!queued) { queued = true; requestAnimationFrame(sweep); } })
    .observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'href', 'data-dcm-placement'] });
  document.addEventListener('DOMContentLoaded', sweep);
})();

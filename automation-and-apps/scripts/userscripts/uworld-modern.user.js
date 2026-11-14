// ==UserScript==
// @name         UWorld Modern
// @namespace    nav.custom
// @version      1.0.0
// @description  Modern redesign of the UWorld QBank web app: Inter typography, refined light/dark themes that follow Windows, cleaner sidebar and cards, restyled test interface (UWorld + NBME skins), in-page appearance popover (Alt+T toggles theme).
// @author       Navid
// @match        https://apps.uworld.com/*
// @run-at       document-start
// @grant        none
// @noframes
// ==/UserScript==

(() => {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  Settings                                                           */
  /* ------------------------------------------------------------------ */
  const KEY = 'uwm.settings.v1';
  const VERSION = '1.0.0';
  const DEFAULTS = { enabled: true, theme: 'auto', accent: 'blue', font: 'inter', density: 'comfortable' };
  const ACCENTS = {
    blue:    { l: '#2563eb', lh: '#1d4ed8', lt: '#1d4ed8', d: '#5b9cff', dh: '#3b82f6', dt: '#8ec0ff' },
    indigo:  { l: '#4f46e5', lh: '#4338ca', lt: '#4338ca', d: '#818cf8', dh: '#6366f1', dt: '#a5b4fc' },
    violet:  { l: '#7c3aed', lh: '#6d28d9', lt: '#6d28d9', d: '#a78bfa', dh: '#8b5cf6', dt: '#c4b5fd' },
    teal:    { l: '#0d9488', lh: '#0f766e', lt: '#0f766e', d: '#2dd4bf', dh: '#14b8a6', dt: '#5eead4' },
    emerald: { l: '#059669', lh: '#047857', lt: '#047857', d: '#34d399', dh: '#10b981', dt: '#6ee7b7' },
    rose:    { l: '#e11d48', lh: '#be123c', lt: '#be123c', d: '#fb7185', dh: '#f43f5e', dt: '#fda4af' },
    amber:   { l: '#d97706', lh: '#b45309', lt: '#b45309', d: '#fbbf24', dh: '#f59e0b', dt: '#fcd34d' },
  };
  const FONTS = {
    inter:    '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    system:   'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    opensans: '"Open Sans", Verdana, sans-serif',
  };

  const load = () => { try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEFAULTS }; } };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} };
  let settings = load();
  let fab, pop; // in-page UI elements (built once <body> exists)

  const root = document.documentElement;
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const resolvedTheme = () => (settings.theme === 'auto' ? (mq.matches ? 'dark' : 'light') : settings.theme);
  const hexRgb = (h) => { const n = parseInt(h.slice(1), 16); return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`; };

  function apply() {
    const t = resolvedTheme();
    const a = ACCENTS[settings.accent] || ACCENTS.blue;
    if (settings.enabled) root.setAttribute('data-uwm', '1'); else root.removeAttribute('data-uwm');
    root.setAttribute('data-uwm-theme', t);
    root.setAttribute('data-uwm-accent', settings.accent);
    root.setAttribute('data-uwm-font', settings.font);
    root.setAttribute('data-uwm-density', settings.density);
    root.style.setProperty('--uwm-accent', t === 'dark' ? a.d : a.l);
    root.style.setProperty('--uwm-accent-hover', t === 'dark' ? a.dh : a.lh);
    root.style.setProperty('--uwm-accent-text', t === 'dark' ? a.dt : a.lt);
    root.style.setProperty('--uwm-accent-rgb', hexRgb(t === 'dark' ? a.d : a.l));
    root.style.setProperty('--uwm-font', FONTS[settings.font] || FONTS.inter);
    root.style.colorScheme = settings.enabled ? t : '';
    ensureFont();
    syncUI();
  }
  mq.addEventListener('change', () => { if (settings.theme === 'auto') apply(); });

  function set(patch) { settings = { ...settings, ...patch }; save(settings); apply(); }

  /* ------------------------------------------------------------------ */
  /*  Font loading                                                       */
  /* ------------------------------------------------------------------ */
  function ensureFont() {
    if (settings.font !== 'inter' || document.getElementById('uwm-font')) return;
    const l = document.createElement('link');
    l.id = 'uwm-font'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap';
    (document.head || root).appendChild(l);
  }

  /* ------------------------------------------------------------------ */
  /*  CSS                                                                */
  /* ------------------------------------------------------------------ */
  const CSS = String.raw`
/* ===== tokens ===================================================== */
html[data-uwm-theme="light"] {
  --uwm-bg: #f3f4f7; --uwm-surface: #ffffff; --uwm-surface-2: #f6f7fa; --uwm-surface-3: #eceef3;
  --uwm-border: #e4e7ee; --uwm-border-strong: #cfd4de;
  --uwm-text: #0f172a; --uwm-text-2: #4b5567; --uwm-text-3: #8a93a6;
  --uwm-on-accent: #ffffff;
  --uwm-success: #16a34a; --uwm-danger: #dc2626; --uwm-warning: #d97706; --uwm-info: #0284c7;
  --uwm-success-soft: rgba(22,163,74,.10); --uwm-danger-soft: rgba(220,38,38,.10); --uwm-info-soft: rgba(2,132,199,.10);
  --uwm-shadow-sm: 0 1px 2px rgba(15,23,42,.05), 0 0 0 1px rgba(15,23,42,.02);
  --uwm-shadow-md: 0 6px 16px -6px rgba(15,23,42,.12), 0 2px 4px rgba(15,23,42,.04);
  --uwm-shadow-lg: 0 24px 48px -16px rgba(15,23,42,.25), 0 4px 12px rgba(15,23,42,.06);
  --uwm-sidebar-bg: #ffffff; --uwm-topbar-bg: rgba(243,244,247,.82);
  --uwm-code-bg: #eef0f5; --uwm-hl-text: #111827;
}
html[data-uwm-theme="dark"] {
  --uwm-bg: #0b0d12; --uwm-surface: #12151c; --uwm-surface-2: #181c25; --uwm-surface-3: #1f2430;
  --uwm-border: #242a36; --uwm-border-strong: #333b4a;
  --uwm-text: #e7eaf0; --uwm-text-2: #9aa4b8; --uwm-text-3: #6b7588;
  --uwm-on-accent: #0b0d12;
  --uwm-success: #34d399; --uwm-danger: #f87171; --uwm-warning: #fbbf24; --uwm-info: #38bdf8;
  --uwm-success-soft: rgba(52,211,153,.14); --uwm-danger-soft: rgba(248,113,113,.14); --uwm-info-soft: rgba(56,189,248,.14);
  --uwm-shadow-sm: 0 1px 2px rgba(0,0,0,.35), 0 0 0 1px rgba(255,255,255,.02);
  --uwm-shadow-md: 0 8px 20px -8px rgba(0,0,0,.6), 0 2px 4px rgba(0,0,0,.3);
  --uwm-shadow-lg: 0 28px 56px -18px rgba(0,0,0,.75), 0 6px 16px rgba(0,0,0,.4);
  --uwm-sidebar-bg: #0e1117; --uwm-topbar-bg: rgba(11,13,18,.78);
  --uwm-code-bg: #1b2029; --uwm-hl-text: #111827;
}
html { --uwm-accent-soft: rgba(var(--uwm-accent-rgb), .12); --uwm-accent-soft-2: rgba(var(--uwm-accent-rgb), .22);
  --uwm-radius: 14px; --uwm-radius-sm: 9px; --uwm-radius-xs: 6px; --uwm-mono: "JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, monospace; }
html[data-uwm-density="compact"] { --uwm-radius: 11px; --uwm-radius-sm: 8px; }

/* ===== map UWorld's own theme variables onto the tokens ============= */
html[data-uwm] body, html[data-uwm] body.theme-light, html[data-uwm] body.theme-dark, html[data-uwm] body.theme-sepia, html[data-uwm] body.theme-grey, html[data-uwm] body.theme-black-white, html[data-uwm] body.theme-green-grey {
  --sidenav-width: 236px;
  --white: var(--uwm-surface); --black: var(--uwm-text);
  --background-color: var(--uwm-surface); --surface-color: var(--uwm-bg);
  --text-color: var(--uwm-text); --border-color: var(--uwm-border);
  --topnav-bg: var(--uwm-surface); --text-color-header: var(--uwm-text); --text-color-header-2: var(--uwm-text-2); --text-color-footer: var(--uwm-text-3);
  --footer-border: var(--uwm-border); --footer-text: var(--uwm-text-3); --headerText: var(--uwm-text);
  --primary-blue: var(--uwm-accent); --uworld-blue: var(--uwm-accent); --createtest-accent-blue: var(--uwm-accent); --primary-color: var(--uwm-accent);
  --primary-blue-faded: var(--uwm-accent-soft); --btn-hover-bg-color: var(--uwm-accent-soft); --topnav-icon-color: var(--uwm-accent);
  --primaryColor: var(--uwm-text); --text-black-3: var(--uwm-text); --text-black-4: var(--uwm-text); --textBlackSecondary: var(--uwm-text-2); --websiteBlack: var(--uwm-text);
  --text-black-subtitle: var(--uwm-text-2); --secondary-info-color: var(--uwm-text-2); --active-tab-title: var(--uwm-text); --inactive-tab-font-color: var(--uwm-text-2);
  --grey-text-color-2: var(--uwm-text-2); --grey-text-color-3: var(--uwm-text-2); --grey-text-color-6: var(--uwm-text-2); --grey-text-color-7: var(--uwm-text-2); --grey-text-color-8: var(--uwm-text-2); --grey-text-color-9: var(--uwm-text-3); --grey-text-color-10: var(--uwm-text-3);
  --table-text-color: var(--uwm-text); --table-secondary-text-color: var(--uwm-text-2); --inner-table-text-color: var(--uwm-text);
  --table-border: var(--uwm-border); --table-row-hover-bg: var(--uwm-surface-2); --table-highlighted-row-bg: var(--uwm-surface-2); --table-highlighted-row-hover: var(--uwm-surface-3);
  --badge-bg: var(--uwm-surface-3); --badge-text: var(--uwm-text-2); --tag-bg-color: var(--uwm-surface-2);
  --input-text: var(--uwm-text); --input-bg-grey: var(--uwm-surface-2); --input-border: var(--uwm-border); --input-placeholder-color: var(--uwm-text-3); --input-focus-border-color: var(--uwm-accent);
  --checkbox-border: var(--uwm-border-strong); --check-box-border-color: var(--uwm-border-strong);
  --box-shadow: rgba(0,0,0,.08); --box-shadow-color: rgba(0,0,0,.08);
  --stats-border-color: var(--uwm-border); --stats-title-color: var(--uwm-text); --stats-row-border: var(--uwm-border); --stats-row-text: var(--uwm-text-2); --stats-row-badge-bg: var(--uwm-surface-3); --stats-row-badge-text: var(--uwm-text); --stats-label-bg: var(--uwm-surface-3); --stats-label-text: var(--uwm-text);
  --dialog-header-bg: var(--uwm-surface-2); --dialog-header-title: var(--uwm-text); --dialog-header-title2: var(--uwm-text); --dialog-header-border: var(--uwm-border); --dialog-bg-color: var(--uwm-surface); --dialog-border-color: var(--uwm-border);
  --info-dialog-header-bg: var(--uwm-surface-2); --uworld-dialog-header-bg: var(--uwm-surface-2); --slides-dialog-header: var(--uwm-surface-2);
  --hover: var(--uwm-surface-2); --hover-1: var(--uwm-surface-2); --grey-hover: var(--uwm-surface-3); --menu-button-hover-bg: var(--uwm-surface-2);
  --light-grey: var(--uwm-text-3); --grey-border: var(--uwm-border-strong); --faded-gray: var(--uwm-text-3); --faded-icon-color: var(--uwm-border-strong);
  --faded-grey-border: var(--uwm-border); --faded-grey-border-2: var(--uwm-border); --faded-grey-border-3: var(--uwm-border); --faded-grey-border-4: var(--uwm-border); --faded-grey-border-5: var(--uwm-border); --faded-grey-border-6: var(--uwm-border); --faded-grey-border-7: var(--uwm-border); --faded-grey-border-8: var(--uwm-border);
  --button-tab-bg: var(--uwm-surface-2); --mat-tab-background-color: transparent; --mat-tab-level-active-color: transparent; --tab-hover-color: var(--uwm-surface-2); --active-tab-hover-color: var(--uwm-accent-soft);
  --notes-header-bg: var(--uwm-surface-2); --notes-body-text-color: var(--uwm-text-2); --score-report-background: var(--uwm-surface-2); --progress-bar-bg: var(--uwm-surface-3); --suggestions-bg: var(--uwm-surface);
  --line-color-1: var(--uwm-border); --background-grey: var(--uwm-bg);
  --icon-background: var(--uwm-accent-soft); --dashboard-icon-background: var(--uwm-accent-soft); --dashboard-icon-background-hover: var(--uwm-accent-soft-2); --icon-background-hover: var(--uwm-accent-soft-2);
  --whats-new-card-bg: var(--uwm-surface-2); --topic-search-card-bg: var(--uwm-surface-2); --topic-search-scrollbar-thumb: var(--uwm-border-strong);
  --account-menu-label-text-color: var(--uwm-text); --account-menu-sub-label-text-color: var(--uwm-text-2); --account-menu-title-text-color: var(--uwm-text-3); --account-menu-sub-level-bg-color: var(--uwm-surface-2); --account-menu-sub-menu-bg-color: var(--uwm-surface-2);
  --top-nav-account-icon-background: var(--uwm-surface-2); --snackbar-background: var(--uwm-accent);
  --left-nav-background: var(--uwm-sidebar-bg); --left-nav-selected-background: var(--uwm-accent-soft); --left-nav-text-color: var(--uwm-text-2); --left-nav-selected-text-color: var(--uwm-accent-text);
  --navBarPrimary: var(--uwm-sidebar-bg); --navBarSecondary: var(--uwm-sidebar-bg); --whiteSecondary: var(--uwm-text-2); --nav-header-background: transparent; --nav-footer-background: transparent;
  --flashcard-tab-active-bg: var(--uwm-surface); --flashcard-tab-track-bg: var(--uwm-surface-3); --flashcard-adt-screen-bg: var(--uwm-bg);
  --subject-panel-background-color: var(--uwm-surface); --chip-hover-bg: var(--uwm-surface-3); --close-icon-hover: var(--uwm-surface-3);
  --error-color: var(--uwm-danger); --error-text-color: var(--uwm-danger); --success-color: var(--uwm-success); --warning-color: var(--uwm-warning);
  --progress-correct: var(--uwm-success); --progress-incorrect: var(--uwm-danger); --progress-omitted: var(--uwm-info); --progress-unused: var(--uwm-border-strong);
  /* test interface */
  --primary: var(--uwm-surface); --header: var(--uwm-surface-2); --ink-bar: var(--uwm-accent); --background: var(--uwm-bg); --font: var(--uwm-text);
  --action: var(--uwm-accent-text); --icon: var(--uwm-text-2); --iconhover: var(--uwm-text); --secondary: var(--uwm-border); --background-secondary: var(--uwm-surface);
  --border: var(--uwm-border); --selected: var(--uwm-accent-soft); --deactivated-bg: var(--uwm-surface-3);
  --stats-label: var(--uwm-text-2); --stats-value: var(--uwm-text); --stats-divider: var(--uwm-border); --stats-bg: var(--uwm-surface-2);
  --content-btn-bg: var(--uwm-accent); --content-btn-color: #fff; --vertical-divider: var(--uwm-border);
  --popup-header: var(--uwm-surface-2); --popup-header-font: var(--uwm-text); --ti-popup-header-bg: var(--uwm-surface-2); --ti-popup-header-color: var(--uwm-text);
  --docked-window-content-bg: var(--uwm-surface); --docked-window-content-font: var(--uwm-text); --docked-window-border: var(--uwm-border); --dock-container-border: var(--uwm-border);
  --vignette-descriptor: var(--uwm-accent-soft); --standards-border: var(--uwm-border); --standards-header: var(--uwm-text-3); --line-color: var(--uwm-border); --line-color-4: var(--uwm-border);
  --faded-text: var(--uwm-text-3); --link: var(--uwm-accent-text); --article-headers-text: var(--uwm-text); --articles-library-bg: var(--uwm-surface);
  --feedback-background: var(--uwm-surface); --annotation-background: var(--uwm-surface); --review-annotation-background: var(--uwm-surface-2); --ai-summarizer-background: var(--uwm-surface-2);
  --header-icon-text: var(--uwm-text-2); --top-header: var(--uwm-bg); --nav-header-font: var(--uwm-text); --icon-hover: var(--uwm-surface-2); --icon-hover-outline-color: transparent; --icon-focus-color: var(--uwm-accent);
  --toolbar-icon-border-color: transparent; --toolbar-icon-bg-color: transparent; --toolbar-icon-fill-color: var(--uwm-text-2); --previous-next-btn-fill-color: var(--uwm-text);
  --left-nav-border-right: var(--uwm-border); --nav-row-alternate: var(--uwm-surface); --left-nav-selected-bg: var(--uwm-accent-soft); --left-nav-selected-text: var(--uwm-accent-text); --left-nav-selected-hover-text: var(--uwm-accent-text);
  --close-icon-border-color: var(--uwm-border-strong); --close-icon-border-hover-color: var(--uwm-danger); --notes-icon-fill-color: var(--uwm-text-2); --notes-icon-selected-fill-color: var(--uwm-accent-text);
  --answer-choice-mat-radio-border: var(--uwm-border-strong); --navigator-marked: var(--uwm-accent); --accent-color: var(--uwm-surface);
}

/* ===== base ========================================================= */
html[data-uwm] body { background: var(--uwm-bg) !important; color: var(--uwm-text) !important; font-family: var(--uwm-font) !important; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
html[data-uwm] body :where(:not(i, .fa, .fas, .far, .fal, .fad, .fab, .fa-light, .fa-regular, .fa-solid, .fa-duotone, .fa-thin, .material-icons, mat-icon, .mat-icon, code, pre, kbd, .MathJax, .MathJax *, mjx-container, mjx-container *, svg, svg *, .cke *, .cke_reset_all *, #uwm-pop *, #uwm-fab *)) { font-family: var(--uwm-font) !important; }
html[data-uwm][data-uwm-font="inter"] body { font-feature-settings: "cv11", "ss03"; }
html[data-uwm] body ::selection { background: var(--uwm-accent-soft-2); }
html[data-uwm] body ::-webkit-scrollbar { width: 10px; height: 10px; }
html[data-uwm] body ::-webkit-scrollbar-track { background: transparent; }
html[data-uwm] body ::-webkit-scrollbar-thumb { background: var(--uwm-border-strong) !important; border-radius: 999px; border: 3px solid transparent; background-clip: padding-box !important; }
html[data-uwm] body ::-webkit-scrollbar-thumb:hover { background: var(--uwm-text-3) !important; background-clip: padding-box !important; }
html[data-uwm] body * { scrollbar-color: var(--uwm-border-strong) transparent; }
html[data-uwm] body a { color: var(--uwm-accent-text); }
html[data-uwm] body h1, html[data-uwm] body h2, html[data-uwm] body h3, html[data-uwm] body h4 { color: var(--uwm-text); letter-spacing: -0.01em; }
html[data-uwm] body .mat-tooltip { background: var(--uwm-text) !important; color: var(--uwm-bg) !important; border-radius: 8px !important; font-size: 12px !important; font-weight: 500; padding: 6px 10px !important; box-shadow: var(--uwm-shadow-md) !important; }
html[data-uwm] body .mat-snack-bar-container { background: var(--uwm-text) !important; color: var(--uwm-bg) !important; border-radius: 12px !important; box-shadow: var(--uwm-shadow-lg) !important; }
html[data-uwm] body .cdk-overlay-dark-backdrop { background: rgba(0,0,0,.45) !important; backdrop-filter: blur(2px); }

/* ===== app shell: sidebar ========================================== */
html[data-uwm] body .sidenav { background: var(--uwm-sidebar-bg) !important; border: 0 !important; border-right: 1px solid var(--uwm-border) !important; color: var(--uwm-text) !important; font-weight: 400 !important; }
html[data-uwm] body .sidenav .nav-header { background: transparent !important; padding: 22px 18px 14px !important; color: var(--uwm-text) !important; }
html[data-uwm] body .sidenav .nav-header .logo-group { padding-bottom: 8px !important; }
html[data-uwm] body .sidenav .nav-header img.icon-width { width: 40px !important; height: 40px !important; padding: 7px !important; box-sizing: border-box !important; background: var(--uwm-accent); border-radius: 12px; box-shadow: var(--uwm-shadow-sm); }
html[data-uwm] body .sidenav .nav-header h2 { font-size: 18px !important; font-weight: 700; letter-spacing: -0.02em; color: var(--uwm-text) !important; margin: 0; line-height: 1.2; }
html[data-uwm] body .sidenav .nav-header .qb-name { color: var(--uwm-text-2) !important; font-weight: 600 !important; font-size: 11px !important; letter-spacing: .06em; text-transform: uppercase; }
html[data-uwm] body .sidenav .nav-header .user-name { color: var(--uwm-text-3) !important; font-size: 12px !important; opacity: 1 !important; }
html[data-uwm] body .sidenav .nav-content { background: transparent !important; color: var(--uwm-text-2) !important; padding: 4px 10px !important; }
html[data-uwm] body .sidenav .nav-content .mat-list-base { padding-top: 6px !important; }
html[data-uwm] body .sidenav .nav-content .mat-list-item-content { padding: 0 !important; }
html[data-uwm] body .sidenav .nav-row { height: 38px !important; border-radius: var(--uwm-radius-sm); margin: 1px 0; transition: background-color .12s ease; }
html[data-uwm][data-uwm-density="compact"] body .sidenav .nav-row { height: 33px !important; }
html[data-uwm] body .sidenav .nav-row:hover { background: var(--uwm-surface-2) !important; }
html[data-uwm][data-uwm-theme="dark"] body .sidenav .nav-row:hover { background: rgba(255,255,255,.04) !important; }
html[data-uwm] body .sidenav .nav-content a { color: var(--uwm-text-2) !important; font-size: 13.5px !important; font-weight: 500 !important; padding: 0 10px !important; height: 100%; display: flex !important; align-items: center; gap: 2px; border-radius: var(--uwm-radius-sm); text-decoration: none !important; }
html[data-uwm] body .sidenav .nav-content .mat-list-text { display: block; height: 100%; }
html[data-uwm] body .sidenav .nav-content a.mat-line { white-space: nowrap; }
html[data-uwm] body .sidenav .nav-row:hover a { color: var(--uwm-text) !important; }
html[data-uwm] body .sidenav .nav-content .active { background: var(--uwm-accent-soft) !important; border-left: 0 !important; border-radius: var(--uwm-radius-sm); }
html[data-uwm] body .sidenav .nav-content .active a, html[data-uwm] body .sidenav .nav-content a.imp-active, html[data-uwm] body .sidenav .sub-nav .mat-list-item a .imp-active { color: var(--uwm-accent-text) !important; }
html[data-uwm] body .sidenav .nav-content a.imp-active { background: var(--uwm-accent-soft); }
html[data-uwm] body .sidenav i { color: var(--uwm-text-3) !important; width: 18px !important; margin-right: 10px !important; font-size: 14px; text-align: center; }
html[data-uwm] body .sidenav .nav-row:hover i { color: var(--uwm-text-2) !important; }
html[data-uwm] body .sidenav .active i, html[data-uwm] body .sidenav a.imp-active i { color: var(--uwm-accent) !important; }
html[data-uwm] body .sidenav i.angle-pos { width: auto !important; margin: 0 2px 0 auto !important; font-size: 12px; color: var(--uwm-text-3) !important; transition: transform .15s ease; }
html[data-uwm] body .sidenav .nav-label { font-weight: 500; }
html[data-uwm] body .sidenav .sub-nav { height: auto !important; background: transparent !important; }
html[data-uwm] body .sidenav .sub-nav .nav-row { height: 32px !important; }
html[data-uwm] body .sidenav .sub-nav .mat-list-item a { color: var(--uwm-text-2) !important; font-size: 13px !important; padding-left: 30px !important; }
html[data-uwm] body .sidenav .second-nav-pad { padding-left: 0 !important; }
html[data-uwm] body .sidenav .first-nav-pad { padding-left: 0 !important; }
html[data-uwm] body .sidenav .nav-footer { background: transparent !important; border-top: 1px solid var(--uwm-border) !important; padding: 12px 18px !important; color: var(--uwm-text-2) !important; font-size: 12px !important; }
html[data-uwm] body .sidenav .nav-footer .muted-text { color: var(--uwm-text-3) !important; }
html[data-uwm] body .sidenav .new-text-badge-client { background: var(--uwm-accent-soft) !important; color: var(--uwm-accent-text) !important; border-radius: 999px !important; height: 16px !important; width: auto !important; padding: 0 6px; font-size: 10px; }
html[data-uwm] body .leftcontent { background: var(--uwm-sidebar-bg) !important; }
html[data-uwm] body .mat-drawer-backdrop.mat-drawer-shown { background: rgba(0,0,0,.4); }

/* ===== app shell: top bar ========================================== */
html[data-uwm] body .rightcontent { background: var(--uwm-bg) !important; }
html[data-uwm] body topnav { display: block; position: sticky; top: 0; z-index: 30; }
html[data-uwm] body .mainlayout-topnav { background: transparent !important; padding-bottom: 12px !important; min-height: 0 !important; }
html[data-uwm] body .mainlayout-topnav .default-bar { background: var(--uwm-topbar-bg) !important; backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4); border-bottom: 1px solid var(--uwm-border); height: 60px !important; padding: 0 22px !important; }
html[data-uwm] body .mainlayout-topnav .toggle-btn { background: transparent !important; color: var(--uwm-text-2) !important; padding: 7px 9px !important; border-radius: var(--uwm-radius-xs) !important; line-height: 1; }
html[data-uwm] body .mainlayout-topnav .toggle-btn:hover { background: var(--uwm-surface-3) !important; }
html[data-uwm] body .mainlayout-topnav .toggle-btn i { color: var(--uwm-text-2) !important; font-size: 15px; }
html[data-uwm] body .mainlayout-topnav .header-text { font-size: 20px !important; font-weight: 650 !important; letter-spacing: -0.02em; color: var(--uwm-text) !important; }
html[data-uwm] body .top-right-nav { gap: 6px; display: flex; align-items: center; }
html[data-uwm] body .top-right-nav a, html[data-uwm] body .top-right-nav span { color: var(--uwm-text-2) !important; font-weight: 500 !important; font-size: 13px !important; }
html[data-uwm] body .top-right-nav a { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; transition: background-color .12s ease, color .12s ease; }
html[data-uwm] body .top-right-nav a:hover { background: var(--uwm-surface-3); color: var(--uwm-text) !important; }
html[data-uwm] body .top-right-nav a.whats-new-link { background: var(--uwm-accent-soft); color: var(--uwm-accent-text) !important; }
html[data-uwm] body .top-right-nav a.whats-new-link:hover { background: var(--uwm-accent-soft-2); }
html[data-uwm] body .top-right-nav a.whats-new-link i { font-size: 14px !important; }
html[data-uwm] body .top-right-nav span.mr-4 { margin-right: 4px !important; }
html[data-uwm] body .top-right-nav .account-menu-button { background: transparent !important; }
html[data-uwm] body .top-right-nav .account-menu-button i.account-menu { color: var(--uwm-text-2) !important; font-size: 26px !important; background: transparent !important; }
html[data-uwm] body .mainlayout-footer { background: var(--uwm-bg) !important; border-top: 1px solid var(--uwm-border) !important; color: var(--uwm-text-3) !important; font-size: 12px !important; }

/* ===== shared components ========================================== */
html[data-uwm] body .mat-card, html[data-uwm] body .card { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; border-radius: var(--uwm-radius) !important; box-shadow: var(--uwm-shadow-sm) !important; border: 1px solid var(--uwm-border) !important; }
html[data-uwm] body .mat-raised-button.mat-primary, html[data-uwm] body .btn-primary, html[data-uwm] body .mat-flat-button.mat-primary {
  background: var(--uwm-accent) !important; color: #fff !important; border: 0 !important; border-radius: var(--uwm-radius-sm) !important; box-shadow: var(--uwm-shadow-sm) !important; font-weight: 600 !important; letter-spacing: 0; transition: background-color .12s ease, transform .08s ease; }
html[data-uwm] body .mat-raised-button.mat-primary:hover, html[data-uwm] body .btn-primary:hover { background: var(--uwm-accent-hover) !important; }
html[data-uwm] body .mat-raised-button.mat-primary:active { transform: translateY(1px); }
html[data-uwm] body .mat-raised-button.mat-primary.mat-button-disabled { background: var(--uwm-surface-3) !important; color: var(--uwm-text-3) !important; box-shadow: none !important; opacity: 1 !important; }
html[data-uwm] body .mat-raised-button:not(.mat-primary):not(.mat-warn) { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; border: 1px solid var(--uwm-border-strong) !important; border-radius: var(--uwm-radius-sm) !important; box-shadow: none !important; font-weight: 500 !important; }
html[data-uwm] body .mat-raised-button:not(.mat-primary):not(.mat-warn):hover { background: var(--uwm-surface-2) !important; }
html[data-uwm] body .mat-button, html[data-uwm] body .mat-icon-button, html[data-uwm] body .mat-stroked-button { border-radius: var(--uwm-radius-sm) !important; color: var(--uwm-text-2); }
html[data-uwm] body .mat-stroked-button { border-color: var(--uwm-border-strong) !important; }
html[data-uwm] body .mat-button-focus-overlay { background: var(--uwm-text) !important; }
html[data-uwm] body .mat-checkbox-inner-container { width: 18px !important; height: 18px !important; }
html[data-uwm] body .mat-checkbox-frame { border: 1.5px solid var(--uwm-border-strong) !important; border-radius: 5px !important; background: var(--uwm-surface); }
html[data-uwm] body .mat-checkbox-background { border-radius: 5px !important; }
html[data-uwm] body .mat-checkbox-checked .mat-checkbox-background, html[data-uwm] body .mat-checkbox-indeterminate .mat-checkbox-background { background: var(--uwm-accent) !important; }
html[data-uwm] body .mat-checkbox-checkmark-path { stroke: #fff !important; }
html[data-uwm] body .mat-checkbox-disabled .mat-checkbox-frame { border-color: var(--uwm-border) !important; }
html[data-uwm] body .mat-checkbox-label { color: var(--uwm-text) !important; }
html[data-uwm] body .mat-checkbox-ripple .mat-ripple-element { background: var(--uwm-accent) !important; }
html[data-uwm] body .mat-radio-outer-circle { border: 1.5px solid var(--uwm-border-strong) !important; background: var(--uwm-surface); }
html[data-uwm] body .mat-radio-button.mat-radio-checked .mat-radio-outer-circle { border-color: var(--uwm-accent) !important; }
html[data-uwm] body .mat-radio-button .mat-radio-inner-circle { background: var(--uwm-accent) !important; }
html[data-uwm] body .mat-radio-ripple .mat-ripple-element { background: var(--uwm-accent) !important; }
html[data-uwm] body .mat-slide-toggle .mat-slide-toggle-bar { width: 38px !important; height: 22px !important; border-radius: 11px !important; background: var(--uwm-border-strong) !important; transition: background-color .15s ease; }
html[data-uwm] body .mat-slide-toggle .mat-slide-toggle-thumb-container { top: 2px !important; left: 2px !important; bottom: auto !important; width: 18px !important; height: 18px !important; transform: translate3d(0,0,0) !important; }
html[data-uwm] body .mat-slide-toggle .mat-slide-toggle-thumb { width: 18px !important; height: 18px !important; background: #fff !important; box-shadow: 0 1px 2px rgba(0,0,0,.25) !important; }
html[data-uwm] body .mat-slide-toggle.mat-checked .mat-slide-toggle-bar { background: var(--uwm-accent) !important; }
html[data-uwm] body .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container { transform: translate3d(16px,0,0) !important; }
html[data-uwm] body .mat-slide-toggle .mat-slide-toggle-ripple { display: none !important; }
html[data-uwm] body .mat-slide-toggle-content { color: var(--uwm-text) !important; font-weight: 500; }
html[data-uwm] body .mat-form-field-underline { background: var(--uwm-border) !important; }
html[data-uwm] body .mat-form-field-ripple { background: var(--uwm-accent) !important; }
html[data-uwm] body .mat-form-field-label, html[data-uwm] body .mat-input-element::placeholder { color: var(--uwm-text-3) !important; }
html[data-uwm] body .mat-input-element, html[data-uwm] body input, html[data-uwm] body textarea { color: var(--uwm-text) !important; caret-color: var(--uwm-accent); }
html[data-uwm] body .mat-select-value, html[data-uwm] body .mat-select-value-text { color: var(--uwm-text) !important; }
html[data-uwm] body .mat-select-arrow { color: var(--uwm-text-3) !important; }
html[data-uwm] body .mat-select-panel, html[data-uwm] body .mat-autocomplete-panel { background: var(--uwm-surface) !important; border: 1px solid var(--uwm-border); border-radius: 12px !important; box-shadow: var(--uwm-shadow-lg) !important; padding: 4px; }
html[data-uwm] body .mat-option { color: var(--uwm-text) !important; border-radius: 8px; height: 38px !important; line-height: 38px !important; font-size: 13.5px !important; }
html[data-uwm] body .mat-option:hover:not(.mat-option-disabled), html[data-uwm] body .mat-option.mat-active { background: var(--uwm-surface-2) !important; }
html[data-uwm] body .mat-option.mat-selected:not(.mat-option-multiple) { background: var(--uwm-accent-soft) !important; color: var(--uwm-accent-text) !important; }
html[data-uwm] body .mat-menu-panel { background: var(--uwm-surface) !important; border: 1px solid var(--uwm-border); border-radius: 12px !important; box-shadow: var(--uwm-shadow-lg) !important; min-height: 0 !important; padding: 6px; }
html[data-uwm] body .mat-menu-content:not(:empty) { padding: 0 !important; }
html[data-uwm] body .mat-menu-item { color: var(--uwm-text) !important; border-radius: 8px; height: 38px !important; line-height: 38px !important; font-size: 13.5px !important; }
html[data-uwm] body .mat-menu-item:hover:not([disabled]) { background: var(--uwm-surface-2) !important; }
html[data-uwm] body .mat-menu-item i { color: var(--uwm-text-2) !important; }
html[data-uwm] body .mat-dialog-container { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; border-radius: var(--uwm-radius) !important; border: 1px solid var(--uwm-border); box-shadow: var(--uwm-shadow-lg) !important; }
html[data-uwm] body .mat-dialog-title { color: var(--uwm-text) !important; font-weight: 600 !important; letter-spacing: -0.01em; }
html[data-uwm] body .dialogContainer .title, html[data-uwm] body .dialogContainer .mat-dialog-title { background: var(--uwm-surface-2) !important; color: var(--uwm-text) !important; border-bottom: 1px solid var(--uwm-border); }
html[data-uwm] body .mat-tab-header { border-bottom: 1px solid var(--uwm-border) !important; background: transparent !important; }
html[data-uwm] body .mat-tab-label-container { background: transparent !important; }
html[data-uwm] body .mat-tab-label { min-width: 0 !important; padding: 0 16px !important; height: 46px !important; opacity: 1 !important; color: var(--uwm-text-2) !important; font-weight: 500 !important; font-size: 14px !important; background: transparent !important; box-shadow: none !important; border-radius: 0 !important; transition: color .12s ease; }
html[data-uwm] body .mat-tab-label:hover { color: var(--uwm-text) !important; }
html[data-uwm] body .mat-tab-label.mat-tab-label-active, html[data-uwm] body .mat-tab-label.mat-tab-label-active .mat-tab-label-content { color: var(--uwm-text) !important; font-weight: 600 !important; }
html[data-uwm] body .mat-tab-label:not(.mat-tab-label-active) .mat-tab-label-content { color: var(--uwm-text-2) !important; }
html[data-uwm] body .mat-ink-bar { height: 2px !important; background: var(--uwm-accent) !important; border-radius: 2px 2px 0 0; visibility: visible !important; }
html[data-uwm] body .mat-table { background: transparent !important; }
html[data-uwm] body .mat-header-row { height: 44px !important; }
html[data-uwm] body .mat-header-cell, html[data-uwm] body .mat-sort-header-button { color: var(--uwm-text-3) !important; font-size: 11px !important; font-weight: 600 !important; letter-spacing: .06em; text-transform: uppercase; border-bottom: 1px solid var(--uwm-border) !important; background: transparent !important; }
html[data-uwm] body .mat-sort-header-arrow { color: var(--uwm-text-3) !important; }
html[data-uwm] body .mat-row { height: 52px !important; transition: background-color .12s ease; }
html[data-uwm][data-uwm-density="compact"] body .mat-row { height: 44px !important; }
html[data-uwm] body .mat-row:hover { background: var(--uwm-surface-2) !important; }
html[data-uwm] body .mat-cell, html[data-uwm] body td.mat-cell { color: var(--uwm-text) !important; border-bottom: 1px solid var(--uwm-border) !important; font-size: 13.5px !important; }
html[data-uwm] body .mat-paginator { background: transparent !important; color: var(--uwm-text-2) !important; }
html[data-uwm] body .mat-paginator .mat-paginator-icon, html[data-uwm] body .mat-paginator-icon { color: var(--uwm-text-2) !important; fill: var(--uwm-text-2) !important; }
html[data-uwm] body .custom-badge, html[data-uwm] body .badge { background: var(--uwm-surface-3) !important; color: var(--uwm-text-2) !important; border: 1px solid var(--uwm-border) !important; border-radius: 999px !important; padding: 2px 9px !important; height: auto !important; line-height: 1.5 !important; font-size: 12px !important; font-weight: 500 !important; width: auto !important; min-width: 30px; display: inline-block; text-align: center; font-variant-numeric: tabular-nums; }
html[data-uwm] body .no-tests-available-card { box-shadow: var(--uwm-shadow-sm) !important; border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius); }
html[data-uwm] body .mat-divider { border-top-color: var(--uwm-border) !important; }
html[data-uwm] body .mat-divider-vertical { border-right-color: var(--uwm-border) !important; }
html[data-uwm] body .mat-chip { background: var(--uwm-surface-3) !important; color: var(--uwm-text) !important; border-radius: 999px !important; }
html[data-uwm] body .mat-progress-bar-buffer { background: var(--uwm-surface-3) !important; }
html[data-uwm] body .mat-progress-bar-fill::after { background: var(--uwm-accent) !important; }
html[data-uwm] body .mat-progress-spinner circle, html[data-uwm] body .mat-spinner circle { stroke: var(--uwm-accent) !important; }
html[data-uwm] body .spinner-card { background: var(--uwm-bg) !important; border: 0 !important; box-shadow: none !important; }
html[data-uwm] body .mat-expansion-panel { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; border-radius: var(--uwm-radius-sm) !important; box-shadow: none !important; border: 1px solid var(--uwm-border); }
html[data-uwm] body .mat-expansion-panel-header-title { color: var(--uwm-text) !important; }
html[data-uwm] body .mat-calendar { background: var(--uwm-surface); color: var(--uwm-text); }
html[data-uwm] body .mat-calendar-body-cell-content { color: var(--uwm-text); border-radius: 8px !important; }
html[data-uwm] body .mat-calendar-body-selected { background: var(--uwm-accent) !important; color: #fff !important; }
html[data-uwm] body .mat-datepicker-content { background: var(--uwm-surface) !important; border-radius: 12px !important; box-shadow: var(--uwm-shadow-lg) !important; }
html[data-uwm] body .popover { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; border: 1px solid var(--uwm-border) !important; border-radius: 12px !important; box-shadow: var(--uwm-shadow-lg) !important; }
html[data-uwm] body .popover .popover-header { background: var(--uwm-surface-2) !important; color: var(--uwm-text) !important; border-bottom-color: var(--uwm-border) !important; border-radius: 12px 12px 0 0; }
html[data-uwm] body .popover .popover-body, html[data-uwm] body .popover td, html[data-uwm] body .popover span { color: var(--uwm-text) !important; }
html[data-uwm] body .popover .arrow::after { border-right-color: var(--uwm-surface) !important; border-left-color: var(--uwm-surface) !important; }
html[data-uwm] body .popover .arrow::before { border-right-color: var(--uwm-border) !important; border-left-color: var(--uwm-border) !important; }
html[data-uwm] body .table-bordered td, html[data-uwm] body .table-bordered th, html[data-uwm] body .table td, html[data-uwm] body .table th { border-color: var(--uwm-border) !important; }
html[data-uwm] body .form-control { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; border: 1px solid var(--uwm-border) !important; border-radius: var(--uwm-radius-sm) !important; }
html[data-uwm] body .form-control:focus { border-color: var(--uwm-accent) !important; box-shadow: 0 0 0 3px var(--uwm-accent-soft) !important; }
html[data-uwm] body .grecaptcha-badge { opacity: .35; }

/* ===== page-level cards (tab groups) ============================== */
html[data-uwm] body .rightcontent .createtest-first-tabs, html[data-uwm] body .rightcontent .previoustests-first-tabs, html[data-uwm] body .rightcontent .overall-first-tabs, html[data-uwm] body .rightcontent .report-first-tabs, html[data-uwm] body .rightcontent .graphs-first-tabs, html[data-uwm] body .rightcontent .assessment-blocks {
  background: var(--uwm-surface); border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius); box-shadow: var(--uwm-shadow-sm); }
html[data-uwm] body .rightcontent .createtest-first-tabs > .mat-tab-header, html[data-uwm] body .rightcontent .previoustests-first-tabs > .mat-tab-header, html[data-uwm] body .rightcontent .overall-first-tabs > .mat-tab-header, html[data-uwm] body .rightcontent .report-first-tabs > .mat-tab-header, html[data-uwm] body .rightcontent .graphs-first-tabs > .mat-tab-header, html[data-uwm] body .rightcontent .assessment-blocks > .mat-tab-header { padding: 0 8px; border-radius: var(--uwm-radius) var(--uwm-radius) 0 0; }
html[data-uwm] body .rightcontent mat-tab-group .mat-tab-header .mat-tab-label.mat-tab-label-active, html[data-uwm] body .rightcontent mat-tab-group .mat-tab-header .mat-tab-label:not(.mat-tab-label-active), html[data-uwm] body .createtest-first-tabs .mat-tab-header .mat-tab-label { background: transparent !important; box-shadow: none !important; opacity: 1 !important; border-radius: 0 !important; font-size: 14px !important; }
html[data-uwm] body .createtest-first-tabs .mat-tab-header .mat-tab-label-active .mat-tab-label-content { color: var(--uwm-text) !important; }
html[data-uwm] body .createtest-first-tabs .mat-tab-header .mat-tab-label:not(.mat-tab-label-active) { opacity: 1 !important; }
html[data-uwm] body .createtest-first-tabs .create-test { background: transparent !important; }
html[data-uwm] body .mat-tab-body-content { background: transparent !important; }

/* ===== dashboard =================================================== */
html[data-uwm] body .uworld-dashboard { background: transparent !important; }
html[data-uwm] body .uworld-dashboard .dashboard { margin: 0 4% 5% !important; max-width: 1240px; }
html[data-uwm] body .dashboard-stats-row .card { padding: 20px 22px !important; display: flex; align-items: center; justify-content: space-between; }
html[data-uwm] body .dashboard-stats-row .card .subheading { font-size: 11.5px !important; font-weight: 600 !important; letter-spacing: .06em; text-transform: uppercase; color: var(--uwm-text-3) !important; }
html[data-uwm] body .dashboard-stats-row .card .stat-values { margin-top: 6px; display: flex; align-items: baseline; gap: 8px; }
html[data-uwm] body .dashboard-stats-row .card .stat-values .value { font-size: 30px !important; font-weight: 700 !important; letter-spacing: -0.03em; color: var(--uwm-text) !important; font-variant-numeric: tabular-nums; line-height: 1.1; }
html[data-uwm] body .dashboard-stats-row .card .stat-values .value-text { color: var(--uwm-text-2) !important; font-size: 13px !important; font-weight: 500; }
html[data-uwm] body .dashboard-stats-row .card .icon-redirct { background: var(--uwm-accent-soft) !important; border-radius: 12px !important; width: 46px !important; height: 46px !important; display: flex; align-items: center; justify-content: center; transition: background-color .12s ease; }
html[data-uwm] body .dashboard-stats-row .card .icon-redirct:hover { background: var(--uwm-accent-soft-2) !important; }
html[data-uwm] body .dashboard-stats-row .card .icon-redirct i { color: var(--uwm-accent-text) !important; font-size: 18px !important; }
html[data-uwm] body .study-planner.card { padding: 22px 24px !important; }
html[data-uwm] body .study-planner .card-info .subheading { font-size: 16px !important; font-weight: 600 !important; color: var(--uwm-text) !important; letter-spacing: -0.01em; }
html[data-uwm] body .study-planner .card-info .stat-values { color: var(--uwm-text-3) !important; font-size: 13px !important; }
html[data-uwm] body .study-planner .no-plan div span { color: var(--uwm-text) !important; }
html[data-uwm] body .study-planner .no-plan > div:not(.no-plan-text-message) span { font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
html[data-uwm] body .study-planner .no-plan-text-message span { color: var(--uwm-text-2) !important; font-size: 14px; }
html[data-uwm] body .section-view-changer .mat-form-field-flex { background: var(--uwm-surface); border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius-sm); padding: 4px 12px !important; align-items: center; }
html[data-uwm] body .section-view-changer .mat-form-field-infix { border-top: 0 !important; padding: 6px 0 !important; }
html[data-uwm] body .section-view-changer .mat-form-field-underline { display: none !important; }
html[data-uwm] body .section-view-changer .mat-form-field-wrapper { padding-bottom: 0 !important; }

/* ===== create test ================================================ */
html[data-uwm] body .createtest-first-tabs .create-test .row-option .row-header { padding: 22px 24px 12px !important; border-top: 1px solid var(--uwm-border) !important; font-size: 15px !important; font-weight: 600; color: var(--uwm-text) !important; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .row-header.border-top-0 { border-top: 0 !important; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .row-header .info-icon { color: var(--uwm-text-3) !important; font-size: 13px; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .row-header .angle-icon { color: var(--uwm-text-3) !important; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .row-header .available-questions { font: 500 12px/17px var(--uwm-font) !important; color: var(--uwm-text-3) !important; opacity: 1 !important; font-style: normal !important; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .row-content { padding: 6px 24px 24px !important; color: var(--uwm-text) !important; font-size: 14px !important; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .question-mode-radio-group.mat-radio-group { background: var(--uwm-surface-3) !important; border: 1px solid var(--uwm-border) !important; border-radius: 10px !important; padding: 3px; display: inline-flex; gap: 2px; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .question-mode-radio-group.mat-radio-group .mat-radio-button { background: transparent !important; color: var(--uwm-text-2) !important; border-radius: 8px !important; transition: background-color .12s ease, color .12s ease; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .question-mode-radio-group.mat-radio-group .mat-radio-button .mat-radio-label { padding: 5px 16px !important; font-weight: 500; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .question-mode-radio-group.mat-radio-group .mat-radio-checked { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; box-shadow: var(--uwm-shadow-sm); }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .test-mode-div mat-slide-toggle .mat-slide-toggle-bar { width: 38px !important; height: 22px !important; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .number-of-questions-div input { background: var(--uwm-surface) !important; border: 1px solid var(--uwm-border-strong) !important; border-radius: 8px; color: var(--uwm-text) !important; font-weight: 600; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .number-of-questions-div input:focus { border-color: var(--uwm-accent) !important; box-shadow: 0 0 0 3px var(--uwm-accent-soft); outline: 0; }
html[data-uwm] body .createtest-first-tabs .create-test .row-option .row-content .expand-icon-container .expand-icon { color: var(--uwm-text-3) !important; }
html[data-uwm] body .createtest-first-tabs .create-test .custom-test-section .custom-testid input { background: var(--uwm-surface) !important; border-radius: 8px; }
html[data-uwm] body .createtest-first-tabs .mat-checkbox-label { color: var(--uwm-text) !important; }
html[data-uwm] body .launchtutorial, html[data-uwm] body .launchtutorial a { color: var(--uwm-accent-text) !important; font-weight: 500; }

/* ===== previous tests / performance / notes / search ============= */
html[data-uwm] body .previous-tests-table-wrapper table { background: transparent !important; }
html[data-uwm] body .previous-tests-table-wrapper .custom-badge { padding: 4px 10px !important; }
html[data-uwm] body .previoustests-table .mat-row .hover-icon i { color: var(--uwm-text-2); }
html[data-uwm] body .actions-column i { color: var(--uwm-accent) !important; font-size: 18px; }
html[data-uwm] body .statistics-title { color: var(--uwm-text) !important; font-weight: 600; font-size: 15px; }
html[data-uwm] body .stats-title { color: var(--uwm-text) !important; font-weight: 600 !important; font-size: 13px !important; letter-spacing: .02em; }
html[data-uwm] body .stats-row { border-bottom: 1px solid var(--uwm-border) !important; color: var(--uwm-text-2) !important; }
html[data-uwm] body .stats-row > div:last-child { color: var(--uwm-text) !important; font-weight: 600; font-variant-numeric: tabular-nums; background: var(--uwm-surface-3); border-radius: 999px; padding: 0 9px; min-width: 28px; text-align: center; }
html[data-uwm] body .stats-label { color: var(--uwm-text-2) !important; background: transparent !important; }
html[data-uwm] body .print-button, html[data-uwm] body .print-button a { color: var(--uwm-text-2) !important; font-weight: 500; }
html[data-uwm] body .notes-header { background: var(--uwm-surface) !important; border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius); }
html[data-uwm] body .uworld-search .search-div-wrapper, html[data-uwm] body .uworld-search .search-div { background: transparent !important; }
html[data-uwm] body .uworld-search .filter, html[data-uwm] body .filter-title { color: var(--uwm-text-2) !important; }
html[data-uwm] body .uworld-search .search-box .mat-form-field-flex, html[data-uwm] body .notes .search-bar .mat-form-field-flex, html[data-uwm] body .previous-tests .mat-form-field-flex { align-items: center; }
html[data-uwm] body .lbl-font, html[data-uwm] body .dropdown-name { color: var(--uwm-text-2) !important; }
html[data-uwm] body .deckname { color: var(--uwm-text) !important; }
html[data-uwm] body .clr-btn { color: var(--uwm-accent-text) !important; }

/* ===== notebook =================================================== */
html[data-uwm] body courseapp-uworld-notebook .mat-drawer-container, html[data-uwm] body .notebook-container { background: transparent !important; color: var(--uwm-text) !important; }
html[data-uwm] body .notebook-sidenav, html[data-uwm] body courseapp-uworld-notebook .mat-drawer { background: var(--uwm-surface) !important; border-right: 1px solid var(--uwm-border) !important; color: var(--uwm-text) !important; }
html[data-uwm] body courseapp-uworld-notebook .mat-drawer-content, html[data-uwm] body .content-main { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; }
html[data-uwm] body .node-title, html[data-uwm] body .node-item { color: var(--uwm-text-2) !important; }
html[data-uwm] body .nb-current-node > .node-self, html[data-uwm] body .nb-current-node > .node-self .node-title { color: var(--uwm-accent-text) !important; }
html[data-uwm] body .nb-current-node > .node-self { background: var(--uwm-accent-soft) !important; border-radius: 8px; }
html[data-uwm] body .content-main-section h3, html[data-uwm] body .content-main-section h2 { color: var(--uwm-text) !important; }
html[data-uwm] body .content-main-section, html[data-uwm] body .content-main-section p, html[data-uwm] body .content-main-section li { color: var(--uwm-text) !important; }
html[data-uwm] body .cke_chrome { border-color: var(--uwm-border) !important; border-radius: var(--uwm-radius-sm); overflow: hidden; }
html[data-uwm] body .cke_top, html[data-uwm] body .cke_bottom { background: var(--uwm-surface-2) !important; border-color: var(--uwm-border) !important; }
html[data-uwm][data-uwm-theme="dark"] body .cke_top { filter: invert(.88) hue-rotate(180deg); }

/* ===== test interface: shared ===================================== */
html[data-uwm] body.usmle-test-interface-angular-material-theme { background: var(--uwm-bg) !important; }
html[data-uwm] body .uworld-layout, html[data-uwm] body .nbme-layout { color: var(--uwm-text) !important; background: var(--uwm-bg) !important; }
html[data-uwm] body .uworld-layout .uworld-content, html[data-uwm] body .nbme-layout .nbme-content { background: var(--uwm-bg) !important; }
html[data-uwm] body .common-content { padding: 14px 16px 14px !important; gap: 14px; background: transparent !important; }
html[data-uwm][data-uwm-density="compact"] body .common-content { padding: 8px 10px !important; gap: 10px; }
html[data-uwm] body .common-content .question-content { background: var(--uwm-surface) !important; border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius); box-shadow: var(--uwm-shadow-sm); padding: 26px 32px 28px !important; line-height: 1.7 !important; color: var(--uwm-text) !important; }
html[data-uwm][data-uwm-density="compact"] body .common-content .question-content { padding: 18px 22px 20px !important; }
html[data-uwm] body .common-content .question-content.split-screen.left-content { margin-right: 0 !important; }
html[data-uwm] body .common-content .question-abstract { background: var(--uwm-surface) !important; border: 1px solid var(--uwm-border) !important; border-radius: var(--uwm-radius); padding: 26px 32px !important; }
html[data-uwm] body .common-content .vertical-divider-line { background: transparent !important; width: 0 !important; }
html[data-uwm] body .common-content .vertical-divider-line:hover, html[data-uwm] body .common-content .vertical-divider-line.resizing { background: var(--uwm-accent) !important; width: 2px !important; border-radius: 2px; }
html[data-uwm] body .common-content .question-content #questionText { line-height: 1.7 !important; color: var(--uwm-text); }
html[data-uwm] body .common-content .question-content #questionText p { margin-bottom: 1em; }
html[data-uwm] body .common-content .question-content img { border-radius: 10px; }
html[data-uwm] body .common-content .question-content .suggested-hl-toggle mat-checkbox .mat-checkbox-label, html[data-uwm] body .nbme .common-content .nbme-top-row .bookmark-question .mark-level { color: var(--uwm-text-2) !important; font-size: 13px !important; font-weight: 500 !important; letter-spacing: 0 !important; }
html[data-uwm] body .nbme .common-content .nbme-top-row .bookmark-question .mark-flag-icon { color: var(--uwm-text-2) !important; }
html[data-uwm] body .common-content .question-content .suggested-hl-toggle mat-checkbox .mat-checkbox-inner-container { border-radius: 5px !important; }
html[data-uwm] body .common-content .question-content .suggested-hl-toggle mat-checkbox.mat-checkbox-checked .mat-checkbox-background, html[data-uwm] body .nbme .common-content .nbme-top-row .bookmark-question .mark-checkbox.mat-checkbox-checked .mat-checkbox-background { background: var(--uwm-accent) !important; }
/* answer choices */
html[data-uwm] body .common-content .question-content .answer-container { width: 100%; border-collapse: separate !important; border-spacing: 0 8px !important; margin: 4px 0 0 !important; }
html[data-uwm] body .common-content .question-content .answer-container tr.answer-choice-background { margin: 0 !important; padding: 10px 14px !important; border: 1px solid var(--uwm-border) !important; border-radius: var(--uwm-radius-sm); background: var(--uwm-surface-2) !important; transition: background-color .12s ease, border-color .12s ease, box-shadow .12s ease; align-items: center !important; }
html[data-uwm][data-uwm-density="compact"] body .common-content .question-content .answer-container tr.answer-choice-background { padding: 6px 10px !important; }
html[data-uwm] body .common-content .question-content .answer-container tr.answer-choice-background:hover { border-color: var(--uwm-border-strong) !important; background: var(--uwm-surface-3) !important; }
html[data-uwm] body .common-content .question-content .answer-container tr.answer-choice-background:has(.mat-radio-checked) { border-color: var(--uwm-accent) !important; background: var(--uwm-accent-soft) !important; box-shadow: 0 0 0 1px var(--uwm-accent) inset; }
html[data-uwm] body .common-content .question-content .answer-container tr.answer-choice-background:has(.left-td .fa-check) { border-color: var(--uwm-success) !important; background: var(--uwm-success-soft) !important; box-shadow: none; }
html[data-uwm] body .common-content .question-content .answer-container tr.answer-choice-background:has(.left-td .fa-times) { border-color: var(--uwm-danger) !important; background: var(--uwm-danger-soft) !important; box-shadow: none; }
html[data-uwm] body .common-content .question-content .answer-container td { border: 0 !important; padding: 0 !important; background: transparent !important; vertical-align: middle; }
html[data-uwm] body .common-content .question-content .answer-container .left-td { gap: 6px; align-items: center !important; }
html[data-uwm] body .common-content .question-content .answer-container .left-td > div:first-child .fa-check { color: var(--uwm-success) !important; }
html[data-uwm] body .common-content .question-content .answer-container .left-td > div:first-child .fa-times { color: var(--uwm-danger) !important; }
html[data-uwm] body .common-content .question-content .answer-container .choice-no-strike, html[data-uwm] body .common-content .question-content .answer-container .left-td strike { font-weight: 600; color: var(--uwm-text-2); min-width: 22px; display: inline-block; }
html[data-uwm] body .common-content .question-content .answer-container .answer-choice-content { padding-left: 6px !important; color: var(--uwm-text); }
html[data-uwm] body .common-content .question-content .answer-container .disabled-state { opacity: .85 !important; }
html[data-uwm] body .common-content .question-content .answer-container .strikeout-icon { opacity: 0; transition: opacity .12s ease; color: var(--uwm-text-3) !important; }
html[data-uwm] body .common-content .question-content .answer-container tr:hover .strikeout-icon { opacity: 1; }
html[data-uwm] body .common-content .mat-radio-container .mat-radio-outer-circle { border-color: var(--uwm-border-strong) !important; }
html[data-uwm] body .common-content .mat-radio-button.mat-radio-checked .mat-radio-container .mat-radio-outer-circle { border-color: var(--uwm-accent) !important; }
/* submit / proceed buttons */
html[data-uwm] body .common-content .question-content .submit-btn, html[data-uwm] body .common-content .question-content .proceed-to-next-btn { background: var(--uwm-accent) !important; color: #fff !important; border-radius: var(--uwm-radius-sm) !important; padding: 0 20px !important; height: 38px !important; line-height: 38px !important; font-weight: 600 !important; font-size: 14px !important; box-shadow: var(--uwm-shadow-sm) !important; border: 0 !important; transition: background-color .12s ease; }
html[data-uwm] body .common-content .question-content .submit-btn:hover, html[data-uwm] body .common-content .question-content .proceed-to-next-btn:hover { background: var(--uwm-accent-hover) !important; color: #fff !important; }
html[data-uwm] body .common-content .question-content .submit-btn.rounded-pill { border-radius: 999px !important; }
/* stats bar */
html[data-uwm] body .common-content .question-content .stats-bar, html[data-uwm] body .common-content .question-content.split-screen .stats-bar { box-shadow: none !important; background: var(--uwm-surface-2) !important; border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius-sm); margin: 18px 0 !important; overflow: hidden; }
html[data-uwm] body .common-content .question-content .stats-bar .content { height: 70px !important; color: var(--uwm-text) !important; font-size: 14px !important; }
html[data-uwm] body .common-content .question-content .stats-bar .content .fal { color: var(--uwm-text-3) !important; font-size: 22px !important; }
html[data-uwm] body .common-content .question-content .stats-bar .content .stats-label { color: var(--uwm-text-3) !important; font-size: 11px !important; text-transform: uppercase; letter-spacing: .05em; font-weight: 600; }
html[data-uwm] body .common-content .question-content .stats-bar .content .stats-value { color: var(--uwm-text) !important; font-size: 14px !important; font-weight: 600; font-variant-numeric: tabular-nums; }
html[data-uwm] body .common-content .question-content .stats-bar .content.correct-answer { border-left: 4px solid var(--uwm-success) !important; color: var(--uwm-success) !important; font-weight: 700; line-height: 70px !important; }
html[data-uwm] body .common-content .question-content .stats-bar .content.incorrect-answer { border-left: 4px solid var(--uwm-danger) !important; }
html[data-uwm] body .common-content .question-content .stats-bar .content.incorrect-answer > div:first-child { color: var(--uwm-danger) !important; font-weight: 700; }
html[data-uwm] body .common-content .question-content .stats-bar .content.omitted-answer { border-left: 4px solid var(--uwm-info) !important; }
html[data-uwm] body .common-content .question-content .stats-bar .content.omitted-answer > div:first-child { color: var(--uwm-info) !important; font-weight: 700; }
html[data-uwm] body .common-content .break > div { background: var(--uwm-border) !important; }
/* explanation */
html[data-uwm] body .common-content .question-content .explanation .nav-tabs { border-bottom: 1px solid var(--uwm-border) !important; gap: 4px; margin-bottom: 14px; }
html[data-uwm] body .common-content .question-content .explanation .nav-tabs .nav-link { border: 0 !important; border-radius: 0 !important; background: transparent !important; color: var(--uwm-text-2) !important; padding: 10px 12px !important; font-weight: 500; font-size: 14px; }
html[data-uwm] body .common-content .question-content .explanation .nav-tabs .nav-link.active { color: var(--uwm-text) !important; font-weight: 600; box-shadow: inset 0 -2px 0 var(--uwm-accent); }
html[data-uwm] body .common-content .question-content .explanation #explanation { line-height: 1.7 !important; color: var(--uwm-text); }
html[data-uwm] body .common-content .question-content .explanation #explanation > .tab-content > div:first-child { color: var(--uwm-text-3); font-size: 12px; margin-bottom: 8px; }
html[data-uwm] body .common-content .question-content .explanation #explanation > .tab-content > div:first-child b { font-weight: 500; }
html[data-uwm] body .common-content .question-content .explanation #explanation .table-default-style td, html[data-uwm] body .common-content .table-default-style td { border: 1px solid var(--uwm-border) !important; padding: 8px 12px !important; }
html[data-uwm] body .common-content table.table-default-style { border-collapse: separate !important; border-spacing: 0 !important; border-radius: 10px; overflow: hidden; border: 1px solid var(--uwm-border-strong) !important; margin: 14px 0 !important; }
html[data-uwm] body .common-content table.table-default-style tr:first-child td { background: var(--uwm-surface-2); }
html[data-uwm] body .common-content table.table-default-style td:first-child { background: var(--uwm-surface-2); }
html[data-uwm] body .common-content .question-content .explanation .related-articles, html[data-uwm] body .common-content .question-content .explanation .references { margin-top: 18px !important; padding: 14px 16px; background: var(--uwm-surface-2); border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius-sm); }
html[data-uwm] body .common-content .question-content .explanation .related-articles .header b, html[data-uwm] body .common-content .question-content .explanation .references .header b { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--uwm-text-3); }
html[data-uwm] body .common-content .question-content .explanation .related-articles .content, html[data-uwm] body .common-content .question-content .explanation .references .content { padding: 6px 0 0 !important; }
html[data-uwm] body .common-content .question-content .explanation .related-articles .content div, html[data-uwm] body .common-content .question-content .explanation .references .content a { color: var(--uwm-accent-text) !important; font-weight: 500 !important; }
html[data-uwm] body .common-content .question-content .explanation .standards .content { border-top: 1px solid var(--uwm-border) !important; margin-top: 8px; gap: 8px 0; }
html[data-uwm] body .common-content .question-content .explanation .standards .content .standard .standard-description { font-size: 14px !important; font-weight: 500; color: var(--uwm-text); }
html[data-uwm] body .common-content .question-content .explanation .standards .content .standard .standard-header { font-size: 11px !important; text-transform: uppercase; letter-spacing: .06em; color: var(--uwm-text-3) !important; font-weight: 600; }
html[data-uwm] body .common-content .question-content .explanation .copyright { color: var(--uwm-text-3) !important; font-size: 11px !important; margin-top: 12px; }
html[data-uwm] body .common-content .question-content .explanation .raised-hand-container button { border-radius: var(--uwm-radius-sm); border-color: var(--uwm-accent) !important; color: var(--uwm-accent-text) !important; }
html[data-uwm][data-uwm-theme="dark"] body .question-content span[style*="background-color"], html[data-uwm][data-uwm-theme="dark"] body .question-content mark { color: var(--uwm-hl-text) !important; border-radius: 3px; }
html[data-uwm][data-uwm-theme="dark"] body .question-content img { opacity: .92; }
/* context menu (highlight / annotation popup) */
html[data-uwm] body .context-menu { background: var(--uwm-surface) !important; border: 1px solid var(--uwm-border) !important; border-radius: 12px !important; box-shadow: var(--uwm-shadow-lg) !important; color: var(--uwm-text) !important; }

/* ===== test interface: UWorld skin ================================ */
html[data-uwm] body .uworld-layout .header-nav, html[data-uwm] body .uworld-layout .footer-nav { background: var(--uwm-surface) !important; }
html[data-uwm] body .uworld-layout .header-nav .uworld-header { border-bottom: 1px solid var(--uwm-border); height: 52px !important; padding: 0 10px; }
html[data-uwm] body .uworld-layout .footer-nav .uworld-footer { border-top: 1px solid var(--uwm-border); height: 52px !important; }
html[data-uwm] body .uworld-layout .header-nav a, html[data-uwm] body .uworld-layout .footer-nav a { color: var(--uwm-text-2) !important; margin: 0 4px !important; padding: 6px 8px; border-radius: var(--uwm-radius-xs); transition: background-color .12s ease, color .12s ease; }
html[data-uwm] body .uworld-layout .header-nav a:hover, html[data-uwm] body .uworld-layout .footer-nav a:hover { background: var(--uwm-surface-3); color: var(--uwm-text) !important; }
html[data-uwm] body .uworld-layout .header-nav span, html[data-uwm] body .uworld-layout .footer-nav span { color: var(--uwm-text-2) !important; font-size: 14px !important; font-weight: 500; }
html[data-uwm] body .uworld-layout .header-nav a:hover span, html[data-uwm] body .uworld-layout .footer-nav a:hover span { color: var(--uwm-text) !important; }
html[data-uwm] body .uworld-layout .header-nav i, html[data-uwm] body .uworld-layout .footer-nav i { color: var(--uwm-text-2) !important; font-size: 19px !important; }
html[data-uwm] body .uworld-layout .header-nav a:hover i, html[data-uwm] body .uworld-layout .footer-nav a:hover i { color: var(--uwm-text) !important; }
html[data-uwm] body .uworld-layout .header-nav i.disabled, html[data-uwm] body .uworld-layout .footer-nav i.disabled { color: var(--uwm-text-3) !important; opacity: .5; }
html[data-uwm] body .uworld-layout .header-nav .flashcard-count { color: var(--uwm-accent-text) !important; font-weight: 700; }
html[data-uwm] body .uworld-layout .header-nav a.step7 { background: var(--uwm-surface-3); border: 1px solid var(--uwm-border); padding: 5px 12px; border-radius: 999px; }
html[data-uwm] body .uworld-layout .header-nav a.step7:hover { border-color: var(--uwm-border-strong); }
html[data-uwm] body .uworld-layout .header-nav a.step7 .question-progress { color: var(--uwm-text) !important; font-weight: 600; font-variant-numeric: tabular-nums; }
html[data-uwm] body .uworld-layout .header-nav a.step7 i { font-size: 13px !important; margin-left: 4px; }
html[data-uwm] body .uworld-layout .header-nav > div > a.d-flex:last-child span { font-family: var(--uwm-mono) !important; font-size: 13px !important; color: var(--uwm-text) !important; background: var(--uwm-surface-3); border: 1px solid var(--uwm-border); border-radius: 999px; padding: 4px 10px; font-weight: 500; }
html[data-uwm] body .uworld-layout .footer-nav .uworld-footer p { font-size: 14px !important; }
html[data-uwm] body .uworld-layout .footer-nav .step13 a[aria-label="Navigate to Next Question"] { background: var(--uwm-accent) !important; color: #fff !important; padding: 7px 14px 7px 16px; border-radius: 999px; box-shadow: var(--uwm-shadow-sm); }
html[data-uwm] body .uworld-layout .footer-nav .step13 a[aria-label="Navigate to Next Question"]:hover { background: var(--uwm-accent-hover) !important; }
html[data-uwm] body .uworld-layout .footer-nav .step13 a[aria-label="Navigate to Next Question"] span, html[data-uwm] body .uworld-layout .footer-nav .step13 a[aria-label="Navigate to Next Question"] i { color: #fff !important; }
html[data-uwm] body .uworld-layout .footer-nav .step13 a[aria-label="Navigate to Next Question"].disabled, html[data-uwm] body .uworld-layout .footer-nav .step13 a[aria-label="Navigate to Next Question"]:has(i.disabled) { background: var(--uwm-surface-3) !important; box-shadow: none; }
html[data-uwm] body .uworld-layout .footer-nav .step13 a[aria-label="Navigate to Next Question"]:has(i.disabled) span, html[data-uwm] body .uworld-layout .footer-nav .step13 a[aria-label="Navigate to Next Question"]:has(i.disabled) i { color: var(--uwm-text-3) !important; }
html[data-uwm] body .uworld-layout .footer-nav a[aria-label="End Test"]:hover span, html[data-uwm] body .uworld-layout .footer-nav a[aria-label="End Test"]:hover i { color: var(--uwm-danger) !important; }
html[data-uwm] body .uworld-footer .timer { background: var(--uwm-surface-3) !important; color: var(--uwm-text) !important; border: 1px solid var(--uwm-border); }
html[data-uwm] body .uworld-footer .timer .time { border-left-color: var(--uwm-border) !important; font-family: var(--uwm-mono) !important; }
html[data-uwm] body .uworld-footer .timer i { color: var(--uwm-text-2) !important; }
/* navigator dialog */
html[data-uwm] body .uworld-navigator { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; }
html[data-uwm] body .uworld-navigator .topbar { background: var(--uwm-surface-2) !important; border-bottom: 1px solid var(--uwm-border); border-radius: var(--uwm-radius) var(--uwm-radius) 0 0 !important; height: 52px !important; }
html[data-uwm] body .uworld-navigator .topbar h2 { font-size: 15px !important; font-weight: 600; margin: 0; }
html[data-uwm] body .uworld-navigator .topbar .header-icon { color: var(--uwm-text-2) !important; }
html[data-uwm] body .uworld-navigator .body { background: var(--uwm-surface) !important; }
html[data-uwm] body .uworld-navigator .body table th { color: var(--uwm-text-3) !important; font-size: 11px !important; text-transform: uppercase; letter-spacing: .06em; border-bottom: 1px solid var(--uwm-border) !important; }
html[data-uwm] body .uworld-navigator .body .customrow { height: 38px !important; line-height: 38px !important; border-radius: 8px; margin: 0 6px !important; }
html[data-uwm] body .uworld-navigator .body .customrow:hover { background: var(--uwm-surface-2) !important; }
html[data-uwm] body .uworld-navigator .body .selected, html[data-uwm] body .uworld-navigator .mat-row .selected { background: var(--uwm-accent-soft) !important; }
html[data-uwm] body .uworld-navigator .body table .status-color, html[data-uwm] body .uworld-navigator .status-color-red { color: var(--uwm-danger) !important; }
html[data-uwm] body .uworld-navigator .body table .fa-check, html[data-uwm] body .uworld-navigator .status-color-green { color: var(--uwm-success) !important; }
html[data-uwm] body .uworld-navigator .body table tr .row-disabled { color: var(--uwm-text-3) !important; }
html[data-uwm] body .uworld-navigator .body table td { color: var(--uwm-text) !important; border-bottom: 0 !important; }
/* settings side panel */
html[data-uwm] body .usersettings-dialog-container .mat-dialog-container { background: var(--uwm-surface) !important; border-radius: 0 !important; border-left: 1px solid var(--uwm-border); }
html[data-uwm] body .user-settings .header { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; border-bottom: 1px solid var(--uwm-border); padding: 18px 10px 14px !important; }
html[data-uwm] body .user-settings .header .title { font-size: 16px !important; }
html[data-uwm] body .user-settings .header .close-settings { color: var(--uwm-text-2) !important; }
html[data-uwm] body .user-settings .section .section-label { color: var(--uwm-text-3) !important; text-transform: uppercase; letter-spacing: .06em; font-size: 11px !important; }
html[data-uwm] body .user-settings .section .section-container { background: var(--uwm-surface-2) !important; border: 1px solid var(--uwm-border); border-radius: 12px !important; }
html[data-uwm] body .user-settings .section .section-container .setting-label, html[data-uwm] body .user-settings .section .section-container .setting .font-buttons, html[data-uwm] body .user-settings .section .section-container .setting .time-setting { color: var(--uwm-text) !important; }
html[data-uwm] body .user-settings .section .section-container .setting-label.disabled, html[data-uwm] body .user-settings .section .section-container .setting .time-setting-disabled { color: var(--uwm-text-3) !important; }
html[data-uwm] body .user-settings .section .section-container .setting .theme-option div[class$="Option"] { border-radius: 12px !important; }
html[data-uwm] body .user-settings .section .section-container .setting .theme-option .margin-theme { color: var(--uwm-text-2); }
html[data-uwm] body .user-settings .mat-slide-toggle .mat-slide-toggle-bar { width: 34px !important; height: 20px !important; }
html[data-uwm] body .user-settings .mat-slide-toggle .mat-slide-toggle-thumb { width: 16px !important; height: 16px !important; background: #fff !important; }
html[data-uwm] body .user-settings .mat-slide-toggle.mat-checked .mat-slide-toggle-thumb-container { transform: translate3d(14px,0,0) !important; }
html[data-uwm] body .user-settings .mat-slide-toggle.mat-checked .mat-slide-toggle-bar { background: var(--uwm-accent) !important; }
html[data-uwm] body .user-settings .colorbutton-light { color: #fff !important; -webkit-text-stroke: 1px var(--uwm-border-strong); }
html[data-uwm] body .user-settings .colorbutton-dark { color: #0b0d12 !important; -webkit-text-stroke: 1px var(--uwm-border-strong); }

/* ===== test interface: NBME skin ================================== */
html[data-uwm] body .nbme-layout .left-navigator { background: var(--uwm-surface) !important; border-right: 1px solid var(--uwm-border) !important; font-family: var(--uwm-font) !important; width: 112px; }
html[data-uwm] body .nbme-layout .nbme-body { width: calc(100% - 112px); margin-left: 112px; }
html[data-uwm] body .nbme-left-navigator .question-status { color: var(--uwm-text-3) !important; font-size: 10.5px !important; letter-spacing: .08em !important; text-transform: uppercase; padding: 12px 0 6px; }
html[data-uwm] body .nbme-left-navigator table { background: transparent !important; }
html[data-uwm] body .nbme-left-navigator table .mat-row:nth-child(2n), html[data-uwm] body .nbme-left-navigator table .mat-row:nth-child(2n+1) { background: transparent !important; }
html[data-uwm] body .nbme-left-navigator table tr { height: 30px !important; }
html[data-uwm] body .nbme-left-navigator table tr td { color: var(--uwm-text-2) !important; padding: 0 0 0 10px !important; font-size: 13px !important; border-bottom: 0 !important; }
html[data-uwm] body .nbme-left-navigator table .mat-row:hover { background: var(--uwm-surface-2) !important; }
html[data-uwm] body .nbme-left-navigator table .mat-row:hover td { color: var(--uwm-text) !important; }
html[data-uwm] body .nbme-left-navigator table tr.row-selected { background: var(--uwm-accent-soft) !important; box-shadow: inset 3px 0 0 var(--uwm-accent); }
html[data-uwm] body .nbme-left-navigator table tr.row-selected td { color: var(--uwm-accent-text) !important; font-weight: 600; }
html[data-uwm] body .nbme-left-navigator table .questionindex { font-family: var(--uwm-font) !important; font-size: 13px !important; font-variant-numeric: tabular-nums; line-height: 30px !important; width: 26px !important; }
html[data-uwm] body .nbme-left-navigator table tr td .questionstatus .omitted-dot { background: var(--uwm-text-3) !important; width: 6px !important; height: 6px !important; margin-top: 12px !important; }
html[data-uwm] body .nbme-left-navigator table tr.row-selected td .omitted-dot, html[data-uwm] body .nbme-left-navigator table .mat-row:hover td .omitted-dot { background: var(--uwm-accent-text) !important; }
html[data-uwm] body .nbme-left-navigator table tr td .questionstatus .correctanswer { color: var(--uwm-success) !important; }
html[data-uwm] body .nbme-left-navigator table tr td .questionstatus .wronganswer { color: var(--uwm-danger) !important; }
html[data-uwm] body .nbme-left-navigator table tr td .sequence-first, html[data-uwm] body .nbme-left-navigator table tr td .sequence-middle, html[data-uwm] body .nbme-left-navigator table tr td .sequence-last, html[data-uwm] body .nbme-left-navigator table tr.row-selected td .sequence-first, html[data-uwm] body .nbme-left-navigator table tr.row-selected td .sequence-middle, html[data-uwm] body .nbme-left-navigator table tr.row-selected td .sequence-last { border-color: var(--uwm-border-strong) !important; }
html[data-uwm] body .nbme-left-navigator table tr td.row-disabled { color: var(--uwm-text-3) !important; }
html[data-uwm] body .nbme-layout .header-nav, html[data-uwm] body .nbme-layout .footer-nav { background: var(--uwm-surface) !important; color: var(--uwm-text) !important; }
html[data-uwm] body .nbme-header { height: 60px !important; border-bottom: 1px solid var(--uwm-border) !important; padding: 0 10px !important; }
html[data-uwm] body .nbme-footer { height: 60px !important; border-top: 1px solid var(--uwm-border) !important; padding: 0 10px !important; }
html[data-uwm] body .nbme-header > div, html[data-uwm] body .nbme-header span { color: var(--uwm-text) !important; }
html[data-uwm] body .nbme-header .question-details { outline: none !important; background: var(--uwm-surface-3); border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius-sm); padding: 6px 12px !important; font-size: 13px !important; font-weight: 600 !important; min-width: 0 !important; line-height: 1.3; }
html[data-uwm] body .nbme-header .question-details .question-id { color: var(--uwm-text-2) !important; font-size: 12px !important; font-weight: 500; margin-top: 2px !important; }
html[data-uwm] body .nbme-header .nav-status { font-size: 13px !important; color: var(--uwm-text-2) !important; font-variant-numeric: tabular-nums; }
html[data-uwm] body .nbme-layout .header-nav .medium-screen-icon, html[data-uwm] body .nbme-layout .footer-nav .medium-screen-icon { border-radius: var(--uwm-radius-sm); padding: 4px 6px !important; margin: 0 2px !important; min-width: 58px !important; color: var(--uwm-text-2) !important; }
html[data-uwm] body .nbme-layout .header-nav .medium-screen-icon:hover, html[data-uwm] body .nbme-layout .footer-nav .medium-screen-icon:hover { background: var(--uwm-surface-3) !important; outline: none !important; color: var(--uwm-text) !important; }
html[data-uwm] body .nbme-header .header-icon-text, html[data-uwm] body .nbme-footer .footer-icon-text { font-family: var(--uwm-font) !important; font-size: 11px !important; font-weight: 500 !important; color: var(--uwm-text-2) !important; margin-top: 2px !important; }
html[data-uwm] body .nbme-layout .medium-screen-icon:hover .header-icon-text, html[data-uwm] body .nbme-layout .medium-screen-icon:hover .footer-icon-text { color: var(--uwm-text) !important; }
html[data-uwm] body .nbme-header .cpButtonIcon, html[data-uwm] body .nbme-footer .cpButtonIcon { background: transparent !important; border: 0 !important; width: 28px !important; height: 28px !important; margin: 2px auto !important; padding: 2px !important; display: flex; align-items: center; justify-content: center; }
html[data-uwm] body .nbme-header .cpButtonIcon i, html[data-uwm] body .nbme-footer .cpButtonIcon i, html[data-uwm] body .nbme-footer .footer-icon { color: var(--uwm-text-2) !important; font-size: 1.35em !important; font-weight: 400 !important; }
html[data-uwm] body .nbme-header .header-icon, html[data-uwm] body .nbme-footer .footer-icon:not(.notebook-footer-icon):not(.fc-footer-icon):not(.articles-library-footer-icon):not(.medical-library-footer-icon) { background-color: var(--uwm-text-2) !important; }
html[data-uwm] body .nbme-footer .notebook-footer-icon, html[data-uwm] body .nbme-footer .fc-footer-icon, html[data-uwm] body .nbme-footer .articles-library-footer-icon, html[data-uwm] body .nbme-footer .medical-library-footer-icon { background: none !important; }
html[data-uwm] body .nbme-header .cpButtonIcon .allign-help-icon { background-color: var(--uwm-text-2) !important; }
html[data-uwm] body .nbme-header .cpButtonIcon .lab-icon-filled { stroke: var(--uwm-text-2) !important; fill: var(--uwm-text-2) !important; }
html[data-uwm] body .nbme-header a svg { background: var(--uwm-surface-3) !important; fill: var(--uwm-text) !important; border-radius: 50%; }
html[data-uwm] body .nbme-header .previous-icon, html[data-uwm] body .nbme-header .next-icon { fill: var(--uwm-text) !important; stroke: none !important; background-color: var(--uwm-surface-3) !important; }
html[data-uwm] body .nbme-header .bookmark-question:hover { background: var(--uwm-surface-3) !important; border-radius: var(--uwm-radius-sm); }
html[data-uwm] body .nbme-footer .block-time, html[data-uwm] body .nbme-footer .subject-display { outline: none !important; background: var(--uwm-surface-3); border: 1px solid var(--uwm-border); border-radius: var(--uwm-radius-sm); padding: 5px 12px !important; font-size: 12px !important; font-weight: 600 !important; color: var(--uwm-text) !important; line-height: 1.35 !important; }
html[data-uwm] body .nbme-footer .block-time #time { font-family: var(--uwm-mono) !important; font-weight: 500; color: var(--uwm-text); }
html[data-uwm] body .nbme-footer .close-button-icon { border: 1px solid var(--uwm-danger) !important; border-radius: 8px !important; width: 28px !important; height: 28px !important; margin: 2px auto !important; opacity: .9; }
html[data-uwm] body .nbme-footer a[aria-label="End Test"] .footer-icon-text { color: var(--uwm-danger) !important; }
html[data-uwm] body .nbme-footer .flashcard-count { color: var(--uwm-accent-text) !important; font-weight: 700; }
html[data-uwm] body .nbme-layout .nbme-content { background: var(--uwm-bg) !important; }
html[data-uwm] body .nbme-layout .header-nav .summarize.disabled, html[data-uwm] body .nbme-layout .header-nav .summarize.disabled i { color: var(--uwm-text-3) !important; }

/* ===== UWorld Modern UI (fab + popover) =========================== */
#uwm-fab { position: fixed; right: 18px; bottom: 56px; z-index: 2147483000; width: 40px; height: 40px; border-radius: 999px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px solid var(--uwm-border, #e4e7ee); background: var(--uwm-surface, #fff); color: var(--uwm-text-2, #4b5567); box-shadow: var(--uwm-shadow-md, 0 6px 16px -6px rgba(15,23,42,.2)); opacity: .55; transition: opacity .15s ease, transform .15s ease, background-color .15s ease; font-family: "Inter", system-ui, sans-serif; }
#uwm-fab:hover, #uwm-fab.open { opacity: 1; transform: translateY(-1px); color: var(--uwm-text, #0f172a); }
#uwm-fab svg { width: 18px; height: 18px; }
body.usmle-test-interface-angular-material-theme #uwm-fab { bottom: 72px; }
#uwm-pop { position: fixed; right: 18px; bottom: 106px; z-index: 2147483001; width: 300px; background: var(--uwm-surface, #fff); color: var(--uwm-text, #0f172a); border: 1px solid var(--uwm-border, #e4e7ee); border-radius: 16px; box-shadow: var(--uwm-shadow-lg, 0 24px 48px -16px rgba(15,23,42,.3)); padding: 14px 14px 10px; font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; font-size: 13px; transform-origin: bottom right; animation: uwm-pop-in .16s cubic-bezier(.2,.8,.2,1); }
body.usmle-test-interface-angular-material-theme #uwm-pop { bottom: 122px; }
@keyframes uwm-pop-in { from { opacity: 0; transform: translateY(6px) scale(.97); } to { opacity: 1; transform: none; } }
#uwm-pop[hidden] { display: none; }
#uwm-pop .uwm-h { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
#uwm-pop .uwm-h b { font-size: 13.5px; font-weight: 650; letter-spacing: -0.01em; }
#uwm-pop .uwm-kbd { font-family: "JetBrains Mono", ui-monospace, Consolas, monospace; font-size: 10.5px; color: var(--uwm-text-3, #8a93a6); border: 1px solid var(--uwm-border, #e4e7ee); border-radius: 6px; padding: 1px 6px; }
#uwm-pop .uwm-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 7px 0; }
#uwm-pop .uwm-row + .uwm-row { border-top: 1px solid var(--uwm-border, #e4e7ee); }
#uwm-pop label { color: var(--uwm-text-2, #4b5567); font-weight: 500; font-size: 12.5px; margin: 0; }
#uwm-pop .uwm-seg { display: inline-flex; background: var(--uwm-surface-3, #eceef3); border: 1px solid var(--uwm-border, #e4e7ee); border-radius: 9px; padding: 2px; gap: 2px; }
#uwm-pop .uwm-seg button { appearance: none; border: 0; background: transparent; color: var(--uwm-text-2, #4b5567); font: inherit; font-size: 12px; font-weight: 500; padding: 4px 9px; border-radius: 7px; cursor: pointer; line-height: 1.3; transition: background-color .12s ease, color .12s ease; }
#uwm-pop .uwm-seg button:hover { color: var(--uwm-text, #0f172a); }
#uwm-pop .uwm-seg button.on { background: var(--uwm-surface, #fff); color: var(--uwm-text, #0f172a); box-shadow: 0 1px 2px rgba(0,0,0,.12); }
#uwm-pop .uwm-sw { display: inline-flex; gap: 6px; }
#uwm-pop .uwm-sw button { width: 20px; height: 20px; border-radius: 999px; border: 2px solid transparent; cursor: pointer; padding: 0; box-shadow: inset 0 0 0 1px rgba(0,0,0,.08); transition: transform .12s ease; }
#uwm-pop .uwm-sw button:hover { transform: scale(1.12); }
#uwm-pop .uwm-sw button.on { border-color: var(--uwm-text, #0f172a); }
#uwm-pop .uwm-switch { position: relative; width: 36px; height: 20px; border-radius: 999px; background: var(--uwm-border-strong, #cfd4de); border: 0; cursor: pointer; padding: 0; transition: background-color .15s ease; }
#uwm-pop .uwm-switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 999px; background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,.25); transition: transform .15s ease; }
#uwm-pop .uwm-switch.on { background: var(--uwm-accent, #2563eb); }
#uwm-pop .uwm-switch.on::after { transform: translateX(16px); }
#uwm-pop .uwm-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--uwm-border, #e4e7ee); color: var(--uwm-text-3, #8a93a6); font-size: 11px; }
#uwm-pop .uwm-foot a { color: var(--uwm-text-2, #4b5567); cursor: pointer; text-decoration: none; font-weight: 500; }
#uwm-pop .uwm-foot a:hover { color: var(--uwm-accent-text, #1d4ed8); }
`;

  const style = document.createElement('style');
  style.id = 'uwm-style';
  style.textContent = CSS;
  (document.head || root).appendChild(style);
  // Keep our sheet last in <head> so it wins ties against styles Angular injects later.
  const keepLast = () => { const h = document.head; if (h && h.lastElementChild !== style) h.appendChild(style); };
  new MutationObserver(keepLast).observe(root, { childList: true, subtree: true });

  apply();

  /* ------------------------------------------------------------------ */
  /*  In-page UI                                                         */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  };

  function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function seg(key, options) {
    const s = el('div', 'uwm-seg'); s.dataset.k = key;
    for (const [v, label] of options) { const b = el('button', '', label); b.type = 'button'; b.dataset.v = v; b.addEventListener('click', () => set({ [key]: v })); s.appendChild(b); }
    return s;
  }
  function row(labelText, control) { const r = el('div', 'uwm-row'); const l = el('label', '', labelText); r.append(l, control); return r; }

  function buildUI() {
    if (fab || !document.body) return;
    fab = el('div', 'uwm-fab'); fab.id = 'uwm-fab'; fab.title = 'Appearance (Alt+T)';
    fab.addEventListener('click', (e) => { e.stopPropagation(); togglePop(); });
    pop = el('div'); pop.id = 'uwm-pop'; pop.hidden = true;
    pop.addEventListener('click', (e) => e.stopPropagation());
    const h = el('div', 'uwm-h'); h.append(el('b', '', 'Appearance'), el('span', 'uwm-kbd', 'Alt+T'));
    pop.appendChild(h);
    const sw = el('button', 'uwm-switch'); sw.type = 'button'; sw.dataset.k = 'enabled'; sw.title = 'Turn UWorld Modern on/off';
    sw.addEventListener('click', () => set({ enabled: !settings.enabled }));
    pop.appendChild(row('UWorld Modern', sw));
    pop.appendChild(row('Theme', seg('theme', [['auto', 'Auto'], ['light', 'Light'], ['dark', 'Dark']])));
    const swatches = el('div', 'uwm-sw'); swatches.dataset.k = 'accent';
    for (const [name, a] of Object.entries(ACCENTS)) { const b = el('button'); b.type = 'button'; b.dataset.v = name; b.title = name; b.style.background = a.l; b.addEventListener('click', () => set({ accent: name })); swatches.appendChild(b); }
    pop.appendChild(row('Accent', swatches));
    pop.appendChild(row('Font', seg('font', [['inter', 'Inter'], ['system', 'System'], ['opensans', 'Open Sans']])));
    pop.appendChild(row('Density', seg('density', [['comfortable', 'Comfortable'], ['compact', 'Compact']])));
    const foot = el('div', 'uwm-foot'); const reset = el('a', '', 'Reset'); reset.addEventListener('click', () => set({ ...DEFAULTS }));
    foot.append(el('span', '', 'UWorld Modern v' + VERSION), reset);
    pop.appendChild(foot);
    document.body.append(fab, pop);
    document.addEventListener('click', () => { if (!pop.hidden) togglePop(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !pop.hidden) togglePop(false); });
    syncUI();
  }
  function togglePop(force) { const show = force == null ? pop.hidden : force; pop.hidden = !show; fab.classList.toggle('open', show); }
  function syncUI() {
    if (!pop) return;
    fab.innerHTML = resolvedTheme() === 'dark' ? ICONS.moon : ICONS.sun;
    pop.querySelectorAll('.uwm-seg').forEach((s) => s.querySelectorAll('button').forEach((b) => b.classList.toggle('on', settings[s.dataset.k] === b.dataset.v)));
    pop.querySelectorAll('.uwm-sw button').forEach((b) => { b.classList.toggle('on', settings.accent === b.dataset.v); b.style.background = resolvedTheme() === 'dark' ? ACCENTS[b.dataset.v].d : ACCENTS[b.dataset.v].l; });
    pop.querySelector('.uwm-switch').classList.toggle('on', !!settings.enabled);
  }

  // Alt+T: toggle light/dark (pins an explicit theme). Alt+Shift+T: back to Auto.
  document.addEventListener('keydown', (e) => {
    if (!e.altKey || e.ctrlKey || e.metaKey || !(e.code === 'KeyT' || String(e.key).toLowerCase() === 't')) return;
    e.preventDefault();
    if (e.shiftKey) set({ theme: 'auto' }); else set({ theme: resolvedTheme() === 'dark' ? 'light' : 'dark' });
  });

  const boot = () => { buildUI(); new MutationObserver(() => { if (fab && !document.body.contains(fab)) document.body.append(fab, pop); }).observe(document.body, { childList: true }); };
  if (document.body) boot(); else document.addEventListener('DOMContentLoaded', boot, { once: true });
})();

// ==UserScript==
// @name         Claude Terminal Theme (AMOLED)
// @namespace    nav.custom
// @version      2.3
// @description  Complete restyle of claude.ai: true-black AMOLED, background image, green-on-black monospace terminal look, square corners, no Claude branding, sidebar hidden (Ctrl+B toggles), minimalist Lucide icons.
// @match        https://claude.ai/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // ======== USER SETTINGS ========
  const BG_URL = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=70'; // background image (any URL, or '' for none)
  const BG_OPACITY = 0.35; // 0 (invisible) .. 1 (full strength)
  const HOTKEY = 'b'; // Ctrl+<this key> toggles the sidebar
  const HUE = 130; // 130 = green. Try 180 (cyan), 35 (amber), 0 (red)
  const LOGO_URL = ''; // optional: image URL to replace the greeting starburst. '' = leave it.
  const SHOW_LOCKUP = true; // UTMB / "Powered By Qualified Health" lockup in the sidebar top-left
  const APP_NAME = 'Qualified Chat'; // replaces "Claude" in the window/tab title
  // ===============================

  // ---------- Tab/window icon + title: terminal >_ instead of Claude ----------
  const FAV_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="1.5" y="1.5" width="61" height="61" rx="12" fill="#000000" stroke="#22cc55" stroke-width="3"/><path d="M16 20 L30 32 L16 44" fill="none" stroke="#33ee66" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><rect x="34" y="42" width="16" height="7" rx="2" fill="#33ee66"/></svg>`;
  const FAV_URI = 'data:image/svg+xml;utf8,' + encodeURIComponent(FAV_SVG);
  const setBrand = () => {
    // favicon: remove the site's icons, keep ours pinned
    document.querySelectorAll('link[rel*="icon"]:not([data-term-fav])').forEach(l => l.remove());
    if (!document.querySelector('link[data-term-fav]')) {
      const l = document.createElement('link');
      l.rel = 'icon';
      l.href = FAV_URI;
      l.dataset.termFav = '1';
      document.head.appendChild(l);
    }
    // title: strip/replace "Claude"
    const t = document.title;
    if (/Claude/.test(t)) {
      const stripped = t.replace(/\s*[-–·|]?\s*Claude\s*$/, '').replace(/^Claude$/, '').trim();
      document.title = stripped || APP_NAME;
    }
  };
  setBrand();
  setInterval(setBrand, 1500);

  // ---------- Logo lockup assets (embedded SVGs, no hosting needed) ----------
  const UTMB_SVG = `<svg viewBox="0 0 127.9 34.66846846846847" version="1.1" xmlns="http://www.w3.org/2000/svg" width="127.9" height="34.66846846846847"><defs><style>.st0{fill:#003767}.st1{fill:#ca4b0c}</style></defs><path d="M116.9,16.6c2-.7,3.7-2.8,3.7-5.4,0-3.8-2.9-6.7-7.8-6.7h-10.8v25h11.6c4.7,0,7.8-3,7.8-7.1s-2.2-5.3-4.4-5.9ZM107.4,9.2h4.4c2.2,0,3.3,1.1,3.3,2.7s-1.3,2.7-3.2,2.7h-4.5v-5.4ZM112.3,25h-4.9v-5.9h4.9c2.2,0,3.5,1.2,3.5,2.9s-1.3,2.9-3.5,2.9Z" class="st0"/><path d="M3.2,9.8l-2.7,2.7v.7h0v1.2c0,3.2.3,7.2,2.2,10.9v-4.5c0-5.2,4.3-9.5,9.5-9.5s9.5,4.3,9.5,9.5v4.5c2-3.7,2.2-7.7,2.2-10.9v-.2h0v-1.7l-2.7-2.7H3.2Z" class="st1"/><path d="M8.9,19.2c.4-.7.9-1.3,1.7-1.7l-.6-1.9c-1.3.6-2.4,1.6-3,3l1.9.6Z" class="st1"/><path d="M11.7,17.2c.2,0,.4,0,.5,0s.4,0,.5,0l.6-1.9c-.4,0-.8-.1-1.1-.1s-.8,0-1.1.1l.6,1.9Z" class="st1"/><path d="M16,20.9c0,.2,0,.4,0,.5l1.9.6c0-.4.1-.8.1-1.1s0-.8-.1-1.1l-1.9.6c0,.2,0,.4,0,.5Z" class="st1"/><path d="M10.6,24.2c-.7-.4-1.3-.9-1.7-1.7l-1.9.6c.6,1.3,1.6,2.4,3,3l.6-1.9Z" class="st1"/><path d="M13.9,17.6c.7.4,1.3.9,1.7,1.7l1.9-.6c-.6-1.3-1.6-2.4-3-3l-.6,1.9Z" class="st1"/><path d="M8.5,20.9c0-.2,0-.4,0-.5l-1.9-.6c0,.4-.1.8-.1,1.1s0,.8.1,1.1l1.9-.6c0-.2,0-.4,0-.5Z" class="st1"/><path d="M12.8,24.6c-.2,0-.4,0-.5,0s-.4,0-.5,0l-.6,1.9c.4,0,.8.1,1.1.1s.8,0,1.1-.1l-.6-1.9Z" class="st1"/><path d="M12.3,12.4c-4.6,0-8.3,3.7-8.3,8.3v6.4c.5.7,1.1,1.4,1.8,2.1h0s0,0,0,0c1.5,1.5,3.6,2.8,6.5,4.5h0s0,0,0,0,0,0,0,0h0c2.9-1.6,4.9-3,6.5-4.5,0,0,0,0,0,0h0c.7-.7,1.3-1.4,1.8-2.1v-6.4c0-4.6-3.7-8.3-8.3-8.3ZM12.3,27.8c-3.8,0-6.9-3.1-6.9-6.9s3.1-6.9,6.9-6.9,6.9,3.1,6.9,6.9-3.1,6.9-6.9,6.9Z" class="st1"/><path d="M15.6,22.6c-.4.7-.9,1.3-1.7,1.7l.6,1.9c1.3-.6,2.4-1.6,3-3l-1.9-.6Z" class="st1"/><path d="M16.1,4.6l-3.8-3.8-3.8,3.8-4.1,4.1h15.7l-4.1-4.1ZM12.3,6.6l-1.8,1.3.7-2.1-1.8-1.3h2.2l.7-2.1.7,2.1h2.2l-1.8,1.3.7,2.1-1.8-1.3Z" class="st1"/><polygon points=".5 4.6 .5 10.9 6.8 4.6 .5 4.6" class="st1"/><polygon points="17.7 4.6 24 10.9 24 4.6 17.7 4.6" class="st1"/><circle r="2.6" cy="20.9" cx="12.3" class="st1"/><polygon points="93.1 4.6 86.6 21.5 79.7 4.6 77.7 4.6 72.4 9.8 72.4 29.6 77.7 29.6 77.7 13.2 84.3 29.6 88.8 29.6 95.3 13 95.3 29.6 100.8 29.6 100.8 4.6 93.1 4.6" class="st0"/><path d="M76,4.6h-30.1v15.5c0,3-1.7,4.5-4.3,4.5s-4.3-1.5-4.3-4.5V4.6h-5.6v16c0,6.3,4.4,9.6,9.9,9.6s9.9-3.3,9.9-9.6v-10.7h7.7v19.7h5.6V9.8h6l5.3-5.3Z" class="st1"/><polygon points="121.8 27.2 122.7 27.2 122.7 29.5 123.1 29.5 123.1 27.2 124 27.2 124 26.8 121.8 26.8 121.8 27.2" class="st0"/><polygon points="126.5 26.8 125.7 29 124.9 26.9 124.9 26.8 124.4 26.8 124.4 29.5 124.8 29.5 124.8 27.5 125.5 29.5 125.5 29.5 125.9 29.5 126.6 27.5 126.6 29.5 127 29.5 127 26.8 126.5 26.8" class="st0"/></svg>`;
  const QH_SVG = `<svg width="169" height="24" viewBox="0 0 169 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_409_15669)">
<path d="M41.2484 19.8781L39.1415 17.5893C39.0538 17.6025 38.9596 17.6079 38.8599 17.6079C38.7591 17.6211 38.6659 17.6266 38.5783 17.6266C37.2361 17.6266 36.0775 17.3784 35.099 16.8832C34.1338 16.3748 33.3876 15.6182 32.8612 14.6146C32.3468 13.611 32.0898 12.3576 32.0898 10.8587C32.0898 9.35987 32.3528 8.05604 32.8793 7.06448C33.4057 6.06086 34.1639 5.31637 35.1549 4.83428C36.1448 4.33905 37.3249 4.09089 38.6906 4.09089C40.0563 4.09089 41.2676 4.33905 42.246 4.83428C43.2359 5.31746 43.9952 6.06086 44.5216 7.06448C45.0481 8.05604 45.3111 9.32152 45.3111 10.8587C45.3111 12.3959 45.0229 13.7501 44.4455 14.7669C43.8692 15.7837 43.0535 16.5336 42.0005 17.0168L44.8969 19.8765H41.2484L41.2473 19.8776L41.2484 19.8781ZM38.6911 15.3021C39.3053 15.3021 39.8449 15.2134 40.3083 15.0353C40.7718 14.8573 41.1607 14.5905 41.4735 14.235C41.7864 13.8794 42.0247 13.4466 42.1885 12.9377C42.3506 12.4162 42.4333 11.8251 42.4333 11.1644V10.5739C42.4333 9.89948 42.3523 9.3018 42.1885 8.78191C42.0258 8.26038 41.788 7.82869 41.4735 7.48466C41.1607 7.12912 40.7718 6.86233 40.3083 6.68429C39.8449 6.50624 39.3053 6.4175 38.6911 6.4175C38.077 6.4175 37.556 6.50624 37.092 6.68429C36.6286 6.86233 36.2396 7.12912 35.9268 7.48466C35.614 7.82869 35.3757 8.25983 35.2119 8.78191C35.0612 9.30344 34.9867 9.90112 34.9867 10.5739V11.1644C34.9867 11.8256 35.0612 12.4162 35.2119 12.9377C35.3741 13.4461 35.6124 13.8789 35.9268 14.235C36.2396 14.5905 36.6286 14.8573 37.092 15.0353C37.5555 15.2134 38.0885 15.3021 38.6911 15.3021ZM50.5592 17.6276C49.5562 17.6276 48.7602 17.3477 48.1707 16.7884C47.5812 16.2296 47.2871 15.3268 47.2871 14.0799V7.36797H49.9024V13.6406C49.9024 13.9709 49.9402 14.2514 50.0147 14.4793C50.0892 14.6957 50.1966 14.8737 50.3341 15.0129C50.4847 15.152 50.6666 15.2545 50.8803 15.318C51.0939 15.3816 51.3322 15.4133 51.5952 15.4133C51.9841 15.4133 52.3353 15.318 52.6481 15.1279C52.9609 14.9367 53.2058 14.6765 53.3816 14.3462C53.5569 14.0021 53.6446 13.6214 53.6446 13.2018V7.36742H56.2583V17.397H54.1146L53.9262 16.0242H53.7941C53.5558 16.3414 53.2743 16.6213 52.9483 16.8634C52.6338 17.105 52.2778 17.2896 51.8757 17.4167C51.4735 17.5559 51.0347 17.6266 50.5598 17.6266L50.5592 17.6276ZM61.2725 17.6276C60.946 17.6276 60.5954 17.5893 60.2196 17.5137C59.8553 17.4381 59.5112 17.3039 59.1847 17.1127C58.8588 16.9094 58.5893 16.6229 58.3756 16.2553C58.1751 15.8746 58.0743 15.3909 58.0743 14.8058C58.0743 14.1062 58.2249 13.5288 58.5263 13.0708C58.8276 12.6129 59.2532 12.2568 59.8054 12.0037C60.3702 11.7369 61.0402 11.5523 61.8181 11.4504C62.5961 11.3485 63.455 11.2975 64.3957 11.2975V10.5541C64.3957 10.2621 64.3458 10.0074 64.245 9.79101C64.1574 9.57462 63.9947 9.40315 63.7563 9.27605C63.5312 9.14841 63.2102 9.08486 62.7966 9.08486C62.383 9.08486 62.0433 9.13526 61.7803 9.2377C61.53 9.34014 61.3481 9.47272 61.2342 9.63871C61.135 9.79156 61.0835 9.96247 61.0835 10.1537V10.3821H58.5443C58.5317 10.3186 58.5263 10.261 58.5263 10.2106V9.9822C58.5263 9.39822 58.7016 8.89477 59.0527 8.47568C59.4039 8.0429 59.8986 7.71256 60.539 7.48412C61.1777 7.25567 61.9244 7.14008 62.7768 7.14008C63.6922 7.14008 64.457 7.2606 65.0711 7.50274C65.6984 7.74433 66.175 8.09987 66.501 8.5699C66.8401 9.03994 67.0093 9.63213 67.0093 10.3438V14.9011C67.0093 15.1296 67.0718 15.3021 67.1978 15.4161C67.3353 15.5185 67.4859 15.5689 67.6497 15.5689H68.2704V17.3039C68.1444 17.3674 67.9505 17.4315 67.6875 17.4951C67.424 17.5707 67.1047 17.609 66.7278 17.609C66.3508 17.609 66.0375 17.552 65.7493 17.4376C65.4732 17.3351 65.2415 17.1894 65.0541 16.9993C64.8657 16.796 64.7348 16.5545 64.6586 16.2745H64.5266C64.3129 16.5413 64.05 16.7763 63.7366 16.9796C63.4353 17.1828 63.0781 17.3422 62.6645 17.4562C62.2635 17.5701 61.7984 17.6276 61.2725 17.6276ZM62.1561 15.6259C62.5073 15.6259 62.8201 15.5755 63.0962 15.4731C63.3729 15.3591 63.6046 15.2128 63.792 15.0348C63.9804 14.8436 64.1245 14.6152 64.2236 14.3484C64.3365 14.0816 64.3929 13.7951 64.3929 13.4905V12.9372C63.6912 12.9372 63.0639 12.9876 62.5122 13.09C61.9611 13.1788 61.5212 13.3382 61.1964 13.5666C60.8819 13.7951 60.7263 14.1133 60.7263 14.5198C60.7263 14.7483 60.7827 14.946 60.8951 15.1104C61.0079 15.2747 61.1712 15.4024 61.3837 15.4911C61.5968 15.5799 61.8538 15.6253 62.1551 15.6253H62.1561V15.6259ZM69.5677 17.3992V3.61373H72.1819V17.3992H69.5677ZM74.5819 5.90144V3.61263H77.1956V5.90144H74.5819ZM74.5819 17.3992V7.36962H77.1956V17.3992H74.5819ZM80.0481 17.3992V9.41027H78.6375V7.36962H80.0481V6.26356C80.0481 5.71683 80.1358 5.2331 80.3111 4.81401C80.4995 4.38123 80.7943 4.04542 81.1947 3.80382C81.5968 3.56223 82.1288 3.44116 82.7938 3.44116C82.9823 3.44116 83.1762 3.45431 83.3767 3.47951C83.5898 3.50471 83.7903 3.54306 83.9788 3.59346C84.1793 3.63181 84.3496 3.67563 84.4872 3.72767V5.48126H83.5471C83.2458 5.48126 83.0206 5.55686 82.87 5.7097C82.7325 5.86255 82.6629 6.08387 82.6629 6.37751V7.36907H84.4872V9.40972H82.6629V17.3987H80.0481V17.3992ZM85.7088 5.90144V3.61263H88.3044V5.90144H85.7088ZM85.7088 17.3992V7.36962H88.3044V17.3992H85.7088ZM95.2043 17.6276C94.113 17.6276 93.1976 17.443 92.458 17.0743C91.7179 16.6936 91.1602 16.1146 90.7844 15.3394C90.4086 14.5642 90.2202 13.5792 90.2202 12.3844C90.2202 11.1896 90.4086 10.1915 90.7844 9.42944C91.1602 8.65427 91.713 8.08179 92.4394 7.71311C93.1795 7.33182 94.0829 7.14117 95.1479 7.14117C96.1509 7.14117 96.9978 7.32579 97.687 7.69448C98.3767 8.05001 98.8966 8.60935 99.2478 9.37247C99.5989 10.1224 99.7742 11.0943 99.7742 12.2907V12.9772H92.8716C92.8968 13.5611 92.9845 14.058 93.1351 14.464C93.2989 14.8699 93.5422 15.1756 93.8681 15.3788C94.2072 15.57 94.6526 15.6642 95.2043 15.6642C95.505 15.6642 95.7751 15.6259 96.0134 15.5503C96.2649 15.4747 96.4769 15.3591 96.6522 15.2063C96.828 15.0534 96.9666 14.8622 97.0663 14.6343C97.1671 14.4059 97.217 14.1446 97.217 13.8526H99.7742C99.7742 14.4886 99.6614 15.0408 99.4351 15.5119C99.21 15.982 98.8966 16.3764 98.4951 16.6936C98.094 16.9987 97.6109 17.2338 97.0466 17.3987C96.495 17.5515 95.8808 17.6271 95.2026 17.6271L95.2043 17.6298V17.6276ZM92.91 11.2981H97.0855C97.0855 10.9168 97.0362 10.5864 96.9354 10.3065C96.8472 10.0266 96.7217 9.79812 96.5596 9.62008C96.3969 9.44204 96.1953 9.31494 95.957 9.2388C95.7318 9.15005 95.4749 9.10458 95.1856 9.10458C94.709 9.10458 94.3086 9.18676 93.9821 9.35275C93.6693 9.50559 93.4244 9.74718 93.2491 10.0775C93.0864 10.3947 92.9741 10.8028 92.91 11.2981ZM105.192 17.6276C104.376 17.6276 103.669 17.443 103.066 17.0743C102.477 16.6936 102.019 16.1146 101.694 15.3394C101.368 14.5642 101.206 13.5726 101.206 12.3641C101.206 11.1556 101.368 10.1712 101.694 9.40917C102.033 8.634 102.49 8.06152 103.066 7.69284C103.656 7.3236 104.333 7.13953 105.097 7.13953C105.523 7.13953 105.918 7.18993 106.282 7.29237C106.658 7.38112 106.984 7.52739 107.261 7.73064C107.548 7.93388 107.793 8.18204 107.994 8.47403H108.107V3.61099H110.72V17.3965H108.577L108.37 16.0422H108.238C107.912 16.5758 107.484 16.9768 106.958 17.2436C106.431 17.4973 105.842 17.6244 105.19 17.6244L105.192 17.6282V17.6276ZM106.019 15.4544C106.508 15.4544 106.903 15.3405 107.204 15.1104C107.517 14.8819 107.751 14.5516 107.9 14.1188C108.05 13.686 108.125 13.1722 108.125 12.5751V12.231C108.125 11.7862 108.08 11.3786 107.993 11.011C107.918 10.6418 107.792 10.3366 107.617 10.0961C107.441 9.8414 107.221 9.65131 106.958 9.52367C106.695 9.38452 106.38 9.31385 106.018 9.31385C105.491 9.31385 105.071 9.42123 104.758 9.63762C104.444 9.84086 104.219 10.1591 104.081 10.5908C103.942 11.0105 103.874 11.5375 103.874 12.173V12.6112C103.874 13.2472 103.942 13.7742 104.081 14.1939C104.219 14.6135 104.445 14.9307 104.758 15.1471C105.071 15.3503 105.491 15.4522 106.018 15.4522L106.019 15.4533V15.4544ZM117.409 17.3992V4.31878H118.896V10.0578H126.38V4.31878H127.867V17.3992H126.38V11.3737H118.896V17.3992H117.409ZM134.7 17.6276C133.76 17.6276 132.964 17.443 132.311 17.0743C131.659 16.6936 131.164 16.1146 130.825 15.3394C130.486 14.5642 130.317 13.5792 130.317 12.3844C130.317 11.1896 130.486 10.1915 130.825 9.42944C131.164 8.65427 131.664 8.08179 132.33 7.71311C132.994 7.33182 133.821 7.14117 134.813 7.14117C135.728 7.14117 136.493 7.32579 137.107 7.69448C137.734 8.06371 138.204 8.59729 138.517 9.29577C138.843 9.99534 139.006 10.8527 139.006 11.87V12.7476H131.727C131.727 13.6252 131.847 14.3434 132.085 14.9022C132.323 15.461 132.661 15.8686 133.101 16.1222C133.553 16.3638 134.104 16.4849 134.756 16.4849C135.233 16.4849 135.646 16.4213 135.998 16.2937C136.362 16.1661 136.656 15.9951 136.881 15.7787C137.12 15.5503 137.302 15.2835 137.427 14.9784C137.553 14.6732 137.616 14.356 137.616 14.0251H138.932C138.932 14.5204 138.838 14.9915 138.651 15.4363C138.475 15.8691 138.212 16.2504 137.861 16.5808C137.522 16.9111 137.09 17.1713 136.563 17.3625C136.037 17.5405 135.416 17.6293 134.701 17.6293H134.7V17.6276ZM131.728 11.6591H137.597C137.597 11.0231 137.522 10.4961 137.371 10.0764C137.232 9.64364 137.038 9.30125 136.789 9.04597C136.537 8.77918 136.236 8.58798 135.886 8.47403C135.547 8.36009 135.165 8.30256 134.739 8.30256C134.125 8.30256 133.599 8.42309 133.16 8.66468C132.721 8.89312 132.382 9.25524 132.144 9.75211C131.918 10.2473 131.78 10.8834 131.73 11.6585L131.728 11.6591ZM143.521 17.6276C143.132 17.6276 142.749 17.5773 142.374 17.4748C141.998 17.3861 141.658 17.2398 141.357 17.0365C141.069 16.8202 140.838 16.5347 140.662 16.1786C140.486 15.8231 140.399 15.3848 140.399 14.8633C140.399 14.1769 140.563 13.6181 140.887 13.1853C141.227 12.7405 141.697 12.3965 142.298 12.1549C142.9 11.9001 143.608 11.7287 144.423 11.6399C145.25 11.5512 146.148 11.5057 147.112 11.5057V10.2287C147.112 9.82223 147.038 9.47875 146.887 9.19826C146.75 8.90627 146.498 8.6833 146.135 8.53046C145.783 8.36611 145.282 8.28229 144.63 8.28229C143.977 8.28229 143.508 8.36447 143.143 8.53046C142.78 8.69481 142.523 8.9112 142.372 9.17799C142.235 9.43163 142.166 9.71814 142.166 10.0359V10.341H140.868C140.855 10.2775 140.849 10.2134 140.849 10.1498V9.92139C140.849 9.28536 141.013 8.76493 141.338 8.35735C141.664 7.95141 142.127 7.64572 142.73 7.44248C143.332 7.23924 144.021 7.13734 144.799 7.13734C145.577 7.13734 146.253 7.25786 146.792 7.5C147.332 7.72844 147.745 8.05878 148.033 8.49156C148.321 8.92434 148.466 9.44478 148.466 10.0556V15.8143C148.466 16.0559 148.508 16.2274 148.598 16.3293C148.697 16.4181 148.829 16.4635 148.993 16.4635H149.782V17.3411C149.594 17.4167 149.394 17.4803 149.18 17.5323C148.98 17.5827 148.766 17.6079 148.541 17.6079C148.215 17.6079 147.952 17.5378 147.752 17.3981C147.563 17.259 147.426 17.0612 147.338 16.8076C147.263 16.5528 147.212 16.274 147.187 15.9688H147.055C146.817 16.3129 146.509 16.6114 146.133 16.8651C145.769 17.1067 145.368 17.2913 144.93 17.4184C144.491 17.5575 144.021 17.6282 143.519 17.6282L143.521 17.6276ZM143.802 16.4646C144.216 16.4646 144.616 16.3945 145.005 16.2548C145.394 16.1157 145.746 15.9245 146.058 15.6823C146.371 15.4276 146.623 15.129 146.812 14.7861C147.012 14.442 147.112 14.0613 147.112 13.6417V12.6118C145.947 12.6118 144.969 12.6753 144.178 12.803C143.4 12.9306 142.811 13.1519 142.41 13.4708C142.021 13.7879 141.828 14.2339 141.828 14.8047C141.828 15.1854 141.909 15.5043 142.072 15.7579C142.248 15.9995 142.486 16.1776 142.787 16.2915C143.089 16.4055 143.426 16.463 143.804 16.463L143.802 16.4646ZM151.195 17.3992V3.61373H152.55V17.3992H151.195ZM157.382 17.609C156.93 17.609 156.567 17.5268 156.291 17.3609C156.028 17.196 155.839 16.9664 155.726 16.6744C155.627 16.3824 155.576 16.0587 155.576 15.7015V8.53265H154.24V7.36962H155.576L155.839 4.58557H156.93V7.36962H158.83V8.53265H156.93V15.4544C156.93 15.7985 156.974 16.0516 157.062 16.2175C157.163 16.3819 157.375 16.4657 157.701 16.4657H158.83V17.3433C158.704 17.3937 158.555 17.4386 158.378 17.4775C158.216 17.5279 158.045 17.5597 157.87 17.5729C157.695 17.5981 157.531 17.6112 157.382 17.6112V17.6085V17.609ZM160.637 17.3992V3.61373H161.991V8.66632H162.123C162.398 8.29708 162.7 8.0051 163.026 7.78871C163.352 7.56026 163.709 7.39427 164.098 7.29347C164.487 7.19157 164.907 7.14062 165.358 7.14062C165.985 7.14062 166.53 7.248 166.995 7.46439C167.471 7.66763 167.84 8.00455 168.104 8.47459C168.367 8.94462 168.499 9.58721 168.499 10.4007V17.3981H167.145V10.5333C167.145 10.0885 167.089 9.72636 166.977 9.44588C166.864 9.16594 166.706 8.95064 166.507 8.7978C166.306 8.63345 166.068 8.51786 165.791 8.45376C165.528 8.39021 165.233 8.35844 164.907 8.35844C164.406 8.35844 163.929 8.47239 163.478 8.70248C163.039 8.93092 162.681 9.28152 162.405 9.75101C162.129 10.209 161.991 10.7815 161.991 11.4674V17.3976H160.637V17.3992Z" fill="#0A3D63"/>
<path d="M21.6433 10.6043C21.6433 12.3847 21.2056 14.0621 20.4326 15.5358C20.3466 15.6996 20.1428 15.7604 19.9807 15.6711L17.1172 14.0934C17.7078 13.0667 18.0458 11.8747 18.0458 10.6043C18.0458 6.74099 14.9232 3.60852 11.0708 3.60852C7.21854 3.60852 4.09703 6.74099 4.09703 10.6043C4.09703 14.3443 7.02186 17.3978 10.7022 17.5901C10.8775 17.5994 11.0155 17.7435 11.0155 17.9188V20.8705C11.0155 21.0579 10.8594 21.208 10.6726 21.2008C5.01901 20.9905 0.5 16.3268 0.5 10.6043C0.5 4.748 5.23321 0 11.0714 0C16.9096 0 21.6433 4.748 21.6433 10.6043ZM20.7252 20.0679C18.5733 18.9038 17.1172 16.6643 17.1172 14.0934L13.845 14.0939C13.6588 14.0939 13.5087 14.2484 13.5147 14.4347C13.6423 18.2886 15.9295 21.6095 19.2329 23.2842C19.4011 23.3697 19.6065 23.2968 19.6838 23.1254L20.8698 20.4941C20.941 20.3358 20.8775 20.1507 20.7246 20.0685L20.7252 20.0679Z" fill="url(#paint0_linear_409_15669)"/>
</g>
<defs>
<linearGradient id="paint0_linear_409_15669" x1="11.0719" y1="23.3198" x2="11.0719" y2="0.000547636" gradientUnits="userSpaceOnUse">
<stop stop-color="#058BE8"/>
<stop offset="1" stop-color="#31B5FF"/>
</linearGradient>
<clipPath id="clip0_409_15669">
<rect width="168" height="24" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>`;

  // ---------- 1. Base theme: AMOLED + background image + fonts + layout ----------
  const baseCss = `
:root, html[data-mode="dark"], [data-mode="dark"] {
  --bg-000: 0 0% 0% !important; --bg-100: 0 0% 0% !important; --bg-200: 0 0% 0% !important;
  --bg-300: 0 0% 0% !important; --bg-400: 0 0% 0% !important; --bg-500: 0 0% 0% !important;
  --text-000: ${HUE} 90% 80% !important; --text-100: ${HUE} 90% 74% !important; --text-200: ${HUE} 50% 60% !important;
  --text-300: ${HUE} 50% 60% !important; --text-400: ${HUE} 30% 48% !important; --text-500: ${HUE} 30% 48% !important;
  --border-100: ${HUE} 50% 30% !important; --border-200: ${HUE} 50% 26% !important;
  --border-300: ${HUE} 50% 20% !important; --border-400: ${HUE} 50% 20% !important;
  --accent-brand: ${HUE} 100% 55% !important;
  --font-anthropic-sans: "Cascadia Code", Consolas, "JetBrains Mono", monospace !important;
  --font-anthropic-serif: "Cascadia Code", Consolas, monospace !important;
  --font-user-message: "Cascadia Code", Consolas, monospace !important;
  --font-claude-response: "Cascadia Code", Consolas, monospace !important;
}
body, textarea, input, button, [contenteditable] { font-family: "Cascadia Code", Consolas, "JetBrains Mono", monospace; }
span[data-lucide-swapped], span[data-lucide-swapped] * { font-family: inherit; }
*, ::before, ::after { border-radius: 0 !important; }
html, body { background: #000 !important; }
${BG_URL ? `body::before {
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background: url('${BG_URL}') center / cover no-repeat fixed;
  opacity: ${BG_OPACITY};
}` : ''}
main.dframe-content, main.dframe-content > * { background: transparent !important; }
main.dframe-content { position: relative; z-index: 1; }
[data-testid="chat-input"], form:has([data-testid="chat-input"]) {
  background: rgba(0,0,0,.55) !important; backdrop-filter: blur(3px);
}
aside.dframe-sidebar {
  background: rgba(0,0,0,.85) !important; backdrop-filter: blur(6px);
  transition: transform .15s ease !important;
  border-right: 1px solid hsl(${HUE} 50% 22%);
}
`;
  const st = document.createElement('style');
  st.id = 'term-theme';
  st.textContent = baseCss;
  document.head.appendChild(st);

  // ---------- 2. Sidebar: hidden by default, Ctrl+B toggles ----------
  // State lives in a dedicated <style> element (claude.ai rewrites <html>'s
  // class list, so a class-based toggle gets silently wiped).
  const sb = document.createElement('style');
  sb.id = 'term-sb-state';
  const HIDE = 'aside.dframe-sidebar { transform: translateX(-105%) !important; }';
  sb.textContent = HIDE;
  document.head.appendChild(sb);
  addEventListener('keydown', e => {
    if (e.ctrlKey && !e.shiftKey && !e.altKey && e.key.toLowerCase() === HOTKEY) {
      e.preventDefault();
      e.stopPropagation();
      sb.textContent = sb.textContent ? '' : HIDE;
    }
  }, true);

  // ---------- 3. New design-system (cds): green-tinted AMOLED ramp ----------
  // The dark palette lives on inner .cds-root elements, and the variables load
  // after document-idle on a fresh navigation Ã¢â‚¬â€ so target .cds-root and retry
  // until the palette is readable.
  const lightness = hex => {
    const m = (hex || '').trim().match(/^#([0-9a-f]{6})$/i);
    if (!m) return null;
    const n = parseInt(m[1], 16), r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
    return (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  };
  const applyCds = () => {
    const hcs = getComputedStyle(document.documentElement);
    if (lightness(hcs.getPropertyValue('--cds-gray-50')) === null) return false; // palette not loaded yet
    const steps = ['0','10','20','30','40','50','60','70','80','90','100','150','200','250','300','350','400','450','500','550','600','650','700','750','800','810','820','830','840','850','860','870','880','890','900'];
    let css = ':root, .cds-root {\n';
    for (const s of steps) {
      const l = lightness(hcs.getPropertyValue('--cds-gray-' + s));
      if (l === null) continue;
      let L = Math.round(l * 100), sat;
      if (L < 20)      { L = 0;  sat = 0;  } // AMOLED: crush dark surfaces to pure black
      else if (L < 30) { sat = 20; }
      else if (L < 60) { sat = 40; }
      else if (L < 85) { sat = 70; }
      else             { L = 78; sat = 75; } // primary text: real green, not near-white
      css += `--cds-gray-${s}: hsl(${HUE} ${sat}% ${L}%) !important;\n`;
    }
    css += `--cds-clay: hsl(${HUE} 100% 55%) !important; --cds-clay-emphasized: hsl(${HUE} 100% 45%) !important;
--cds-fill-brand: hsl(${HUE} 100% 45%) !important; --cds-fill-brand-hover: hsl(${HUE} 100% 55%) !important;
--cds-fill-accent: hsl(${HUE} 90% 40%) !important; --cds-fill-accent-hover: hsl(${HUE} 90% 50%) !important;
--cds-bg-accent: hsl(${HUE} 70% 10%) !important; --cds-border-accent: hsl(${HUE} 60% 35%) !important;
--cds-surface-1: #000 !important; --cds-surface-2: rgba(0,0,0,.6) !important; --cds-surface-3: hsl(${HUE} 20% 6%) !important;
--cds-page-bg: #000 !important;
}`;
    const st2 = document.createElement('style');
    st2.id = 'term-theme-cds';
    st2.textContent = css;
    document.head.appendChild(st2);
    return true;
  };
  if (!applyCds()) {
    const iv = setInterval(() => { if (applyCds()) clearInterval(iv); }, 200);
    setTimeout(() => clearInterval(iv), 15000);
  }

  // ---------- 4. Minimalist icons: Anthropicons font glyphs -> Lucide SVGs ----------
  const P = {
    'e001': '<path d="M5 12h14"/><path d="M12 5v14"/>', // plus (new chat / attach / create)
    'e120': '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>', // zap (quick task)
    'e0c9': '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>', // folder (projects)
    'e02a': '<path d="m6 9 6 6 6-6"/>', // chevron-down
    'e017': '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>', // box (artifacts)
    'e100': '<path d="M21 5h-7M10 5H3M21 12h-9M8 12H3M21 19h-5M12 19H3M14 2v6M8 9v6M16 16v6"/>', // sliders (customize)
    'e015': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', // arrow-right (view all)
    'e062': '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>', // more options
    'e070': '<path d="M3 6h18M7 12h10M10 18h4"/>', // filter
    'e0b8': '<circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2a10 10 0 0 0 0 20 2 2 0 0 0 2-2v-1a2 2 0 0 1 2-2h2a4 4 0 0 0 4-4A10 10 0 0 0 12 2Z"/>', // palette (design)
    'e027': '<path d="M12 19v3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><rect x="9" y="2" width="6" height="13" rx="3"/>', // mic (voice)
    'e063': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>', // grid (apps)
    'e0d3': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', // search
    'e0dd': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>', // panel-left (sidebar toggle)
    'e037': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>', // message-square (chat)
    'e0f1': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', // users (cowork)
    'e013': '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>', // arrow-up (send)
  };
  const restyle = root => {
    if (!root.querySelectorAll) return;
    // icon swap
    root.querySelectorAll('span').forEach(s => {
      if (s.children.length || s.dataset.lucideSwapped) return;
      const t = s.textContent;
      if (t.length !== 1) return;
      const cp = t.codePointAt(0);
      if (cp < 0xE000 || cp > 0xF8FF) return;
      const hex = cp.toString(16);
      if (!P[hex]) return; // unknown glyphs keep the original icon font
      s.dataset.lucideSwapped = hex;
      s.textContent = '';
      s.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:1em;height:1em;display:inline-block;vertical-align:-0.125em">' + P[hex] + '</svg>';
    });
    // de-brand: replace the "Claude" wordmark with the UTMB / Qualified Health lockup
    root.querySelectorAll('aside.dframe-sidebar a').forEach(a => {
      if (a.dataset.logoDone || a.textContent.trim() !== 'Claude') return;
      a.dataset.logoDone = '1';
      if (SHOW_LOCKUP) {
        const utmb = 'data:image/svg+xml;utf8,' + encodeURIComponent(UTMB_SVG);
        const qh = 'data:image/svg+xml;utf8,' + encodeURIComponent(QH_SVG);
        a.innerHTML =
          '<div style="display:flex;flex-direction:column;gap:3px;padding:6px 8px;background:rgba(255,255,255,.96);width:fit-content;margin-top:4px">' +
            '<img src="' + utmb + '" style="height:24px;width:auto;display:block">' +
            '<div style="display:flex;align-items:center;gap:5px;font-family:system-ui;font-size:9px;font-weight:600;color:#0A3D63;white-space:nowrap">Powered By ' +
              '<img src="' + qh + '" style="height:12px;width:auto;display:block">' +
            '</div>' +
          '</div>';
        a.style.cssText = 'height:auto !important;max-height:none !important;display:block;visibility:visible';
        let p = a.parentElement;
        const aside = a.closest('aside');
        for (let i = 0; i < 3 && p && p !== aside; i++) {
          p.style.height = 'auto';
          p.style.minHeight = '72px';
          p.style.alignItems = 'flex-start';
          p = p.parentElement;
        }
      } else {
        a.style.visibility = 'hidden';
      }
    });
    // replace the greeting starburst with the logo
    if (LOGO_URL) {
      root.querySelectorAll('svg[viewBox="0 0 100 100"]').forEach(s => {
        if (s.closest('button,a')) return;
        const r = s.getBoundingClientRect();
        if (r.width < 20) return;
        const img = document.createElement('img');
        img.src = LOGO_URL;
        img.style.cssText = 'width:' + r.width + 'px;height:' + r.height + 'px;object-fit:cover;display:inline-block';
        s.replaceWith(img);
      });
    }
  };
  restyle(document);
  new MutationObserver(muts => {
    for (const m of muts) for (const n of m.addedNodes) if (n.nodeType === 1) restyle(n);
  }).observe(document.body, { childList: true, subtree: true });
})();

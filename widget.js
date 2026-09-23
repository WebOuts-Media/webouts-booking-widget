/* WebOuts Booking Widget — self-contained (injects CSS + runs widget).
   Source of truth: GitHub repo, served via jsDelivr. Per-page Calendly URLs
   still come from the hidden #wo-cal-*-url inputs in each page's HTML. */
(function () {
  if (!document.getElementById('wo-widget-styles')) {
    var st = document.createElement('style');
    st.id = 'wo-widget-styles';
    st.textContent = ".wo-booking { max-width: 860px; margin: 0 auto; font-family: 'Poppins', sans-serif; color: #1a1a1a; } .wo-banner { background: #07378C; color: #fff; padding: 14px 20px; border-radius: 8px 8px 0 0; text-align: center; font-size: 15px; line-height: 1.4; } .wo-stage { background: #fff; border-radius: 0 0 8px 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); overflow: hidden; } .wo-step { padding: 32px 28px; } .wo-step.hidden { display: none; } .wo-step-header { font-size: 26px; font-weight: 600; color: #07378C; text-align: center; margin-bottom: 24px; } .wo-form-subtitle { text-align: center; color: #555; font-size: 14px; line-height: 1.45; max-width: 460px; margin: -14px auto 22px; } .wo-steps { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 15px 20px; border-bottom: 1px solid #eef1f6; flex-wrap: wrap; } .wo-steps-item { display: flex; align-items: center; gap: 7px; } .wo-steps-dot { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; background: #eef1f6; color: #9aa3b5; } .wo-steps-lbl { font-size: 13px; font-weight: 600; color: #9aa3b5; } .wo-steps-item:not(:last-child)::after { content: ''; width: 18px; height: 2px; border-radius: 2px; background: #e3e7ef; } .wo-steps-active .wo-steps-dot { background: #E26337; color: #fff; } .wo-steps-active .wo-steps-lbl { color: #07378C; } .wo-steps-done .wo-steps-dot { background: #07378C; color: #fff; } .wo-steps-done .wo-steps-lbl { color: #07378C; } .wo-steps-done:not(:last-child)::after { background: #07378C; } @media (max-width: 480px) { .wo-steps { gap: 6px; padding: 12px 12px; } .wo-steps-lbl { font-size: 12px; } .wo-steps-item { gap: 5px; } .wo-steps-item:not(:last-child)::after { width: 10px; } } .wo-form-body { max-width: 520px; margin: 0 auto; } .wo-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; } .wo-field { margin-bottom: 18px; } .wo-field > label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 6px; color: #333; } .wo-field input[type=\"text\"], .wo-field input[type=\"email\"], .wo-field input[type=\"tel\"], .wo-field select { width: 100%; padding: 11px 14px; font-size: 15px; font-family: inherit; border: 1px solid #d4d4d4; border-radius: 6px; box-sizing: border-box; background: #fff; } .wo-field input:focus, .wo-field select:focus { outline: none; border-color: #07378C; box-shadow: 0 0 0 3px rgba(7,55,140,0.12); } .wo-field input.wo-invalid, .wo-field select.wo-invalid { border-color: #d23a3a; } .wo-phone-row { display: grid; grid-template-columns: 160px 1fr; gap: 8px; } .wo-language-row { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; } .wo-language-row input[type=\"radio\"] { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; margin: 0; } .wo-lang-card { display: block; min-height: 88px; margin: 0; padding: 16px 14px; border: 2px solid #d4d4d4; border-radius: 8px; cursor: pointer; text-align: center; background: #fff; box-sizing: border-box; transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease; } .wo-lang-card .wo-lang-title { display: block; font-size: 16px; font-weight: 600; color: #07378C; line-height: 1.25; margin-bottom: 6px; } .wo-lang-card .wo-lang-sub { display: inline-block; font-size: 12px; font-weight: 500; color: #555; background: #f1f3f7; padding: 3px 10px; border-radius: 999px; line-height: 1.3; } .wo-lang-card:hover { border-color: #07378C; } .wo-language-row input[type=\"radio\"]:checked + .wo-lang-card { border-color: #E26337; background: #fff5f0; box-shadow: 0 0 0 3px rgba(226,99,55,0.15); } .wo-language-row input[type=\"radio\"]:checked + .wo-lang-card .wo-lang-title { color: #E26337; } .wo-language-row input[type=\"radio\"]:checked + .wo-lang-card .wo-lang-sub { background: #fff; color: #07378C; } .wo-error { color: #d23a3a; font-size: 13px; margin: 4px 0 12px; min-height: 18px; text-align: center; } .wo-actions { text-align: center; margin-top: 8px; } .wo-btn { background: #E26337; color: #fff; border: 0; padding: 13px 32px; font-size: 16px; font-weight: 600; border-radius: 6px; cursor: pointer; font-family: inherit; transition: background 160ms ease; } .wo-btn:hover { background: #c8501f; } .wo-splash { text-align: center !important; padding: 80px 20px; } .wo-splash h3 { color: #07378C; font-size: 22px; margin: 20px auto 8px; padding: 0; width: 100%; text-align: center !important; } .wo-splash p { color: #555; font-size: 15px; margin: 0 auto; padding: 0; width: 100%; text-align: center !important; } .wo-loading-img { display: block; width: 90px; height: auto; margin: 0 auto 8px; } .wo-cal-container { height: 720px; transition: height 300ms ease; } #wo-cal-1.expanded { height: 1700px; } #wo-cal-2.expanded { height: 1300px; }  .wo-slot-intro { font-size: 14px; color: #555; text-align: center; margin-bottom: 18px; line-height: 1.45; } .wo-slot-title { display: flex; align-items: center; justify-content: center; gap: 9px; max-width: 480px; margin: 0 auto 10px; padding: 12px 18px; background: #f2f6ff; border: 1px solid #d3def3; border-radius: 12px; font-size: 18px; font-weight: 700; color: #07378C; line-height: 1.3; text-align: center; }  .wo-fade { animation: wo-fade-up 340ms cubic-bezier(0.2, 0.7, 0.3, 1) both; } @keyframes wo-fade-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } } .wo-slots { max-height: 560px; overflow-y: auto; padding: 2px; } .wo-slots::-webkit-scrollbar { width: 6px; } .wo-slots::-webkit-scrollbar-thumb { background: #dbe1ec; border-radius: 999px; } .wo-slots::-webkit-scrollbar-track { background: transparent; } .wo-slot-day { margin-bottom: 20px; } .wo-slot-date { font-size: 15px; font-weight: 600; color: #E26337; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #eef1f6; } .wo-slot-times { display: grid; grid-template-columns: repeat(auto-fill, minmax(112px, 1fr)); gap: 8px; } .wo-slot-btn { padding: 11px 8px; font-size: 15px; font-family: inherit; font-weight: 600; color: #07378C; background: #fff; border: 1px solid #e3e7ef; border-radius: 10px; box-shadow: 0 1px 2px rgba(7, 55, 140, 0.05); cursor: pointer; transition: border-color 160ms ease, background 160ms ease, color 160ms ease, transform 160ms ease, box-shadow 160ms ease; } .wo-slot-btn:hover { border-color: #E26337; background: #fff5f0; color: #E26337; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(226, 99, 55, 0.16); } .wo-slot-btn:focus-visible, .wo-month-cell:focus-visible, .wo-back-btn:focus-visible { outline: 2px solid #E26337; outline-offset: 2px; } .wo-slots-msg { text-align: center; padding: 24px 20px; } .wo-slots-msg h3 { color: #07378C; font-size: 20px; margin: 0 auto 12px; max-width: none; } .wo-slots-msg p { color: #555; font-size: 15px; line-height: 1.5; margin: 0 auto 10px; max-width: 460px; } .wo-slots-contact a { color: #07378C; font-weight: 600; text-decoration: none; } .wo-slots-contact a:hover { color: #E26337; }  .wo-slot-backbar { margin-bottom: 12px; } .wo-back-btn { background: none; border: 0; color: #07378C; font-family: inherit; font-size: 15px; font-weight: 600; cursor: pointer; padding: 8px 2px; } .wo-back-btn:hover { color: #E26337; text-decoration: underline; } .wo-confirm-cal { height: 720px; }  .wo-month-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; } .wo-month-cell { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 22px 12px; background: #fff; border: 1px solid #e3e7ef; border-radius: 14px; box-shadow: 0 1px 3px rgba(7, 55, 140, 0.06); font-family: inherit; cursor: pointer; transition: border-color 160ms ease, background 160ms ease, transform 160ms ease, box-shadow 160ms ease; } .wo-month-cell:hover:not(:disabled) { border-color: #E26337; background: #fff5f0; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(7, 55, 140, 0.10); } .wo-month-name { font-size: 16px; font-weight: 600; color: #07378C; } .wo-month-count { font-size: 13px; font-weight: 600; color: #E26337; } .wo-month-empty { background: #f6f8fb; box-shadow: none; cursor: default; } .wo-month-empty .wo-month-name { color: #9aa3b5; } .wo-month-empty .wo-month-count { color: #c4653f; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; }  .wo-booked-badge { display: table; margin: 0 auto 14px; padding: 8px 16px; background: #e7f6ec; color: #1a7f43; font-size: 14px; font-weight: 600; border-radius: 999px; }  .wo-recap { max-width: 420px; margin: 18px auto 6px; background: #fff; border: 1px solid #e3e7ef; border-radius: 14px; box-shadow: 0 1px 3px rgba(7, 55, 140, 0.06); overflow: hidden; } .wo-recap-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 14px 18px; } .wo-recap-row + .wo-recap-row { border-top: 1px solid #eef1f6; } .wo-recap-label { font-size: 12px; font-weight: 600; color: #8a93a6; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap; } .wo-recap-when { font-size: 15px; font-weight: 600; color: #07378C; text-align: right; } .wo-recap-next { color: #555; font-size: 15px; line-height: 1.55; max-width: 440px; margin: 14px auto 0; }  .wo-confirm-card { max-width: 480px; margin: 0 auto; padding: 26px 26px 22px; background: #fff; border: 1px solid #e3e7ef; border-radius: 14px; box-shadow: 0 1px 3px rgba(7, 55, 140, 0.06); } .wo-confirm-title { font-size: 19px; font-weight: 700; color: #07378C; text-align: center; } .wo-confirm-when { font-size: 15px; font-weight: 600; color: #E26337; text-align: center; margin: 4px 0 2px; } .wo-confirm-who { font-size: 13px; color: #8a93a6; text-align: center; margin-bottom: 18px; } .wo-q { margin-bottom: 14px; } .wo-q label { display: block; font-size: 13px; font-weight: 600; color: #37415b; margin-bottom: 6px; text-align: center; } .wo-q-input { width: 100%; box-sizing: border-box; padding: 10px 12px; font-family: inherit; font-size: 15px; color: #1d2843; background: #fff; border: 1px solid #d7dce8; border-radius: 9px; text-align: center; } .wo-q-input:focus-visible { outline: 2px solid #E26337; outline-offset: 1px; border-color: #E26337; } textarea.wo-q-input { resize: vertical; } .wo-choices { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; } .wo-choice { padding: 9px 20px; font-family: inherit; font-size: 14px; font-weight: 600; color: #07378C; background: #fff; border: 1px solid #d7dce8; border-radius: 999px; cursor: pointer; transition: border-color 160ms ease, background 160ms ease, color 160ms ease; } .wo-choice:hover { border-color: #E26337; } .wo-choice.selected { background: #07378C; border-color: #07378C; color: #fff; } .wo-q-invalid label { color: #c0392b; } .wo-q-invalid .wo-q-input, .wo-q-invalid .wo-choice { border-color: #c0392b; } .wo-confirm-error { color: #c0392b; font-size: 14px; text-align: center; min-height: 18px; margin: 2px 0 6px; } .wo-confirm-btn { display: block; width: 100%; padding: 14px; text-align: center; font-family: inherit; font-size: 16px; font-weight: 700; color: #fff; background: #E26337; border: 0; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 14px rgba(226, 99, 55, 0.35); transition: transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease; } .wo-confirm-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(226, 99, 55, 0.4); } .wo-confirm-btn:disabled { opacity: 0.7; cursor: default; } .wo-confirm-btn:focus-visible { outline: 2px solid #07378C; outline-offset: 2px; } .wo-confirm-note { margin: 10px 0 0; font-size: 12.5px; color: #8a93a6; text-align: center; }  .wo-recap-links { display: block; font-size: 12px; font-weight: 400; margin-top: 2px; } .wo-recap-links a { color: #8a93a6; text-decoration: underline; } .wo-recap-links a:hover { color: #E26337; }  .wo-loadbar { width: 240px; max-width: 80%; height: 6px; margin: 24px auto 0; background: #e6ebf5; border-radius: 999px; overflow: hidden; } .wo-loadbar-fill { height: 100%; width: 100%; border-radius: 999px; background: linear-gradient(90deg, #E26337, #f0885f); transform-origin: left center; transform: scaleX(0); animation: wo-loadbar-fill 20s cubic-bezier(0.08, 0.62, 0.23, 0.98) forwards; } @keyframes wo-loadbar-fill { 0% { transform: scaleX(0); } 25% { transform: scaleX(0.7); } 100% { transform: scaleX(0.93); } }  @media (max-width: 640px) { .wo-month-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } .wo-month-cell { padding: 16px 8px; } .wo-month-name { font-size: 15px; } .wo-slot-times { grid-template-columns: repeat(3, 1fr); } .wo-slot-btn { padding: 13px 4px; font-size: 14px; } .wo-slots { max-height: 62vh; } .wo-confirm-cal { height: 920px; } .wo-booked-badge { font-size: 13px; } .wo-recap-row { padding: 12px 14px; } .wo-recap-when { font-size: 14px; } .wo-confirm-card { padding: 20px 14px 18px; } }  @media (prefers-reduced-motion: reduce) { .wo-fade { animation: none; } .wo-loadbar { display: none; } .wo-slot-btn, .wo-month-cell { transition: none; } .wo-slot-btn:hover, .wo-month-cell:hover:not(:disabled) { transform: none; } }   .wo-selectbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; max-width: 480px; margin: 0 auto 16px; padding: 10px 16px; background: #f2f6ff; border: 1px solid #d3def3; border-radius: 12px; } .wo-selectbar-text { font-size: 14px; font-weight: 600; color: #07378C; line-height: 1.4; } .wo-selectbar-change { background: none; border: 0; padding: 6px 2px; font-family: inherit; font-size: 14px; font-weight: 600; color: #E26337; cursor: pointer; text-decoration: underline; white-space: nowrap; } .wo-selectbar-change:hover { color: #07378C; } .wo-selectbar-change:focus-visible { outline: 2px solid #E26337; outline-offset: 2px; }  .wo-slot-notice { max-width: 480px; margin: 0 auto 14px; padding: 10px 14px; background: #fff5f0; border: 1px solid #f3c8b4; border-radius: 10px; color: #a34a24; font-size: 14px; font-weight: 600; text-align: center; line-height: 1.45; }  .wo-confirm-rows { margin: 14px 0 16px; border: 1px solid #e3e7ef; border-radius: 12px; overflow: hidden; } .wo-confirm-row { display: flex; align-items: center; gap: 12px; padding: 13px 14px; background: #fbfcfe; } .wo-confirm-row + .wo-confirm-row { border-top: 1px solid #eef1f6; } .wo-confirm-row-num { flex: 0 0 auto; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; background: #07378C; color: #fff; font-size: 13px; font-weight: 700; border-radius: 50%; } .wo-confirm-row-body { flex: 1 1 auto; min-width: 0; } .wo-confirm-row-label { font-size: 15px; font-weight: 700; color: #07378C; } .wo-confirm-row-when { font-size: 14px; font-weight: 600; color: #E26337; margin-top: 1px; } .wo-confirm-row-sub { font-size: 12.5px; color: #8a93a6; margin-top: 1px; } .wo-confirm-row-change { flex: 0 0 auto; background: none; border: 0; padding: 6px 2px; font-family: inherit; font-size: 13px; font-weight: 600; color: #8a93a6; cursor: pointer; text-decoration: underline; } .wo-confirm-row-change:hover { color: #E26337; } .wo-confirm-row-change:focus-visible { outline: 2px solid #E26337; outline-offset: 2px; }  .wo-q-group { margin: 18px 0 10px; font-size: 12px; font-weight: 700; color: #8a93a6; text-transform: uppercase; letter-spacing: 0.06em; }  .wo-guests { margin-bottom: 18px; } .wo-guests-label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 6px; color: #333; } .wo-guests-label span { color: #8a93a6; font-weight: 400; } .wo-guest-row { position: relative; margin-bottom: 8px; } .wo-guest-input { width: 100%; padding: 11px 14px; font-size: 15px; font-family: inherit; border: 1px solid #d4d4d4; border-radius: 6px; box-sizing: border-box; background: #fff; } .wo-guest-row.wo-guest-has-remove .wo-guest-input { padding-right: 46px; } .wo-guest-input:focus { outline: none; border-color: #07378C; box-shadow: 0 0 0 3px rgba(7,55,140,0.12); } .wo-guest-input.wo-invalid { border-color: #d23a3a; } .wo-guests .wo-guest-remove { position: absolute; top: 1px; right: 1px; bottom: 1px; width: 42px; display: none; align-items: center; justify-content: center; background: transparent; border: 0; border-radius: 0 6px 6px 0; box-shadow: none; color: #9aa3b5; font-size: 18px; line-height: 1; cursor: pointer; transition: color 160ms ease; } .wo-guest-row.wo-guest-has-remove .wo-guest-remove { display: flex; } .wo-guests .wo-guest-remove:hover { color: #E26337; } .wo-guests .wo-guest-remove:focus-visible { outline: 2px solid #E26337; outline-offset: -2px; } .wo-guests .wo-guest-add { display: inline-block; margin-top: 2px; background: transparent; border: 0; box-shadow: none; padding: 4px 0; font-family: inherit; font-size: 14px; font-weight: 600; color: #E26337; cursor: pointer; } .wo-guests .wo-guest-add:hover { color: #07378C; text-decoration: underline; } .wo-guests .wo-guest-add:focus-visible { outline: 2px solid #E26337; outline-offset: 2px; } .wo-guests .wo-guest-add[disabled] { color: #b8c0cf; cursor: default; text-decoration: none; } .wo-pickother-btn { max-width: 320px; margin: 14px auto 0; }  .wo-slot-btn.selected { background: #E26337; border-color: #E26337; color: #fff; }  @media (max-width: 640px) { .wo-selectbar { padding: 9px 12px; } .wo-selectbar-text { font-size: 13px; } .wo-confirm-row { padding: 11px 10px; gap: 10px; } .wo-confirm-row-label { font-size: 14px; } .wo-confirm-row-when { font-size: 13px; } } .wo-check { width: 90px; height: 90px; margin: 40px auto 20px; background: #2da44e; color: #fff; border-radius: 50%; font-size: 56px; line-height: 90px; text-align: center; font-weight: bold; } #wo-all-done { text-align: center; padding: 40px 28px; } #wo-all-done h2 { color: #07378C; margin: 8px 0; font-size: 28px; } #wo-all-done p { color: #555; font-size: 16px; line-height: 1.5; } @media (max-width: 600px) { .wo-step { padding: 24px 16px; } .wo-row { grid-template-columns: 1fr; } .wo-language-row { grid-template-columns: 1fr; } .wo-lang-card { min-height: 0; padding: 14px; } .wo-step-header { font-size: 22px; } }";
    (document.head || document.documentElement).appendChild(st);
  }
})();

(function () {
  function init() {
    var booking = document.getElementById('wo-booking');
    if (!booking) return;

    // Legacy per-page hidden inputs. These remain the fallback: if the config
    // service can't answer, the page behaves exactly as it did before.
    var cal1El = document.getElementById('wo-cal-1-url');
    var cal1BiEl = document.getElementById('wo-cal-1-bilingual-url');
    var cal2El = document.getElementById('wo-cal-2-url');
    var CAL_1_URL = cal1El ? cal1El.value : '';
    var CAL_1_BI_URL = cal1BiEl ? cal1BiEl.value : '';
    var CAL_2_URL = cal2El ? cal2El.value : '';

    // Availability proxies (n8n). Filming: valid studio times swept across the
    // full booking horizon (respecting the 21-day notice). Scripting: only
    // times at least 10 days before the chosen filming date. Both brand-agnostic.
    // COMBINED FLOW: the scripting proxy is also called with filming_start=<ISO>
    // (the SELECTED, not-yet-booked filming time) instead of filming_event_uri.
    var WEBHOOK_FILMING = 'https://webouts.app.n8n.cloud/webhook/wo-filming-availability';
    var WEBHOOK_SCRIPTING = 'https://webouts.app.n8n.cloud/webhook/wo-scripting-availability';
    var WEBHOOK_BOOKING = 'https://webouts.app.n8n.cloud/webhook/wo-create-booking';
    var WEBHOOK_CONFIG = 'https://webouts.app.n8n.cloud/webhook/booking-config';

    var langField = document.getElementById('wo-language-field');
    // Bilingual is offered only when the client's English & Spanish filming
    // event is ACTIVE in Calendly, so this re-runs whenever CAL_1_BI_URL changes.
    function applyLangVisibility() {
      if (langField) langField.style.display = CAL_1_BI_URL ? '' : 'none';
    }
    applyLangVisibility();

    // Resolve this page's Calendly links from the config service, keyed on the
    // page slug (/orlando -> "orlando"). Calendly is the source of truth: the
    // service returns only event types that are switched ON, so toggling the
    // Spanish event in Calendly makes the language picker appear or disappear
    // here with no code change and no page edit. Any failure (unknown slug,
    // ok:false, network) leaves the hidden-input values untouched — and on a
    // page that has no hidden inputs, locks the wizard (see “Wizard lock”).
    var pageSlug = (location.pathname || '').replace(/^\/+|\/+$/g, '').split('/').pop().toLowerCase();

    function fetchConfig() {
      if (!pageSlug) return Promise.resolve();
      return fetch(WEBHOOK_CONFIG + '?slug=' + encodeURIComponent(pageSlug))
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          if (!d || !d.ok) return;
          CAL_1_URL = d.filming || CAL_1_URL;
          CAL_2_URL = d.scripting || CAL_2_URL;
          // Authoritative: '' means the bilingual event is off or absent.
          CAL_1_BI_URL = d.bilingual || '';
          applyLangVisibility();
        })
        .catch(function () { /* keep the hidden-input fallback */ });
    }

    // Both links are required to complete a booking, and every fallback path in
    // this widget still needs a Calendly URL to hand off to. No links = nothing
    // this page can do.
    function bookingUsable() { return !!CAL_1_URL && !!CAL_2_URL; }

    var configSettled = false;
    var configReady = fetchConfig().then(function () {
      configSettled = true;
      configLocked = !bookingUsable();
      applyLock();
    });

    // Drop an animated loading bar into each splash so the wait for the next
    // screen (while we fetch available times) never looks frozen.
    Array.prototype.forEach.call(document.querySelectorAll('.wo-splash'), function (sp) {
      if (sp.querySelector('.wo-loadbar')) return;
      var track = document.createElement('div');
      track.className = 'wo-loadbar';
      var fill = document.createElement('div');
      fill.className = 'wo-loadbar-fill';
      track.appendChild(fill);
      sp.appendChild(track);
    });

    // The pages' static copy predates the one-step flow ("Two quick steps",
    // "Step 1 of 2"...). Rewrite it at load so every client page reads right
    // without per-page edits. Only leaf elements with the known phrases are
    // touched; anything else is left alone.
    function retext(root, matchRe, newText) {
      var els = [root].concat(Array.prototype.slice.call(root.querySelectorAll('*')));
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
        for (var j = 0; j < el.childNodes.length; j++) {
          var n = el.childNodes[j];
          if (n.nodeType === 3 && matchRe.test(n.nodeValue || '')) { n.nodeValue = newText; return true; }
        }
      }
      return false;
    }
    retext(document.body, /two quick steps/i,
      'One simple booking: pick your filming time, pick your interview time, then confirm both together.');
    var sp1 = document.getElementById('wo-step-1-splash');
    if (sp1) retext(sp1, /step\s*1/i, 'Finding available filming times…');
    var sp2 = document.getElementById('wo-step-2-splash');
    if (sp2) retext(sp2, /step\s*2/i, 'Finding interview times that fit your filming date…');

    var steps = ['wo-step-0', 'wo-step-1-splash', 'wo-step-1', 'wo-step-2-splash', 'wo-step-2', 'wo-all-done', 'wo-locked'];

    function show(id) {
      steps.forEach(function (s) {
        var el = document.getElementById(s);
        if (!el) return;
        if (s === id) el.classList.remove('hidden'); else el.classList.add('hidden');
      });
      updateProgress(id);
    }

    // ---- First-screen reassurance + browser autofill + a persistent 3-step
    // progress indicator. All injected in JS so no per-page HTML edit is
    // needed (the info form is static per-page markup the widget only reads). ----

    // (a) Reassurance line under the step-0 header.
    (function () {
      var s0 = document.getElementById('wo-step-0');
      var hdr = s0 && s0.querySelector('.wo-step-header');
      if (!hdr) return;
      var sub = document.createElement('p');
      sub.className = 'wo-form-subtitle';
      sub.textContent = 'Takes about 2 minutes — nothing is booked until you confirm at the end.';
      hdr.parentNode.insertBefore(sub, hdr.nextSibling);
    })();

    // (b) Let mobile browsers one-tap autofill the contact fields.
    (function () {
      var map = { wo_first_name: 'given-name', wo_last_name: 'family-name', wo_email: 'email', wo_phone: 'tel-national' };
      Object.keys(map).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.setAttribute('autocomplete', map[id]);
      });
    })();

    // (c) Progress indicator injected at the top of the white stage.
    var PROGRESS_STAGES = [
      { label: 'Your info', ids: ['wo-step-0'] },
      { label: 'Filming', ids: ['wo-step-1-splash', 'wo-step-1'] },
      { label: 'Interview', ids: ['wo-step-2-splash', 'wo-step-2'] }
    ];
    var progressEl = null;
    (function () {
      var stage = booking.querySelector('.wo-stage');
      if (!stage) return;
      progressEl = document.createElement('div');
      progressEl.className = 'wo-steps';
      progressEl.setAttribute('aria-hidden', 'true');
      PROGRESS_STAGES.forEach(function (s, i) {
        var item = document.createElement('div');
        item.className = 'wo-steps-item';
        item.innerHTML = '<span class="wo-steps-dot">' + (i + 1) + '</span>' +
          '<span class="wo-steps-lbl">' + s.label + '</span>';
        progressEl.appendChild(item);
      });
      stage.insertBefore(progressEl, stage.firstChild);
    })();

    function updateProgress(id) {
      if (!progressEl) return;
      if (id === 'wo-locked') { progressEl.style.display = 'none'; return; }
      progressEl.style.display = '';
      var active = (id === 'wo-all-done') ? PROGRESS_STAGES.length : -1;
      if (active === -1) {
        for (var i = 0; i < PROGRESS_STAGES.length; i++) {
          if (PROGRESS_STAGES[i].ids.indexOf(id) !== -1) { active = i; break; }
        }
      }
      if (active === -1) return;   // unknown id: leave the indicator as-is
      Array.prototype.forEach.call(progressEl.querySelectorAll('.wo-steps-item'), function (it, i) {
        it.classList.toggle('wo-steps-done', i < active);
        it.classList.toggle('wo-steps-active', i === active);
      });
    }
    updateProgress('wo-step-0');

    // ── Wizard lock ───────────────────────────────────────────────
    // Two different breakages leave this page unable to produce a real booking,
    // and both look identical to a provider, so both show the same branded
    // pause screen rather than a dead form:
    //
    //   1. Calendly's own core systems are degraded — especially Notifications,
    //      which sends the calendar invite. Lock up front so a provider can't
    //      complete every step and only discover at “Confirm” that it failed.
    //      The create-booking proxy enforces the same check server-side.
    //
    //   2. We never got this page's Calendly links. Legacy pages fall back to
    //      their hidden inputs, so this can only bite a page that has none —
    //      i.e. every page created from here on, whose whole point is carrying
    //      no per-page config. Without links there is no iframe to fall back to
    //      and every other degrade path in this file dead-ends, so an ungated
    //      page would render an empty box.
    //
    // Both re-check on the same timer, so the page unlocks by itself.
    var CAL_STATUS_URL = 'https://calendlystatus.com/api/v2/summary.json';
    var CAL_CORE = ['Calendly API', 'calendly.com', 'Notifications', 'Webhooks'];
    var calLocked = false;
    var configLocked = false;

    function isLocked() { return calLocked || configLocked; }

    function applyLock() {
      if (isLocked()) {
        buildLockScreen();
        show('wo-locked');
        return;
      }
      var lk = document.getElementById('wo-locked');
      if (lk && !lk.classList.contains('hidden')) show('wo-step-0');
    }

    function buildLockScreen() {
      if (document.getElementById('wo-locked')) return;
      var el = document.createElement('div');
      el.className = 'wo-step hidden';
      el.id = 'wo-locked';
      el.innerHTML =
        '<div class="wo-slots-msg" style="padding:44px 24px;">' +
        '<h3 style="text-align:center;">Scheduling is paused for a moment</h3>' +
        '<p>Our scheduling provider is having a brief outage, so we’ve paused online booking to make sure your confirmation and calendar invite go out correctly. This page unlocks automatically as soon as it’s resolved — please check back shortly.</p>' +
        '<p class="wo-slots-contact" style="margin-top:14px;">Need us right away? Contact Cam Kubasta at' +
        '<br><a href="tel:+19202145227" style="white-space:nowrap;">(920) 214-5227</a>' +
        '<br><a href="mailto:ckubasta@webouts.com">ckubasta@webouts.com</a></p>' +
        '</div>';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'wo-recheck-btn';
      btn.className = 'wo-confirm-btn wo-pickother-btn';
      btn.textContent = 'Check again';
      btn.style.marginTop = '18px';
      btn.addEventListener('click', manualRecheck);
      el.querySelector('.wo-slots-msg').appendChild(btn);
      var st = document.createElement('p');
      st.id = 'wo-recheck-status';
      st.className = 'hidden';
      st.setAttribute('role', 'status');
      st.setAttribute('aria-live', 'polite');
      st.style.cssText = 'text-align:center;margin-top:12px;color:#07378C;font-weight:600;';
      el.querySelector('.wo-slots-msg').appendChild(st);
      var stage = booking.querySelector('.wo-stage') || booking;
      stage.appendChild(el);
    }

    // Manual "Check again" click: give visible feedback on every press. A
    // still-down result otherwise re-shows an identical screen, which reads as
    // a dead button.
    function manualRecheck() {
      var btn = document.getElementById('wo-recheck-btn');
      var st = document.getElementById('wo-recheck-status');
      if (btn) { btn.disabled = true; btn.textContent = 'Checking…'; }
      if (st) { st.classList.add('hidden'); }
      pollLock().then(function (locked) {
        if (btn) { btn.disabled = false; btn.textContent = 'Check again'; }
        if (locked && st) {
          st.textContent = 'Still paused — we just checked. Please check back shortly.';
          st.classList.remove('hidden');
        }
        // If it recovered, pollLock already switched to the booking form.
      });
    }

    function fetchCalendlyStatus() {
      return fetch(CAL_STATUS_URL, { cache: 'no-store' })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var comps = (d && d.components) || [];
          return comps.some(function (c) {
            return CAL_CORE.indexOf(c.name) !== -1 && c.status !== 'operational';
          });
        })
        .catch(function () { return false; });   // fail open — never lock on a status-page hiccup
    }

    function pollLock() {
      return Promise.all([
        fetchCalendlyStatus(),
        // Retry the config service only while it's the thing that's broken, so
        // a healthy page doesn't re-poll n8n every minute for no reason.
        configLocked ? fetchConfig() : Promise.resolve()
      ]).then(function (r) {
        calLocked = r[0];
        // Guard on configSettled: the first poll fires before the config lands,
        // and an unresolved page has no links yet — evaluating here would flash
        // a false lock on every page load.
        if (configSettled) configLocked = !bookingUsable();
        applyLock();
        return isLocked();
      });
    }

    // Restart the fill animation each time a splash is shown, so the bar
    // always sweeps left-to-right from empty.
    function restartLoadbar(splashId) {
      var sp = document.getElementById(splashId);
      var fill = sp ? sp.querySelector('.wo-loadbar-fill') : null;
      if (!fill) return;
      fill.style.animation = 'none';
      void fill.offsetWidth;
      fill.style.animation = '';
    }

    // Re-run the entrance animation whenever a picker view re-renders, and
    // move focus to the fresh view so keyboard/screen-reader users land on it.
    function applyFade(host) {
      host.classList.remove('wo-fade');
      void host.offsetWidth;
      host.classList.add('wo-fade');
      host.setAttribute('tabindex', '-1');
      try { host.focus({ preventScroll: true }); } catch (e) {
        try { host.focus(); } catch (e2) {}
      }
    }

    function appendParam(url, key, value) {
      var sep = url.indexOf('?') === -1 ? '?' : '&';
      return url + sep + key + '=' + encodeURIComponent(value);
    }

    function buildPhone() {
      var cc = document.getElementById('wo_country').value;
      var raw = document.getElementById('wo_phone').value.replace(/[^0-9]/g, '');
      if (!raw) return '';
      return cc + raw;
    }

    function scrollToWizard() {
      var el = document.getElementById('wo-booking');
      if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Bring the first unanswered required question into view after a
    // failed validation pass.
    function scrollFirstInvalid(scope) {
      var el = scope.querySelector('.wo-q-invalid, .wo-invalid');
      if (!el || !el.scrollIntoView) return;
      try { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {
        el.scrollIntoView();
      }
    }

    function postForm(url, params) {
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: params
      }).then(function (r) { return r.json(); });
    }

    var doctorPrefill = null;
    var cal1Loaded = false;
    var cal2Loaded = false;
    var filmingBooked = false;
    var filmingState = null;        // { slots, baseUrl, months, activeMonth }
    var scriptingSlots = null;
    var scriptingSlotsForStart = null;  // filming start_time the interview slots were computed for
    var scriptingFilmingStart = null;   // set only once filming is actually BOOKED
    var chosenScriptingTime = null;
    var filmingMeta = null;        // { event_type_uri, custom_questions } from availability
    var scriptingMeta = null;
    var bookingLinks = { filming: null, scripting: null };
    var lastFilmingEventUri = '';
    var selectedFilming = null;         // { start_time, scheduling_url } — chosen, NOT yet booked
    var selectedScripting = null;       // { start_time, scheduling_url } — chosen interview time
    var pendingRestoreScripting = null; // earlier interview pick to restore after a filming change
    var pendingScriptingNotice = null;  // one-shot message shown above the interview picker
    var savedAnswers = {};              // 'kind|question' -> last entered value (survives re-renders)
    var savedGuests = [];               // guest emails (optional) added to BOTH invites; collected on the info form
    var guestsForm = null;              // the injected guests field on step 0; { el, collect }
    var bookingInProgress = false;      // true while the two-booking sequence is in flight
    var unloadGuardOn = false;          // warn before leaving between Confirm click and recap
    var TIMEZONE = 'America/Chicago';
    try { TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone || TIMEZONE; } catch (e) {}

    window.addEventListener('beforeunload', function (e) {
      if (!unloadGuardOn) return;
      e.preventDefault();
      e.returnValue = '';
    });

    // ---- Shared: slot picker, confirmation-with-back, and empty state ----

    function renderPicker(hostId, slots, chooseFn, opts) {
      var host = document.getElementById(hostId);
      host.classList.remove('expanded');
      host.style.height = 'auto';
      host.innerHTML = '';

      if (opts.onBack) {
        var bar = document.createElement('div');
        bar.className = 'wo-slot-backbar';
        var back = document.createElement('button');
        back.type = 'button';
        back.className = 'wo-back-btn';
        back.textContent = opts.backLabel || '← Back';
        back.addEventListener('click', opts.onBack);
        bar.appendChild(back);
        host.appendChild(bar);
      }

      if (opts.topEl) host.appendChild(opts.topEl);

      if (opts.badge) {
        var badge = document.createElement('div');
        badge.className = 'wo-booked-badge';
        badge.textContent = opts.badge;
        host.appendChild(badge);
      }

      if (opts.notice) {
        var notice = document.createElement('div');
        notice.className = 'wo-slot-notice';
        notice.textContent = opts.notice;
        host.appendChild(notice);
      }

      if (opts.title) {
        var stitle = document.createElement('div');
        stitle.className = 'wo-slot-title';
        stitle.textContent = opts.title;
        host.appendChild(stitle);
      }

      var intro = document.createElement('div');
      intro.className = 'wo-slot-intro';
      intro.textContent = opts.intro;
      host.appendChild(intro);

      var wrap = document.createElement('div');
      wrap.className = 'wo-slots';

      var groups = {};
      var order = [];
      slots.forEach(function (s) {
        var d = new Date(s.start_time);
        var key = d.toDateString();
        if (!groups[key]) { groups[key] = []; order.push(key); }
        groups[key].push(s);
      });

      order.forEach(function (key) {
        var day = document.createElement('div');
        day.className = 'wo-slot-day';
        var h = document.createElement('div');
        h.className = 'wo-slot-date';
        h.textContent = new Date(groups[key][0].start_time)
          .toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
        day.appendChild(h);
        var times = document.createElement('div');
        times.className = 'wo-slot-times';
        groups[key].forEach(function (s) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'wo-slot-btn';
          if (opts.selectedTime && s.start_time === opts.selectedTime) b.className += ' selected';
          b.textContent = new Date(s.start_time)
            .toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
          b.addEventListener('click', function () { chooseFn(s.scheduling_url, s.start_time); });
          times.appendChild(b);
        });
        day.appendChild(times);
        wrap.appendChild(day);
      });

      host.appendChild(wrap);
      applyFade(host);
    }

    // FALLBACK ONLY: load Calendly's own form for the exact slot chosen (used
    // when the booking proxy is unreachable). Confirming fires
    // event_scheduled -> next step via the message listener below.
    function confirmSlotIntoCalendly(hostId, schedulingUrl, backFn) {
      if (!window.Calendly) {
        // Calendly's script never loaded: show the contact-Cam message
        // instead of stranding the user on a dead button.
        renderNoSlots(hostId, null);
        return;
      }
      var host = document.getElementById(hostId);
      host.classList.remove('expanded');
      host.style.height = 'auto';
      host.innerHTML = '';

      var bar = document.createElement('div');
      bar.className = 'wo-slot-backbar';
      var back = document.createElement('button');
      back.type = 'button';
      back.className = 'wo-back-btn';
      back.textContent = '← Back to available times';
      back.addEventListener('click', backFn);
      bar.appendChild(back);
      host.appendChild(bar);

      var inner = document.createElement('div');
      inner.className = 'wo-confirm-cal';
      host.appendChild(inner);

      var sms = doctorPrefill.smsReminderNumber || '';
      var url = appendParam(schedulingUrl, 'location', sms);
      url = appendParam(url, 'text_reminder_number', sms);
      url = appendParam(url, 'hide_event_type_details', '1');
      url = appendParam(url, 'hide_gdpr_banner', '1');
      Calendly.initInlineWidget({ url: url, parentElement: inner, prefill: doctorPrefill });
      applyFade(host);
    }

    // ---- Shared question fields (used by the single confirm and the
    // combined confirm). Values are cached in savedAnswers so nothing the
    // provider typed is lost when a card re-renders (slot taken, back, etc.).

    function buildQuestionField(q, kind) {
      var key = kind + '|' + q.name;
      var wrap = document.createElement('div');
      wrap.className = 'wo-q';
      var lab = document.createElement('label');
      lab.textContent = q.name + (q.required ? ' *' : '');
      wrap.appendChild(lab);
      var get;
      if (q.type === 'single_select' || q.type === 'multi_select') {
        var multi = q.type === 'multi_select';
        var chosen = {};
        var saved = savedAnswers[key] ? savedAnswers[key].split('\n') : [];
        var pills = document.createElement('div');
        pills.className = 'wo-choices';
        (q.answer_choices || []).forEach(function (c) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'wo-choice';
          b.textContent = c;
          if (saved.indexOf(c) !== -1) {
            chosen[c] = true;
            b.className += ' selected';
          }
          b.addEventListener('click', function () {
            if (multi) {
              chosen[c] = !chosen[c];
              b.classList.toggle('selected', !!chosen[c]);
            } else {
              chosen = {};
              chosen[c] = true;
              Array.prototype.forEach.call(pills.children, function (x) { x.classList.remove('selected'); });
              b.classList.add('selected');
            }
            wrap.classList.remove('wo-q-invalid');
          });
          pills.appendChild(b);
        });
        wrap.appendChild(pills);
        get = function () {
          var vals = [];
          for (var k in chosen) { if (chosen[k]) vals.push(k); }
          return vals.join('\n');
        };
      } else {
        var input;
        if (q.type === 'text') {
          input = document.createElement('textarea');
          input.rows = 3;
        } else {
          input = document.createElement('input');
          input.type = q.type === 'phone_number' ? 'tel' : 'text';
          if (q.type === 'phone_number') input.value = doctorPrefill.smsReminderNumber || '';
        }
        if (savedAnswers[key]) input.value = savedAnswers[key];
        input.className = 'wo-q-input';
        input.addEventListener('input', function () { wrap.classList.remove('wo-q-invalid'); });
        wrap.appendChild(input);
        get = function () { return input.value.trim(); };
      }
      return { q: q, key: key, get: get, el: wrap };
    }

    // Read every field, cache values, flag missing required answers.
    function collectAnswers(fields) {
      var answers = [];
      var missing = false;
      fields.forEach(function (f) {
        var v = f.get();
        savedAnswers[f.key] = v;
        if (f.q.required && !v) { missing = true; f.el.classList.add('wo-q-invalid'); }
        if (v) answers.push({ question: f.q.name, answer: v, position: f.q.position });
      });
      return { answers: answers, missing: missing };
    }

    function bookingParams(kind, eventTypeUri, startTime, answers, guests) {
      return 'kind=' + encodeURIComponent(kind) +
        '&event_type=' + encodeURIComponent(eventTypeUri) +
        '&start_time=' + encodeURIComponent(startTime) +
        '&first_name=' + encodeURIComponent(doctorPrefill.firstName) +
        '&last_name=' + encodeURIComponent(doctorPrefill.lastName) +
        '&email=' + encodeURIComponent(doctorPrefill.email) +
        '&timezone=' + encodeURIComponent(TIMEZONE) +
        '&sms=' + encodeURIComponent(doctorPrefill.smsReminderNumber || '') +
        '&guests=' + encodeURIComponent(JSON.stringify(guests || [])) +
        '&answers=' + encodeURIComponent(JSON.stringify(answers));
    }

    // ---- Optional guests: emails added to BOTH invites. Add-a-row UI injected
    // into the info form (step 0); collect() on Continue caches the cleaned list
    // in savedGuests, which both bookings read later. Returns { el, collect }. ----
    var GUEST_MAX = 10;
    function isGuestEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    function buildGuestsSection() {
      var wrap = document.createElement('div');
      wrap.className = 'wo-guests';

      var label = document.createElement('div');
      label.className = 'wo-guests-label';
      label.innerHTML = 'Add Guests <span>(Admin, Marketing Rep, etc.)</span>';
      wrap.appendChild(label);

      var rowsBox = document.createElement('div');
      wrap.appendChild(rowsBox);

      var addWrap = document.createElement('div');
      addWrap.className = 'wo-guest-addwrap';
      var addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'wo-guest-add';
      addBtn.textContent = '+ Add another guest';
      addWrap.appendChild(addBtn);
      wrap.appendChild(addWrap);

      var inputs = [];

      function syncState() {
        // Keep one row always present; only offer Remove once there's >1 row.
        // Toggling the row class (not the button) keeps the input full-width —
        // matching the other form fields — until a remove control is needed.
        var multi = inputs.length > 1;
        inputs.forEach(function (inp) { inp._row.classList.toggle('wo-guest-has-remove', multi); });
        addBtn.disabled = inputs.length >= GUEST_MAX;
      }

      function addRow(value) {
        var row = document.createElement('div');
        row.className = 'wo-guest-row';
        var inp = document.createElement('input');
        inp.type = 'email';
        inp.className = 'wo-guest-input';
        inp.placeholder = 'guest@example.com';
        inp.setAttribute('autocomplete', 'off');   // don't autofill the provider's own email here
        inp.value = value || '';
        inp.addEventListener('input', function () { inp.classList.remove('wo-invalid'); });
        var rm = document.createElement('button');
        rm.type = 'button';
        rm.className = 'wo-guest-remove';
        rm.setAttribute('aria-label', 'Remove guest');
        rm.textContent = '✕';
        rm.addEventListener('click', function () {
          var i = inputs.indexOf(inp);
          if (i !== -1) inputs.splice(i, 1);
          if (row.parentNode) row.parentNode.removeChild(row);
          if (!inputs.length) addRow('');   // never leave zero rows
          syncState();
        });
        inp._row = row;
        row.appendChild(inp);
        row.appendChild(rm);
        rowsBox.appendChild(row);
        inputs.push(inp);
        syncState();
        return inp;
      }

      addBtn.addEventListener('click', function () { addRow('').focus(); });

      if (savedGuests.length) savedGuests.forEach(function (g) { addRow(g); });
      else addRow('');

      function collect() {
        var out = [];
        var seen = {};
        var invalid = false;
        inputs.forEach(function (inp) {
          inp.classList.remove('wo-invalid');
          var v = inp.value.trim();
          if (!v) return;
          if (!isGuestEmail(v)) { invalid = true; inp.classList.add('wo-invalid'); return; }
          var lc = v.toLowerCase();
          if (seen[lc]) return;   // de-dupe (case-insensitive)
          seen[lc] = true;
          out.push(v);
        });
        savedGuests = out.slice();
        return { guests: out, invalid: invalid };
      }

      return { el: wrap, collect: collect };
    }

    // ---- Native single-booking confirmation: our own brand card that books
    // through the proxy. In the combined flow this is only used on fallback
    // paths (proxy degrade, or interview-only recovery after filming booked).

    function renderConfirm(hostId, o) {
      var host = document.getElementById(hostId);
      host.classList.remove('expanded');
      host.style.height = 'auto';
      host.innerHTML = '';

      var bar = document.createElement('div');
      bar.className = 'wo-slot-backbar';
      var back = document.createElement('button');
      back.type = 'button';
      back.className = 'wo-back-btn';
      back.textContent = '← Back to available times';
      back.addEventListener('click', o.backFn);
      bar.appendChild(back);
      host.appendChild(bar);

      if (o.notice) {
        var noticeEl = document.createElement('div');
        noticeEl.className = 'wo-slot-notice';
        noticeEl.textContent = o.notice;
        host.appendChild(noticeEl);
      }

      var card = document.createElement('div');
      card.className = 'wo-confirm-card';

      var title = document.createElement('div');
      title.className = 'wo-confirm-title';
      title.textContent = o.title;
      card.appendChild(title);

      var when = document.createElement('div');
      when.className = 'wo-confirm-when';
      when.textContent = fmtRecapDate(o.slot.start_time) + ' · ' + fmtRecapTime(o.slot.start_time);
      card.appendChild(when);

      var who = document.createElement('div');
      who.className = 'wo-confirm-who';
      who.textContent = doctorPrefill.name + ' · ' + doctorPrefill.email;
      card.appendChild(who);

      var fields = [];
      (o.questions || []).forEach(function (q) {
        var f = buildQuestionField(q, o.kind);
        fields.push(f);
        card.appendChild(f.el);
      });

      var err = document.createElement('div');
      err.className = 'wo-confirm-error';
      card.appendChild(err);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wo-confirm-btn';
      btn.textContent = 'Confirm Booking';
      card.appendChild(btn);

      var note = document.createElement('p');
      note.className = 'wo-confirm-note';
      note.textContent = 'You’ll get a confirmation email with reschedule and cancel links.';
      card.appendChild(note);

      btn.addEventListener('click', function () {
        err.textContent = '';
        var col = collectAnswers(fields);
        if (col.missing) {
          err.textContent = 'Please answer the required questions above.';
          scrollFirstInvalid(card);
          return;
        }

        btn.disabled = true;
        btn.textContent = 'Booking…';
        postForm(WEBHOOK_BOOKING, bookingParams(o.kind, o.event_type_uri, o.slot.start_time, col.answers))
          .then(function (res) {
            if (res && res.ok) { o.onBooked(res); return; }
            if (res && res.slot_taken) {
              err.textContent = 'That time was just taken — refreshing the latest openings…';
              setTimeout(o.onSlotTaken, 1200);
              return;
            }
            // Hard failure: fall back to Calendly's own form so booking is
            // never blocked.
            confirmSlotIntoCalendly(hostId, o.slot.scheduling_url, o.backFn);
          })
          .catch(function () { confirmSlotIntoCalendly(hostId, o.slot.scheduling_url, o.backFn); });
      });

      host.appendChild(card);
      applyFade(host);
      scrollToWizard();
    }

    function renderNoSlots(hostId, minDays, fomo) {
      var host = document.getElementById(hostId);
      host.classList.remove('expanded');
      host.style.height = 'auto';
      var inner;
      if (fomo) {
        // Fully-booked filming: high-demand FOMO that funnels the provider to
        // ask their own marketing manager to open more filming times. No
        // WebOuts contact here on purpose — the marketing-manager ask stays the
        // single call to action so providers become advocates for more slots.
        inner =
          '<h3>These filled up fast</h3>' +
          '<p>Providers have been signing up quickly and demand has been <strong>high</strong> — <strong>every filming slot is already claimed.</strong></p>' +
          '<p><strong>Don’t want to be left behind?</strong> Reach out to your <strong>marketing manager</strong> and ask them to open more filming times so you can get on the schedule.</p>';
      } else {
        if (minDays) minDays = parseInt(minDays, 10) || 10;
        var msg;
        if (minDays) {
          msg = 'Your script interview needs to be at least ' + minDays + ' days before your filming date, and we could not find an open slot that early. Our team will reach out shortly to get you scheduled.';
        } else {
          msg = 'We could not find an open studio time. Our team will reach out shortly to get you scheduled.';
        }
        inner =
          '<h3>Let’s find a time together</h3>' +
          '<p>' + msg + '</p>' +
          '<p class="wo-slots-contact">Prefer to reach us now? Contact Cam Kubasta at ' +
          '<a href="tel:+19202145227">(920) 214-5227</a> or ' +
          '<a href="mailto:ckubasta@webouts.com">ckubasta@webouts.com</a>.</p>';
      }
      host.innerHTML = '<div class="wo-slots-msg">' + inner + '</div>';
      applyFade(host);
    }

    // Transient availability outage (proxy answered ok:false with
    // reason=availability_fetch_failed): friendly retriable message instead
    // of the iframe fallback, so a brief Calendly hiccup doesn't hide the
    // native flow.
    function renderFetchFailed(hostId, retryFn) {
      var host = document.getElementById(hostId);
      host.classList.remove('expanded');
      host.style.height = 'auto';
      host.innerHTML = '';
      var msg = document.createElement('div');
      msg.className = 'wo-slots-msg';
      msg.innerHTML =
        '<h3>We hit a brief hiccup</h3>' +
        '<p>We couldn’t reach our scheduling system just now. Please try again in a moment.</p>' +
        '<p class="wo-slots-contact">Prefer to reach us now? Contact Cam Kubasta at ' +
        '<a href="tel:+19202145227">(920) 214-5227</a> or ' +
        '<a href="mailto:ckubasta@webouts.com">ckubasta@webouts.com</a>.</p>';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wo-confirm-btn wo-pickother-btn';
      btn.textContent = 'Try Again';
      btn.addEventListener('click', retryFn);
      msg.appendChild(btn);
      host.appendChild(msg);
      applyFade(host);
    }

    // ---- Step 1: Filming (custom picker) ----

    function selectedFilmingUrl() {
      var lang = document.querySelector('input[name="wo_language"]:checked');
      var useBi = lang && lang.value === 'bilingual' && CAL_1_BI_URL;
      return useBi ? CAL_1_BI_URL : CAL_1_URL;
    }

    // Sweep the full booking horizon (proxy caps at 300 days) with parallel
    // 90-day windows, so the picker shows every bookable date at once.
    function fetchFilmingSweep(baseUrl) {
      var DAY = 86400000;
      var reqs = [0].map(function (off) {
        var p = 'booking_url=' + encodeURIComponent(baseUrl) + '&days=300';
        if (off) p += '&start=' + encodeURIComponent(new Date(Date.now() + off * DAY).toISOString());
        return postForm(WEBHOOK_FILMING, p);
      });
      return Promise.all(reqs).then(function (parts) {
        var allOk = parts.every(function (d) { return d && d.ok === true; });
        if (!allOk) {
          var fetchFailed = parts.some(function (d) {
            return d && d.ok === false && d.reason === 'availability_fetch_failed';
          });
          return fetchFailed ? { ok: false, reason: 'availability_fetch_failed' } : { ok: false };
        }
        var seen = {};
        var slots = [];
        var bookedSeen = {};
        parts.forEach(function (d) {
          (d.slots || []).forEach(function (s) {
            if (seen[s.start_time]) return;
            seen[s.start_time] = 1;
            slots.push(s);
          });
          (d.bookedOutMonths || []).forEach(function (m) { bookedSeen[m] = 1; });
        });
        slots.sort(function (a, b) { return new Date(a.start_time) - new Date(b.start_time); });
        return {
          ok: true,
          slots: slots,
          bookedOutMonths: Object.keys(bookedSeen),
          event_type_uri: parts[0].event_type_uri || '',
          custom_questions: parts[0].custom_questions || []
        };
      });
    }

    // Pre-warm: start fetching availability the moment the provider begins
    // filling in the form, so the times screen is ready by "Continue".
    var filmingPrefetch = {};   // baseUrl -> { at, promise }
    var PREFETCH_TTL = 600000;  // refetch if older than 10 minutes

    function warmFilming() {
      var url = selectedFilmingUrl();
      if (!url) return;
      var entry = filmingPrefetch[url];
      if (entry && Date.now() - entry.at < PREFETCH_TTL) return;
      var promise = fetchFilmingSweep(url);
      filmingPrefetch[url] = { at: Date.now(), promise: promise };
      promise.then(
        function (res) { if (!res.ok) delete filmingPrefetch[url]; },
        function () { delete filmingPrefetch[url]; }
      );
    }

    function retryFilmingLoad() {
      show('wo-step-1-splash');
      restartLoadbar('wo-step-1-splash');
      loadFilmingStep();
    }

    function loadFilmingStep() {
      var baseUrl = selectedFilmingUrl();
      var settled = false;
      var shownAt = Date.now();
      function fallback() { if (settled) return; settled = true; show('wo-step-1'); initCal1(); }
      var timer = setTimeout(fallback, 15000);
      var entry = filmingPrefetch[baseUrl];
      var sweep = (entry && Date.now() - entry.at < PREFETCH_TTL) ? entry.promise : fetchFilmingSweep(baseUrl);
      sweep
        .then(function (res) {
          if (settled) return;
          // Keep the splash on screen briefly even when pre-warmed, so the
          // step transition never flashes.
          var wait = Math.max(0, 900 - (Date.now() - shownAt));
          setTimeout(function () {
            if (settled) return; settled = true; clearTimeout(timer);
            if (!res.ok) {
              show('wo-step-1');
              if (res.reason === 'availability_fetch_failed') {
                renderFetchFailed('wo-cal-1', retryFilmingLoad);
              } else {
                initCal1();
              }
              return;
            }
            filmingState = { slots: res.slots, baseUrl: baseUrl, months: [], activeMonth: null, bookedOutMonths: res.bookedOutMonths || [] };
            filmingMeta = { event_type_uri: res.event_type_uri || '', custom_questions: res.custom_questions || [] };
            show('wo-step-1');
            renderFilmingPicker();
          }, wait);
        })
        .catch(function () { if (settled) return; settled = true; clearTimeout(timer); show('wo-step-1'); initCal1(); });
    }

    function monthKey(d) { return d.getFullYear() * 12 + d.getMonth(); }

    function monthLabel(k) {
      return new Date(Math.floor(k / 12), k % 12, 1)
        .toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    }

    function buildFilmingMonths() {
      var by = {};
      filmingState.slots.forEach(function (s) {
        var k = monthKey(new Date(s.start_time));
        by[k] = (by[k] || 0) + 1;
      });
      // Grid = union of months that have open slots and months the proxy flagged
      // as fully booked (scheduled but 0 open). Months never on the schedule are
      // absent entirely — no phantom "Fully Booked" for brand-new clients.
      var keySet = {};
      Object.keys(by).forEach(function (k) { keySet[k] = true; });
      (filmingState.bookedOutMonths || []).forEach(function (ym) {
        var p = String(ym).split('-');
        if (p.length === 2) keySet[(parseInt(p[0], 10) * 12) + (parseInt(p[1], 10) - 1)] = true;
      });
      var keys = Object.keys(keySet).map(Number).sort(function (a, b) { return a - b; });
      var months = [];
      keys.forEach(function (k) { months.push({ key: k, count: by[k] || 0 }); });
      return months;
    }

    function renderFilmingPicker() {
      if (!filmingState.slots.length) { renderNoSlots('wo-cal-1', null, true); return; }
      filmingState.months = buildFilmingMonths();
      if (filmingState.months.length <= 1) {
        // Everything falls in the current month: skip the grid, go straight
        // to times. Any longer range shows the grid — including Fully Booked
        // months, so demand stays visible.
        renderFilmingDays(null);
      } else {
        renderFilmingMonths();
      }
    }

    function renderFilmingMonths() {
      var host = document.getElementById('wo-cal-1');
      host.classList.remove('expanded');
      host.style.height = 'auto';
      host.innerHTML = '';

      var title = document.createElement('div');
      title.className = 'wo-slot-title';
      title.textContent = 'Pick your filming month';
      host.appendChild(title);

      var grid = document.createElement('div');
      grid.className = 'wo-month-grid';
      filmingState.months.forEach(function (m) {
        var cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'wo-month-cell' + (m.count ? '' : ' wo-month-empty');
        cell.disabled = !m.count;
        var name = document.createElement('span');
        name.className = 'wo-month-name';
        name.textContent = monthLabel(m.key);
        var count = document.createElement('span');
        count.className = 'wo-month-count';
        count.textContent = m.count ? (m.count + (m.count === 1 ? ' open time' : ' open times')) : 'Fully Booked';
        cell.appendChild(name);
        cell.appendChild(count);
        if (m.count) {
          cell.addEventListener('click', function () { renderFilmingDays(m.key); });
        }
        grid.appendChild(cell);
      });
      host.appendChild(grid);
      applyFade(host);
    }

    function renderFilmingDays(mKey) {
      filmingState.activeMonth = mKey;
      var slots = mKey === null ? filmingState.slots :
        filmingState.slots.filter(function (s) { return monthKey(new Date(s.start_time)) === mKey; });
      renderPicker('wo-cal-1', slots, chooseFilmingSlot, {
        title: 'Pick your filming time',
        intro: 'Choose whichever on-camera time works best for you.',
        onBack: mKey === null ? null : renderFilmingPicker,
        backLabel: '← All months'
      });
    }

    // COMBINED FLOW: selecting a filming slot no longer books it. We hold the
    // selection, show it in a persistent bar, and go straight to the
    // interview picker; both appointments are confirmed together at the end.
    function chooseFilmingSlot(url, startTime) {
      if (bookingInProgress) return;
      var backFn = function () { renderFilmingDays(filmingState.activeMonth); };
      if (!filmingMeta || !filmingMeta.event_type_uri || !startTime) {
        // No proxy metadata: classic Calendly confirm (books filming now; the
        // message listener then runs the original booked-filming step 2).
        confirmSlotIntoCalendly('wo-cal-1', url, backFn);
        return;
      }
      var prev = selectedFilming;
      selectedFilming = { start_time: startTime, scheduling_url: url };
      if (prev && prev.start_time === startTime && scriptingSlots && scriptingSlots.length &&
          scriptingMeta && scriptingSlotsForStart === startTime) {
        // Same time re-picked after "Change": return to where they left off.
        show('wo-step-2');
        if (selectedScripting) renderCombinedConfirm();
        else renderInterviewPicker(null);
        scrollToWizard();
        return;
      }
      // New (or changed) filming time: interview availability must be
      // recomputed against it. Keep the old interview pick around so we can
      // restore it if it is still valid under the new filming date.
      pendingRestoreScripting = selectedScripting;
      selectedScripting = null;
      chosenScriptingTime = null;
      show('wo-step-2-splash');
      restartLoadbar('wo-step-2-splash');
      scrollToWizard();
      loadInterviewStep();
    }

    // Degrade path: the original single filming confirm card, used only when
    // interview availability cannot be fetched for an unbooked selection
    // (scripting proxy down). Books filming alone, then the classic
    // booked-filming step 2 takes over.
    function renderFilmingConfirmLegacy(notice) {
      renderConfirm('wo-cal-1', {
        kind: 'filming',
        title: 'On-Camera Filming Session',
        notice: notice || null,
        slot: selectedFilming,
        questions: filmingMeta.custom_questions,
        event_type_uri: filmingMeta.event_type_uri,
        backFn: function () { renderFilmingDays(filmingState.activeMonth); },
        onSlotTaken: function () {
          selectedFilming = null;
          filmingPrefetch = {};
          show('wo-step-1-splash');
          restartLoadbar('wo-step-1-splash');
          loadFilmingStep();
        },
        onBooked: function (res) {
          filmingBooked = true;
          bookingLinks.filming = res;
          lastFilmingEventUri = res.event_uri || '';
          show('wo-step-2-splash');
          restartLoadbar('wo-step-2-splash');
          scrollToWizard();
          loadScriptingStep(res.event_uri);
        }
      });
    }

    // Fallback: the original Calendly filming widget (used only if the proxy
    // is unreachable or errors).
    function initCal1() {
      if (cal1Loaded) return;
      // Calendly's script never loaded, so there is no iframe to fall back to.
      // Say so and offer a retry rather than returning to an empty box.
      if (!window.Calendly) { renderFetchFailed('wo-cal-1', retryFilmingLoad); return; }
      var host = document.getElementById('wo-cal-1');
      host.innerHTML = '';
      var inner = document.createElement('div');
      host.appendChild(inner);
      var baseUrl = selectedFilmingUrl();
      var sms = doctorPrefill.smsReminderNumber || '';
      var url = appendParam(baseUrl, 'text_reminder_number', sms);
      Calendly.initInlineWidget({
        url: url,
        parentElement: inner,
        prefill: doctorPrefill
      });
      cal1Loaded = true;
    }

    // ---- Interview picker driven by the SELECTED (not yet booked) filming
    // time. Sends filming_start=<ISO> instead of filming_event_uri; the
    // scripting proxy applies the same "at least 10 days before" cutoff. ----

    function buildSelectionBar() {
      var bar = document.createElement('div');
      bar.className = 'wo-selectbar';
      var text = document.createElement('span');
      text.className = 'wo-selectbar-text';
      text.textContent = 'Filming: ' + fmtRecapDate(selectedFilming.start_time) + ' · ' +
        fmtRecapTime(selectedFilming.start_time) + ' (selected)';
      bar.appendChild(text);
      var change = document.createElement('button');
      change.type = 'button';
      change.className = 'wo-selectbar-change';
      change.textContent = 'Change';
      change.addEventListener('click', goBackToFilmingPicker);
      bar.appendChild(change);
      return bar;
    }

    function goBackToFilmingPicker() {
      if (bookingInProgress) return;
      show('wo-step-1');
      if (filmingState) renderFilmingDays(filmingState.activeMonth);
      scrollToWizard();
    }

    function degradeToSequential() {
      pendingRestoreScripting = null;
      scriptingSlots = null;
      scriptingMeta = null;
      scriptingSlotsForStart = null;
      show('wo-step-1');
      renderFilmingConfirmLegacy('We’ll confirm your filming session first — you’ll pick your interview time right after.');
      scrollToWizard();
    }

    function retryInterviewLoad() {
      show('wo-step-2-splash');
      restartLoadbar('wo-step-2-splash');
      loadInterviewStep();
    }

    function loadInterviewStep() {
      var settled = false;
      var startForSlots = selectedFilming.start_time;
      function fallback() { if (settled) return; settled = true; degradeToSequential(); }
      var timer = setTimeout(fallback, 10000);
      postForm(WEBHOOK_SCRIPTING, 'filming_start=' + encodeURIComponent(startForSlots) +
               '&scripting_url=' + encodeURIComponent(CAL_2_URL))
        .then(function (data) {
          if (settled) return; settled = true; clearTimeout(timer);
          if (data && data.ok === false && data.reason === 'availability_fetch_failed') {
            // Transient Calendly outage at the proxy: offer a retry instead
            // of silently degrading to the sequential flow.
            show('wo-step-2');
            renderFetchFailed('wo-cal-2', retryInterviewLoad);
            return;
          }
          if (!data || data.ok !== true || !data.event_type_uri) { degradeToSequential(); return; }
          scriptingMeta = { event_type_uri: data.event_type_uri || '', custom_questions: data.custom_questions || [] };
          scriptingSlots = data.slots || [];
          scriptingSlotsForStart = startForSlots;
          show('wo-step-2');
          if (!scriptingSlots.length) {
            pendingRestoreScripting = null;
            renderNoInterviewSlots(data.min_days || 10);
            return;
          }
          var restore = pendingRestoreScripting;
          pendingRestoreScripting = null;
          if (restore) {
            var match = null;
            scriptingSlots.forEach(function (s) {
              if (s.start_time === restore.start_time) match = s;
            });
            if (match) {
              // Earlier interview pick still fits the new filming date.
              selectedScripting = match;
              chosenScriptingTime = match.start_time;
              renderCombinedConfirm();
              return;
            }
            renderInterviewPicker('Your filming time changed, so your earlier interview pick no longer fits. Please choose a new one.');
            return;
          }
          renderInterviewPicker(null);
        }, function () {
          if (settled) return; settled = true; clearTimeout(timer);
          degradeToSequential();
        });
    }

    function renderInterviewPicker(notice) {
      if (bookingInProgress) return;
      renderPicker('wo-cal-2', scriptingSlots, chooseInterviewSlot, {
        topEl: buildSelectionBar(),
        title: 'Pick your script interview time',
        notice: notice || null,
        selectedTime: selectedScripting ? selectedScripting.start_time : null,
        intro: 'A 20-minute phone call that builds your script. Nothing’s booked yet — you’ll confirm both times on the next screen.'
      });
    }

    function chooseInterviewSlot(url, startTime) {
      selectedScripting = { start_time: startTime, scheduling_url: url };
      chosenScriptingTime = startTime || null;
      renderCombinedConfirm();
    }

    // No interview time fits the selected filming date: since nothing is
    // booked yet, the best fix is choosing a different filming date.
    function renderNoInterviewSlots(minDays) {
      minDays = parseInt(minDays, 10) || 10;
      var host = document.getElementById('wo-cal-2');
      host.classList.remove('expanded');
      host.style.height = 'auto';
      host.innerHTML = '';
      host.appendChild(buildSelectionBar());
      var msg = document.createElement('div');
      msg.className = 'wo-slots-msg';
      msg.innerHTML =
        '<h3>That filming date needs an earlier interview</h3>' +
        '<p>Your script interview must be at least ' + minDays + ' days before filming, and no interview times are open that early. Choosing a later filming date usually opens things up.</p>' +
        '<p class="wo-slots-contact">Or contact Cam Kubasta at ' +
        '<a href="tel:+19202145227">(920) 214-5227</a> or ' +
        '<a href="mailto:ckubasta@webouts.com">ckubasta@webouts.com</a>.</p>';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wo-confirm-btn wo-pickother-btn';
      btn.textContent = 'Choose a Different Filming Date';
      btn.addEventListener('click', goBackToFilmingPicker);
      msg.appendChild(btn);
      host.appendChild(msg);
      applyFade(host);
    }

    // ---- Combined confirmation: one card, both appointments, one click ----

    function confirmRow(num, label, iso, sub, changeFn) {
      var row = document.createElement('div');
      row.className = 'wo-confirm-row';
      var n = document.createElement('span');
      n.className = 'wo-confirm-row-num';
      n.textContent = num;
      row.appendChild(n);
      var body = document.createElement('div');
      body.className = 'wo-confirm-row-body';
      var lab = document.createElement('div');
      lab.className = 'wo-confirm-row-label';
      lab.textContent = label;
      body.appendChild(lab);
      var when = document.createElement('div');
      when.className = 'wo-confirm-row-when';
      when.textContent = fmtRecapDate(iso) + ' · ' + fmtRecapTime(iso);
      body.appendChild(when);
      var sb = document.createElement('div');
      sb.className = 'wo-confirm-row-sub';
      sb.textContent = sub;
      body.appendChild(sb);
      row.appendChild(body);
      var chg = document.createElement('button');
      chg.type = 'button';
      chg.className = 'wo-confirm-row-change';
      chg.textContent = 'Change';
      chg.addEventListener('click', changeFn);
      row.appendChild(chg);
      return row;
    }

    function qGroupLabel(text) {
      var el = document.createElement('div');
      el.className = 'wo-q-group';
      el.textContent = text;
      return el;
    }

    function renderCombinedConfirm() {
      var host = document.getElementById('wo-cal-2');
      host.classList.remove('expanded');
      host.style.height = 'auto';
      host.innerHTML = '';

      var bar = document.createElement('div');
      bar.className = 'wo-slot-backbar';
      var back = document.createElement('button');
      back.type = 'button';
      back.className = 'wo-back-btn';
      back.textContent = '← Back to interview times';
      back.addEventListener('click', function () { renderInterviewPicker(null); });
      bar.appendChild(back);
      host.appendChild(bar);

      var card = document.createElement('div');
      card.className = 'wo-confirm-card';

      var title = document.createElement('div');
      title.className = 'wo-confirm-title';
      title.textContent = 'Confirm Your Appointments';
      card.appendChild(title);

      // Name + email sit directly under the title so the two centered
      // elements read as one header block; everything below is left-aligned.
      var who = document.createElement('div');
      who.className = 'wo-confirm-who';
      who.textContent = doctorPrefill.name + ' · ' + doctorPrefill.email;
      card.appendChild(who);

      var rows = document.createElement('div');
      rows.className = 'wo-confirm-rows';
      rows.appendChild(confirmRow('1', 'Filming Session', selectedFilming.start_time,
        'On camera · at the studio', goBackToFilmingPicker));
      rows.appendChild(confirmRow('2', 'Script Interview', selectedScripting.start_time,
        '20-minute phone call', function () { renderInterviewPicker(null); }));
      card.appendChild(rows);

      var fQs = (filmingMeta && filmingMeta.custom_questions) || [];
      var sQs = (scriptingMeta && scriptingMeta.custom_questions) || [];
      var both = fQs.length && sQs.length;
      var filmingFields = [];
      var scriptingFields = [];
      if (both) card.appendChild(qGroupLabel('About your filming session'));
      fQs.forEach(function (q) {
        var f = buildQuestionField(q, 'filming');
        filmingFields.push(f);
        card.appendChild(f.el);
      });
      if (both) card.appendChild(qGroupLabel('About your script interview'));
      sQs.forEach(function (q) {
        var f = buildQuestionField(q, 'scripting');
        scriptingFields.push(f);
        card.appendChild(f.el);
      });

      var err = document.createElement('div');
      err.className = 'wo-confirm-error';
      card.appendChild(err);

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'wo-confirm-btn';
      btn.textContent = 'Confirm Both Bookings';
      card.appendChild(btn);

      var note = document.createElement('p');
      note.className = 'wo-confirm-note';
      note.textContent = 'One click books both. You’ll get a confirmation email for each, with reschedule and cancel links.';
      card.appendChild(note);

      btn.addEventListener('click', function () {
        err.textContent = '';
        var fCol = collectAnswers(filmingFields);
        var sCol = collectAnswers(scriptingFields);
        if (fCol.missing || sCol.missing) {
          err.textContent = 'Please answer the required questions above.';
          scrollFirstInvalid(card);
          return;
        }
        // Freeze the selections NOW. Everything below (both POSTs and every
        // fallback) uses only these locals, never the mutable globals, so a
        // stray click mid-flight can't change what gets booked or shown.
        var fSlot = selectedFilming;
        var sSlot = selectedScripting;
        bookingInProgress = true;
        unloadGuardOn = true;

        // Belt and braces: dead-stop every control on this view (Back bar,
        // per-row Change, choice pills, Confirm) while the sequence runs.
        Array.prototype.forEach.call(host.querySelectorAll('button'), function (b) {
          b.disabled = true;
        });
        btn.textContent = 'Booking your filming session…';

        // Booking proxy hard-down before anything booked: Calendly's own form
        // for filming; the message listener then drives the classic step 2.
        function filmingHardFallback() {
          bookingInProgress = false;
          unloadGuardOn = false;   // nothing booked yet
          show('wo-step-1');
          confirmSlotIntoCalendly('wo-cal-1', fSlot.scheduling_url, function () {
            renderFilmingDays(filmingState.activeMonth);
          });
          scrollToWizard();
        }

        // Filming IS booked; scripting booking hard-failed: Calendly's own
        // form for the interview only. event_scheduled -> recap via listener.
        function scriptingHardFallback() {
          bookingInProgress = false;
          confirmSlotIntoCalendly('wo-cal-2', sSlot.scheduling_url, function () {
            renderScriptingPicker();
          });
        }

        postForm(WEBHOOK_BOOKING, bookingParams('filming', filmingMeta.event_type_uri,
            fSlot.start_time, fCol.answers, savedGuests))
          .then(function (res) {
            if (res && res.ok) {
              filmingBooked = true;
              bookingLinks.filming = res;
              lastFilmingEventUri = res.event_uri || '';
              scriptingFilmingStart = fSlot.start_time;
              btn.textContent = 'Filming booked ✓ — booking your interview…';
              postForm(WEBHOOK_BOOKING, bookingParams('scripting', scriptingMeta.event_type_uri,
                  sSlot.start_time, sCol.answers, savedGuests))
                .then(function (res2) {
                  if (res2 && res2.ok) {
                    bookingLinks.scripting = res2;
                    chosenScriptingTime = sSlot.start_time;
                    bookingInProgress = false;
                    renderRecap();
                    show('wo-all-done');
                    scrollToWizard();
                    return;
                  }
                  if (res2 && res2.slot_taken) {
                    // Filming booked, interview time gone: say so plainly,
                    // then refresh times against the now-real filming event.
                    bookingInProgress = false;
                    selectedScripting = null;
                    chosenScriptingTime = null;
                    pendingScriptingNotice = 'The interview time you picked was just taken — here are the latest openings. Your filming session is safely booked.';
                    show('wo-step-2-splash');
                    restartLoadbar('wo-step-2-splash');
                    scrollToWizard();
                    loadScriptingStep(lastFilmingEventUri);
                    return;
                  }
                  scriptingHardFallback();
                }, scriptingHardFallback);
              return;
            }
            if (res && res.slot_taken) {
              // Nothing booked. Back to the filming picker with fresh slots.
              err.textContent = 'Your filming time was just taken — refreshing the latest openings…';
              setTimeout(function () {
                bookingInProgress = false;
                unloadGuardOn = false;   // nothing booked
                selectedFilming = null;
                selectedScripting = null;
                chosenScriptingTime = null;
                filmingPrefetch = {};
                show('wo-step-1-splash');
                restartLoadbar('wo-step-1-splash');
                scrollToWizard();
                loadFilmingStep();
              }, 1200);
              return;
            }
            filmingHardFallback();
          }, filmingHardFallback);
      });

      host.appendChild(card);
      applyFade(host);
      scrollToWizard();
    }

    // ---- Step 2 (booked-filming mode): script interview picker constrained
    // by a REAL filming event. Used after fallback filming bookings and for
    // interview-only recovery when the combined booking half-succeeds. ----

    // One-shot notice delivery for booked-mode exits that don't run
    // renderScriptingPicker (which consumes pendingScriptingNotice itself):
    // shows the message above whatever is already in wo-cal-2 and clears it,
    // so "your interview did NOT book" is never silently dropped or leaked.
    function showScriptingNoticeAbove() {
      var text = pendingScriptingNotice;
      pendingScriptingNotice = null;
      if (!text) return;
      var host = document.getElementById('wo-cal-2');
      var div = document.createElement('div');
      div.className = 'wo-slot-notice';
      div.textContent = text;
      host.insertBefore(div, host.firstChild);
    }

    function loadScriptingStep(filmingUri) {
      lastFilmingEventUri = filmingUri || '';
      var settled = false;
      function fallback() {
        if (settled) return; settled = true;
        show('wo-step-2'); initCal2(); showScriptingNoticeAbove();
      }
      var timer = setTimeout(fallback, 8000);
      postForm(WEBHOOK_SCRIPTING, 'filming_event_uri=' + encodeURIComponent(filmingUri || '') +
               '&scripting_url=' + encodeURIComponent(CAL_2_URL))
        .then(function (data) {
          if (settled) return; settled = true; clearTimeout(timer);
          if (!data || data.ok !== true) { show('wo-step-2'); initCal2(); showScriptingNoticeAbove(); return; }
          scriptingFilmingStart = data.filming_start || null;
          scriptingMeta = { event_type_uri: data.event_type_uri || '', custom_questions: data.custom_questions || [] };
          show('wo-step-2');
          if (data.slots && data.slots.length) { scriptingSlots = data.slots; renderScriptingPicker(); }
          else { renderNoSlots('wo-cal-2', data.min_days || 10); showScriptingNoticeAbove(); }
        })
        .catch(function () {
          if (settled) return; settled = true; clearTimeout(timer);
          show('wo-step-2'); initCal2(); showScriptingNoticeAbove();
        });
    }

    function filmingBadgeText() {
      if (!scriptingFilmingStart) return null;
      var fd = new Date(scriptingFilmingStart);
      if (isNaN(fd.getTime())) return null;
      var dateOpts = { weekday: 'long', month: 'long', day: 'numeric' };
      if (fd.getFullYear() !== new Date().getFullYear()) dateOpts.year = 'numeric';
      return '✓ Filming booked · ' + fd.toLocaleDateString(undefined, dateOpts) +
        ' at ' + fd.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    }

    function renderScriptingPicker() {
      var notice = pendingScriptingNotice;
      pendingScriptingNotice = null;
      renderPicker('wo-cal-2', scriptingSlots, chooseScriptingSlot, {
        badge: filmingBadgeText(),
        title: 'Pick your script interview time',
        notice: notice,
        intro: 'Now pick a time for your script interview. We are only showing times that leave enough runway to finish your script before your filming date.'
      });
    }

    function chooseScriptingSlot(url, startTime) {
      chosenScriptingTime = startTime || null;
      if (!scriptingMeta || !scriptingMeta.event_type_uri || !startTime) {
        confirmSlotIntoCalendly('wo-cal-2', url, renderScriptingPicker);
        return;
      }
      renderConfirm('wo-cal-2', {
        kind: 'scripting',
        title: 'Script Interview',
        slot: { start_time: startTime, scheduling_url: url },
        questions: scriptingMeta.custom_questions,
        event_type_uri: scriptingMeta.event_type_uri,
        backFn: renderScriptingPicker,
        onSlotTaken: function () {
          show('wo-step-2-splash');
          restartLoadbar('wo-step-2-splash');
          loadScriptingStep(lastFilmingEventUri);
        },
        onBooked: function (res) {
          bookingLinks.scripting = res;
          renderRecap();
          show('wo-all-done');
          scrollToWizard();
        }
      });
    }

    // ---- Final screen: recap both appointments ----

    function fmtRecapDate(iso) {
      var d = new Date(iso);
      var o = { weekday: 'long', month: 'long', day: 'numeric' };
      if (d.getFullYear() !== new Date().getFullYear()) o.year = 'numeric';
      return d.toLocaleDateString(undefined, o);
    }

    function fmtRecapTime(iso) {
      return new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
    }

    // Rebuild the all-done screen with the two booked dates. If we came down
    // a fallback path and know neither date, leave the page's default message.
    function renderRecap() {
      unloadGuardOn = false;   // both halves settled — safe to leave the page
      var host = document.getElementById('wo-all-done');
      if (!host) return;
      if (!scriptingFilmingStart && !chosenScriptingTime) return;
      function isHttps(u) { return typeof u === 'string' && u.indexOf('https://') === 0; }
      function recapLink(href, text) {
        var a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = text;
        return a;
      }
      // Built with createElement (not innerHTML) so API-sourced URLs can
      // never inject markup; links only render for https:// values.
      function recapRow(label, iso, links) {
        var row = document.createElement('div');
        row.className = 'wo-recap-row';
        var lab = document.createElement('span');
        lab.className = 'wo-recap-label';
        lab.textContent = label;
        row.appendChild(lab);
        var when = document.createElement('span');
        when.className = 'wo-recap-when';
        when.appendChild(document.createTextNode(fmtRecapDate(iso) + ' · ' + fmtRecapTime(iso)));
        if (links && isHttps(links.reschedule_url) && isHttps(links.cancel_url)) {
          var extras = document.createElement('span');
          extras.className = 'wo-recap-links';
          extras.appendChild(recapLink(links.reschedule_url, 'Reschedule'));
          extras.appendChild(document.createTextNode(' · '));
          extras.appendChild(recapLink(links.cancel_url, 'Cancel'));
          when.appendChild(extras);
        }
        row.appendChild(when);
        return row;
      }
      host.innerHTML =
        '<div class="wo-check">✓</div>' +
        '<h2>You’re all set!</h2>' +
        '<div class="wo-recap"></div>' +
        '<p class="wo-recap-next">Calendar invites are on their way to your inbox. We’ll craft your script together at the interview, and everything locks in one week before filming.</p>';
      var recap = host.querySelector('.wo-recap');
      if (chosenScriptingTime) recap.appendChild(recapRow('Script Interview', chosenScriptingTime, bookingLinks.scripting));
      if (scriptingFilmingStart) recap.appendChild(recapRow('Filming Session', scriptingFilmingStart, bookingLinks.filming));
      applyFade(host);
    }

    // Fallback: the original, unconstrained script-interview calendar.
    function initCal2() {
      if (cal2Loaded) return;
      if (!window.Calendly) {
        renderFetchFailed('wo-cal-2', function () {
          show('wo-step-2-splash');
          restartLoadbar('wo-step-2-splash');
          loadScriptingStep(lastFilmingEventUri);
        });
        return;
      }
      var host = document.getElementById('wo-cal-2');
      host.innerHTML = '';
      var inner = document.createElement('div');
      host.appendChild(inner);
      var sms = doctorPrefill.smsReminderNumber || '';
      var url = appendParam(CAL_2_URL, 'location', sms);
      url = appendParam(url, 'text_reminder_number', sms);
      Calendly.initInlineWidget({
        url: url,
        parentElement: inner,
        prefill: doctorPrefill
      });
      cal2Loaded = true;
    }

    function expandCalendars() {
      var els = document.querySelectorAll('.wo-cal-container');
      els.forEach(function (el) { el.classList.add('expanded'); });
    }

    function handleContinue() {
      if (isLocked()) { pollLock(); return; }
      // The config resolves in ~2s while the form is still being filled in, so
      // this is effectively never seen. It exists because a page carrying no
      // hidden-input fallback must not proceed without its Calendly links.
      if (!configSettled) {
        var waitErr = document.getElementById('wo-error');
        if (waitErr) waitErr.textContent = 'One moment…';
        configReady.then(function () {
          if (waitErr) waitErr.textContent = '';
          handleContinue();
        });
        return;
      }
      var first = document.getElementById('wo_first_name');
      var last = document.getElementById('wo_last_name');
      var email = document.getElementById('wo_email');
      var phone = document.getElementById('wo_phone');
      var err = document.getElementById('wo-error');

      [first, last, email, phone].forEach(function (i) { i.classList.remove('wo-invalid'); });
      err.textContent = '';

      var missing = [];
      if (!first.value.trim()) { missing.push('First Name'); first.classList.add('wo-invalid'); }
      if (!last.value.trim()) { missing.push('Last Name'); last.classList.add('wo-invalid'); }
      if (!email.value.trim()) { missing.push('Email'); email.classList.add('wo-invalid'); }
      var phoneE164 = buildPhone();
      if (!phoneE164 || phoneE164.length < 8) { missing.push('Mobile Phone'); phone.classList.add('wo-invalid'); }

      if (missing.length) {
        err.textContent = 'Please complete: ' + missing.join(', ');
        return;
      }

      // Optional guests (caches into savedGuests, attached to both invites later).
      var gCol = guestsForm ? guestsForm.collect() : { guests: [], invalid: false };
      if (gCol.invalid) {
        err.textContent = 'Please enter valid guest email addresses, or remove them.';
        return;
      }

      doctorPrefill = {
        firstName: first.value.trim(),
        lastName: last.value.trim(),
        name: first.value.trim() + ' ' + last.value.trim(),
        email: email.value.trim(),
        smsReminderNumber: phoneE164
      };

      show('wo-step-1-splash');
      restartLoadbar('wo-step-1-splash');
      loadFilmingStep();
    }

    document.getElementById('wo-continue').addEventListener('click', handleContinue);

    // Inject the optional-guests field into the static info form (step 0), kept
    // in JS so no per-page HTML edit is needed. Place it directly above the
    // Filming Language field so guests sit with the contact info (consistent
    // spacing) and the language selector stays the last field, at the bottom.
    (function () {
      guestsForm = buildGuestsSection();
      var lang = document.getElementById('wo-language-field');
      if (lang && lang.parentNode) { lang.parentNode.insertBefore(guestsForm.el, lang); return; }
      // Fallback for any page without the language-field id: above Continue.
      var cont = document.getElementById('wo-continue');
      var anchor = (cont && cont.closest && cont.closest('.wo-actions')) || cont;
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(guestsForm.el, anchor);
    })();

    // Pre-warm availability while the form is being filled in (and re-warm if
    // the language choice switches the target calendar).
    booking.addEventListener('focusin', warmFilming);
    booking.addEventListener('change', warmFilming);
    // Start the Calendly sweep the moment the page loads, so availability is
    // ready (or nearly so) by the time the provider clicks Continue. Waits on
    // the resolved config so it warms the right calendar — and so a page with
    // no hidden inputs has a URL to warm at all.
    configReady.then(warmFilming);

    // Lock the whole wizard immediately if anything the booking depends on is
    // down, then keep checking so it unlocks on its own the moment it returns.
    pollLock();
    setInterval(pollLock, 60000);

    window.addEventListener('message', function (e) {
      if (!e.data || typeof e.data !== 'object') return;
      var event = e.data.event;
      if (!event || event.indexOf('calendly.') !== 0) return;

      if (event === 'calendly.date_and_time_selected') {
        expandCalendars();
        return;
      }

      if (event === 'calendly.event_scheduled') {
        if (!filmingBooked) {
          // First booking = filming. Kick off the constrained script-interview step.
          filmingBooked = true;
          var filmingUri = (e.data.payload && e.data.payload.event && e.data.payload.event.uri) || '';
          show('wo-step-2-splash');
          restartLoadbar('wo-step-2-splash');
          scrollToWizard();
          loadScriptingStep(filmingUri);
        } else {
          // Second booking = script interview. Done — show the recap.
          renderRecap();
          show('wo-all-done');
          scrollToWizard();
        }
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

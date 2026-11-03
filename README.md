# WebOuts Booking Widget

Self-contained booking wizard for the WebOuts profile-booking pages
(OH / Orlando / Northwell / MSK / Griffin, etc.). One file injects its own CSS
and runs the widget, so each page only needs a single `<script>` tag.

## How it's deployed

The Bricks footer (Bricks → Settings → Custom code → Body footer scripts) has one line:

```html
<script src="https://app.webouts.com/booking-widget.js"></script>
```

That address is a Cloudflare Pages Function in the ClockUp repo
(`ClockUp-Web/functions/booking-widget.js.js`). It reads `widget.js` from this
repo's `main` branch (edge cache 60 s, browser cache 5 min) and falls back to
jsDelivr `@main` if GitHub is down. Hospital networks can reach it because the
widget already books through `app.webouts.com/api/book`.

Do not go back to a GitHub-API loader or `@latest`: GitHub allows 60 lookups per
hour per network, and `@latest` is the newest git tag, so hospital staff got an
old wizard (2026-11-03).

## Per-page config stays in the page

The widget reads each client's Calendly URLs from hidden inputs already present
in the page HTML — nothing here is client-specific:

- `#wo-cal-1-url` / `#wo-cal-1-bilingual-url` — filming event type(s)
- `#wo-cal-2-url` — script-interview event type

So one `widget.js` serves every client; onboarding a client is just the page HTML.

## Updating

Edit `widget.js`, commit, push to `main`. Live on every page within about 5 minutes.
No tags, purges or Bricks edits needed.

## Outage lock

The widget checks Calendly's status page on load and locks the whole wizard if
Calendly's core systems (API / site / Notifications / Webhooks) are degraded, so
a provider can't book during an outage and get no invite. It auto-unlocks when
Calendly recovers. A server-side gate in the n8n create-booking proxy backstops it.

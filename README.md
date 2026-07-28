# WebOuts Booking Widget

Self-contained booking wizard for the WebOuts profile-booking pages
(OH / Orlando / Northwell / MSK / Griffin, etc.). One file injects its own CSS
and runs the widget, so each page only needs a single `<script>` tag.

## How it's deployed

Served via jsDelivr from this repo. On each client page (Bricks → Settings →
**Body footer scripts**) add one line:

```html
<script src="https://cdn.jsdelivr.net/gh/WebOuts-Media/webouts-booking-widget@main/widget.js"></script>
```

That replaces both the old inline **Custom CSS** block and the **Body-footer JS**
block. Nothing else in Bricks changes.

## Per-page config stays in the page

The widget reads each client's Calendly URLs from hidden inputs already present
in the page HTML — nothing here is client-specific:

- `#wo-cal-1-url` / `#wo-cal-1-bilingual-url` — filming event type(s)
- `#wo-cal-2-url` — script-interview event type

So one `widget.js` serves every client; onboarding a client is just the page HTML.

## Updating

1. Edit `widget.js`, commit, push.
2. Purge the CDN cache so it goes live immediately:
   `curl https://purge.jsdelivr.net/gh/WebOuts-Media/webouts-booking-widget@main/widget.js`

Pin to a commit or tag if you ever need to freeze a version.

## Outage lock

The widget checks Calendly's status page on load and locks the whole wizard if
Calendly's core systems (API / site / Notifications / Webhooks) are degraded, so
a provider can't book during an outage and get no invite. It auto-unlocks when
Calendly recovers. A server-side gate in the n8n create-booking proxy backstops it.

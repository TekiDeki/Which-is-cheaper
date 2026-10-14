**Which of these two products is actually cheaper?**

Type in two products (price + size), and the app instantly tells you the
price per unit and highlights the winner in big green text. That's it.

🔗 **Live app:** https://tekideki.github.io/Which-is-cheaper/

---

## ✨ Features

- ⚡ **Instant comparison** - no "Calculate" button, results update as you type
- 📏 **Automatic unit conversion** - g ↔ kg ↔ oz ↔ lb, ml ↔ L, plus a generic count unit
- 🎯 **Smart display units** - shows price per 100g, per kg, per 100ml, or per L automatically
- 🏆 **Clear verdict** - "A is 12% cheaper" with big visual winner/loser highlighting
- 🌗 **Light & dark theme** - respects your system preference, remembers your choice
- 🌍 **4 languages** - English, Română, Srpski (latinica), Српски (ћирилица)
- 🔗 **Shareable links** - every comparison is encoded in the URL
- 📱 **Mobile-first** - 48px touch targets, numeric keypad, no zoom jank
- 📦 **Works offline** - full PWA with service worker caching
- 🪶 **Zero dependencies** - no frameworks, no build step, no tracking
- 💾 **~18 KB total** - loads instantly on any connection

---

## 🚀 How to Use

1. Open the app: **https://tekideki.github.io/Which-is-cheaper/**
2. Enter **Product A** - price + size + unit
3. Enter **Product B** - price + size + unit
4. Read the verdict. 🏆

That's it. No account, no ads, no data leaves your browser.

### Example

| Product | Price | Size | Unit | Result |
|---|---|---|---|---|
| A | 4.99 | 500 | g | **$0.99 / 100g** ✅ |
| B | 6.49 | 750 | g | $0.87 / 100g |

→ **B is 12% cheaper** (per 100g)

---

## 🧠 Why It's Useful

We've all stood in a grocery aisle comparing a 500g box at $4.99 vs a 750g
box at $6.49 and given up. This app solves that in **under 3 seconds**.

Perfect for:
- 🛒 Grocery shopping (cereal, coffee, detergent, meat, produce)
- 📦 Bulk deals ("is the 5kg bag really a better value?")
- 🧴 Toiletries (shampoo, toothpaste, soap)
- 🐾 Pet food, baby formula, anything sold in multiple sizes
- 🍺 Comparing bottles, cans, packs at a bar or store

---

## 🌍 Supported Units

| Family | Units | Auto-converts between |
|---|---|---|
| **Mass** | g, kg, oz, lb | ✅ All four |
| **Volume** | ml, L | ✅ Both |
| **Count** | ct / buc / kom / ком | - |

If you compare **different families** (e.g. grams vs milliliters), the app
tells you honestly: *"Different unit types - can't compare."*

---

## 🛠️ Tech Stack

- **HTML5** - one file, semantic markup
- **CSS3** - custom properties for theming, no preprocessor
- **Vanilla JavaScript** - no frameworks, no bundler, no npm
- **Service Worker** - offline caching (cache-first strategy)
- **Web App Manifest** - installable as a PWA
- **JSON-LD** - structured data for SEO (WebApplication, FAQPage, BreadcrumbList)

No external CDNs. No analytics. No fonts to download. No tracking.

---


## Install app

Use the **Install app** button near the footer. On supported browsers it opens the native installation prompt when available. Otherwise it shows localized instructions for Safari on iPhone/iPad, Android, and desktop browsers. Installation is controlled by the browser; no installation is claimed without its confirmation. The button is hidden in a standalone/minimal-ui app window and after an `appinstalled` event in the current session. A normal browser tab cannot always detect a previous installation.

Installation needs HTTPS or trustworthy localhost. The controls add no dependencies, tracking, network calls or storage keys; existing application data is not modified. On an existing cached version, revisit online and refresh after the service worker has updated to see the button. No automatic reload is forced.

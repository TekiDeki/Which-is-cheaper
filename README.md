# Which is Cheaper?

**Compare value, not just the price tag.** A local price-per-unit calculator by [TekiDeki](https://github.com/TekiDeki).

**[Open app](https://tekideki.github.io/Which-is-cheaper/)** · [Support development](https://paypal.me/TekiDeki) · [Apache-2.0](LICENSE)

## Features

- Compare two products instantly, including **multipacks and one percentage discount** per product.
- Enter the **price of the entire pack**, quantity **per item**, unit, number of items (default 1), and discount (default 0%). Shipping, deposits, coupons and tax differences are not automatically included.
- Mass: **g, kg, oz, lb**; volume: **ml, L**; count: **ct**. Mass ounces are not fluid ounces. Different families cannot be compared.
- Price per 100 g/kg, 100 ml/L or item, after discount. A clear winner and percentage difference, plus a **proportional saving for equal quantities**. That saving can involve fractional packs; it is **not a checkout total**.
- Exact scaled-integer cross-products choose the winner. Rounding is only for display, so mathematically equal prices do not produce false winners from floating-point noise. Small nonzero percentage differences are shown as `<0.01%`, not `0% cheaper`. Almost-total but non-free savings are shown as `>99.99%`, not a misleading `100%`.
- Strict dot/comma decimal input, visible labels and localized field errors. Text suffixes, exponents and grouping separators are rejected, not partially parsed.
- **EN / RO / SR Latin / SR Cyrillic**, working language URLs, localized metadata, light/dark themes, responsive layout, keyboard focus, pinch zoom, visible FAQs.
- Clean address bar during editing. Share creates a separate comparison link; existing legacy comparison links still load and are then cleaned without reloading.
- Install button: native prompt when available; otherwise browser instructions for iOS/Android/desktop. Offline after a successful initial online visit and service-worker installation. Browser/platform support varies.

## Example

| Product | Whole-pack price | Quantity per item | Items per pack | Unit price |
|---|---:|---:|---:|---:|
| A | 4.99 | 500 g | 1 | 0.998 per 100 g |
| B | 6.49 | 750 g | 1 | ≈0.865333 per 100 g |

**B is approximately 13.29% cheaper per unit.** Use the same currency for both inputs; there is no currency conversion. Packaging, quality and whether the larger quantity will actually be used also matter.

Multipack example: A costs 6 for 6 × 330 ml; B costs 5 for 1 × 1.5 L. A costs ≈3.03/L and B ≈3.33/L, so A is about 9.09% cheaper per unit before discounts.

## Numeric model and bounds

Inputs accept a decimal dot **or** comma and up to **6 decimal places**, with no thousands separators. `1,234` means decimal 1.234, not 1,234 items; `1,234.56` is rejected. Prices: **0-1,000,000,000**. Quantity per item: **0.000001-1,000,000,000**. Pack count: a whole number **1-1,000,000**. Discount: **0-100%**. A zero price/100% discount is allowed; zero quantity is not.

Decimal values are parsed into millionths with `BigInt`. Exact conversion factors use billionths of a gram/milliliter/count unit: **1 oz = 28.349523125 g; 1 lb = 453.59237 g**. Discounted price numerators and total-quantity numerators are compared by cross multiplication. `Number`/`Intl` are used only for displayed prices, percentages and proportional estimates. Very large/tiny values may use scientific notation. This is a shopping aid, not an accounting, tax or billing system; no currency-specific checkout rounding is applied.

## Privacy and sharing

No backend, analytics, tracking, external scripts, fonts, runtime libraries or comparison history. **Only language and theme** are saved using the existing local-storage keys `lang` and `theme`. Calculations remain in page memory. Reloading a clean URL starts with the default comparison, not previous inputs.

Choosing Share intentionally sends a link containing the comparison to the selected sharing app/clipboard. Anyone with that link can see its values. The page address itself is not changed by sharing. A denied native share does not falsely report a copied link; clipboard/legacy copy success is checked and manual copying is offered if automatic copying fails.

Simple comparisons use the existing 7-part fragment format. Advanced multipack/discount comparisons use a bounded **`v2` fragment**. Current code reads both legacy 6/7-part and v2 links, validates all fields/units/language before applying anything, rejects malformed/oversized comparisons and cleans recognized comparison fragments. Unrelated anchors and query parameters are not removed. Shared links encode the selected language; unrelated query parameters are preserved, while a stale `lang` query is removed from the generated share URL. An older cached app may not understand v2 links: update online and reopen the shared link.

## Run / deploy

All application CSS, JS, translations and calculations are embedded in **`index.html`**. There is no build step or runtime dependency. Open that file for basic calculation, or serve the repository:

```sh
python3 -m http.server 8092 --bind 0.0.0.0
# On the same device: http://localhost:8092/
```

Use HTTPS for deployment and PWA installation. File URLs and ordinary LAN HTTP cannot be promised full PWA/clipboard support. GitHub Pages uses `main`, repository root. The manifest retains its existing installation identity/start URL.

`sw.js` uses the app-only **`cheaper-v6`** cache, network-first HTML navigation and a fixed offline shell (including LICENSE/NOTICE). Other apps’ caches are preserved; arbitrary user URLs are not added to this cache. Updates do not clear local storage or force a page reload. Increase the cache version when changing app files.

SEO includes localized canonical/hreflang/description, Open Graph/Twitter, a factual WebApplication schema, FAQ schema matching **visible** FAQ content, sitemap and robots. There is no invented aggregate rating. JavaScript-free crawlers/social previews may use the default English metadata; no search ranking or indexing guarantee is made.

## License

Copyright © 2026 Kristian Mario Mišković (TekiDeki). [Apache License 2.0](LICENSE); see [NOTICE](NOTICE).

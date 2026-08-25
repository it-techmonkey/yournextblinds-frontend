import type { Product } from '@/types';

/** Tag carried by all 19 Honeycomb/Cellular products; drives the bespoke PDP. */
export const HONEYCOMB_CELLULAR_TAG = 'honeycomb-cellular-shades';

/** Collection page slug. Also the curated collection's tagSlug. */
export const HONEYCOMB_CELLULAR_COLLECTION_SLUG = 'honeycomb-cellular-shades';

// Fallback size bounds — only used before the server-fetched price matrix lands
// (`sizeRanges` in ProductPage overrides these the instant it loads, which in
// practice is immediately: the matrix ships via SSR as `initialPriceMatrix`).
//
// The real, enforced range is whatever the price grid covers: 24-96"W x 36-96"H,
// i.e. the 12 price groups in pricing-data.json. The supplier catalogue's "Size
// Considerations for All Shades" table (HoneyComb_ProductCatalog_032626.pdf, p.1)
// states a wider spec range — min
// width 9" (Cordless), max width 96" (107" via Special Quote, not offered through
// this instant-quote flow), min height 18", max height 120" — but none of 9-23"W,
// 97-120"H has real per-size pricing behind it in the supplier's price grid (which
// genuinely starts at 24"x36"), so it is intentionally NOT reachable here. Extending
// it would mean inventing prices rather than reflecting the doc's own pricing data.
export const HONEYCOMB_CELLULAR_SIZE_LIMITS = {
  minWidth: 24,
  maxWidth: 96,
  minHeight: 36,
  maxHeight: 96,
};

export const HONEYCOMB_CELLULAR_INSTALLATION_OPTIONS = [
  {
    id: 'inside-mount',
    name: 'Inside Mount',
    description: 'Shade is mounted inside the window recess.',
    price: 0,
    image: '/products/installation/inside-mount-cellular.webp',
  },
  {
    id: 'outside-mount',
    name: 'Outside Mount',
    description: 'Shade is mounted outside the window recess on the wall or frame.',
    price: 0,
    image: '/products/installation/outside-mount-cellular.webp',
  },
];

// NOTE — deliberate deviation from the supplier catalogue (HoneyComb_ProductCatalog_032626.pdf).
// The real control model is six systems with their own size limits and surcharges:
//   Cordless $0 (13-84"W) · CCL $0 (15-96"W) · Motorized +$365 (24-96"W)
//   TDBU +$83 · 2-on-1 headrail +$72 · No Drill +$13 · SafeWand +$63
//   Single-Channel Remote +$88 · Multi-Channel +$116 · width over 93" +$100 freight
// The options below are the phase-1 values (carried over from Roller Band F) and were
// explicitly kept as-is by the owner. Revisit before treating these prices as correct.
export const HONEYCOMB_CELLULAR_CONTROL_OPTIONS = [
  {
    id: 'hc-continuous-chain',
    name: 'Continuous Chain',
    description: 'Manual chain control with selectable left or right side.',
    price: 0,
    image: '/products/control/continues-chain-picture.webp',
  },
  {
    id: 'hc-cordless',
    name: 'Cordless',
    description: 'Child safe cordless operation.',
    price: 35.75,
    image: '/products/control/cordless-zebra-shade.webp',
  },
];

// A single fixed option — there is no remote-channel choice for this card, the
// flat $95 motorization base (see calculateTotalPrice / calculateProductPrice)
// already covers it. Kept as a one-item array so the surrounding code (which
// expects an options list: .find/.map/[0]) needs no special-casing.
export const HONEYCOMB_CELLULAR_MOTORIZATION_OPTIONS = [
  {
    id: 'hc-motorized-wand',
    name: 'Motorized Wand',
    description: 'Motorized control operated by wand.',
    price: 0,
    image: '/products/control/motorised-option.webp',
  },
];

export const HONEYCOMB_CELLULAR_NO_DRILL_UPGRADE_OPTION = {
  id: 'hc-no-drill-upgrade',
  name: 'Upgrade to No Drill System',
  description: 'Drill-free installation system.',
  price: 39,
};

/**
 * Tag-only: all 19 products carry HONEYCOMB_CELLULAR_TAG, and each has its own
 * handle, so there is no single product handle to match on.
 */
export function isHoneycombCellularProduct(product: Pick<Product, 'tags'>) {
  return product.tags.some((tag) => tag.toLowerCase() === HONEYCOMB_CELLULAR_TAG);
}

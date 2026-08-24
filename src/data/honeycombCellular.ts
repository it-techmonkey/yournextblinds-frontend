import type { Product } from '@/types';

/** Tag carried by all 19 Honeycomb/Cellular products; drives the bespoke PDP. */
export const HONEYCOMB_CELLULAR_TAG = 'honeycomb-cellular-shades';

/** Collection page slug. Also the curated collection's tagSlug. */
export const HONEYCOMB_CELLULAR_COLLECTION_SLUG = 'honeycomb-cellular-shades';

// Fallback size bounds, matching the 11x11 price grid shared by all 12 groups
// (widths 24-96", heights 36-96"). Only used before the server-fetched price
// matrix lands — `sizeRanges` in ProductPage derives the real bounds from it.
export const HONEYCOMB_CELLULAR_SIZE_LIMITS = {
  minWidth: 24,
  maxWidth: 96,
  minHeight: 36,
  maxHeight: 96,
};

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

export const HONEYCOMB_CELLULAR_MOTORIZATION_OPTIONS = [
  {
    id: 'hc-single-channel',
    name: 'Single Channel',
    description: 'Single channel remote',
    price: 24,
    image: '/products/control/motorised-option.webp',
  },
  {
    id: 'hc-multi-channel',
    name: 'Multi Channel',
    description: 'Multi channel remote',
    price: 39,
    image: '/products/control/motorised-option.webp',
  },
];

/**
 * Tag-only: all 19 products carry HONEYCOMB_CELLULAR_TAG, and each has its own
 * handle, so there is no single product handle to match on.
 */
export function isHoneycombCellularProduct(product: Pick<Product, 'tags'>) {
  return product.tags.some((tag) => tag.toLowerCase() === HONEYCOMB_CELLULAR_TAG);
}

import type { Product } from '@/types';

export const DAY_NIGHT_BAND_H_PRODUCT_HANDLE = 'bakery-warmth-dual-zebra-shade';
export const DAY_NIGHT_BAND_H_TAG = 'day-night-band-h';
export const HIDDEN_TEST_PRODUCT_TAG = 'hidden-test-product';
export const DAY_NIGHT_BAND_H_PRICE_BAND_NAME = 'Dayandnight - Band H';

// Static fallback used only before the price matrix has loaded (so inputs
// aren't left completely unbounded). Once pricing loads, the full price band
// range takes over as the "nothing selected yet" bound instead of this.
export const DAY_NIGHT_BAND_H_SIZE_LIMITS = {
  minWidth: 13,
  maxWidth: 96,
  minHeight: 11,
  maxHeight: 96,
};

export const DAY_NIGHT_BAND_H_CONTROL_SIZE_LIMITS: Record<
  string,
  { minWidth: number; maxWidth: number; minHeight: number; maxHeight: number }
> = {
  'continuous-chain': { minWidth: 13, maxWidth: 96, minHeight: 13, maxHeight: 94 },
  cordless: { minWidth: 18, maxWidth: 72, minHeight: 18, maxHeight: 72 },
  motorized: { minWidth: 24, maxWidth: 96, minHeight: 11, maxHeight: 94 },
};

// Returns null when no control option is selected yet (and motorization isn't
// active) — callers should fall back to the full price band range in that case
// (see intersectDayNightBandHSizeLimits), not a hardcoded system range.
export function getDayNightBandHSizeLimits(
  controlOption: string | null,
  isMotorizationActive: boolean
) {
  if (isMotorizationActive) {
    return DAY_NIGHT_BAND_H_CONTROL_SIZE_LIMITS.motorized;
  }
  if (controlOption && DAY_NIGHT_BAND_H_CONTROL_SIZE_LIMITS[controlOption]) {
    return DAY_NIGHT_BAND_H_CONTROL_SIZE_LIMITS[controlOption];
  }
  return null;
}

type BandHSizeRange = { minWidth: number; maxWidth: number; minHeight: number; maxHeight: number };

// Narrows the control-system limits to whatever the price matrix actually
// covers (e.g. a fabric-specific maxWidthInches cap), when that data is
// available. When no control option is selected yet (controlLimits is null),
// the full price band range applies instead — falling back to the static
// union only if pricing hasn't loaded at all.
export function intersectDayNightBandHSizeLimits(
  controlLimits: BandHSizeRange | null,
  priceMatrixRange: BandHSizeRange | null
): BandHSizeRange {
  if (!controlLimits) return priceMatrixRange ?? DAY_NIGHT_BAND_H_SIZE_LIMITS;
  if (!priceMatrixRange) return controlLimits;
  return {
    minWidth: Math.max(controlLimits.minWidth, priceMatrixRange.minWidth),
    maxWidth: Math.min(controlLimits.maxWidth, priceMatrixRange.maxWidth),
    minHeight: Math.max(controlLimits.minHeight, priceMatrixRange.minHeight),
    maxHeight: Math.min(controlLimits.maxHeight, priceMatrixRange.maxHeight),
  };
}

export const DAY_NIGHT_BAND_H_HEADRAIL_OPTIONS = [
  {
    id: 'square-flat',
    name: 'Square Flat',
    description: 'Depth required: 3.8 inches',
    price: 0,
    image: '/products/headrail/square-headrail.webp',
  },
  {
    id: 'curved',
    name: 'Curved',
    description: 'Depth required: 4.2 inches',
    price: 0,
    image: '/products/headrail/curved-headrail.webp',
  },
  {
    id: 'no-drill-headrail',
    name: 'No Drill Headrail',
    description: 'Depth required: 2.78 inches',
    price: 44.49,
    image: '/products/headrail/no-drill-headrail.webp',
  },
];

export const DAY_NIGHT_BAND_H_WRAPPED_CASSETTE_OPTIONS = [
  { id: 'band-h-cassette-no', name: 'No', price: 0 },
  { id: 'band-h-cassette-yes', name: 'Yes', price: 25 },
];

export const DAY_NIGHT_BAND_H_CONTROL_OPTIONS = [
  {
    id: 'continuous-chain',
    name: 'Continuous Chain',
    description: 'Manual chain control with selectable left or right side.',
    price: 0,
    image: '/products/control/continues-chain-picture.webp',
  },
  {
    id: 'cordless',
    name: 'Cordless',
    description: 'Child safe cordless operation.',
    price: 35.75,
    image: '/products/control/cordless-zebra-shade.webp',
  },
];

export const DAY_NIGHT_BAND_H_MOTORIZATION_OPTIONS = [
  {
    id: 'single-channel',
    name: 'Single Channel',
    description: 'Single channel remote',
    price: 24,
    image: '/products/control/motorised-option.webp',
  },
  {
    id: 'multi-channel',
    name: 'Multi Channel',
    description: 'Multi channel remote',
    price: 39,
    image: '/products/control/motorised-option.webp',
  },
];

export function isDayNightBandHProduct(product: Pick<Product, 'slug' | 'tags'>) {
  return (
    product.slug === DAY_NIGHT_BAND_H_PRODUCT_HANDLE ||
    product.tags.some((tag) => tag.toLowerCase() === DAY_NIGHT_BAND_H_TAG)
  );
}

// Broader than isDayNightBandHProduct: covers every zebra/day-and-night
// product in the "Day and Night Blinds" category, including the older
// single-table Band A-G products that don't carry the Band H tag. Those
// products only expose Continuous Chain (+ optional Motorization) — no
// Cordless choice — so callers should treat their control option as
// 'continuous-chain' unless motorization is active.
export function isDayAndNightCategoryProduct(product: Pick<Product, 'category'>) {
  const category = product.category.toLowerCase();
  return category.includes('day') && category.includes('night');
}

export function isHiddenTestProduct(tags: Array<{ slug: string }>) {
  return tags.some((tag) => tag.slug.toLowerCase() === HIDDEN_TEST_PRODUCT_TAG);
}

export function supportsBandHWrappedCassette(headrail: string | null) {
  return headrail === 'square-flat' || headrail === 'curved';
}

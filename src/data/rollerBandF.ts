import type { Product } from '@/types';

export const ROLLER_BAND_F_PRODUCT_HANDLE = 'roller-blind-band-f-test';
export const ROLLER_BAND_F_TAG = 'roller-band-f';
export const ROLLER_BAND_F_PRICE_BAND_NAME = 'Roller - Band F';

// Static fallback used only before the price matrix has loaded (so inputs
// aren't left completely unbounded). Once pricing loads, the full price band
// range takes over as the "nothing selected yet" bound instead of this.
export const ROLLER_BAND_F_SIZE_LIMITS = {
  minWidth: 12,
  maxWidth: 96,
  minHeight: 12,
  maxHeight: 108,
};

type RollerSizeRange = { minWidth: number; maxWidth: number; minHeight: number; maxHeight: number };

export const ROLLER_BAND_F_CONTROL_SIZE_LIMITS: Record<string, RollerSizeRange> = {
  'roller-f-continuous-chain': { minWidth: 8, maxWidth: 116, minHeight: 11, maxHeight: 144 },
  'roller-f-cordless': { minWidth: 18, maxWidth: 96, minHeight: 11, maxHeight: 96 },
  motorized: { minWidth: 22, maxWidth: 116, minHeight: 11, maxHeight: 144 },
};

// Cordless + No Drill Headrail together (pressure-fit installation) use a
// tighter width range than plain cordless.
export const ROLLER_BAND_F_CORDLESS_NO_DRILL_SIZE_LIMITS: RollerSizeRange = {
  minWidth: 29,
  maxWidth: 79,
  minHeight: 11,
  maxHeight: 96,
};

// Returns null when no control option is selected yet (and motorization isn't
// active) — callers should fall back to the full price band range in that case
// (see intersectRollerBandFSizeLimits), not a hardcoded system range.
export function getRollerBandFSizeLimits(
  controlOption: string | null,
  isMotorizationActive: boolean,
  headrail: string | null
): RollerSizeRange | null {
  let limits: RollerSizeRange | null = isMotorizationActive
    ? ROLLER_BAND_F_CONTROL_SIZE_LIMITS.motorized
    : (controlOption && ROLLER_BAND_F_CONTROL_SIZE_LIMITS[controlOption]) || null;

  if (!limits) return null;

  // No Drill Headrail is only offered alongside Cordless control.
  if (!isMotorizationActive && controlOption === 'roller-f-cordless' && headrail === 'roller-f-no-drill-headrail') {
    limits = ROLLER_BAND_F_CORDLESS_NO_DRILL_SIZE_LIMITS;
  }

  // Open Roll (no headrail, visible tube) motorized units need a wider min width for the motor housing.
  if (isMotorizationActive && headrail === 'roller-f-no-headrail') {
    limits = { ...limits, minWidth: Math.max(limits.minWidth, 25) };
  }

  return limits;
}

// Narrows the control-system limits to whatever the price matrix actually
// covers (e.g. a fabric-specific maxWidthInches cap), when that data is
// available. When no control option is selected yet (controlLimits is null),
// the full price band range applies instead — falling back to the static
// union only if pricing hasn't loaded at all.
export function intersectRollerBandFSizeLimits(
  controlLimits: RollerSizeRange | null,
  priceMatrixRange: RollerSizeRange | null
): RollerSizeRange {
  if (!controlLimits) return priceMatrixRange ?? ROLLER_BAND_F_SIZE_LIMITS;
  if (!priceMatrixRange) return controlLimits;
  return {
    minWidth: Math.max(controlLimits.minWidth, priceMatrixRange.minWidth),
    maxWidth: Math.min(controlLimits.maxWidth, priceMatrixRange.maxWidth),
    minHeight: Math.max(controlLimits.minHeight, priceMatrixRange.minHeight),
    maxHeight: Math.min(controlLimits.maxHeight, priceMatrixRange.maxHeight),
  };
}

// Room Darkening fabric paired with the flat/square headrail caps max height
// regardless of control system — applied as a final step on top of whichever
// range (system-specific or full price band) is otherwise in effect.
export function applyRollerBandFRoomDarkeningCap(
  limits: RollerSizeRange,
  headrail: string | null,
  roomDarkening: string | null
): RollerSizeRange {
  if (roomDarkening === 'blackout' && headrail === 'roller-f-square-flat') {
    return { ...limits, maxHeight: Math.min(limits.maxHeight, 86) };
  }
  return limits;
}

export const ROLLER_BAND_F_HEADRAIL_OPTIONS = [
  {
    id: 'roller-f-square-flat',
    name: 'Square Flat',
    description: 'Depth required: 3.8 inches',
    price: 0,
    image: '/products/headrail/square-headrail.webp',
  },
  {
    id: 'roller-f-curved',
    name: 'Curved',
    description: 'Depth required: 4.2 inches',
    price: 0,
    image: '/products/headrail/curved-headrail.webp',
  },
  {
    id: 'roller-f-no-drill-headrail',
    name: 'No Drill Headrail',
    description: 'Depth required: 2.78 inches',
    price: 44.49,
    image: '/products/headrail/no-drill-headrail.webp',
  },
  {
    id: 'roller-f-no-headrail',
    name: 'No Headrail - visible roll',
    description: 'No headrail',
    price: 0,
    image: '/products/headrail/noheadrail.webp',
  },
];

export const ROLLER_BAND_F_WRAPPED_CASSETTE_OPTIONS = [
  { id: 'roller-f-cassette-no', name: 'No', price: 0 },
  { id: 'roller-f-cassette-yes', name: 'Yes', price: 25 },
];

export const ROLLER_BAND_F_CONTROL_OPTIONS = [
  {
    id: 'roller-f-continuous-chain',
    name: 'Continuous Chain',
    description: 'Manual chain control with selectable left or right side.',
    price: 0,
    image: '/products/control/continues-chain-picture.webp',
  },
  {
    id: 'roller-f-cordless',
    name: 'Cordless',
    description: 'Child safe cordless operation.',
    price: 35.75,
    image: '/products/control/cordless-zebra-shade.webp',
  },
];

export const ROLLER_BAND_F_MOTORIZATION_OPTIONS = [
  {
    id: 'roller-f-single-channel',
    name: 'Single Channel',
    description: 'Single channel remote',
    price: 24,
    image: '/products/control/motorised-option.webp',
  },
  {
    id: 'roller-f-multi-channel',
    name: 'Multi Channel',
    description: 'Multi channel remote',
    price: 39,
    image: '/products/control/motorised-option.webp',
  },
];

export const ROLLER_BAND_F_ROOM_DARKENING_OPTIONS = [
  {
    id: 'dimout',
    name: 'Dimout',
    price: 0,
  },
  {
    id: 'blackout',
    name: 'Blackout',
    price: 49.99,
  },
];

export const ROLLER_BAND_F_ROLL_OPTIONS = [
  { id: 'standard-roll', name: 'Standard Roll' },
  { id: 'reverse-roll', name: 'Reverse Roll' },
];

export function isRollerBandFProduct(product: Pick<Product, 'slug' | 'tags'>) {
  return (
    product.slug === ROLLER_BAND_F_PRODUCT_HANDLE ||
    product.tags.some((tag) => tag.toLowerCase() === ROLLER_BAND_F_TAG)
  );
}

// Broader than isRollerBandFProduct: covers every product in the "Roller
// Blinds/Shades" category, including the plain single-table Roller Band A-E
// products that don't carry the Band F tag. Those products only expose
// Continuous Chain (+ optional Motorization) — no Cordless, no headrail
// choice — so callers should treat their control option as
// 'roller-f-continuous-chain' and headrail as null unless it's Band F.
export function isRollerCategoryProduct(product: Pick<Product, 'category'>) {
  return product.category.toLowerCase().includes('roller');
}

export function supportsRollerBandFWrappedCassette(headrail: string | null) {
  return headrail === 'roller-f-square-flat' || headrail === 'roller-f-curved';
}

export function rollerBandFShowsRollOption(headrail: string | null) {
  return headrail === 'roller-f-no-headrail';
}

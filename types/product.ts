// Product Types for Your Next Blinds

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface PriceOption {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  hex?: string;
}

export interface ProductFeatures {
  hasSize: boolean;
  hasRoom: boolean;
  hasMount: boolean;
  hasHeadrail: boolean;
  hasOpenStyle: boolean;
  hasWandPosition: boolean;
  hasValance: boolean;
  hasBottomChain: boolean;
  hasBracketType: boolean;
  hasControl: boolean;
  hasColour: boolean;
  hasRollerStyle: boolean;
  hasFabricType: boolean;
  hasBottomBar: boolean;
  hasLift: boolean;
}

export interface ProductCustomization {
  headrailOptions?: PriceOption[];
  openStyleOptions?: PriceOption[];
  wandPositionOptions?: PriceOption[];
  valanceOptions?: PriceOption[];
  bottomChainOptions?: PriceOption[];
  bracketOptions?: PriceOption[];
  controlOptions?: PriceOption[];
  controlPositionOptions?: PriceOption[];
  colourOptions?: PriceOption[];
  rollerStyleOptions?: PriceOption[];
  fabricTypeOptions?: PriceOption[];
  bottomBarOptions?: PriceOption[];
  liftOptions?: PriceOption[];
  liftPositionOptions?: PriceOption[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  estimatedDelivery: string;
  description: string;
  images: string[];
  features: ProductFeatures;
  customization: ProductCustomization;
  reviews: ProductReview[];
  relatedProducts: string[];
}

export interface Room {
  id: string;
  name: string;
  icon: string;
}

export interface MountOption {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface SizeOptions {
  widthUnits: string[];
  heightUnits: string[];
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}

export interface ProductsData {
  products: Product[];
  rooms: Room[];
  mountOptions: MountOption[];
  sizeOptions: SizeOptions;
}

// Product Configuration State
export interface ProductConfiguration {
  width: number;
  widthFraction: string;
  widthUnit: string;
  height: number;
  heightFraction: string;
  heightUnit: string;
  room: string | null;
  mount: string;
  headrail: string | null;
  openStyle: string | null;
  wandPosition: string | null;
  valance: string | null;
  bottomChain: string | null;
  bracketType: string | null;
  control: string | null;
  controlPosition: string | null;
  colour: string | null;
  rollerStyle: string | null;
  fabricType: string | null;
  bottomBar: string | null;
  lift: string | null;
  liftPosition: string | null;
}

export const defaultConfiguration: ProductConfiguration = {
  width: 24,
  widthFraction: '0',
  widthUnit: 'inches',
  height: 24,
  heightFraction: '0',
  heightUnit: 'inches',
  room: null,
  mount: 'inside',
  headrail: null,
  openStyle: null,
  wandPosition: null,
  valance: null,
  bottomChain: null,
  bracketType: null,
  control: null,
  controlPosition: null,
  colour: null,
  rollerStyle: null,
  fabricType: null,
  bottomBar: null,
  lift: null,
  liftPosition: null,
};

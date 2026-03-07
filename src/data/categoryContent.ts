// Category-specific accordion content for collection pages.
// Keyed by backend category slug (e.g. 'vertical-blinds').
// Common sections (guarantee, why-choose) are appended automatically by CategoryInfoSection.

export interface SpecRow {
  label: string;
  value: string;
}

export interface CategoryContent {
  /** Two or three paragraphs shown under "Product Details" */
  productDetails: string[];
  /** Bullet list shown under "Key Features" (rendered inside Product Details accordion) */
  keyFeatures: string[];
  /** Table rows shown under "Specifications" */
  specifications: SpecRow[];
  /** Bullet list shown under "Perfect For" */
  perfectFor: string[];
  /** Bullet list shown under "What's in the Box?" */
  whatsInTheBox: string[];
  /** Bullet list shown under "Easy Maintenance" */
  easyMaintenance: string[];
  /** Paragraphs shown under "Child Safety" */
  childSafety: string[];
}

const categoryContent: Record<string, CategoryContent> = {
  'vertical-blinds': {
    productDetails: [
      'Designed to combine modern style with everyday functionality, these custom vertical blinds are the perfect solution for large windows, patio doors, sliding glass doors, and office spaces.',
      'Featuring sleek 89mm vertical fabric slats, these blinds allow you to easily control the amount of sunlight entering your room while maintaining privacy. Simply tilt the slats to filter natural light or fully close them for increased shade and privacy.',
      'Crafted from high-quality polyester fabric, our vertical blinds are durable, moisture-resistant, and fade-resistant, making them ideal for living rooms, bedrooms, kitchens, and commercial spaces. The modern Twilight fabric finish adds a subtle texture that complements both contemporary and traditional interiors.',
      'With a smooth Easy Glide operating system, adjusting your blinds is effortless. Every blind is custom made to your exact window measurements, ensuring a perfect fit and a clean, professional look in any space.',
    ],
    keyFeatures: [
      'Custom Made Vertical Blinds for a perfect window fit',
      'Stylish Twilight textured fabric design',
      '89mm fabric slats for smooth light control',
      '100% high-quality polyester material',
      'Fade-resistant and moisture-resistant fabric',
      'Smooth Easy Glide track system for effortless operation',
      'Ideal for large windows, sliding doors, and patio doors',
      'Adjustable slats provide full light and privacy control',
      'Durable components built for long-lasting performance',
      'Suitable for both residential and commercial spaces',
    ],
    specifications: [
      { label: 'Product Type', value: 'Vertical Window Blinds' },
      { label: 'Slat Width', value: '89mm (3.5 inches)' },
      { label: 'Material', value: '100% Polyester Fabric' },
      { label: 'Control Type', value: 'Cord pull tilt control' },
      { label: 'Mounting Options', value: 'Inside mount or outside mount' },
      { label: 'Headrail Options', value: 'Classic or Platinum finish' },
      { label: 'Operation', value: 'Smooth Easy Glide system' },
      { label: 'Manufacturing', value: 'Custom made to measure' },
      { label: 'Use', value: 'Indoor window covering' },
    ],
    perfectFor: [
      'Living room windows',
      'Bedroom windows',
      'Sliding glass doors',
      'Patio doors',
      'Office spaces',
      'Commercial properties',
      'Large window openings',
    ],
    whatsInTheBox: [
      'Custom made vertical blind with operating mechanism',
      'Strong aluminum headrail',
      'Universal mounting brackets',
      'Screws and installation hardware',
      'Child safety clip',
      'Installation instructions',
    ],
    easyMaintenance: [
      'Lightly dust the slats regularly',
      'Wipe with a damp cloth when needed',
      'Avoid harsh cleaning chemicals',
      'The polyester fabric material resists fading, moisture, and everyday wear, making it perfect for long-term use',
    ],
    childSafety: [
      'At Your Next Blinds, safety is a top priority. All of our blinds are designed in accordance with modern child safety standards.',
      'Where cords or chains are used, appropriate child safety devices and installation instructions are included to help keep your home safe.',
    ],
  },
};

export default categoryContent;

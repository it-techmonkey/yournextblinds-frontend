export const PRODUCT_GUIDES = {
  roller: {
    installation: 'https://cdn.shopify.com/s/files/1/0729/6847/0563/files/roller_blinds_installation_guide_yournextblinds.pdf?v=1772649110',
    measurement:  'https://cdn.shopify.com/s/files/1/0729/6847/0563/files/roller_shades_measurement_guide_yournextblinds.pdf?v=1772649109',
  },
  zebra: {
    installation: 'https://cdn.shopify.com/s/files/1/0729/6847/0563/files/dual_zebra_installation_guide_yournextblinds.pdf?v=1772649110',
    measurement:  'https://cdn.shopify.com/s/files/1/0729/6847/0563/files/dual_zebra_measurement_guide_yournextblinds.pdf?v=1772649109',
  },
  vertical: {
    installation: 'https://cdn.shopify.com/s/files/1/0729/6847/0563/files/vertical_blinds_installation_guide_yournextblinds.pdf?v=1772649111',
    measurement:  'https://cdn.shopify.com/s/files/1/0729/6847/0563/files/vertical_blinds_measurement_guide_yournextblinds.pdf?v=1772649108',
  },
} as const;

export type GuideType = keyof typeof PRODUCT_GUIDES;

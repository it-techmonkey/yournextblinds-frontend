// Category-based customization configuration
// This maps category slugs to their available customization options
// Only includes categories that exist in the website navigation

import { ProductFeatures } from '@/types';

// Define customization profiles for different blind categories
// Based on actual categories from navigation.ts
export const CATEGORY_CUSTOMIZATIONS: Record<string, ProductFeatures> = {
    // Vertical Blinds
    'vertical-blinds': {
        hasSize: true,
        hasHeadrail: true,
        hasHeadrailColour: true,
        hasInstallationMethod: true,
        hasControlOption: true,
        hasStacking: true,
        hasControlSide: false,
        hasBottomChain: true,
        hasBracketType: true,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // Roller Blinds
    'roller-blinds': {
        hasSize: true,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: true,
        hasControlOption: true,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: true,
        hasWrappedCassette: true,
        hasCassetteMatchingBar: false,
    },

    // Roman Blinds
    'roman-blinds': {
        hasSize: false,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // Venetian Blinds
    'venetian-blinds': {
        hasSize: false,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // Day and Night Blinds (Zebra Blinds)
    'day-and-night-blinds': {
        hasSize: true,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: true,
        hasControlOption: true,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: true,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: true,
    },

    // Blackout Blinds (similar to roller blinds)
    'blackout-blinds': {
        hasSize: false,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // Skylight Blinds
    'skylight-blinds': {
        hasSize: false,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // Wooden Blinds (similar to venetian)
    'wooden-blinds': {
        hasSize: false,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // No Drill Blinds (similar to roller)
    'no-drill-blinds': {
        hasSize: false,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // Motorized Blinds (similar to roller with motorized control)
    'motorized-blinds': {
        hasSize: false,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // Pleated Blinds
    'pleated-blinds': {
        hasSize: false,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },

    // Default fallback for uncategorized products
    'default': {
        hasSize: true,
        hasHeadrail: false,
        hasHeadrailColour: false,
        hasInstallationMethod: false,
        hasControlOption: false,
        hasStacking: false,
        hasControlSide: false,
        hasBottomChain: false,
        hasBracketType: false,
        hasChainColor: false,
        hasWrappedCassette: false,
        hasCassetteMatchingBar: false,
    },
};

/**
 * Get customization features for a specific category
 * @param categorySlug - The category slug to get features for
 * @returns ProductFeatures object with available customizations
 */
export function getCategoryCustomizations(categorySlug: string): ProductFeatures {
    // Normalize the slug to lowercase and handle variations
    const normalizedSlug = categorySlug.toLowerCase().trim();

    // Try exact match first
    if (CATEGORY_CUSTOMIZATIONS[normalizedSlug]) {
        return CATEGORY_CUSTOMIZATIONS[normalizedSlug];
    }

    // Try partial match (e.g., "roller" matches "roller-blinds")
    const partialMatch = Object.keys(CATEGORY_CUSTOMIZATIONS).find(key =>
        key.includes(normalizedSlug) || normalizedSlug.includes(key.split('-')[0])
    );

    if (partialMatch) {
        return CATEGORY_CUSTOMIZATIONS[partialMatch];
    }

    // Return default if no match found
    return CATEGORY_CUSTOMIZATIONS['default'];
}

/**
 * Get all available category customization profiles
 * @returns Array of category slugs with their customization profiles
 */
export function getAllCategoryCustomizations() {
    return Object.entries(CATEGORY_CUSTOMIZATIONS).map(([slug, features]) => ({
        slug,
        features,
    }));
}

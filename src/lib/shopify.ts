// ============================================
// Shopify Storefront API Client
// ============================================
// Fetches product catalog data (titles, descriptions, images,
// collections, tags) directly from Shopify's public Storefront API.
// Pricing and checkout remain on our Express backend.

import type { ApiProduct, ApiCategory, ApiTag } from '@/types';

// ============================================
// Configuration
// ============================================

const SHOPIFY_STORE_DOMAIN =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';
const SHOPIFY_API_VERSION = '2025-01';

const STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// ============================================
// Storefront GraphQL Types
// ============================================

interface StorefrontImage {
  url: string;
  altText: string | null;
}

interface StorefrontCollection {
  id: string;
  handle: string;
  title: string;
  description: string | null;
}

interface StorefrontProduct {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  images: {
    edges: Array<{ node: StorefrontImage }>;
  };
  collections: {
    edges: Array<{ node: StorefrontCollection }>;
  };
}

interface StorefrontProductsResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
    edges: Array<{ node: StorefrontProduct }>;
  };
}

interface StorefrontProductByHandleResponse {
  product: StorefrontProduct | null;
}

interface StorefrontCollectionsResponse {
  collections: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        description: string | null;
      };
    }>;
  };
}

// ============================================
// Customer Types
// ============================================

export interface ShopifyCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  acceptsMarketing: boolean;
  defaultAddress: {
    address1: string | null;
    address2: string | null;
    city: string | null;
    province: string | null;
    zip: string | null;
    country: string | null;
  } | null;
  orders: {
    edges: Array<{
      node: {
        id: string;
        orderNumber: number;
        processedAt: string;
        fulfillmentStatus: string;
        financialStatus: string;
        totalPrice: { amount: string; currencyCode: string };
        lineItems: {
          edges: Array<{
            node: {
              title: string;
              quantity: number;
              variant: {
                price: { amount: string; currencyCode: string };
                image: { url: string; altText: string | null } | null;
              } | null;
            };
          }>;
        };
      };
    }>;
  };
}

interface CustomerUserError {
  field: string[] | null;
  message: string;
}

// ============================================
// GraphQL Queries
// ============================================

const PRODUCT_FIELDS = `
  id
  handle
  title
  descriptionHtml
  tags
  createdAt
  updatedAt
  images(first: 20) {
    edges {
      node {
        url
        altText
      }
    }
  }
  collections(first: 10) {
    edges {
      node {
        id
        handle
        title
        description
      }
    }
  }
`;

const PRODUCTS_QUERY = `
  query Products($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query, sortKey: CREATED_AT, reverse: true) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`;

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
        }
      }
    }
  }
`;

// ============================================
// Customer GraphQL Mutations & Queries
// ============================================

const CUSTOMER_FIELDS = `
  id
  firstName
  lastName
  email
  phone
  acceptsMarketing
  defaultAddress {
    address1
    address2
    city
    province
    zip
    country
  }
  orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
    edges {
      node {
        id
        orderNumber
        processedAt
        fulfillmentStatus
        financialStatus
        totalPrice { amount currencyCode }
        lineItems(first: 10) {
          edges {
            node {
              title
              quantity
              variant {
                price { amount currencyCode }
                image { url altText }
              }
            }
          }
        }
      }
    }
  }
`;

const CUSTOMER_CREATE_MUTATION = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { ${CUSTOMER_FIELDS} }
      customerUserErrors { field message }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors { field message }
    }
  }
`;

const CUSTOMER_QUERY = `
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      ${CUSTOMER_FIELDS}
    }
  }
`;

const CUSTOMER_UPDATE_MUTATION = `
  mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
      customer { ${CUSTOMER_FIELDS} }
      customerUserErrors { field message }
    }
  }
`;

const CUSTOMER_RECOVER_MUTATION = `
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors { field message }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_DELETE = `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      userErrors { field message }
    }
  }
`;

// ============================================
// GraphQL Fetch Helper
// ============================================

async function storefrontFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error(
      'Shopify Storefront API credentials not configured. Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN.'
    );
  }

  const isServerSide = typeof window === 'undefined';

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  };

  // Use Next.js ISR cache for server-side requests
  if (isServerSide) {
    fetchOptions.next = { revalidate: 60 };
  }

  const response = await fetch(STOREFRONT_URL, fetchOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Shopify Storefront API error [${response.status}]: ${errorText}`
    );
  }

  const json = await response.json();

  if (json.errors) {
    console.error('Shopify GraphQL errors:', json.errors);
    throw new Error(
      `Shopify GraphQL error: ${json.errors[0]?.message || 'Unknown error'}`
    );
  }

  return json.data as T;
}

// ============================================
// Data Mapping Helpers
// ============================================

/**
 * Convert a string to a URL-friendly slug.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Map a Shopify Storefront product to our ApiProduct type.
 * Uses minimum prices map (handle → price) from the backend pricing engine.
 */
function mapStorefrontProduct(
  sfProduct: StorefrontProduct,
  minimumPrices: Record<string, number>
): ApiProduct {
  const categories: ApiCategory[] = sfProduct.collections.edges.map(
    (edge) => ({
      id: edge.node.id,
      slug: edge.node.handle,
      name: edge.node.title,
      description: edge.node.description,
    })
  );

  const tags: ApiTag[] = sfProduct.tags.map((tag) => ({
    id: slugify(tag),
    name: tag,
    slug: slugify(tag),
  }));

  return {
    id: sfProduct.id,
    slug: sfProduct.handle,
    title: sfProduct.title,
    description: sfProduct.descriptionHtml || null,
    images: sfProduct.images.edges.map((edge) => edge.node.url),
    videos: [],
    price: minimumPrices[sfProduct.handle] || 0,
    createdAt: sfProduct.createdAt,
    updatedAt: sfProduct.updatedAt,
    categories,
    tags,
  };
}

// ============================================
// Public API Functions
// ============================================

/**
 * Fetch all products from Shopify Storefront API (handles pagination).
 * Returns up to ~1000 products across multiple pages.
 */
export async function fetchAllShopifyProducts(
  searchQuery?: string
): Promise<StorefrontProduct[]> {
  const allProducts: StorefrontProduct[] = [];
  let cursor: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const variables: Record<string, unknown> = {
      first: 250,
      after: cursor,
    };

    if (searchQuery) {
      variables.query = searchQuery;
    }

    const data =
      await storefrontFetch<StorefrontProductsResponse>(
        PRODUCTS_QUERY,
        variables
      );

    const { edges, pageInfo } = data.products;
    allProducts.push(...edges.map((edge) => edge.node));

    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }

  return allProducts;
}

/**
 * Fetch a single product by its handle (slug) from Shopify.
 */
export async function fetchShopifyProductByHandle(
  handle: string
): Promise<StorefrontProduct | null> {
  const data =
    await storefrontFetch<StorefrontProductByHandleResponse>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );

  return data.product;
}

/**
 * Fetch all collections from Shopify.
 */
export async function fetchShopifyCollections(): Promise<
  Array<{
    id: string;
    handle: string;
    title: string;
    description: string | null;
  }>
> {
  const data =
    await storefrontFetch<StorefrontCollectionsResponse>(
      COLLECTIONS_QUERY,
      { first: 50 }
    );

  return data.collections.edges.map((edge) => edge.node);
}

// ============================================
// Merged Fetch Functions
// (These combine Shopify catalog data with backend product IDs/prices)
// ============================================

/**
 * Fetch minimum prices (handle → price) from our backend pricing engine.
 * Cached for 60 seconds to avoid repeated calls.
 */
let cachedMinimumPrices: Record<string, number> | null = null;
let pricesCacheTime = 0;
const PRICES_CACHE_TTL = 60_000; // 60 seconds

async function getMinimumPrices(): Promise<Record<string, number>> {
  const now = Date.now();
  if (cachedMinimumPrices && now - pricesCacheTime < PRICES_CACHE_TTL) {
    return cachedMinimumPrices;
  }

  const API_BASE_URL = (() => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
    if (envUrl) {
      return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
    }
    if (typeof window !== 'undefined') {
      return 'http://localhost:5000';
    }
    return 'http://127.0.0.1:5000';
  })();

  const isServerSide = typeof window === 'undefined';

  const fetchOptions: RequestInit & { next?: { revalidate: number } } = {
    headers: { 'Content-Type': 'application/json' },
  };

  if (isServerSide) {
    fetchOptions.next = { revalidate: 60 };
  }

  const response = await fetch(`${API_BASE_URL}/api/pricing/minimum-prices`, fetchOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch minimum prices: ${response.status}`);
  }

  const json = await response.json();
  cachedMinimumPrices = json.data;
  pricesCacheTime = now;
  return cachedMinimumPrices!;
}

/**
 * Fetch all products from Shopify, merged with backend minimum prices.
 * This is the primary product fetch function.
 */
export async function fetchShopifyProductsMerged(
  searchQuery?: string
): Promise<ApiProduct[]> {
  const [sfProducts, minimumPrices] = await Promise.all([
    fetchAllShopifyProducts(searchQuery),
    getMinimumPrices(),
  ]);

  return sfProducts.map((sfProduct) =>
    mapStorefrontProduct(sfProduct, minimumPrices)
  );
}

/**
 * Fetch a single product from Shopify by handle, merged with backend price.
 */
export async function fetchShopifyProductByHandleMerged(
  handle: string
): Promise<ApiProduct | null> {
  const [sfProduct, minimumPrices] = await Promise.all([
    fetchShopifyProductByHandle(handle),
    getMinimumPrices(),
  ]);

  if (!sfProduct) return null;

  return mapStorefrontProduct(sfProduct, minimumPrices);
}

/**
 * Fetch collections from Shopify, mapped to the Category type used in the frontend.
 */
export async function fetchShopifyCollectionsMapped(): Promise<
  Array<{
    id: string;
    slug: string;
    name: string;
    description: string | null;
    productCount: number;
  }>
> {
  const collections = await fetchShopifyCollections();

  return collections.map((col) => ({
    id: col.id,
    slug: col.handle,
    name: col.title,
    description: col.description,
    productCount: 0, // Count is determined from product data
  }));
}

// ============================================
// Customer Account Functions
// ============================================

/**
 * Register a new customer via Shopify Storefront API.
 */
export async function shopifyCustomerCreate(input: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  acceptsMarketing?: boolean;
}): Promise<{ customer: ShopifyCustomer | null; errors: CustomerUserError[] }> {
  const data = await storefrontFetch<{
    customerCreate: {
      customer: ShopifyCustomer | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_CREATE_MUTATION, { input });

  return {
    customer: data.customerCreate.customer,
    errors: data.customerCreate.customerUserErrors,
  };
}

/**
 * Login: create a customer access token.
 */
export async function shopifyCustomerLogin(
  email: string,
  password: string
): Promise<{
  accessToken: string | null;
  expiresAt: string | null;
  errors: CustomerUserError[];
}> {
  const data = await storefrontFetch<{
    customerAccessTokenCreate: {
      customerAccessToken: { accessToken: string; expiresAt: string } | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_ACCESS_TOKEN_CREATE, { input: { email, password } });

  const result = data.customerAccessTokenCreate;
  return {
    accessToken: result.customerAccessToken?.accessToken || null,
    expiresAt: result.customerAccessToken?.expiresAt || null,
    errors: result.customerUserErrors,
  };
}

/**
 * Fetch the currently authenticated customer's profile and orders.
 */
export async function shopifyCustomerFetch(
  accessToken: string
): Promise<ShopifyCustomer | null> {
  const data = await storefrontFetch<{
    customer: ShopifyCustomer | null;
  }>(CUSTOMER_QUERY, { customerAccessToken: accessToken });

  return data.customer;
}

/**
 * Update customer profile.
 */
export async function shopifyCustomerUpdate(
  accessToken: string,
  updates: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    acceptsMarketing?: boolean;
  }
): Promise<{ customer: ShopifyCustomer | null; errors: CustomerUserError[] }> {
  const data = await storefrontFetch<{
    customerUpdate: {
      customer: ShopifyCustomer | null;
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_UPDATE_MUTATION, {
    customerAccessToken: accessToken,
    customer: updates,
  });

  return {
    customer: data.customerUpdate.customer,
    errors: data.customerUpdate.customerUserErrors,
  };
}

/**
 * Trigger password reset email.
 */
export async function shopifyCustomerRecover(
  email: string
): Promise<{ errors: CustomerUserError[] }> {
  const data = await storefrontFetch<{
    customerRecover: {
      customerUserErrors: CustomerUserError[];
    };
  }>(CUSTOMER_RECOVER_MUTATION, { email });

  return { errors: data.customerRecover.customerUserErrors };
}

/**
 * Delete (invalidate) a customer access token (logout).
 */
export async function shopifyCustomerLogout(
  accessToken: string
): Promise<void> {
  await storefrontFetch(CUSTOMER_ACCESS_TOKEN_DELETE, {
    customerAccessToken: accessToken,
  });
}

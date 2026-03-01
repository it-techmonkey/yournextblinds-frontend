'use server';

import { cookies } from 'next/headers';
import {
  shopifyCustomerCreate,
  shopifyCustomerLogin,
  shopifyCustomerFetch,
  shopifyCustomerUpdate,
  shopifyCustomerLogout,
  shopifyCustomerRecover,
  type ShopifyCustomer,
} from './shopify';

// ============================================
// Constants
// ============================================

const TOKEN_COOKIE = 'shopify_customer_token';
const TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// ============================================
// Types
// ============================================

export interface AuthResult {
  success: boolean;
  error?: string;
  customer?: ShopifyCustomer;
}

// ============================================
// Server Actions
// ============================================

/**
 * Register a new customer account.
 */
export async function register(formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = (formData.get('firstName') as string) || undefined;
  const lastName = (formData.get('lastName') as string) || undefined;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  if (password.length < 5) {
    return { success: false, error: 'Password must be at least 5 characters.' };
  }

  try {
    // Create customer
    const { errors } = await shopifyCustomerCreate({
      email,
      password,
      firstName,
      lastName,
      acceptsMarketing: false,
    });

    if (errors.length > 0) {
      return { success: false, error: errors[0].message };
    }

    // Auto-login after registration
    const loginResult = await shopifyCustomerLogin(email, password);

    if (loginResult.errors.length > 0 || !loginResult.accessToken) {
      // Account created but auto-login failed — let them log in manually
      return { success: true };
    }

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_COOKIE, loginResult.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_MAX_AGE,
      path: '/',
    });

    // Fetch customer data
    const customer = await shopifyCustomerFetch(loginResult.accessToken);

    return { success: true, customer: customer || undefined };
  } catch (err: any) {
    console.error('Register error:', err);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

/**
 * Login with email and password.
 */
export async function login(formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  try {
    const result = await shopifyCustomerLogin(email, password);

    if (result.errors.length > 0 || !result.accessToken) {
      return {
        success: false,
        error: result.errors[0]?.message || 'Invalid email or password.',
      };
    }

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_COOKIE, result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_MAX_AGE,
      path: '/',
    });

    // Fetch customer data
    const customer = await shopifyCustomerFetch(result.accessToken);

    return { success: true, customer: customer || undefined };
  } catch (err: any) {
    console.error('Login error:', err);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

/**
 * Logout — invalidate the access token and clear the cookie.
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (token) {
    try {
      await shopifyCustomerLogout(token);
    } catch {
      // Token may already be expired — ignore
    }
  }

  cookieStore.delete(TOKEN_COOKIE);
}

/**
 * Get the currently authenticated customer (server-side).
 * Returns null if not logged in or token is expired.
 */
export async function getCustomer(): Promise<ShopifyCustomer | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (!token) return null;

  try {
    const customer = await shopifyCustomerFetch(token);
    if (!customer) {
      // Token expired or invalid — clean up
      cookieStore.delete(TOKEN_COOKIE);
      return null;
    }
    return customer;
  } catch {
    cookieStore.delete(TOKEN_COOKIE);
    return null;
  }
}

/**
 * Update customer profile.
 */
export async function updateProfile(formData: FormData): Promise<AuthResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;

  if (!token) {
    return { success: false, error: 'Not logged in.' };
  }

  const firstName = (formData.get('firstName') as string) || undefined;
  const lastName = (formData.get('lastName') as string) || undefined;
  const phone = (formData.get('phone') as string) || undefined;

  try {
    const { customer, errors } = await shopifyCustomerUpdate(token, {
      firstName,
      lastName,
      phone,
    });

    if (errors.length > 0) {
      return { success: false, error: errors[0].message };
    }

    return { success: true, customer: customer || undefined };
  } catch (err: any) {
    console.error('Update profile error:', err);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

/**
 * Send password reset email.
 */
export async function recoverPassword(formData: FormData): Promise<AuthResult> {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  try {
    const { errors } = await shopifyCustomerRecover(email);

    if (errors.length > 0) {
      return { success: false, error: errors[0].message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Password recover error:', err);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}

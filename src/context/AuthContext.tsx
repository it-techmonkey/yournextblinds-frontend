'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { ShopifyCustomer } from '@/lib/shopify';
import {
  login as serverLogin,
  register as serverRegister,
  logout as serverLogout,
  getCustomer,
  updateProfile as serverUpdateProfile,
  recoverPassword as serverRecoverPassword,
  type AuthResult,
} from '@/lib/auth';

// ============================================
// Types
// ============================================

interface AuthContextType {
  customer: ShopifyCustomer | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (formData: FormData) => Promise<AuthResult>;
  register: (formData: FormData) => Promise<AuthResult>;
  logout: () => Promise<void>;
  updateProfile: (formData: FormData) => Promise<AuthResult>;
  recoverPassword: (formData: FormData) => Promise<AuthResult>;
  refreshCustomer: () => Promise<void>;
}

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ============================================
// Provider
// ============================================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch customer on mount (checks cookie server-side)
  const refreshCustomer = useCallback(async () => {
    try {
      const c = await getCustomer();
      setCustomer(c);
    } catch {
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCustomer();
  }, [refreshCustomer]);

  const handleLogin = async (formData: FormData): Promise<AuthResult> => {
    const result = await serverLogin(formData);
    if (result.success && result.customer) {
      setCustomer(result.customer);
    }
    return result;
  };

  const handleRegister = async (formData: FormData): Promise<AuthResult> => {
    const result = await serverRegister(formData);
    if (result.success && result.customer) {
      setCustomer(result.customer);
    }
    return result;
  };

  const handleLogout = async () => {
    await serverLogout();
    setCustomer(null);
  };

  const handleUpdateProfile = async (formData: FormData): Promise<AuthResult> => {
    const result = await serverUpdateProfile(formData);
    if (result.success && result.customer) {
      setCustomer(result.customer);
    }
    return result;
  };

  const handleRecoverPassword = async (formData: FormData): Promise<AuthResult> => {
    return serverRecoverPassword(formData);
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        isLoading,
        isLoggedIn: !!customer,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
        recoverPassword: handleRecoverPassword,
        refreshCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

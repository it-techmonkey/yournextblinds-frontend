'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopBar, Header, NavBar, Footer } from '@/components';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

type Mode = 'login' | 'register' | 'forgot';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, recoverPassword, isLoggedIn } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (isLoggedIn) {
    router.replace('/account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (mode === 'login') {
        const result = await login(formData);
        if (result.success) {
          router.push('/account');
        } else {
          setError(result.error || 'Login failed.');
        }
      } else if (mode === 'register') {
        const result = await register(formData);
        if (result.success) {
          router.push('/account');
        } else {
          setError(result.error || 'Registration failed.');
        }
      } else if (mode === 'forgot') {
        const result = await recoverPassword(formData);
        if (result.success) {
          setSuccess('Password reset email sent. Check your inbox.');
          setMode('login');
        } else {
          setError(result.error || 'Failed to send reset email.');
        }
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <NavBar />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-[#00473c]">
                {mode === 'login' && 'Welcome Back'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                {mode === 'login' && 'Sign in to your account to view orders and manage your profile.'}
                {mode === 'register' && 'Create an account for faster checkout and order tracking.'}
                {mode === 'forgot' && 'Enter your email and we\'ll send you a reset link.'}
              </p>
            </div>

            {/* Error / Success */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                {success}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00473c]/20 focus:border-[#00473c] outline-none transition text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00473c]/20 focus:border-[#00473c] outline-none transition text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00473c]/20 focus:border-[#00473c] outline-none transition text-sm"
                  placeholder="you@example.com"
                />
              </div>

              {mode !== 'forgot' && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={5}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00473c]/20 focus:border-[#00473c] outline-none transition text-sm"
                    placeholder={mode === 'register' ? 'At least 5 characters' : '••••••••'}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-[#00473c] text-white font-medium text-sm hover:bg-[#003830] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    {mode === 'login' && 'Sign In'}
                    {mode === 'register' && 'Create Account'}
                    {mode === 'forgot' && 'Send Reset Link'}
                  </>
                )}
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
              {mode === 'login' && (
                <>
                  <button
                    onClick={() => { setMode('forgot'); setError(null); setSuccess(null); }}
                    className="text-[#00473c] hover:underline"
                  >
                    Forgot password?
                  </button>
                  <p>
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => { setMode('register'); setError(null); setSuccess(null); }}
                      className="text-[#00473c] font-medium hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </>
              )}
              {mode === 'register' && (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
                    className="text-[#00473c] font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
              {mode === 'forgot' && (
                <button
                  onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
                  className="text-[#00473c] hover:underline"
                >
                  Back to Sign In
                </button>
              )}
            </div>
          </div>

          {/* Continue browsing */}
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition">
              Continue browsing &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

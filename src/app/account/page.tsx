'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TopBar, Header, NavBar, Footer } from '@/components';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

type Tab = 'orders' | 'profile';

export default function AccountPage() {
  const router = useRouter();
  const { customer, isLoading, isLoggedIn, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#00473c] border-t-transparent rounded-full" />
        </main>
        <Footer />
      </div>
    );
  }

  // Redirect if not logged in
  if (!isLoggedIn || !customer) {
    router.replace('/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setProfileSuccess('Profile updated successfully.');
      } else {
        setProfileError(result.error || 'Failed to update profile.');
      }
    } catch {
      setProfileError('Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  };

  const orders = customer.orders?.edges || [];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const formatPrice = (amount: string, currency: string) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
    }).format(parseFloat(amount));

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      FULFILLED: 'bg-green-100 text-green-700',
      UNFULFILLED: 'bg-yellow-100 text-yellow-700',
      PARTIALLY_FULFILLED: 'bg-blue-100 text-blue-700',
      PAID: 'bg-green-100 text-green-700',
      PENDING: 'bg-yellow-100 text-yellow-700',
      REFUNDED: 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <NavBar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#00473c]">
              Hello, {customer.firstName || 'there'}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">{customer.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-red-600 transition px-4 py-2 rounded-lg border border-gray-200 hover:border-red-200"
          >
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-gray-100 rounded-xl p-1 w-fit">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'orders'
                ? 'bg-white text-[#00473c] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === 'profile'
                ? 'bg-white text-[#00473c] shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Profile
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="text-4xl mb-4">📦</div>
                <h2 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Once you place an order, it will appear here.
                </p>
                <Link
                  href="/collections/all-blinds"
                  className="inline-block px-6 py-2.5 rounded-lg bg-[#00473c] text-white text-sm font-medium hover:bg-[#003830] transition"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              orders.map(({ node: order }) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-gray-100 p-6"
                >
                  {/* Order header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-sm font-semibold text-[#00473c]">
                        Order #{order.orderNumber}
                      </span>
                      <span className="text-sm text-gray-400 ml-3">
                        {formatDate(order.processedAt)}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge(
                          order.financialStatus
                        )}`}
                      >
                        {order.financialStatus.replace(/_/g, ' ')}
                      </span>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge(
                          order.fulfillmentStatus
                        )}`}
                      >
                        {order.fulfillmentStatus.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Line items */}
                  <div className="space-y-3">
                    {order.lineItems.edges.map(({ node: item }, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        {item.variant?.image && (
                          <img
                            src={item.variant.image.url}
                            alt={item.variant.image.altText || item.title}
                            className="w-14 h-14 rounded-lg object-cover border border-gray-100"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity}
                            {item.variant && (
                              <> &middot; {formatPrice(
                                item.variant.price.amount,
                                item.variant.price.currencyCode
                              )}</>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order total */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <span className="text-sm font-semibold text-[#00473c]">
                      Total: {formatPrice(
                        order.totalPrice.amount,
                        order.totalPrice.currencyCode
                      )}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 max-w-lg">
            <h2 className="text-lg font-semibold text-[#00473c] mb-6">
              Profile Details
            </h2>

            {profileError && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                {profileError}
              </div>
            )}
            {profileSuccess && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                {profileSuccess}
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    defaultValue={customer.firstName || ''}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00473c]/20 focus:border-[#00473c] outline-none transition text-sm"
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
                    defaultValue={customer.lastName || ''}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00473c]/20 focus:border-[#00473c] outline-none transition text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={customer.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Contact support to change your email address.
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={customer.phone || ''}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#00473c]/20 focus:border-[#00473c] outline-none transition text-sm"
                  placeholder="+44 7XXX XXXXXX"
                />
              </div>

              {customer.defaultAddress && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Address
                  </label>
                  <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
                    {[
                      customer.defaultAddress.address1,
                      customer.defaultAddress.address2,
                      customer.defaultAddress.city,
                      customer.defaultAddress.province,
                      customer.defaultAddress.zip,
                      customer.defaultAddress.country,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-lg bg-[#00473c] text-white font-medium text-sm hover:bg-[#003830] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

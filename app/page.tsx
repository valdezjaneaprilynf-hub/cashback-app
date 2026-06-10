'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { onAuthStateChange } from '@/lib/auth';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Home() {
  const router = useRouter();
  const { user, loading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(false);
    const subscription = onAuthStateChange((user) => {
      setUser(user);
    });

    return () => subscription?.unsubscribe();
  }, [setUser, setLoading]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to CashbackPH</h1>
            <p className="text-gray-600 mb-6">
              Earn cashback rewards when you shop on Shopee and TikTok Shop. Get paid in your GCash wallet!
            </p>
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg">Sign Up</Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">How it works:</h2>
            <ol className="space-y-3">
              <li>1. Submit a product link from Shopee or TikTok Shop</li>
              <li>2. Get a cashback link from our admin</li>
              <li>3. Shop using the link</li>
              <li>4. Upload your receipt</li>
              <li>5. Receive your commission in 3 days</li>
              <li>6. Withdraw to GCash anytime</li>
            </ol>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.full_name}!</h1>
      
      {user.role === 'user' && (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card title="Quick Actions">
            <div className="space-y-3">
              <Link href="/submit-link" className="block">
                <Button className="w-full">Submit Link</Button>
              </Link>
              <Link href="/dashboard" className="block">
                <Button variant="secondary" className="w-full">
                  View Dashboard
                </Button>
              </Link>
              <Link href="/withdrawals" className="block">
                <Button variant="success" className="w-full">
                  Withdraw
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}

      {user.role === 'admin' && (
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card title="Admin Panel">
            <div className="space-y-3">
              <Link href="/admin/dashboard" className="block">
                <Button className="w-full">Dashboard</Button>
              </Link>
              <Link href="/admin/link-requests" className="block">
                <Button variant="secondary" className="w-full">
                  Link Requests
                </Button>
              </Link>
              <Link href="/admin/proofs" className="block">
                <Button variant="secondary" className="w-full">
                  Proof Review
                </Button>
              </Link>
              <Link href="/admin/withdrawals" className="block">
                <Button variant="success" className="w-full">
                  Withdrawals
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </main>
  );
}

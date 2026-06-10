'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { createLinkRequest } from '@/supabase/functions';
import toast from 'react-hot-toast';

export default function SubmitLinkPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productLink: '',
    productSource: 'shopee' as 'shopee' | 'tiktok-shop',
  });

  useEffect(() => {
    if (user && user.role !== 'user') {
      router.push('/');
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in first');
      return;
    }

    setLoading(true);
    try {
      await createLinkRequest(user.id, formData.productLink, formData.productSource);
      toast.success('Link submitted successfully! Admin will review shortly.');
      setFormData({ productLink: '', productSource: 'shopee' });
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <Card title="Submit Product Link">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select Platform</label>
            <select
              name="productSource"
              value={formData.productSource}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="shopee">Shopee</option>
              <option value="tiktok-shop">TikTok Shop</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Product Link</label>
            <input
              type="url"
              name="productLink"
              value={formData.productLink}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://shopee.ph/product/..."
            />
            <p className="mt-2 text-sm text-gray-600">
              Paste the full URL of the product you want to shop
            </p>
          </div>

          <Button type="submit" loading={loading} size="lg" className="w-full">
            {loading ? 'Submitting...' : 'Submit Link'}
          </Button>
        </form>
      </Card>
    </main>
  );
}

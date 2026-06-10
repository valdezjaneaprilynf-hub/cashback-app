'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { getUserLinkRequests } from '@/supabase/functions';
import { LinkRequest } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [linkRequests, setLinkRequests] = useState<LinkRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'user') {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      loadLinkRequests();
    }
  }, [user]);

  const loadLinkRequests = async () => {
    if (!user) return;
    try {
      const data = await getUserLinkRequests(user.id);
      setLinkRequests(data);
    } catch (error) {
      console.error('Failed to load link requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <Link href="/submit-link">
          <Button>Submit New Link</Button>
        </Link>
      </div>

      <Card title="Your Submitted Links">
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : linkRequests.length === 0 ? (
          <p className="text-gray-600">No links submitted yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Product Link</th>
                  <th className="text-left py-2">Source</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Commission</th>
                </tr>
              </thead>
              <tbody>
                {linkRequests.map((req) => (
                  <tr key={req.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 truncate">
                      <a href={req.product_link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {req.product_link.substring(0, 50)}...
                      </a>
                    </td>
                    <td className="py-2">{req.product_source}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-sm ${getStatusBadgeColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-2">
                      {req.expected_commission ? `PHP ${req.expected_commission}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  );
}

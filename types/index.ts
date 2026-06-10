// User types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  created_at: string;
}

// Link Request types
export interface LinkRequest {
  id: string;
  user_id: string;
  product_link: string;
  product_source: 'shopee' | 'tiktok-shop';
  status: 'pending' | 'approved' | 'rejected';
  cashback_link?: string;
  expected_commission?: number;
  created_at: string;
  updated_at: string;
}

// Proof of Purchase types
export interface ProofOfPurchase {
  id: string;
  link_request_id: string;
  user_id: string;
  screenshot_url: string;
  order_id: string;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  commission_amount?: number;
  created_at: string;
  updated_at: string;
}

// Commission types
export interface Commission {
  id: string;
  user_id: string;
  proof_id: string;
  amount: number;
  status: 'pending' | 'approved' | 'settled';
  approved_at?: string;
  settled_at?: string;
  created_at: string;
}

// Withdrawal types
export interface Withdrawal {
  id: string;
  user_id: string;
  amount: number;
  gcash_number: string;
  account_name: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

// Notification types
export interface Notification {
  id: string;
  user_id?: string;
  type: 'link_request' | 'cashback_ready' | 'proof_submitted' | 'commission_approved' | 'withdrawal_request' | 'withdrawal_completed';
  title: string;
  message: string;
  read: boolean;
  related_id?: string;
  created_at: string;
}

// Dashboard types
export interface UserDashboard {
  current_points: number;
  pending_commissions: number;
  approved_commissions: number;
  recent_orders: LinkRequest[];
  notifications: Notification[];
}

export interface AdminDashboard {
  new_link_requests: number;
  pending_proofs: number;
  pending_withdrawals: number;
  total_users: number;
  total_commissions: number;
}

# CashbackPH Application

A simple and easy-to-use cashback rewards platform for Shopee and TikTok Shop products.

## Features

- User registration and login via Supabase Auth
- Submit product links from Shopee or TikTok Shop
- Admin manages cashback links and commissions
- Users upload proof of purchase
- Points system (1 Point = PHP 1)
- Withdrawal system with GCash integration
- Real-time notifications

## User Flow

1. User registers and logs in
2. Home page dashboard
3. Submit product link
4. Receive cashback link from admin
5. Purchase and upload proof
6. Receive points after 3-day approval period
7. Withdraw points via GCash

## Admin Flow

1. Receive link request notifications
2. Create/provide affiliate cashback links
3. Review proof of purchase submissions
4. Approve commissions
5. Process withdrawal requests via GCash

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript
- **Backend**: Supabase (Auth, Database, Storage, Real-time)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **UI Notifications**: React Hot Toast

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with Supabase credentials
4. Run `npm run dev`
5. Open http://localhost:3000

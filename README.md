# LMS Platform

A modern Learning Management System (LMS) built with Next.js, TypeScript, and Firebase.

## Features

- **User Authentication**: Email/password and Google sign-in
- **Course Management**: Browse, search, and filter courses
- **Enrollment System**: Stripe integration for course payments
- **User Dashboard**: Track progress and manage enrolled courses
- **Admin Panel**: Manage courses, users, and view analytics
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: Full support for light and dark themes

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Payments**: Stripe
- **State Management**: React Context API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Stripe account (for payment processing)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/repo/lms-project.git
   cd lms-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── admin/            # Admin-specific components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   ├── profile/          # Profile components
│   ├── theme/            # Theme components
│   └── ui/               # UI components (Shadcn UI)
├── lib/                  # Utility functions and shared code
│   ├── context/          # React Context providers
│   ├── data/             # Mock data
│   ├── firebase/         # Firebase configuration
│   └── types/            # TypeScript types
└── middleware.ts         # Next.js middleware for route protection
```

## Testing

For testing Stripe payments, use the following test card:
- Card number: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)

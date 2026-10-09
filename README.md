# বাজার দর (BazarDor) - প্রয়োজনীয় পণ্যের দাম এক নজরে

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-teal?logo=tailwindcss)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5-5a67d8)
![BetterAuth](https://img.shields.io/badge/BetterAuth-1.7-6366f1)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-white?logo=vercel)

## 📋 Project Description

**বাজার দর** হলো একটি ডাইনামিক পণ্যের দাম ট্র্যাকিং অ্যাপ্লিকেশন, যেখানে ব্যবহারকারী রাতারাতি বিভিন্ন পণ্যের (চাল, ডাল, সবজি, মাছ-মাংস, ওষুধ ইত্যাদি) বাজার দাম দেখতে পারবেন, ক্যাটাগরি অনুযায়ী ফিল্টার করতে পারবেন এবং বিস্তারিত পণ্যের পৃষ্ঠায় বিভিন্ন বাজারের দামের তুলনা দেখতে পারবেন।

অ্যাপ্লিকেশনটি Next.js 16 (App Router) দিয়ে তৈরি, টাইপসেফটির জন্য TypeScript, স্টাইলিংয়ের জন্য Tailwind CSS v4 + DaisyUI কম্পোনেন্ট লাইব্রেরি, এবং authentication-এর জন্য BetterAuth ব্যবহার করা হয়েছে।

---

## 🛠️ Technologies Used

| Technology       | Purpose                                            |
| ---------------- | -------------------------------------------------- |
| **Next.js 16**   | App Router + Server Components + Routing           |
| **TypeScript**   | Static type safety                                 |
| **Tailwind CSS v4** | Utility-first CSS framework + @theme tokens      |
| **DaisyUI 5**    | Pre-built accessible UI components (btn, card...) |
| **BetterAuth**   | Email/Password + Google + GitHub OAuth             |
| **React Hot Toast** | Toast notifications for auth/actions           |
| **React Compiler** | Next-gen automatic memoization                  |
| **Turbopack**    | Lightning-fast dev server                          |
| **Vercel**       | Recommended deployment target                      |

---

## ✨ 5+ Key Features

### 1. 🛒 **Product Sections with Smart Sorting**
- **আজ দাম বেড়েছে ▲**: শীর্ষ ৬টি দাম বাড়ানো পণ্য
- **আজ দাম কমেছে ▼**: শীর্ষ ৬টি দাম কমানো পণ্য
- **সব পণ্য**: সম্পূর্ণ পণ্যের তালিকা anchor link (`#সব-পণ্য`) এ যায়
- Responsive grid (১ → ২ → ৩ → ৪ কলাম)

### 2. 🔐 **BetterAuth Authentication**
- Email/Password (সাইন আপ + সাইন ইন) — কোনো ইমেইল ভেরিফিকেশন নেই
- **Google** ও **GitHub** সোশ্যাল লগইন
- Protected route: `/product/[slug]` লগইন ছিলে দেখা যাবে না
- প্রোফাইলের নাম আপডেট ফিচার (C3 Challenge)
- লগইন/লগআউট/নিবন্ধন/ভ্যালিডেশন — সব তে toast notification

### 3. 📊 **Category Page with Sort (C1)**
- ক্যাটাগরি-ভিত্তিক পণ্য তালিকা
- **সাজান ড্রপডাউন**: `ডিফল্ট` | `দাম: কম থেকে বেশি` | `দাম: বেশি থেকে কম`
- Bengali display কিন্তু numeric value অনুযায়ী sort (string-sort হয় না)
- Loading skeleton + 404-style empty state

### 4. 🎨 **Bengali UI + Bangla Digits**
- সম্পূর্ণ ইন্টারফেস বাংলা ভাষায়
- সকল দাম, শতাংশ, তারিখ — **বাংলা অঙ্কে** (০১২৩৪৫৬৭৮৯)
- ▲% green, ▼% red, —০.০% grey badge
- নেভবারে লাইভ বাংলা তারিখ + infinite scrolling **Price Ticker** marquee

### 5. 📱 **Fully Responsive Design**
- Mobile-first layout (টাচ-টার্গেট ≥ ৪৪px)
- নেভবারের Mobile Hamburger menu
- Hero section স্ট্যাক হয় মোবাইলে
- Grid cols collapse সঠিকভাবে
- `max-w-6xl` container, `btn-sm sm:btn-md` pattern
- **Vercel**-এ রিফ্রেশ করলেও dynamic [slug] route ঠিকভাবে কাজ করে

### 6. 🧾 **Product Details (Protected)**
- Emoji + Title + Summary description
- Category tags + Unit (প্রতি কেজি/লিটার/ডজন/পিস)
- ৪টি Price Summary card: সর্বনিম্ন | সর্বোচ্চ | গড় | আজকের দাম
- **বাজারভিত্তিক আজকের দাম**: Per-market price list

### 7. 🔔 **Extras**
- Global 404 page with CTA
- Skeleton loaders everywhere (Home / Category / Product / Global)
- Context API (AppProvider) for global products + categories state
- Sticky Navbar + Footer সব route এ দেখা যাবে

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ (recommended 20 LTS)
- npm (bundled with Node)

### Installation & Dev Server

```bash
# Step 1: Project directory তে যান
cd nextapp

# Step 2: Dependencies ইনস্টল করুন (আগেই করা থাকলে skip)
npm install

# Step 3: Development server চালান
npm run dev
```

এখন ব্রাউজারে খুলুন: 👉 **http://localhost:3000**

### Production Build & Test (Vercel-এ পাঠানোর আগে)

```bash
cd nextapp

# Build for production
npm run build

# Locally production build test
npm run start
```

### Linting

```bash
npm run lint
```

---

## ⚙️ Environment Variables (BetterAuth)

Vercel/localhost-এ authentication সঠিকভাবে কাজ করতে `.env.local` ফাইলে নিচের ভেরিয়েবলগুলো সেট করুন:

```env
# ===== MongoDB (BetterAuth Database) =====
# MongoDB Atlas URL দিন, না থাকলে অ্যাপটি UI পর্যন্ত কাজ করবে
BETTER_AUTH_DB_URL=mongodb+srv://<user>:<pass>@cluster0.mongodb.net

# ===== App URL =====
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Production (Vercel):
# NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:3000,https://your-project.vercel.app

# ===== Google OAuth (optional) =====
BETTER_AUTH_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
BETTER_AUTH_GOOGLE_SECRET=your-google-client-secret

# ===== GitHub OAuth (optional) =====
BETTER_AUTH_GITHUB_CLIENT_ID=your-github-client-id
BETTER_AUTH_GITHUB_SECRET=your-github-client-secret

# ===== API Base (Default থাকলে কাজ করবে) =====
NEXT_PUBLIC_API_BASE=https://api.api-store.workers.dev/api/bazardor
```

> 💡 **পরীক্ষকের জন্য**: যদি MongoDB না থাকে, তবুও সম্পূর্ণ UI, Pages, Routing, API Data fetching, Cards — সব ঠিকভাবে দেখাবে। শুধুমাত্র Sign In / Sign Up এগুলোর জন্য DB প্রয়োজন।

---

## 🌐 API Endpoints (ব্যবহৃত)

Base URLs:
- Primary: `https://api.api-store.workers.dev/api/bazardor`
- Backup: `https://api.abcz.workers.dev/api/bazardor`

| Endpoint                 | Method | Purpose                        |
| ------------------------ | ------ | ------------------------------ |
| `GET /products`          | GET    | All products                   |
| `GET /products?category=chal` | GET | Filter by category slug   |
| `GET /products/:id`      | GET    | Single product by id           |
| `GET /categories`        | GET    | All categories                 |
| `GET /categories/:slug`  | GET    | Single category by slug        |

---

## 📁 Project Structure (Highlights)

```
nextapp/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root: AppProvider + Navbar + Ticker + Footer + Toaster
│   │   ├── page.tsx                # Home (Hero + Risers + Fallers + All Products)
│   │   ├── loading.tsx             # Global skeleton loader
│   │   ├── not-found.tsx           # 404 page
│   │   ├── signin/page.tsx         # Login (email + Google + GitHub)
│   │   ├── signup/page.tsx         # Register (name + email + pass + social)
│   │   ├── profile/
│   │   │   ├── page.tsx            # User profile (protected)
│   │   │   └── update/page.tsx     # Update name (C3 challenge)
│   │   ├── product/[slug]/
│   │   │   ├── page.tsx            # Product details (protected)
│   │   │   └── loading.tsx
│   │   ├── category/[slug]/
│   │   │   ├── page.tsx            # Category with sort dropdown (C1)
│   │   │   └── loading.tsx
│   │   └── api/auth/[...all]/route.ts  # BetterAuth handler
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.tsx          # Sticky nav + mobile menu + auth buttons
│   │   │   ├── Footer.tsx          # Figma spec footer
│   │   │   ├── PriceTicker.tsx     # Infinite scrolling marquee
│   │   │   ├── ProductCard.tsx     # Reusable product card
│   │   │   └── SkeletonCard.tsx    # Loading placeholders
│   │   └── home/
│   │       ├── Hero.tsx            # Banner + CTA → #সব-পণ্য
│   │       └── ProductSection.tsx  # Reusable product grid section
│   ├── context/
│   │   └── AppContext.tsx          # Global products + categories state
│   ├── lib/
│   │   ├── auth.ts                 # BetterAuth server config
│   │   ├── auth-client.ts          # BetterAuth React client
│   │   └── utils.ts                # toBangla, formatPrice, API fetch helpers
│   └── types/index.ts              # TypeScript interfaces
├── public/
│   ├── logo-icon.png               # বাজার দর logo
│   └── bazar-hero.png              # Hero banner image
├── next.config.ts                  # React compiler + Turbopack
├── tsconfig.json                   # Path alias: @/* → src/*
├── tailwind globals.css            # @theme tokens + marquee animation
└── README.md
```

---

## 📜 Scripts

| Script          | Action                                      |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Starts the dev server (Turbopack) :3000     |
| `npm run build` | Production build                            |
| `npm run start` | Serve the production build                  |
| `npm run lint`  | ESLint check                                |

---

## 🚀 Deploy to Vercel

1. এই repository টি GitHub-এ push করুন
2. [vercel.com/new](https://vercel.com/new) থেকে import করুন
3. Framework preset → **Next.js** (auto-detect হবে)
4. Environment variables → উপরের `.env.local` এর গুলো পেস্ট করুন
5. **Deploy** ক্লিক করুন — within 2 minutes লাইভ হয়ে যাবে!

> ✅ Vercel deployment এ কোনো extra কনফিগ দরকার নেই; App Router dynamic [slug] routes automatically কাজ করে।

---

Made with ❤️ for Programming Hero B14 Assignment 7.

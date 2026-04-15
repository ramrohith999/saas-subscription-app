# TaskFlow - MERN SaaS Subscription App (Stripe)

Production-ready starter for a SaaS platform using **React (Vite) + TailwindCSS + Node.js + Express + MongoDB + Stripe**.

## Features

- JWT auth (register, login, me)
- Protected routes (frontend + backend)
- Task CRUD with free-plan usage limit (10 tasks)
- Subscription system (Free/Pro)
- Stripe Checkout for Pro upgrades
- Stripe webhook handling and MongoDB subscription sync
- Stripe customer billing portal link

## Project Structure

```bash
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── stripe/
│   │   ├── utils/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── tailwind.config.js
    └── package.json
```

## API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Stripe
- `POST /api/stripe/create-checkout-session`
- `POST /api/stripe/customer-portal`
- `POST /api/stripe/webhook`

## Environment Variables

### Backend (`backend/.env`)
Copy from `.env.example`:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=change_me_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PRO_PRICE_ID=price_your_pro_price_id
```

### Frontend (`frontend/.env`)
Copy from `.env.example`:

```bash
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

## Local Run

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Stripe Setup Notes

1. Create a recurring Stripe price (`$10/month`) and place its id in `STRIPE_PRO_PRICE_ID`.
2. Expose local backend for webhooks:
   ```bash
   stripe listen --forward-to localhost:5000/api/stripe/webhook
   ```
3. Copy generated webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Security Implemented

- Password hashing with bcrypt
- JWT token auth middleware
- Protected API/task routes
- Stripe webhook signature verification

## Bonus Included

- Usage limits for free plan
- Stripe customer billing portal
- SaaS-style modern UI scaffold with TailwindCSS

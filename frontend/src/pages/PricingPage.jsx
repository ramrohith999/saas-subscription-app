import { useNavigate } from 'react-router-dom';
import PricingCard from '../components/PricingCard.jsx';
import api from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function PricingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  async function startCheckout() {
    if (!user) return navigate('/login');

    const res = await api.post('/api/stripe/create-checkout-session');
    window.location.href = res.data.url;
  }

  async function openPortal() {
    const res = await api.post('/api/stripe/customer-portal');
    window.location.href = res.data.url;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-center text-4xl font-black">Simple pricing for teams</h1>
      <p className="mt-3 text-center text-slate-300">Start free, then upgrade to Pro when you need scale and analytics.</p>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <PricingCard
          title="Free"
          price="$0/month"
          features={['Max 10 tasks', 'Basic dashboard', 'Community support']}
          cta="Current / Start Free"
        />
        <PricingCard
          title="Pro"
          price="$10/month"
          features={['Unlimited tasks', 'Analytics dashboard', 'Priority features']}
          cta="Upgrade with Stripe"
          highlighted
          onClick={startCheckout}
        />
      </section>

      {user?.subscriptionPlan === 'pro' && (
        <div className="mt-6 text-center">
          <button onClick={openPortal} className="rounded bg-slate-800 px-4 py-2 font-semibold">Manage billing portal</button>
        </div>
      )}
    </main>
  );
}

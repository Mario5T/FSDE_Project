import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/apiClient';

const fallbackPlans = [
  {
    id: 'basic', name: 'Basic', monthlyPrice: 19, highlight: false,
    features: ['5-7 snacks per month', 'Standard variety', 'Snack info cards', 'Free shipping'],
    excluded: ['Premium brands', 'Personalization', 'Priority support']
  },
  {
    id: 'premium', name: 'Premium', monthlyPrice: 34, highlight: true,
    features: ['10-12 snacks per month', 'Premium brands included', 'Full personalization', 'Priority support', 'Free shipping'],
    excluded: ['Deluxe exclusive snacks']
  },
  {
    id: 'deluxe', name: 'Deluxe', monthlyPrice: 54, highlight: false,
    features: ['15-20 snacks per month', 'Exclusive & limited edition', 'Full personalization', 'Priority support', 'Free express shipping', 'Bonus surprise snacks'],
    excluded: []
  }
];

export default function PlansPage() {
  const [plans, setPlans] = useState(fallbackPlans);
  const [billing, setBilling] = useState('monthly');
  const { user, updateSubscription } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/plans').then(r => { if (r.data?.length) setPlans(r.data); }).catch(() => {});
  }, []);

  const getPrice = (p) => billing === 'yearly' ? (p.monthlyPrice * 0.8).toFixed(0) : p.monthlyPrice;

  const handleSubscribe = async (plan) => {
    if (!user) { navigate('/register'); return; }
    try {
      await updateSubscription({ active: true, plan: plan.id });
      navigate('/dashboard');
    } catch {
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Choose Your Plan</h1>
        <p className="section-sub">Start your snack adventure with a plan that fits your appetite</p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{ background: 'var(--surface)', borderRadius: 999, padding: '0.25rem', display: 'flex', gap: '0.25rem' }}>
            {['monthly', 'yearly'].map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{
                padding: '0.5rem 1.5rem', borderRadius: 999, border: 'none',
                background: billing === b ? 'var(--primary)' : 'transparent',
                color: billing === b ? 'white' : 'var(--text-muted)',
                fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s'
              }}>
                {b === 'monthly' ? 'Monthly' : 'Yearly (Save 20%)'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {plans.map(plan => (
            <div key={plan.id} className="card" style={{
              border: plan.highlight ? '2px solid var(--primary)' : '1px solid var(--border)',
              position: 'relative', transform: plan.highlight ? 'scale(1.05)' : 'none'
            }}>
              {plan.highlight && (
                <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                  ⭐ Most Popular
                </div>
              )}
              <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.5rem' }}>{plan.name}</h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)' }}>${getPrice(plan)}</span>
                <span style={{ color: 'var(--text-muted)' }}>/month</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--success)' }}>✓</span> {f}
                  </div>
                ))}
                {plan.excluded.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>✗</span> {f}
                  </div>
                ))}
              </div>

              <button
                className={plan.highlight ? 'btn btn-primary' : 'btn btn-outline'}
                style={{ width: '100%' }}
                onClick={() => handleSubscribe(plan)}
              >
                {user?.subscription?.active && user?.subscription?.plan === plan.id ? 'Current Plan' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '3rem', fontSize: '0.9rem' }}>
          Cancel anytime. No hidden fees. Free shipping on all plans.
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TASTE_OPTIONS = ['Sweet', 'Spicy', 'Savory', 'Sour', 'Umami', 'Vegan', 'Healthy', 'Crunchy'];
const ALLERGY_OPTIONS = ['Nuts', 'Gluten', 'Dairy', 'Shellfish', 'Soy', 'Eggs'];
const BOX_SIZES = ['Small', 'Medium', 'Large'];

export default function DashboardPage() {
  const { user, logout, updatePreferences, updateSubscription } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const prefs = user?.preferences || { tastes: [], allergies: [], boxSize: 'Medium' };
  const sub = user?.subscription;

  const parsedTastes = typeof prefs.tastes === 'string' ? JSON.parse(prefs.tastes) : (prefs.tastes || []);
  const parsedAllergies = typeof prefs.allergies === 'string' ? JSON.parse(prefs.allergies) : (prefs.allergies || []);

  const [selectedTastes, setSelectedTastes] = useState(parsedTastes);
  const [selectedAllergies, setSelectedAllergies] = useState(parsedAllergies);
  const [boxSize, setBoxSize] = useState(prefs.boxSize || 'Medium');

  const toggleTaste = (t) => setSelectedTastes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const toggleAllergy = (a) => setSelectedAllergies(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const handleSavePrefs = async () => {
    setSaving(true);
    try {
      await updatePreferences({ tastes: selectedTastes, allergies: selectedAllergies, boxSize });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert('Failed to save preferences.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelSub = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    try {
      await updateSubscription({ active: false, plan: null });
    } catch {
      alert('Failed to cancel subscription.');
    }
  };

  const tabs = ['overview', 'preferences', 'subscription'];

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: '1.8rem' }}>Welcome back, {user?.name}! 👋</h1>
            <p style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
          </div>
          <button onClick={logout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Logout</button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0' }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '0.75rem 1.25rem', border: 'none', background: 'transparent',
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 600, fontSize: '0.95rem', borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              marginBottom: -1, transition: 'all 0.2s', textTransform: 'capitalize'
            }}>{tab}</button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📦</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Subscription Status</h3>
              {sub?.active ? (
                <>
                  <span className="badge badge-green" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Active</span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Plan: <strong style={{ color: 'var(--text)' }}>{sub.plan?.charAt(0).toUpperCase() + sub.plan?.slice(1)}</strong></p>
                  {sub.nextDeliveryDate && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Next delivery: {new Date(sub.nextDeliveryDate).toLocaleDateString()}</p>}
                </>
              ) : (
                <>
                  <span className="badge" style={{ background: 'var(--surface-2)', marginBottom: '0.75rem', display: 'inline-block' }}>No Active Plan</span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Subscribe to start receiving snack boxes.</p>
                  <Link to="/plans" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Browse Plans</Link>
                </>
              )}
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🎯</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Taste Preferences</h3>
              {selectedTastes.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedTastes.map(t => <span key={t} className="badge badge-orange">{t}</span>)}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No preferences set yet.</p>
              )}
              <button onClick={() => setActiveTab('preferences')} className="btn btn-ghost" style={{ padding: '0.5rem 0', fontSize: '0.85rem', marginTop: '1rem', color: 'var(--primary)' }}>
                Edit preferences →
              </button>
            </div>

            <div className="card">
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>👤</div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Account</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Name: <strong style={{ color: 'var(--text)' }}>{user?.name}</strong></p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Email: <strong style={{ color: 'var(--text)' }}>{user?.email}</strong></p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Role: <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{user?.role}</span></p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</p>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="card" style={{ maxWidth: 600 }}>
            <h2 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Snack Preferences</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Taste Preferences</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {TASTE_OPTIONS.map(t => (
                  <button key={t} onClick={() => toggleTaste(t)} style={{
                    padding: '0.4rem 0.9rem', borderRadius: 999, border: '1px solid',
                    borderColor: selectedTastes.includes(t) ? 'var(--primary)' : 'var(--border)',
                    background: selectedTastes.includes(t) ? 'rgba(249,115,22,0.15)' : 'transparent',
                    color: selectedTastes.includes(t) ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: 500, fontSize: '0.85rem', transition: 'all 0.2s'
                  }}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Allergies / Dietary Restrictions</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {ALLERGY_OPTIONS.map(a => (
                  <button key={a} onClick={() => toggleAllergy(a)} style={{
                    padding: '0.4rem 0.9rem', borderRadius: 999, border: '1px solid',
                    borderColor: selectedAllergies.includes(a) ? 'var(--error)' : 'var(--border)',
                    background: selectedAllergies.includes(a) ? 'rgba(239,68,68,0.1)' : 'transparent',
                    color: selectedAllergies.includes(a) ? 'var(--error)' : 'var(--text-muted)',
                    fontWeight: 500, fontSize: '0.85rem', transition: 'all 0.2s'
                  }}>{a}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>Box Size</label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {BOX_SIZES.map(s => (
                  <button key={s} onClick={() => setBoxSize(s)} style={{
                    padding: '0.5rem 1.25rem', borderRadius: 8, border: '1px solid',
                    borderColor: boxSize === s ? 'var(--primary)' : 'var(--border)',
                    background: boxSize === s ? 'rgba(249,115,22,0.15)' : 'transparent',
                    color: boxSize === s ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s'
                  }}>{s}</button>
                ))}
              </div>
            </div>

            <button onClick={handleSavePrefs} className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Preferences'}
            </button>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="card" style={{ maxWidth: 500 }}>
            <h2 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Subscription Management</h2>
            {sub?.active ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--surface-2)', borderRadius: 8 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Status</span>
                    <span className="badge badge-green">Active</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--surface-2)', borderRadius: 8 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Plan</span>
                    <strong>{sub.plan?.charAt(0).toUpperCase() + sub.plan?.slice(1)}</strong>
                  </div>
                  {sub.startDate && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--surface-2)', borderRadius: 8 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Started</span>
                    <strong>{new Date(sub.startDate).toLocaleDateString()}</strong>
                  </div>}
                  {sub.nextDeliveryDate && <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--surface-2)', borderRadius: 8 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Next Delivery</span>
                    <strong>{new Date(sub.nextDeliveryDate).toLocaleDateString()}</strong>
                  </div>}
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Link to="/plans" className="btn btn-outline" style={{ flex: 1 }}>Change Plan</Link>
                  <button onClick={handleCancelSub} className="btn" style={{ flex: 1, background: 'rgba(239,68,68,0.1)', color: 'var(--error)', border: '1px solid var(--error)' }}>Cancel Plan</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>You don't have an active subscription.</p>
                <Link to="/plans" className="btn btn-primary">Browse Plans</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

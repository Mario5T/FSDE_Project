import { useState, useEffect } from 'react';
import { api } from '../lib/apiClient';

const categories = ['All', 'Sweet', 'Spicy', 'Savory', 'Drinks'];

const categoryColors = {
  Sweet: 'badge-yellow',
  Spicy: 'badge-orange',
  Savory: 'badge-green',
  Drinks: 'badge-blue'
};

const categoryEmojis = {
  Sweet: '🍫', Spicy: '🌶️', Savory: '🧀', Drinks: '🥤'
};

export default function ExplorePage() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.get('/snacks')
      .then(r => setSnacks(r.data))
      .catch(() => setSnacks([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All' ? snacks : snacks.filter(s => s.category === activeCategory);

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Explore Snacks</h1>
        <p className="section-sub">Discover unique and delicious snacks from around the world</p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: '0.5rem 1.25rem', borderRadius: 999, border: 'none', cursor: 'pointer',
              background: activeCategory === cat ? 'var(--primary)' : 'var(--surface)',
              color: activeCategory === cat ? 'white' : 'var(--text-muted)',
              fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s'
            }}>
              {cat !== 'All' && categoryEmojis[cat]} {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card" style={{ height: 280, background: 'var(--surface-2)', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <p>No snacks found in this category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(snack => (
              <div key={snack.id} className="card" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ height: 160, background: `linear-gradient(135deg, var(--surface-2), var(--border))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  {categoryEmojis[snack.category] || '🍿'}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>{snack.name}</h3>
                    <span className={`badge ${categoryColors[snack.category] || 'badge-green'}`}>{snack.category}</span>
                  </div>
                  {snack.origin && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>📍 {snack.origin}</p>}
                  {snack.description && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>{snack.description}</p>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.1rem' }}>${snack.price.toFixed(2)}</span>
                    <span style={{ color: 'var(--accent)', fontSize: '0.85rem' }}>{'★'.repeat(Math.round(snack.rating))} {snack.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

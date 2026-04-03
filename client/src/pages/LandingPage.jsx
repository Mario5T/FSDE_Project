import { Link } from 'react-router-dom';

const SNACK_EMOJIS = ['🍫', '🌶️', '🥨', '🍬', '🥜', '🍩', '🍪', '🧀', '🍿', '🥐'];

const features = [
  { icon: '📦', title: 'Curated Monthly Boxes', desc: 'Hand-picked snacks from around the world delivered to your door every month.' },
  { icon: '🎯', title: 'Personalized for You', desc: 'Tell us your taste preferences and dietary needs — we\'ll do the rest.' },
  { icon: '🌍', title: 'Global Flavors', desc: 'Discover unique and exciting snacks from Japan, Mexico, Korea, Europe, and beyond.' },
  { icon: '⚙️', title: 'Full Control', desc: 'Pause, skip, or cancel your subscription anytime — no strings attached.' },
];

const testimonials = [
  { name: 'Alex M.', text: 'SnackSafari opened my world to flavors I never knew existed. The Korean snacks are incredible!', plan: 'Premium' },
  { name: 'Sarah K.', text: 'I love that I can set my dietary preferences. As a vegan, finding good snacks was a struggle — not anymore!', plan: 'Deluxe' },
  { name: 'James T.', text: 'The spicy snack selection is amazing. Every box is a new adventure for my taste buds.', plan: 'Basic' },
];

export default function LandingPage() {
  return (
    <div>
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1a1040 100%)', padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, fontSize: '4rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '2rem', pointerEvents: 'none' }}>
          {[...Array(30)].map((_, i) => <span key={i}>{SNACK_EMOJIS[i % SNACK_EMOJIS.length]}</span>)}
        </div>
        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          <div className="badge badge-orange" style={{ marginBottom: '1.5rem', fontSize: '0.9rem', padding: '0.4rem 1rem' }}>🌍 Global Snack Discovery</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Explore the World,{' '}
            <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              One Snack at a Time
            </span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Monthly subscription boxes packed with curated snacks from around the globe. Personalized to your taste. Delivered to your door.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Start Your Safari 🚀</Link>
            <Link to="/plans" className="btn btn-outline" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>View Plans</Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
            {[['10k+', 'Happy Snackers'], ['50+', 'Countries'], ['200+', 'Snack Varieties']].map(([num, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{num}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-sub">Getting your snack fix has never been this easy</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { step: '1', icon: '📋', title: 'Choose Your Plan', desc: 'Pick from Basic, Premium, or Deluxe based on your snack appetite.' },
              { step: '2', icon: '🎨', title: 'Set Preferences', desc: 'Tell us what you love — sweet, spicy, vegan, or all of the above.' },
              { step: '3', icon: '📦', title: 'We Curate & Pack', desc: 'Our snack experts hand-pick the perfect snacks for your box.' },
              { step: '4', icon: '🚚', title: 'Delivered Monthly', desc: 'Your snack safari arrives right at your doorstep every month.' },
            ].map(item => (
              <div key={item.step} className="card" style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: 'white', width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>{item.step}</div>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem', marginTop: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title">Why SnackSafari?</h2>
          <p className="section-sub">Everything you need for the ultimate snack experience</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {features.map(f => (
              <div key={f.title} className="card" style={{ borderColor: 'var(--surface-2)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What Our Snackers Say</h2>
          <p className="section-sub">Thousands of happy snack adventurers can't be wrong</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {testimonials.map(t => (
              <div key={t.name} className="card">
                <div style={{ marginBottom: '1rem', color: 'var(--accent)' }}>{'★'.repeat(5)}</div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 600 }}>{t.name}</div>
                  <span className="badge badge-orange">{t.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #dc6804 100%)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>Ready for Your Snack Safari?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.1rem' }}>Join thousands of snack lovers discovering the world's best flavors.</p>
          <Link to="/register" className="btn" style={{ background: 'white', color: 'var(--primary)', fontSize: '1.1rem', padding: '1rem 2.5rem' }}>Get Started — It's Free 🎉</Link>
        </div>
      </section>

      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '2rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>🍿 SnackSafari</div>
        <p style={{ fontSize: '0.85rem' }}>© 2024 SnackSafari. All rights reserved.</p>
      </footer>
    </div>
  );
}

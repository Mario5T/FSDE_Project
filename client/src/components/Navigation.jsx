import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/plans', label: 'Plans' },
  ];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)', padding: '0 1.5rem'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.3rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🍿</span>
          <span style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SnackSafari</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-links">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              color: location.pathname === link.to ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s'
            }}>{link.label}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

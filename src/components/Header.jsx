import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleBadge from './RoleBadge';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'Admin':
        return '/admin';
      case 'Donor':
        return '/donor';
      case 'Recipient':
        return '/recipient';
      case 'Logistics':
        return '/logistics';
      default:
        return '/';
    }
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          CareConnect
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          
          {user ? (
            <>
              <Link to={getDashboardLink()}>Dashboard</Link>
              <RoleBadge role={user.role} />
              <span style={{ color: 'var(--gray-700)', fontSize: '0.9rem' }}>
                {user.name}
              </span>
              <button onClick={handleLogout} className="btn small">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn small secondary">
                Login
              </Link>
              <Link to="/signup" className="btn small primary">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

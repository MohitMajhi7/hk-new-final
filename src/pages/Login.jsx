import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Donor');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'Admin':
          navigate('/admin');
          break;
        case 'Donor':
          navigate('/donor');
          break;
        case 'Recipient':
          navigate('/recipient');
          break;
        case 'Logistics':
          navigate('/logistics');
          break;
        default:
          navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password, role);
    
    if (result.success) {
      // Navigation handled by useEffect
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login to CareConnect</h1>
        
        {error && (
          <div style={{ 
            padding: 'var(--space-2)', 
            background: '#FEE2E2', 
            color: '#991B1B', 
            borderRadius: 'var(--radius)',
            marginBottom: 'var(--space-2)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="label">Role</label>
            <select
              id="role"
              className="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Donor">Donor</option>
              <option value="Recipient">Recipient</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          <button type="submit" className="btn primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>

        <div className="auth-link">
          New here? <Link to="/signup">Create an account</Link>
        </div>

        <div style={{ 
          marginTop: 'var(--space-3)', 
          padding: 'var(--space-2)', 
          background: 'var(--gray-100)', 
          borderRadius: 'var(--radius)',
          fontSize: '0.85rem'
        }}>
          <strong>Demo Accounts:</strong>
          <br />Admin: admin@aid.com / admin123
          <br />Donor: donor@aid.com / donor123
          <br />Recipient: recipient@aid.com / recipient123
          <br />Logistics: logistics@aid.com / logistics123
        </div>
      </div>
    </div>
  );
}

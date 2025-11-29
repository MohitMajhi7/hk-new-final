import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Donor');
  const [error, setError] = useState('');
  const { signup, user } = useAuth();
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

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const result = signup({ name, email, password, role });
    
    if (result.success) {
      // Navigation handled by useEffect
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        
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
            <label htmlFor="name" className="label">Full Name</label>
            <input
              type="text"
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

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
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="label">I want to be a</label>
            <select
              id="role"
              className="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="Donor">Donor</option>
              <option value="Recipient">Recipient</option>
              <option value="Logistics">Logistics</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn primary" style={{ width: '100%' }}>
            Create Account
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}

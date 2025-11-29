import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Donor');
  const [error, setError] = useState('');

  // ⬇ LETTER CAPTCHA STATES
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Generate letter captcha (A-Z + 0-9)
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let text = '';
    for (let i = 0; i < 5; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(text);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'Admin': navigate('/admin'); break;
        case 'Donor': navigate('/donor'); break;
        case 'Recipient': navigate('/recipient'); break;
        case 'Logistics': navigate('/logistics'); break;
        default: navigate('/');
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

    // CAPTCHA VALIDATION
    if (captchaInput.trim().toUpperCase() !== captcha) {
      setError('Incorrect CAPTCHA. Try again.');
      generateCaptcha();
      setCaptchaInput('');
      return;
    }

    const result = login(email, password, role);
    if (!result.success) setError(result.error);
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
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Role</label>
            <select
              className="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Donor">Donor</option>
              <option value="Recipient">Recipient</option>
              <option value="Logistics">Logistics</option>
            </select>
          </div>

          {/* ⭐ LETTER CAPTCHA */}
          <div className="form-group">
            <label className="label">Enter CAPTCHA</label>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '5px'
            }}>
              <div style={{
                background: '#e5e7eb',
                padding: '10px 20px',
                borderRadius: '5px',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                letterSpacing: '4px',
                userSelect: 'none'
              }}>
                {captcha}
              </div>

              <button
                type="button"
                onClick={generateCaptcha}
                style={{
                  padding: '6px 12px',
                  borderRadius: '5px',
                  background: '#ddd',
                  cursor: 'pointer',
                  border: '1px solid #aaa'
                }}
              >
                ↻
              </button>
            </div>

            <input
              type="text"
              className="input"
              placeholder="Type the characters"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
              required
            />
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

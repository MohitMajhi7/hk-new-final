import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import heroImage from '../assets/hero-image.jpg';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to their dashboard
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
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>CareConnect Platform</h1>
          <p>Connecting donors with people in need during emergencies</p>
          <div className="cluster" style={{ justifyContent: 'center' }}>
            <Link to="/login" className="btn primary" style={{ fontSize: '1.1rem' }}>
              Get Started
            </Link>
            <Link to="/signup" className="btn secondary" style={{ fontSize: '1.1rem' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="container stack">
        <div className="card">
          <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: 'var(--space-3)' }}>
            How It Works
          </h2>
          
          <div className="grid cols-2" style={{ marginTop: 'var(--space-3)' }}>
            <div className="card" style={{ background: 'var(--gray-100)' }}>
              <h3>👨‍💼 Admin</h3>
              <ul style={{ paddingLeft: '1.2rem', marginTop: 'var(--space-2)' }}>
                <li>Oversee all platform operations</li>
                <li>Approve donations and requests</li>
                <li>Manage users and volunteers</li>
                <li>Monitor high-demand items</li>
                <li>Ensure transparency and accountability</li>
              </ul>
            </div>

            <div className="card" style={{ background: 'var(--gray-100)' }}>
              <h3>💝 Donor</h3>
              <ul style={{ paddingLeft: '1.2rem', marginTop: 'var(--space-2)' }}>
                <li>List items for donation</li>
                <li>Track donation status</li>
                <li>Join emergency drives</li>
                <li>See impact of contributions</li>
                <li>Receive updates on deliveries</li>
              </ul>
            </div>

            <div className="card" style={{ background: 'var(--gray-100)' }}>
              <h3>🙋 Recipient</h3>
              <ul style={{ paddingLeft: '1.2rem', marginTop: 'var(--space-2)' }}>
                <li>Request needed items</li>
                <li>Track delivery status</li>
                <li>Receive emergency supplies</li>
                <li>Provide feedback</li>
                <li>Connect with donors</li>
              </ul>
            </div>

            <div className="card" style={{ background: 'var(--gray-100)' }}>
              <h3>🚚 Logistics Coordinator</h3>
              <ul style={{ paddingLeft: '1.2rem', marginTop: 'var(--space-2)' }}>
                <li>Organize transportation</li>
                <li>Manage inventory</li>
                <li>Assign deliveries</li>
                <li>Track shipments</li>
                <li>Ensure timely delivery</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card text-center">
          <h2>Ready to Make a Difference?</h2>
          <p style={{ color: 'var(--gray-700)', marginBottom: 'var(--space-3)' }}>
            Join our platform today and help connect resources with those who need them most.
          </p>
          <div className="cluster" style={{ justifyContent: 'center' }}>
            <Link to="/signup" className="btn primary">
              Create Account
            </Link>
            <Link to="/login" className="btn secondary">
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

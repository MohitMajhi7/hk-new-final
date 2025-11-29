import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="auth-container">
      <div className="auth-card text-center">
        <h1 style={{ fontSize: '4rem', margin: '0' }}>404</h1>
        <h2>Page Not Found</h2>
        <p style={{ color: 'var(--gray-700)', marginBottom: 'var(--space-3)' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}

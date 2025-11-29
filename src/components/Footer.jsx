export default function Footer() {
  return (
    <footer className="footer">
      <div style={{ maxWidth: 'var(--maxw)', margin: '0 auto' }}>
        <p style={{ margin: '0 0 var(--space-2)', color: 'var(--gray-900)', fontWeight: '600' }}>
          © 2025 CareConnect. Connecting donors with those in need during emergencies.
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-2)',
          fontSize: '0.9rem',
          color: 'var(--gray-700)'
        }}>
          <div>
            <strong style={{ color: 'var(--gray-900)' }}>Phone:</strong>
            <div>8885299963</div>
            <div>9996355255</div>
          </div>
          <div>
            <strong style={{ color: 'var(--gray-900)' }}>Email:</strong>
            <div>careconnect@gmail.com</div>
          </div>
          <div>
            <strong style={{ color: 'var(--gray-900)' }}>Address:</strong>
            <div>Benz Circle, Vijayawada</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

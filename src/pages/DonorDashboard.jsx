import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';
import { useFilterAndSearch } from '../hooks/useFilterAndSearch';
import EmptyState from '../components/EmptyState';

export default function DonorDashboard() {
  const { user } = useAuth();
  const { donations, addDonation, cancelDonation } = useDonation();
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Food');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Get user's donations
  const userDonations = donations.filter(d => d.donorId === user.id);
  const filteredDonations = useFilterAndSearch(userDonations, {
    q: searchQuery,
    status: statusFilter
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !category || !quantity) {
      setError('All fields are required');
      return;
    }

    if (parseInt(quantity) < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    addDonation({
      title: title.trim(),
      category,
      quantity: parseInt(quantity),
      donorId: user.id
    });

    // Reset form
    setTitle('');
    setCategory('Food');
    setQuantity('');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container stack">
      <div>
        <h1 style={{ margin: 0 }}>Donor Dashboard</h1>
        <p style={{ color: 'var(--gray-700)', margin: '0.5rem 0 0' }}>
          Welcome back, {user.name}
        </p>
      </div>

      {/* List Items Form */}
      <div className="card">
        <h2>List New Donation</h2>
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
          <div className="grid cols-3">
            <div className="form-group">
              <label htmlFor="title" className="label">Item Title</label>
              <input
                type="text"
                id="title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Bottled Water Cases"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="label">Category</label>
              <select
                id="category"
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Food">Food</option>
                <option value="Water">Water</option>
                <option value="Medical">Medical</option>
                <option value="Clothing">Clothing</option>
                <option value="Equipment">Equipment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity" className="label">Quantity</label>
              <input
                type="number"
                id="quantity"
                className="input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                placeholder="1"
                required
              />
            </div>
          </div>
          
          <button type="submit" className="btn primary">
            Add Donation
          </button>
        </form>
      </div>

      {/* Track Donations */}
      <div className="card">
        <h2>My Donations ({userDonations.length})</h2>
        
        {/* Filters */}
        <div className="cluster mb-3">
          <input
            type="text"
            className="input"
            placeholder="Search donations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <select
            className="select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ maxWidth: '200px' }}
          >
            <option value="">All Statuses</option>
            <option value="listed">Listed</option>
            <option value="approved">Approved</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredDonations.length === 0 ? (
          <EmptyState
            icon="📦"
            title="No donations found"
            message={userDonations.length === 0 
              ? "List your first donation using the form above" 
              : "Try adjusting your search or filters"}
          />
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map(donation => (
                  <tr key={donation.id}>
                    <td><strong>{donation.title}</strong></td>
                    <td>{donation.category}</td>
                    <td>{donation.quantity}</td>
                    <td>
                      <span className={`badge status-${donation.status}`}>
                        {donation.status}
                      </span>
                    </td>
                    <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td>
                      {donation.status === 'listed' && (
                        <button
                          onClick={() => cancelDonation(donation.id)}
                          className="btn danger small"
                        >
                          Cancel
                        </button>
                      )}
                      {donation.status !== 'listed' && (
                        <span style={{ color: 'var(--gray-700)', fontSize: '0.85rem' }}>
                          View Status
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

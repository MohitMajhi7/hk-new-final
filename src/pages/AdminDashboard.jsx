import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';

export default function AdminDashboard() {
  const { user, users } = useAuth();
  const { donations, requests, approveDonation, approveRequest, highDemand } = useDonation();
  const [loading, setLoading] = useState(true);
  const [highDemandItems, setHighDemandItems] = useState([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setHighDemandItems(highDemand());
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  const stats = {
    users: users.length,
    donations: donations.filter(d => d.status !== 'cancelled').length,
    requests: requests.filter(r => r.status === 'requested').length,
    inTransit: [...donations, ...requests].filter(i => i.status === 'in-transit').length
  };

  const pendingDonations = donations.filter(d => d.status === 'listed');
  const pendingRequests = requests.filter(r => r.status === 'requested');

  return (
    <div className="container stack">
      <div>
        <h1 style={{ margin: 0 }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--gray-700)', margin: '0.5rem 0 0' }}>
          Welcome back, {user.name}
        </p>
      </div>

      {/* Platform Overview */}
      <div className="card">
        <h2>Platform Overview</h2>
        <div className="grid cols-4">
          <div className="stat-card">
            <h3>{stats.users}</h3>
            <p>Total Users</p>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)' }}>
            <h3>{stats.donations}</h3>
            <p>Active Donations</p>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, var(--warning) 0%, #D97706 100%)' }}>
            <h3>{stats.requests}</h3>
            <p>Pending Requests</p>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, #0C3A5E 100%)' }}>
            <h3>{stats.inTransit}</h3>
            <p>In Transit</p>
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="grid cols-2">
        <div className="card">
          <h2>Pending Donations ({pendingDonations.length})</h2>
          {pendingDonations.length === 0 ? (
            <p style={{ color: 'var(--gray-700)' }}>No pending donations</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDonations.map(donation => (
                    <tr key={donation.id}>
                      <td>{donation.title}</td>
                      <td>{donation.category}</td>
                      <td>{donation.quantity}</td>
                      <td>
                        <button
                          onClick={() => approveDonation(donation.id)}
                          className="btn success small"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <h2>Pending Requests ({pendingRequests.length})</h2>
          {pendingRequests.length === 0 ? (
            <p style={{ color: 'var(--gray-700)' }}>No pending requests</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map(request => (
                    <tr key={request.id}>
                      <td>{request.title}</td>
                      <td>{request.category}</td>
                      <td>{request.quantity}</td>
                      <td>
                        <button
                          onClick={() => approveRequest(request.id)}
                          className="btn success small"
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* High Demand Items */}
      <div className="card">
        <h2>High Demand Items</h2>
        {highDemandItems.length === 0 ? (
          <p style={{ color: 'var(--gray-700)' }}>No high demand items currently</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Quantity Requested</th>
                </tr>
              </thead>
              <tbody>
                {highDemandItems.map(item => (
                  <tr key={item.category}>
                    <td><strong>{item.category}</strong></td>
                    <td>{item.quantity} units</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Management */}
      <div className="card">
        <h2>User Management</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

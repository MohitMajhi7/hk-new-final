import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useDonation } from '../context/DonationContext';

export default function LogisticsDashboard() {
  const { user, users } = useAuth();
  const { 
    donations, 
    requests, 
    assignDonationToRecipient, 
    pickShipment, 
    markInTransit, 
    markDelivered 
  } = useDonation();
  const [loading, setLoading] = useState(true);
  const [selectedRecipient, setSelectedRecipient] = useState({});

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  // Get recipients for assignment
  const recipients = users.filter(u => u.role === 'Recipient');

  // Filter items for logistics
  const unassignedDonations = donations.filter(
    d => d.status === 'approved' && !d.recipientId
  );
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const myShipments = [
    ...donations.filter(d => d.logisticsId === user.id),
    ...requests.filter(r => r.logisticsId === user.id)
  ];

  const handleAssign = (donationId) => {
    const recipientId = selectedRecipient[donationId];
    if (recipientId) {
      assignDonationToRecipient(donationId, recipientId);
      setSelectedRecipient({ ...selectedRecipient, [donationId]: '' });
    }
  };

  const handleMarkInTransit = (item, type) => {
    markInTransit(item.id, type, user.id);
  };

  return (
    <div className="container stack">
      <div>
        <h1 style={{ margin: 0 }}>Logistics Dashboard</h1>
        <p style={{ color: 'var(--gray-700)', margin: '0.5rem 0 0' }}>
          Welcome back, {user.name}
        </p>
      </div>

      {/* My Shipments */}
      <div className="card">
        <h2>My Shipments ({myShipments.length})</h2>
        {myShipments.length === 0 ? (
          <p style={{ color: 'var(--gray-700)' }}>No active shipments</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myShipments.map(item => {
                  const type = item.donorId ? 'donation' : 'request';
                  return (
                    <tr key={item.id}>
                      <td><strong>{item.title}</strong></td>
                      <td>
                        <span className={`badge ${type === 'donation' ? 'donor' : 'recipient'}`}>
                          {type}
                        </span>
                      </td>
                      <td>
                        <span className={`badge status-${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>
                        <div className="cluster">
                          {item.status === 'approved' && (
                            <button
                              onClick={() => handleMarkInTransit(item, type)}
                              className="btn warning small"
                            >
                              Mark In-Transit
                            </button>
                          )}
                          {item.status === 'in-transit' && (
                            <button
                              onClick={() => markDelivered(item.id, type)}
                              className="btn success small"
                            >
                              Mark Delivered
                            </button>
                          )}
                          {item.status === 'delivered' && (
                            <span style={{ color: 'var(--success)', fontWeight: 500 }}>
                              ✓ Completed
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inventory Management */}
      <div className="grid cols-2">
        <div className="card">
          <h2>Unassigned Donations ({unassignedDonations.length})</h2>
          {unassignedDonations.length === 0 ? (
            <p style={{ color: 'var(--gray-700)' }}>No unassigned donations</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Assign To</th>
                  </tr>
                </thead>
                <tbody>
                  {unassignedDonations.map(donation => (
                    <tr key={donation.id}>
                      <td>{donation.title}</td>
                      <td>{donation.category}</td>
                      <td>{donation.quantity}</td>
                      <td>
                        <div className="cluster">
                          <select
                            className="select"
                            value={selectedRecipient[donation.id] || ''}
                            onChange={(e) =>
                              setSelectedRecipient({
                                ...selectedRecipient,
                                [donation.id]: e.target.value
                              })
                            }
                            style={{ fontSize: '0.85rem', padding: '0.4rem' }}
                          >
                            <option value="">Select recipient</option>
                            {recipients.map(r => (
                              <option key={r.id} value={r.id}>
                                {r.name}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleAssign(donation.id)}
                            className="btn primary small"
                            disabled={!selectedRecipient[donation.id]}
                          >
                            Assign
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="card">
          <h2>Approved Requests ({approvedRequests.length})</h2>
          {approvedRequests.length === 0 ? (
            <p style={{ color: 'var(--gray-700)' }}>No approved requests</p>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {approvedRequests.map(request => (
                    <tr key={request.id}>
                      <td>{request.title}</td>
                      <td>{request.category}</td>
                      <td>{request.quantity}</td>
                      <td>
                        {!request.logisticsId ? (
                          <button
                            onClick={() => pickShipment(request.id, 'request')}
                            className="btn primary small"
                          >
                            Pick Up
                          </button>
                        ) : request.logisticsId === user.id ? (
                          <button
                            onClick={() => handleMarkInTransit(request, 'request')}
                            className="btn warning small"
                          >
                            In-Transit
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: 'var(--gray-700)' }}>
                            Assigned
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
    </div>
  );
}

import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { seedDonations, seedRequests } from '../data/seed';

const DonationContext = createContext(null);

export function DonationProvider({ children }) {
  const [donations, setDonations] = useLocalStorage('donations', seedDonations);
  const [requests, setRequests] = useLocalStorage('requests', seedRequests);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Add notification
  const addNotification = (message) => {
    const notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev].slice(0, 10));
  };

  // Dismiss notification
  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Donor actions
  const addDonation = (item) => {
    const newDonation = {
      id: `d${Date.now()}`,
      ...item,
      status: 'listed',
      recipientId: null,
      logisticsId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setDonations(prev => [...prev, newDonation]);
    addNotification(`New donation listed: ${item.title}`);
    return newDonation;
  };

  const cancelDonation = (id) => {
    setDonations(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: 'cancelled', updatedAt: new Date().toISOString() }
          : d
      )
    );
    addNotification('Donation cancelled');
  };

  // Recipient actions
  const addRequest = (item) => {
    const newRequest = {
      id: `r${Date.now()}`,
      ...item,
      status: 'requested',
      logisticsId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setRequests(prev => [...prev, newRequest]);
    addNotification(`New request created: ${item.title}`);
    return newRequest;
  };

  const cancelRequest = (id) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, status: 'cancelled', updatedAt: new Date().toISOString() }
          : r
      )
    );
    addNotification('Request cancelled');
  };

  // Admin actions
  const approveDonation = (id) => {
    setDonations(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, status: 'approved', updatedAt: new Date().toISOString() }
          : d
      )
    );
    addNotification('Donation approved');
  };

  const approveRequest = (id) => {
    setRequests(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, status: 'approved', updatedAt: new Date().toISOString() }
          : r
      )
    );
    addNotification('Request approved');
  };

  const highDemand = () => {
    const categoryCounts = {};
    
    requests.forEach(req => {
      if (req.status === 'requested' || req.status === 'approved') {
        categoryCounts[req.category] = (categoryCounts[req.category] || 0) + req.quantity;
      }
    });

    return Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, quantity]) => ({ category, quantity }));
  };

  // Logistics actions
  const assignDonationToRecipient = (donationId, recipientId) => {
    setDonations(prev =>
      prev.map(d =>
        d.id === donationId
          ? { ...d, recipientId, updatedAt: new Date().toISOString() }
          : d
      )
    );
    addNotification('Donation assigned to recipient');
  };

  const pickShipment = (id, type = 'donation') => {
    if (type === 'donation') {
      setDonations(prev =>
        prev.map(d =>
          d.id === id
            ? { ...d, updatedAt: new Date().toISOString() }
            : d
        )
      );
    } else {
      setRequests(prev =>
        prev.map(r =>
          r.id === id
            ? { ...r, updatedAt: new Date().toISOString() }
            : r
        )
      );
    }
    addNotification('Shipment picked up');
  };

  const markInTransit = (id, type = 'donation', logisticsId) => {
    if (type === 'donation') {
      setDonations(prev =>
        prev.map(d =>
          d.id === id
            ? { ...d, status: 'in-transit', logisticsId, updatedAt: new Date().toISOString() }
            : d
        )
      );
    } else {
      setRequests(prev =>
        prev.map(r =>
          r.id === id
            ? { ...r, status: 'in-transit', logisticsId, updatedAt: new Date().toISOString() }
            : r
        )
      );
    }
    addNotification('Item marked as in-transit');
  };

  const markDelivered = (id, type = 'donation') => {
    if (type === 'donation') {
      setDonations(prev =>
        prev.map(d =>
          d.id === id
            ? { ...d, status: 'delivered', updatedAt: new Date().toISOString() }
            : d
        )
      );
    } else {
      setRequests(prev =>
        prev.map(r =>
          r.id === id
            ? { ...r, status: 'delivered', updatedAt: new Date().toISOString() }
            : r
        )
      );
    }
    addNotification('Item delivered successfully');
  };

  const value = {
    donations,
    requests,
    notifications,
    loading,
    error,
    addDonation,
    cancelDonation,
    addRequest,
    cancelRequest,
    approveDonation,
    approveRequest,
    highDemand,
    assignDonationToRecipient,
    pickShipment,
    markInTransit,
    markDelivered,
    dismissNotification
  };

  return <DonationContext.Provider value={value}>{children}</DonationContext.Provider>;
}

export function useDonation() {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonation must be used within DonationProvider');
  }
  return context;
}

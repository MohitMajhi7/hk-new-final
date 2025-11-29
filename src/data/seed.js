// Seed data for the application
export const seedUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@aid.com',
    password: 'admin123',
    role: 'Admin'
  },
  {
    id: '2',
    name: 'John Donor',
    email: 'donor@aid.com',
    password: 'donor123',
    role: 'Donor'
  },
  {
    id: '3',
    name: 'Sarah Recipient',
    email: 'recipient@aid.com',
    password: 'recipient123',
    role: 'Recipient'
  },
  {
    id: '4',
    name: 'Mike Logistics',
    email: 'logistics@aid.com',
    password: 'logistics123',
    role: 'Logistics'
  }
];

export const seedDonations = [
  {
    id: 'd1',
    title: 'Bottled Water - 100 cases',
    category: 'Water',
    quantity: 100,
    donorId: '2',
    status: 'approved',
    recipientId: '3',
    logisticsId: '4',
    createdAt: new Date('2025-01-01').toISOString(),
    updatedAt: new Date('2025-01-02').toISOString()
  },
  {
    id: 'd2',
    title: 'Emergency Food Kits',
    category: 'Food',
    quantity: 50,
    donorId: '2',
    status: 'in-transit',
    recipientId: '3',
    logisticsId: '4',
    createdAt: new Date('2025-01-03').toISOString(),
    updatedAt: new Date('2025-01-04').toISOString()
  },
  {
    id: 'd3',
    title: 'First Aid Supplies',
    category: 'Medical',
    quantity: 25,
    donorId: '2',
    status: 'listed',
    recipientId: null,
    logisticsId: null,
    createdAt: new Date('2025-01-05').toISOString(),
    updatedAt: new Date('2025-01-05').toISOString()
  },
  {
    id: 'd4',
    title: 'Blankets and Warm Clothing',
    category: 'Clothing',
    quantity: 75,
    donorId: '2',
    status: 'delivered',
    recipientId: '3',
    logisticsId: '4',
    createdAt: new Date('2024-12-25').toISOString(),
    updatedAt: new Date('2024-12-28').toISOString()
  },
  {
    id: 'd5',
    title: 'Portable Generators',
    category: 'Equipment',
    quantity: 5,
    donorId: '2',
    status: 'approved',
    recipientId: null,
    logisticsId: null,
    createdAt: new Date('2025-01-06').toISOString(),
    updatedAt: new Date('2025-01-06').toISOString()
  }
];

export const seedRequests = [
  {
    id: 'r1',
    title: 'Urgent: Clean Drinking Water',
    category: 'Water',
    quantity: 200,
    recipientId: '3',
    status: 'approved',
    logisticsId: null,
    createdAt: new Date('2025-01-02').toISOString(),
    updatedAt: new Date('2025-01-03').toISOString()
  },
  {
    id: 'r2',
    title: 'Medical Supplies Needed',
    category: 'Medical',
    quantity: 30,
    recipientId: '3',
    status: 'requested',
    logisticsId: null,
    createdAt: new Date('2025-01-05').toISOString(),
    updatedAt: new Date('2025-01-05').toISOString()
  },
  {
    id: 'r3',
    title: 'Baby Formula and Diapers',
    category: 'Food',
    quantity: 40,
    recipientId: '3',
    status: 'in-transit',
    logisticsId: '4',
    createdAt: new Date('2025-01-04').toISOString(),
    updatedAt: new Date('2025-01-06').toISOString()
  }
];

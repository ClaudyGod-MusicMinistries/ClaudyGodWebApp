const express = require('express');
const router = express.Router();

// In-memory store (replace with database in production)
const paymentLogs = {};
const orders = {};

// Zelle confirmation
router.post('/zelle/confirm', (req, res) => {
  const { confirmationId } = req.body;

  if (!confirmationId) {
    return res.status(400).json({ error: 'Confirmation ID is required' });
  }

  // Generate order ID
  const orderId = `CL-ORDER-${Date.now()}`;
  
  // Simulate saving to DB
  paymentLogs[orderId] = {
    transactionId: confirmationId,
    status: 'pending',
    createdAt: new Date()
  };
  
  // Store order details (in real app, save to database)
  orders[orderId] = {
    orderId,
    status: 'pending',
    paymentMethod: 'zelle',
    transactionId: confirmationId,
    createdAt: new Date().toISOString()
  };

  console.log('🟣 Received Zelle confirmation:', { orderId, confirmationId });

  res.json({ success: true, orderId });
});

// Order status check
router.get('/zelle/status/:orderId', (req, res) => {
  const { orderId } = req.params;
  const record = paymentLogs[orderId];

  if (!record) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Simulate payment confirmation after 15 seconds
  const isConfirmed = Date.now() - new Date(record.createdAt).getTime() > 15000;
  
  if (isConfirmed) {
    record.status = 'confirmed';
    if (orders[orderId]) {
      orders[orderId].status = 'confirmed';
    }
  }

  res.json({ status: record.status });
});

// Get order details
router.get('/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders[orderId];
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
//   // In a real app, fetch from database
//   // For demo, return mock data
//   res.json({
//     ...order,
//     items: [
//       { id: 'prod-001', name: 'Premium Headphones', price: 149.99, quantity: 1 },
//       { id: 'prod-002', name: 'USB-C Cable', price: 19.99, quantity: 2 }
//     ],
//     shippingInfo: {
//       firstName: 'John',
//       lastName: 'Doe',
//       email: 'john@example.com',
//       address: '123 Main St',
//       city: 'New York',
//       state: 'NY',
//       zipCode: '10001',
//       country: 'USA'
//     },
//     subtotal: 189.97,
//     tax: 15.20,
//     total: 205.17
//   });
// });

// For manual confirmation simulation
router.post('/zelle/manual-confirm', (req, res) => {
  const { orderId } = req.body;

  if (paymentLogs[orderId]) {
    paymentLogs[orderId].status = 'confirmed';
    if (orders[orderId]) {
      orders[orderId].status = 'confirmed';
    }
    return res.json({ message: 'Order marked as confirmed' });
  }

  res.status(404).json({ error: 'Order not found' });
});

module.exports = router;
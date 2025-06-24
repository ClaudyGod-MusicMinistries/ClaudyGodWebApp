const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

// Create a new order
router.post('/', orderController.createOrder);

// Confirm payment
router.patch('/:orderId/confirm', orderController.confirmPayment);

// Get order status
router.get('/:orderId/status', orderController.getOrderStatus);

// Process email replies
router.post('/process-email', orderController.processEmailReply);

module.exports = router;
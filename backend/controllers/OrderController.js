const Order = require('../models/Order');
const { sendConfirmationRequest } = require('../services/emailService');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    // For Zelle payments, send confirmation request
    if (order.paymentInfo.method === 'zelle') {
      await sendConfirmationRequest(order);
    }
    
    res.status(201).json({ 
      message: 'Order created successfully',
      orderId: order._id,
      status: order.status
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status: 'confirmed' },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Payment confirmed successfully', order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId, 'status');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ status: order.status });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.processEmailReply = async (req, res) => {
  try {
    const { emailText } = req.body;
    await processEmailReply(emailText);
    res.json({ message: 'Email processed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
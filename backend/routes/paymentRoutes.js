const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Order = require("../models/Order");
const { validateZellePayment } = require("../validators/paymentValidators");
const { sendPaymentConfirmationEmail } = require("../services/emailService");

// Confirm Zelle Payment
router.post("/zelle/confirm", async (req, res) => {
  try {
    const { confirmationId, amount, orderId } = req.body;
    
    // Validate input
    const validationError = validateZellePayment({ confirmationId, amount, orderId });
    if (validationError) {
      return res.status(400).json({ 
        success: false,
        error: validationError 
      });
    }

    // Find the order
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ 
        success: false,
        error: "Order not found" 
      });
    }

    // Check for duplicate payment
    const existingPayment = await Payment.findOne({ confirmationId });
    if (existingPayment) {
      return res.status(409).json({ 
        success: false,
        error: "This transaction ID has already been used" 
      });
    }

    // Create payment record
    const payment = await Payment.create({
      orderId,
      confirmationId,
      amount,
      paymentMethod: "zelle",
      status: "pending",
      userEmail: order.shippingInfo.email,
      metadata: {
        orderDetails: {
          items: order.items,
          shipping: order.shippingInfo
        }
      }
    });

    // Update order with payment info
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { 
        $set: { 
          "paymentInfo.zelleConfirmation": confirmationId,
          "paymentInfo.status": "pending",
          status: "processing"
        } 
      },
      { new: true }
    );

    // Send confirmation email
    await sendPaymentConfirmationEmail({
      email: order.shippingInfo.email,
      orderId,
      amount,
      paymentMethod: "zelle",
      confirmationId
    });

    return res.json({ 
      success: true, 
      orderId,
      paymentId: payment._id,
      status: "pending"
    });

  } catch (err) {
    console.error("❌ Payment confirmation error:", err);
    return res.status(500).json({ 
      success: false,
      error: "Server error processing payment" 
    });
  }
});

// Check Payment Status
router.get("/zelle/status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Find payment and order
    const [payment, order] = await Promise.all([
      Payment.findOne({ orderId }),
      Order.findOne({ orderId })
    ]);

    if (!payment || !order) {
      return res.status(404).json({ 
        success: false,
        error: "Order not found" 
      });
    }

    // Automatically confirm after 15 seconds (simulating bank verification)
    const isExpired = new Date() - payment.createdAt > 15000;
    if (payment.status === "pending" && isExpired) {
      const [updatedPayment, updatedOrder] = await Promise.all([
        Payment.findOneAndUpdate(
          { _id: payment._id, status: "pending" },
          { $set: { status: "confirmed" } },
          { new: true }
        ),
        Order.findOneAndUpdate(
          { orderId },
          { 
            $set: { 
              "paymentInfo.status": "completed",
              status: "completed"
            } 
          },
          { new: true }
        )
      ]);

      if (updatedPayment && updatedOrder) {
        await sendPaymentConfirmationEmail({
          email: order.shippingInfo.email,
          orderId,
          amount: payment.amount,
          paymentMethod: "zelle",
          confirmationId: payment.confirmationId,
          status: "confirmed"
        });
      }

      return res.json({ 
        success: true,
        status: updatedPayment?.status || payment.status,
        orderStatus: updatedOrder?.status || order.status
      });
    }

    return res.json({ 
      success: true,
      status: payment.status,
      orderStatus: order.status
    });

  } catch (err) {
    console.error("Status check error:", err);
    return res.status(500).json({ 
      success: false,
      error: "Server error checking status" 
    });
  }
});

// Get Payment Details
router.get("/:paymentId", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.paymentId);
    if (!payment) {
      return res.status(404).json({ 
        success: false,
        error: "Payment not found" 
      });
    }
    
    return res.json({ 
      success: true,
      payment 
    });
  } catch (err) {
    console.error("Payment details error:", err);
    return res.status(500).json({ 
      success: false,
      error: "Server error fetching payment details" 
    });
  }
});

module.exports = router;
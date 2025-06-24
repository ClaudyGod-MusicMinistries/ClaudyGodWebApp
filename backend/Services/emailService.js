const nodemailer = require('nodemailer');
const Order = require('../models/Order');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send confirmation request to client
exports.sendConfirmationRequest = async (order) => {
  const mailOptions = {
    from: `"ClaudyGod Store" <${process.env.EMAIL_USER}>`,
    to: 'cokorie77@gmail.com',
    subject: `Payment Confirmation Required for Order #${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #6a0dad; text-align: center;">Payment Confirmation Request</h2>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #6a0dad; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Transaction ID:</strong> ${order.paymentInfo.zelleConfirmation}</p>
          <p><strong>Amount:</strong> $${order.total.toFixed(2)}</p>
          <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Customer:</strong> ${order.shippingInfo.firstName} ${order.shippingInfo.lastName}</p>
        </div>
        
        <div style="background-color: #fff8e1; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h3 style="color: #6a0dad; margin-top: 0;">Action Required</h3>
          <p>Please confirm the payment for this order by replying to this email with:</p>
          <div style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; text-align: center; margin: 15px 0; font-weight: bold;">
            CONFIRM ${order.paymentInfo.zelleConfirmation}
          </div>
          <p>If you don't recognize this transaction, please reply with:</p>
          <div style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; text-align: center; margin: 15px 0; font-weight: bold;">
            REJECT ${order.paymentInfo.zelleConfirmation}
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.ADMIN_URL}/orders/${order._id}" 
             style="display: inline-block; background-color: #6a0dad; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Order Details
          </a>
        </div>
        
        <p style="margin-top: 30px; text-align: center; color: #757575; font-size: 0.9em;">
          This is an automated message. Please do not reply directly to this email.
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation request sent for order ${order._id}`);
  } catch (error) {
    console.error(`Error sending confirmation email for order ${order._id}:`, error);
  }
};

// Process email replies
exports.processEmailReply = async (emailText) => {
  const lines = emailText.split('\n');
  const commandLine = lines.find(line => line.startsWith('CONFIRM') || line.startsWith('REJECT'));
  
  if (!commandLine) return;
  
  const [command, transactionId] = commandLine.split(' ');
  
  try {
    const order = await Order.findOne({ 
      'paymentInfo.zelleConfirmation': transactionId,
      status: 'pending'
    });
    
    if (!order) {
      console.log(`No pending order found for transaction ID: ${transactionId}`);
      return;
    }
    
    if (command === 'CONFIRM') {
      order.status = 'confirmed';
      await order.save();
      console.log(`Order ${order._id} confirmed via email`);
      
      // Send confirmation to customer
      await this.sendCustomerConfirmation(order);
    } else if (command === 'REJECT') {
      order.status = 'cancelled';
      await order.save();
      console.log(`Order ${order._id} rejected via email`);
    }
  } catch (error) {
    console.error(`Error processing email reply:`, error);
  }
};

// Send confirmation to customer
exports.sendCustomerConfirmation = async (order) => {
  const mailOptions = {
    from: `"ClaudyGod Store" <${process.env.EMAIL_USER}>`,
    to: order.shippingInfo.email,
    subject: `Order Confirmed #${order._id}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #6a0dad; text-align: center;">Thank You For Your Order!</h2>
        
        <div style="text-align: center; margin: 20px 0;">
          <div style="display: inline-block; background-color: #4caf50; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
            Payment Confirmed
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #6a0dad; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">Order Summary</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Transaction ID:</strong> ${order.paymentInfo.zelleConfirmation}</p>
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> Zelle</p>
        </div>
        
        <div style="background-color: #e8f5e9; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4caf50;">
          <h3 style="color: #6a0dad; margin-top: 0;">Next Steps</h3>
          <p>Your order is being processed and will be shipped within 3-5 business days.</p>
          <p>You can track your order status at any time by visiting our website.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.STORE_URL}/orders/${order._id}" 
             style="display: inline-block; background-color: #6a0dad; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            View Your Order
          </a>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation sent to customer for order ${order._id}`);
  } catch (error) {
    console.error(`Error sending customer confirmation for order ${order._id}:`, error);
  }
};
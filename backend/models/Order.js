const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        image: { type: String }
      }
    ],
    shippingInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zipCode: { type: String }
    },
    paymentInfo: {
      method: { type: String, enum: ["zelle", "paypal"], required: true },
      zelleConfirmation: { type: String },
      paypalTxnId: { type: String },
      status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }
    },
    subtotal: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled", "refunded"],
      default: "pending"
    },
    notes: { type: String }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
orderSchema.index({ orderId: 1 });
orderSchema.index({ userId: 1 });
orderSchema.index({ "shippingInfo.email": 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

// Virtuals
orderSchema.virtual('totalFormatted').get(function() {
  return `$${this.total.toFixed(2)}`;
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;
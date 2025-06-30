const mongoose = require('mongoose');

const NigerianBankTransferSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true,
    minlength: 20,
    maxlength: 20
  },
  senderName: {
    type: String,
    required: true,
    minlength: 3
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  currency: {
    type: String,
    required: true,
    enum: ['NGN']
  },
  slipFile: {
    data: Buffer,
    contentType: String
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NigerianBankTransfer', NigerianBankTransferSchema);
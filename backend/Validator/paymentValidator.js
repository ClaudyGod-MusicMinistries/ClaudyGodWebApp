const validateZellePayment = ({ confirmationId, amount, orderId }) => {
  if (!confirmationId || typeof confirmationId !== "string") {
    return "Transaction ID is required";
  }
  
  if (!/^[A-Z0-9]{9,10}$/.test(confirmationId)) {
    return "Invalid Transaction ID format (9-10 alphanumeric characters)";
  }
  
  if (typeof amount !== "number" || amount <= 0) {
    return "Valid payment amount is required";
  }
  
  if (!orderId || typeof orderId !== "string") {
    return "Order ID is required";
  }
  
  return null;
};

const validatePaymentStatusCheck = ({ orderId }) => {
  if (!orderId || typeof orderId !== "string") {
    return "Order ID is required";
  }
  
  return null;
};

module.exports = {
  validateZellePayment,
  validatePaymentStatusCheck
};
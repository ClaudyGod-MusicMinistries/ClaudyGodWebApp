import { useLocation } from 'react-router-dom';
import { ZellePayment } from './zelle';

const ZellePaymentWrapper = () => {
  const location = useLocation();
  const { state } = location;

  // You should get these from your checkout state or context
  const amount = state?.amount || 0; // Default to 0 or handle missing case
  const orderId = state?.orderId || ''; // Default to empty string or handle missing case

  if (!amount || !orderId) {
    // Handle missing required data - maybe redirect back to checkout
    return <div>Missing payment information. Please complete checkout first.</div>;
  }

  return <ZellePayment amount={amount} orderId={orderId} />;
};

export default ZellePaymentWrapper;
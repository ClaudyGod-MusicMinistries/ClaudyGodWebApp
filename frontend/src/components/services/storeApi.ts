export const checkOrderStatus = async (orderId: string): Promise<string> => {
  try {
    const res = await fetch(`http://localhost:10000/api/payment/zelle/status/${orderId}`);
    if (!res.ok) throw new Error('Failed to fetch status');
    const data = await res.json();
    return data.status;
  } catch (error) {
    console.error('Error checking order status:', error);
    return 'error';
  }
};export const checkOrderStatus = async (orderId: string): Promise<string> => {
  try {
    const res = await fetch(`http://localhost:10000/api/payment/zelle/status/${orderId}`);
    if (!res.ok) throw new Error('Failed to fetch status');
    const data = await res.json();
    return data.status;
  } catch (error) {
    console.error('Error checking order status:', error);
    return 'error';
  }
};

export const confirmZellePayment = async (confirmationId: string) => {
  try {
    const response = await fetch('http://localhost:10000/api/payment/zelle/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confirmationId })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Payment confirmation failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Zelle confirmation error:', error);
    throw error;
  }
};
const express = require('express');
const router = express.Router();

router.get('/generate-url', (req, res) => {
  try {
    console.log('PayPal Route - Environment Variables:');
    console.log('PAYPAL_BUSINESS_EMAIL:', process.env.PAYPAL_BUSINESS_EMAIL);
    console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
    
    const { amount, currency } = req.query;
    
    // Validate required parameters
    if (!amount || !currency) {
      return res.status(400).json({ 
        error: 'Missing required parameters: amount or currency' 
      });
    }

    // Get PayPal business email
    const businessEmail = process.env.PAYPAL_BUSINESS_EMAIL;
    if (!businessEmail) {
      console.error('PayPal business email is MISSING in environment variables');
      return res.status(500).json({ 
        error: 'PayPal business email not configured',
        details: 'Check server environment variables'
      });
    }

    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error('Base URL is MISSING in environment variables');
      return res.status(500).json({ 
        error: 'Base URL not configured',
        details: 'Check server environment variables'
      });
    }
    
    // Construct the return URL
    const returnUrl = encodeURIComponent(`${baseUrl}/donation-complete`);
    
    // Construct the PayPal URL
    const paypalUrl = `https://www.paypal.com/donate/?business=${businessEmail}&cmd=_donations&currency_code=${currency}&item_name=Donation+to+ClaudyGod+&amount=${amount}&return=${returnUrl}`;
    
    console.log('Generated PayPal URL:', paypalUrl);
    res.status(200).json({ url: paypalUrl });
  } catch (error) {
    console.error('Error generating PayPal URL:', error);
    res.status(500).json({ 
      error: 'Failed to generate PayPal URL',
      details: error.message 
    });
  }
});

module.exports = router;
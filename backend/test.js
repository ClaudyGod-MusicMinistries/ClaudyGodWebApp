// test.js
const modelPath = './models/NigerianBankTransfer.js';
const routePath = './routes/nigerianBankTransferRoutes.js';

try {
  console.log('Trying to require model...');
  require(modelPath);
  console.log('✅ Model loaded successfully');
} catch (err) {
  console.error('❌ Model load failed:', err);
}

try {
  console.log('Trying to require route...');
  require(routePath);
  console.log('✅ Route loaded successfully');
} catch (err) {
  console.error('❌ Route load failed:', err);
}
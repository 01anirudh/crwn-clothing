require('dotenv').config();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.handler = async (event) => {
  try {
    const { amount, currency = 'INR', receipt } = JSON.parse(event.body);

    // Razorpay accepts amount in **paise** (for INR), so multiply by 100 if amount is in rupees
    const options = {
      amount: amount * 100, // e.g. 500 means ₹500, so send 50000
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1, // auto-capture
    };

    const order = await razorpay.orders.create(options);

    return {
      statusCode: 200,
      body: JSON.stringify({ order }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

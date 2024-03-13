const express = require('express');
const stripe = require('stripe')('sk_test_51Otv5ySAQiq57A2K1WSmG2mkt6fCdQZiIlnDlpJhfhxWN498WetVCR2nXgjiZj7WGOX1krm5oewojqp5goxrTeul00fRrrQNBu'); // Replace 'your_stripe_secret_key' with your actual Stripe secret key
const app = express();
const PORT = 3001; // Port for your server

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 100, // Amount in cents (e.g., $10.00)
            currency: 'inr',
            payment_method_types: ['card'],
            metadata: { integration_check: 'accept_a_payment' }, // Optional metadata
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating PaymentIntent:', error.message);
        res.status(500).json({ error: 'Failed to create PaymentIntent' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

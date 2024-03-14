const express = require("express");
const app = express();
const port = 3001;

require('dotenv').config()

SECRET_KEY = "sk_test_51Otv5ySAQiq57A2KKOfixSbXiycdKoFO1ZxrriHNL1rKuiQMos9KP3BKGXurO6RUSGsfUeC1bPpyJTRF58EbNIiI00gXOLhNZW"

const stripe = require("stripe")(SECRET_KEY);

console.log(process.env.SECRET_KEY);

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(10 * 100),
            currency: "INR",
            payment_method_types: ["card"],
            // automatic_payment_methods: {
            //     enabled: true,
            // },
            metadata: { name: "Deep" }
        });

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret: clientSecret
        });
    } catch (err) {
        console.log("Error:", err.message);
        res.json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

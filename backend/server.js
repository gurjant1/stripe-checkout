// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = require("stripe")(
  "sk_test_51OIp2zSDYHXvJPKzERNzfNK9fPQDqGPjHgOdLNOqwb1ylf4cijxvoElP8EVUIsgIPp27FOnSfjhjC0VxcZhWRMGT00CqXxA8W0"
);
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:4242";
app.use(cors());
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },

          recurring: {
            interval: "month",
          },

          unit_amount: "2000",
        },
        quantity: 1,
      },
    ],
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: `http://localhost:5173/?`,
    cancel_url: `http://localhost:5173/?`,
  });

  res.json({ url: session.url });
});

app.listen(4242, () => console.log("Running on port 4242"));

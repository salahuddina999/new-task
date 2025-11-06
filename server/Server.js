const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.post("/create-checkout-session", async (req, res) => {
  const { product } = req.body;
  const price = Number(product.price);
  const unitAmount = Math.round(price * 100);
  console.log("unitAmount:", unitAmount);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              images: [product.image],
              description: product.description,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () =>
  console.log("✅ Server running")
);

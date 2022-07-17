import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/orderModel';

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const { quantity, total, products } = req.body.cartItems;

  let productsArr = [];
  products.forEach((product) => {
    const { _id, price, quantity } = product;
    productsArr.push({ _id, price, quantity });
  });

  const cartArr = {
    quantity,
    total,
    productItems: productsArr,
  };

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(cartArr),
    },
  });

  const line_items = req.body.cartItems.products.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.img],
          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'BD'],
    },
    // shipping_options: [
    //   {
    //     shipping_rate_data: {
    //       type: 'fixed_amount',
    //       fixed_amount: {
    //         amount: 0,
    //         currency: 'usd',
    //       },
    //       display_name: 'Free shipping',
    //       // Delivers between 5-7 business days
    //       delivery_estimate: {
    //         minimum: {
    //           unit: 'business_day',
    //           value: 5,
    //         },
    //         maximum: {
    //           unit: 'business_day',
    //           value: 7,
    //         },
    //       },
    //     },
    //   },
    //   {
    //     shipping_rate_data: {
    //       type: 'fixed_amount',
    //       fixed_amount: {
    //         amount: 1500,
    //         currency: 'usd',
    //       },
    //       display_name: 'Next day air',
    //       // Delivers in exactly 1 business day
    //       delivery_estimate: {
    //         minimum: {
    //           unit: 'business_day',
    //           value: 1,
    //         },
    //         maximum: {
    //           unit: 'business_day',
    //           value: 1,
    //         },
    //       },
    //     },
    //   },
    // ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: 'payment',
    customer: customer.id,
    success_url: `${process.env.CLIENT_SIDE_URL}/success`,
    cancel_url: `${process.env.CLIENT_SIDE_URL}/cart`,
  });

  // res.redirect(303, session.url);
  res.send({ url: session.url });
});

// Create order function

const createOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);

  const products = items.productItems?.map((item) => {
    return {
      productId: item._id,
      quantity: item.quantity,
    };
  });

  const newOrder = new Order({
    customerId: customer.metadata.userId,
    products,
    totalAmount: data.amount_total,
    address: data.shipping.address,
    status: data.payment_status,
    // customerId: data.customer,
    // paymentIntentId: data.payment_intent,
    // subtotal: data.amount_subtotal,
    // shipping: data.customer_details,
  });

  try {
    const savedOrder = await newOrder.save();
    // console.log('Processed Order:', savedOrder);
  } catch (err) {
    console.log(err);
  }
};

// Stripe webhoook

router.post('/webhook', async (req, res) => {
  let data;
  let eventType;

  // Check if webhook signing is configured.
  let webhookSecret;
  //webhookSecret = process.env.STRIPE_WEB_HOOK;

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the checkout.session.completed event
  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          // CREATE ORDER
          createOrder(customer, data);
        } catch (err) {
          console.log(typeof createOrder);
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }

  res.status(200).end();
});

export default router;

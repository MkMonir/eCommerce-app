import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;

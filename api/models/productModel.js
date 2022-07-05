import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Product must have a title'], unique: true },
    desc: { type: String, required: [true, 'Product must have a description'], unique: true },
    img: { type: String, required: [true, 'Product must have a image'] },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: [true, 'Product must have a price'] },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;

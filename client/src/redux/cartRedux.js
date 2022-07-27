import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingIndex = state.products.findIndex((item) => item._id === action.payload._id);
      // const product = state.products.filter((item) => item._id === action.payload._id);

      // console.log(existingIndex);
      // console.log(
      //   state.products[existingIndex] && state.products[existingIndex]._id === action.payload._id
      // );

      if (state.products[existingIndex]) {
        state.products[existingIndex].quantity += 1;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
    },
    addProductQuantity(state, action) {
      const existingIndex = state.products.findIndex((item) => item._id === action.payload._id);

      if (state.products[existingIndex].quantity >= 0) {
        state.products[existingIndex].quantity += 1;
        // toast.info('Increased product quantity', {
        //   position: 'bottom-left',
        // })
      }
      // else {
      //   let tempProductItem = { ...action.payload, quantity: 1 };
      //   state.products.push(tempProductItem);
      //   // toast.success('Product added to cart', {
      //   //   position: 'bottom-left',
      //   // });
      // }
    },
    decreaseProductQuantity(state, action) {
      const itemIndex = state.products.findIndex((item) => item._id === action.payload._id);

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;

        // toast.info('Decreased product quantity', {
        //   position: 'bottom-left',
        // });
      }
      // else if (state.products[itemIndex].quantity === 1) {
      //   const nextProducts = state.products.filter((item) => item._id !== action.payload._id);

      //   state.products = nextProducts;

      //   // toast.error('Product removed from cart', {
      //   //   position: 'bottom-left',
      //   // });
      // }
    },
    removeFromCart(state, action) {
      state.products.map((product) => {
        if (product._id === action.payload._id) {
          const nextProducts = state.products.filter((item) => item._id !== product._id);

          state.products = nextProducts;
          // toast.error('Product removed from cart', {
          //   position: 'bottom-left',
          // });
        }
        return state;
      });
    },
    getTotals(state, action) {
      let { total } = state.products.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          // cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.quantity = state.products.length;
      state.total = total;
    },
    clearCart(state, action) {
      state.products = [];
      state.total = 0;
      state.quantity = 0;
      // toast.error('Cart cleared', { position: 'bottom-left' });
    },
  },
});

export const {
  addProduct,
  removeFromCart,
  addProductQuantity,
  decreaseProductQuantity,
  getTotals,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

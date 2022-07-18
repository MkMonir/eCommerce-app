import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { useSelector, useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import {
  clearCart,
  getTotals,
  removeFromCart,
  addProductQuantity,
  decreaseProductQuantity,
} from '../redux/cartRedux';
import emptyCartSvg from './../assets/empty_cart.svg';
import { AuthContext } from '../context/authContext/AuthContext';
import PayButton from '../components/PayButton';

const Add = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
  </svg>
);

const Minus = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
  </svg>
);

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddProductQuantity = (product) => {
    dispatch(addProductQuantity(product));
  };

  const handleDecProductQuantity = (product) => {
    dispatch(decreaseProductQuantity(product));
  };

  const handleRemove = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {cart.quantity > 0 ? (
        <>
          <Breadcrumbs>
            <Link to="/">Home</Link>
            <span>Cart</span>
          </Breadcrumbs>
          <section className="py-12">
            <div className="tw-container">
              <article className="hidden lg:block py-10">
                <div
                  className="grid text-center"
                  style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr auto' }}
                >
                  <h5>Item</h5>
                  <h5>Price</h5>
                  <h5>Quantity</h5>
                  <h5>Subtotal</h5>
                  <span className="w-8 h-8"></span>
                </div>
                <hr className="mt-6" />
              </article>
              {cart.products.map((item, i) => {
                const { title, price, img, color, quantity, size } = item;
                return (
                  <article
                    key={i}
                    className="grid cart-grid-cols-3 lg:cart-grid-cols-5 place-items-center mb-6 capitalize"
                  >
                    <div className="flex w-full gap-2 md:gap-4 items-center">
                      <img
                        alt=""
                        className="object-cover w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-md"
                        src={img}
                      />
                      <div>
                        <h5 className="text-base md:text-lg lg:text-xl font-semibold">{title}</h5>
                        <div className="flex items-center gap-2 text-sm lg:text-base">
                          Color:{' '}
                          <div
                            style={{ background: color }}
                            className="w-3 h-3 lg:w-4 lg:h-4 rounded"
                          />
                        </div>
                        <div className="lg:hidden">${price}</div>
                      </div>
                    </div>
                    <h5 className="hidden lg:block">${price}</h5>
                    {/* Quantity */}
                    <div
                      className={` text-3xl md:text-4xl grid grid-cols-3 gap-6 w-max items-center`}
                    >
                      <button
                        className="w-full h-full p-1 outline-none"
                        onClick={() => quantity >= 1 && handleDecProductQuantity(item)}
                      >
                        <Minus />
                      </button>
                      <div className="font-bold">{quantity}</div>
                      <button
                        className="w-full h-full p-1 outline-none"
                        onClick={() => quantity < 8 && handleAddProductQuantity(item)}
                      >
                        <Add />
                      </button>
                    </div>
                    <h5 className="hidden lg:block">${quantity * price}</h5>
                    <button
                      className="block ml-3 md:ml-0 w-7 h-7 p-2 bg-red-600 text-white rounded outline-none"
                      onClick={() => handleRemove(item)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                      >
                        <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                      </svg>
                    </button>
                  </article>
                );
              })}
              <hr className="mt-10" />
              <div className="flex justify-between py-8">
                <Link to="/products" className="btn-sm w-max bg-blue-500 text-white text-bold">
                  Continue Shopping
                </Link>
                <button
                  onClick={handleClearCart}
                  className="btn-sm font-bold text-red-900 bg-red-300"
                >
                  Clear Cart
                </button>
              </div>
              <section className="flex justify-center lg:justify-end">
                <div className="w-full md:w-auto">
                  <article className="md:border px-4 py-2 md:px-12 md:py-6">
                    <h6 className="grid" style={{ gridTemplateColumns: '200px 1fr' }}>
                      Subtotal:
                      <span>${cart.total}</span>
                    </h6>
                    {/* <h6 className="grid" style={{ gridTemplateColumns: '200px 1fr' }}>
                      Shipping Fee:
                      <span>$5.34</span>
                    </h6> */}
                    <hr className="my-4" />
                    <h4 className="grid" style={{ gridTemplateColumns: '200px 1fr' }}>
                      Order Total:
                      <span>${cart.total}</span>
                    </h4>
                  </article>
                  {user ? (
                    <PayButton cartItems={cart} />
                  ) : (
                    <Link to="login">
                      <button className="text-center mt-4 btn w-full bg-yellow-600 text-blue-50 font-semibold">
                        Login to Checkout!
                      </button>
                    </Link>
                  )}
                </div>
              </section>
            </div>
          </section>
        </>
      ) : (
        <div className="tw-container text-center py-20 flex flex-col items-center">
          <img
            src={emptyCartSvg}
            alt="empty cart"
            style={{ maxHeight: '300px', maxWidth: '300px' }}
          />
          <p className="text-3xl mt-4">Your shopping cart is empty.</p>
          <Link to="/products" className="mt-5 btn-sm px-5 text-xl font-medium">
            Fill It
          </Link>
        </div>
      )}
    </>
  );
}

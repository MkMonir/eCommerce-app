import { useState, useEffect, useContext } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../context/authContext/AuthContext';
import emptyCartSvg from './../assets/empty_cart.svg';
import { removeFromCart } from '../redux/cartRedux';

const LoginButton = () => {
  return (
    <Link to="/login">
      <button className="flex text-2xl items-center lg:text-xl gap-3 outline-none">
        Login
        <svg
          className="w-8 lg:w-7"
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 640 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
        </svg>
      </button>
    </Link>
  );
};

const CartButton = ({ items, user }) => (
  <div>
    <Link
      to={user ? '/cart' : '/login'}
      className="flex items-center gap-2 py-5 text-2xl lg:text-xl "
    >
      <div className="relative w-6">
        <i className="text-2xl fa fa-shopping-bag"></i>
        {items ? (
          <div className="absolute w-6 h-6 text-sm text-blue-500 bg-white lg:bg-blue-500 lg:text-blue-50 rounded-full top-1 right-2 flex justify-center items-center transform translate-x-4 -translate-y-4">
            {items}
          </div>
        ) : (
          ''
        )}
      </div>
    </Link>
  </div>
);

const FavButton = ({ items }) => (
  <div>
    <Link to="/favorites" className="flex items-center gap-2 py-5 text-2xl lg:text-xl ">
      <div className="relative w-6">
        <i className="text-2xl fas fa-heart"></i>
        {items ? (
          <div className="absolute w-6 h-6 text-sm text-blue-500 bg-white lg:bg-blue-500 lg:text-blue-50 rounded-full top-1 right-2 flex justify-center items-center transform translate-x-4 -translate-y-4">
            {items}
          </div>
        ) : (
          ''
        )}
      </div>
    </Link>
  </div>
);

function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    if (width > 768) setMobileMenuOpen(false);
  }, [width]);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const handleClick = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-20 bg-gray-50 shadow-md">
      <div className="tw-container h-16 md:h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-semibold text-blue-500 text-2xl">
          <i className="fas fa-shopping-bag"></i>E-shop
        </Link>
        <form>
          <div className="flex shadow-md">
            <div className="rounded-l-md">
              <input
                type="text"
                placeholder="search in e-shop"
                className="w-96 p-3 bg-blue-50 text-lg text-gray-600 outline-none rounded-l-md"
              />
            </div>
            <button className="py-3 px-5 bg-blue-500 rounded-r-md">
              <i className="text-xl text-gray-50 fas fa-search"></i>
            </button>
          </div>
        </form>
        <div>
          <div className="relative hidden lg:flex gap-8 items-center">
            <nav className="hidden md:block mr-0 md:mr-10">
              <ul className="flex gap-8">
                <li className="">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
              </ul>
            </nav>
            {/* CART AND FAVORITE  */}
            <div id="cartBtn" className="inline-block relative">
              <CartButton items={cart.quantity} user={user} />

              {user ? (
                <div
                  id="cartMini"
                  className="absolute top-16 -right-8 px-10 py-5 bg-white shadow-md rounded-md"
                >
                  <div className="max-h-80 overflow-y-scroll border-b-2  border-gray-500 border-opacity-20 mb-5 ">
                    {cart.quantity > 0 ? (
                      <table className="w-full ">
                        <tbody className="divide-y divide-slate-700 ">
                          {cart.products.map((item, index) => (
                            <tr key={index} className="flex items-center py-3">
                              <td className=" ">
                                <img className="w-32 h-20 object-cover " src={item.img} alt="" />
                              </td>
                              <td className="pl-10 flex items-center justify-between w-full">
                                <div className=" ">
                                  <p className="text-lg text-blue-500 font-medium">
                                    RS. {item.price} x {item.quantity}
                                  </p>
                                  <h6 className="text-lg font-medium">Jacket</h6>
                                </div>
                                <div
                                  className="p-1 cursor-pointer "
                                  onClick={() => handleClick(item)}
                                >
                                  <i className="text-lg mr-3 fas fa-times"></i>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center">
                        <img src={emptyCartSvg} alt="empty cart" />
                        <p className="mt-2 mb-3">Your shopping cart is empty.</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 border-t-2 border-gray-400 border-opacity-30 py-3 flex justify-between items-center mb-3">
                    <span className="text-lg text-blue-500 font-medium">TOTAL:</span>
                    <h5 className="text-2xl text-blue-500 font-medium">
                      ${cart.total ? cart.total : 0}
                    </h5>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Link to="/cart" className="btn btn-large text-center bg-black text-gray-100">
                      VIEW CART
                    </Link>
                    <Link to="/" className="btn btn-large text-center bg-blue-600 text-gray-100">
                      CHECK OUT
                    </Link>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="inline-block relative">
              <FavButton items={cart.quantity} />
            </div>

            {user ? (
              <div id="user" className="relative cursor-pointer">
                {user.data.user.profilePic ? (
                  <img
                    className="max-w-12 max-h-12 rounded-full shadow-md "
                    src={user.data.user.profilePic}
                    alt=""
                  />
                ) : (
                  <div className="w-12 h-12 grid place-items-center bg-gray-200 rounded-full">
                    <i className="text-2xl fas fa-user"></i>
                  </div>
                )}

                <div
                  id={`userDetails`}
                  className="w-48 text-2xl lg:text-xl px-5 py-3 bg-white shadow-md rounded-md absolute top-14 -right-5 flex flex-col gap-3"
                >
                  <Link to="/profile" className="flex items-center gap-3">
                    <div>
                      {user.data.user.profilePic ? (
                        <img
                          className="max-w-10 max-h-10 rounded-full shadow-md "
                          src={user.data.user.profilePic}
                          alt=""
                        />
                      ) : (
                        <div className="w-10 h-10 grid place-items-center bg-gray-200 rounded-full">
                          <i className="text-2xl fas fa-user"></i>
                        </div>
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium">{user.data.user.username}</h5>
                      <p className="text-sm">See Profile</p>
                    </div>
                  </Link>
                  {/* <Link to="/profile" className="flex items-center gap-7">
                    <i className="fas fa-user"></i> Profile
                  </Link> */}
                  <button className="flex items-center gap-5 outline-none" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <LoginButton />
            )}
          </div>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="btn-lg lg:hidden border-0 bg-transparent text-blue-500"
          >
            <i className="fa-lg md:fa-2x fas fa-bars"></i>
          </button>
        </div>
      </div>
      <div
        className={`z-20 fixed top-0 left-0 w-full h-screen bg-blue-500 px-5 py-8 transition-transform duration-500 ease-in-out transform  ${
          mobileMenuOpen ? '' : '-translate-x-full'
        }`}
      >
        <div className="w-full h-full text-blue-50">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 font-semibold text-white">
              <i className="fas fa-shopping-bag"></i>E-shop
            </Link>
            <span
              onClick={() => setMobileMenuOpen(false)}
              className="cursor-pointer text-3xl font-semibold"
            >
              X
            </span>
          </div>
          <ul className="mt-7 flex flex-col gap-7 text-xl">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
          </ul>
          <div className="mt-10 flex gap-8 justify-center">
            <CartButton items={cart.quantity} />
            {user ? (
              <img src={user.profilePic || <i className="fas fa-user"></i>} alt="" />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

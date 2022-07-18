import { userRequest } from '../requestMethods';

const PayButton = ({ cartItems }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCheckout = async () => {
    try {
      if (cartItems.quantity === 0) {
        console.log('There have no cart item to checkout');
      } else {
        const res = await userRequest.post(`/stripe/create-checkout-session`, {
          cartItems,
          userId: user._id,
          userEmail: user.email,
        });
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        className="mt-4 text-center btn w-full bg-yellow-600 text-blue-50 font-semibold"
        onClick={() => handleCheckout()}
      >
        CHECKOUT NOW
      </button>
    </>
  );
};
export default PayButton;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart, getTotals } from '../redux/cartRedux';

const Success = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '40px',
      }}
    >
      Order has been created successfully. Your order number is.
      <Link to="/" className="link">
        <button
          style={{
            padding: 10,
            marginTop: 20,
            backgroundColor: 'teal',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            borderRadius: '15px',
          }}
        >
          Go to Homepage
        </button>
      </Link>
    </div>
  );
};

export default Success;

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
    <div className="flex flex-col justify-center items-center text-center h-96 gap-3">
      <div className="text-9xl text-green-600">
        <i className=" checkmark">✓</i>
      </div>
      <h1 className="text-8xl text-green-600">Success</h1>
      <p className="text-xl font-medium">
        We received your purchase request;
        <br /> we'll be in touch shortly!
      </p>
      <Link to="/" className="btn btn-large bg-green-600 hover:bg-green-800 text-lg text-white ">
        <button className="font-medium">Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;

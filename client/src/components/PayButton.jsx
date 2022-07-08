import { useSelector } from 'react-redux';
import { publicRequest } from '../requestMethods';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const PayButton = ({ cartItems }) => {
  const { user } = useSelector((state) => state.user.currentUser.data);

  const handleCheckout = async () => {
    try {
      const res = await publicRequest.post(`/orders/create-checkout-session`, {
        cartItems,
        userId: user._id,
        userEmail: user.email,
      });
      if (res.data.session.url) {
        window.location.href = res.data.session.url;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Button onClick={() => handleCheckout()}>CHECKOUT NOW</Button>
    </>
  );
};
export default PayButton;

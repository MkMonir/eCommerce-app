import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/:category" element={<ProductList />} />
        </Routes>
      </Router>
      <ToastContainer theme="dark" />
    </>
  );
};
export default App;

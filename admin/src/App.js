import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { useContext } from 'react';
import { AuthContext } from './contexts/authContext/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

          {/* {user && ( */}
          <>
            <Route exact path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/newUser" element={<NewUser />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/newproduct" element={<NewProduct />} />
          </>
          {/* )} */}
        </Routes>
      </Router>
      <ToastContainer theme="dark" duration="2000" />
    </>
  );
}

export default App;

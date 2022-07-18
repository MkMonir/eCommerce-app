import './app.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/authContext/AuthContext';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import AppProvider from './components/AppProvider';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import Cart from './pages/Cart';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Success from './pages/Success';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <AppProvider>
          <Switch>
            <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
            {/* component={Home} */}
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route
              path="/products/:id"
              render={(props) => <Product {...props} {...props.match.params} />}
            />
            <Route path="/cart" component={Cart} />
            <Route path="/about" component={About} />
            <Route path="/success" component={Success} />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </AppProvider>
      </Router>
      {/* <ToastContainer theme="dark" /> */}
    </>
  );
}

export default App;

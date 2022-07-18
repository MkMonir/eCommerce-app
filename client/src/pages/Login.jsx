import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../context/authContext/AuthContext';
import { login } from './../context/authContext/apiCalls';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <>
      <div className="flex items-center flex-col">
        <div>
          <h2 className="text-center font-bold text-3xl lg:text-4xl">Login</h2>
          <div className="mt-3 w-24 h-1 bg-blue-400 mx-auto" />
        </div>
        <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <form className="mb-4" onSubmit={handleLogin}>
            <div className="mb-4 md:w-full">
              <label htmlFor="email" className="block text-sm mb-1">
                Email
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 md:w-full">
              <label htmlFor="password" className="block text-sm mb-1">
                Password
              </label>
              <input
                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded"
              type="submit"
            >
              Login
            </button>
          </form>
          <Link to="register">
            <button className="text-blue-700 text-center text-sm">
              New member? Register here.
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Login;

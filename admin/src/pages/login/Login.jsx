import { useContext, useState } from 'react';
import { AuthContext } from './../../contexts/authContext/AuthContext';
import { login } from '../../contexts/authContext/apiCalls';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="loginButton" disabled={isFetching}>
          Login
        </button>
      </form>
    </div>
  );
}

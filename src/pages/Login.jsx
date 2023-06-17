import React from "react";
import { useInput } from "../hooks/useInput";
import { Link } from "react-router-dom";

export const Login = ({ onLoginHandler }) => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const onLoginClick = () => {
    onLoginHandler(email, password);
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <h1 className="login--title">Login</h1>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e);
            }}
            type="text"
            placeholder="testing4321@gmail.com"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e);
            }}
            type="password"
            placeholder="test123"
          />
        </div>
        <button className="btn--login" onClick={onLoginClick}>
          Login
        </button>
        <p>
          Didn't have an account?{" "}
          <Link className="link" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

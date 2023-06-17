import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../hooks/useInput";

export const Register = ({ onRegisterHandler }) => {
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const onRegisterClick = () => {
    onRegisterHandler(name, email, password);
  };

  return (
    <div className="register">
      <div className="register-wrapper">
        <h1 className="register--title">Register</h1>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e);
            }}
            type="text"
            placeholder="sukma"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e);
            }}
            type="text"
            placeholder="sukma1234@gmail.com"
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
            placeholder="sukmacepetpulang"
          />
        </div>
        <button className="btn--login" onClick={onRegisterClick}>
          Login
        </button>
        <p>
          Already have an account?{" "}
          <Link className="link" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

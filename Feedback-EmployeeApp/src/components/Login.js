import React, { useState } from "react";
import PropTypes from "prop-types";
import "./login.css";
import { Link, useHistory } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch("https://localhost:44354/api/Users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  let history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    if (token) {
      localStorage.setItem("token", token.accessToken);
      localStorage.setItem("userId", token.userId);
      localStorage.setItem("name", token.name);
      localStorage.setItem("roleId", token.roleId);
      setToken(token);
      if (token.roleId === "0") history.push("/manager");
      if (token.roleId === "1") history.push("/employee");
      if (token.roleId === "2") history.push("/student");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>FPT University </h1>
        <br />
        <label>
          <p>Email</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button variant="dark" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

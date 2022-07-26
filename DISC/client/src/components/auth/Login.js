import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "./Login.css";
import { getLoggedInUser } from "../modules/userProfileManager";
import { addCart, getUsersCurrentCart } from "../modules/cartManager";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
    .then(() => navigate("/"))
      .catch(() => alert("Invalid Email/Password"));
  };

  return (
    
    <div className="loginWrapper">
      <Form className="loginForm" onSubmit={loginSubmit}>
        
        <h2 className="loginHeader">Login</h2>
        <fieldset>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="text"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Button>Login</Button>
          </FormGroup>
          <em>
            New to TennesseeDiscs? <Link to="/register">Register</Link>
          </em>
        </fieldset>
      </Form>
    </div>
  );
}
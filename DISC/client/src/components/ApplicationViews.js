import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DiscList from "./disc/DiscList";
import DiscDetails from "./disc/DiscDetails";
import DiscEditForm from "./disc/DiscEditForm";
import DiscForm from "./disc/DiscForm";
import UserProfileList from "./user/UserList";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Home from "../Home";

export default function ApplicationViews({isLoggedIn, user}) {
  
  return (
    <Routes>
      <Route path="/" >
        <Route index element={isLoggedIn ? <Home/> : <Navigate to="/login" />}
        />
        <Route path="discs">
          <Route index element={<DiscList user={user} />} />
          <Route path="add" element={<DiscForm />} />
          <Route path=":id" element={<DiscDetails user={user} />} />
          <Route path="edit/:id" element={<DiscEditForm user={user} />} />
        </Route>
        <Route path="userProfiles">
          <Route index element={<UserProfileList/>} />
        </Route>
      </Route>
      <Route path="cart" element={<Cart user={user} />} />
      
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="*" element={<p>nothing here...</p>} />
    </Routes>
  );
};

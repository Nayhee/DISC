import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DiscList from "./disc/DiscList";
import DiscDetails from "./disc/DiscDetails";
import DiscEditForm from "./disc/DiscEditForm";
import DiscForm from "./disc/DiscForm";
import Admin from "./admin/Admin";
import UserEditForm from "./admin/UserEditForm"
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Home from "../Home";
import Checkout from "./cart/Order";
import Receipt from "./cart/Receipt";
import PuttTracker from "./PuttTracker";
import OrderEditForm from "./cart/OrderEditForm";

export default function ApplicationViews({isLoggedIn, user}) {
  
  return (
    <Routes>
      <Route path="/" >
        <Route index element={isLoggedIn ? <Home user={user}/> : <Navigate to="/login" />}
        />
        <Route path="discs">
          <Route index element={<DiscList />} />
          <Route path="add" element={<DiscForm />} />
          <Route path=":id" element={<DiscDetails user={user} />} />
          <Route path="edit/:discId" element={<DiscEditForm />} />
        </Route>
        <Route path="admin">
          <Route index element={<Admin/>} />
          <Route path="edit/:userId" element={<UserEditForm />} />
        </Route>
      </Route>

      <Route path="cart">
        <Route index element={<Cart user={user} />} />
        <Route path="order/:cartId" element={<Checkout user={user} />} />
      </Route> 

      <Route path="order/edit/:orderId" element={<OrderEditForm user={user} />} />

      <Route path="receipt" element={<Receipt user={user} /> } />

      <Route path="puttTracker" element={<PuttTracker user={user}/> } />
      
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="*" element={<p>nothing here...</p>} />
    </Routes>
  );
};

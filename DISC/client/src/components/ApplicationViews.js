import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DiscList from "./DiscList";
import DiscDetails from "./disc/DiscDetails";
import DiscEditForm from "./DiscForm";
import DiscForm from "./DiscForm";
import UserProfileList from "./UserList";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";
import DiscDetails from "./disc/DiscDetails";

const ApplicationViews = ( isLoggedIn, user) => {
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

export default ApplicationViews;
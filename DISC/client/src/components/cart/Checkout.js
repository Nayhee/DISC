import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getLoggedInUser } from "../modules/userProfileManager";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Cart.css";

export default function Checkout({user}) {

    const {cartId} = useParams();

    const [order, setOrder] = useState({
        userId: user.id,
        cartId: cartId,

    });

}
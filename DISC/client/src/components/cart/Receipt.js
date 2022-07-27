import React, { useEffect } from "react";
import './Receipt.css';
import {Button} from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { addCart } from "../modules/cartManager";


export default function Receipt({user}) {
    
    const navigate = useNavigate();

    let createdNewCart = false;

    const CreateNewCart = () => {
        let Cart = {userProfileId: user.id};
        addCart(Cart);
        createdNewCart = true;
    }

    useEffect(() => {
        if(createdNewCart == false) {
            CreateNewCart();
        }
    })
    
    return (
        <div className="receiptContainer">
            <h2>Order Confirmation</h2>
            <p>Your order was placed successfully!</p> 
            <p>A receipt has been sent to <b>{user.email}.</b></p>
            <p>Thanks for shopping at TennesseeDiscs!</p>

            <Link to={`/discs`}>
                <Button color="primary" className="btn btn-primary">Keep Shopping</Button>
            </Link>
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getUsersCurrentCart } from "../modules/cartManager";
import { getLoggedInUser } from "../modules/userProfileManager";
import "./Cart.css";

export default function Cart() {

    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(null);
    
    const getUser = () => {
        getLoggedInUser().then(setUser);
    }

    const getCart = () => {
        if(user !== null) {
            getUsersCurrentCart(user.id).then(setCart);
        } 
    }

    const calculateTotal = (discs) => {
        let cartTotal = 0;
        discs.foreach(disc => {
            cartTotal += disc.price;
        })
        setTotal(cartTotal);
    }

    useEffect(() => {
        if(user == null) {
            getUser();
        };
        if(cart == null) {
            getCart();
        };
        if(user !== null && cart !== null) {
            calculateTotal(cart.discs);
        }
    })

    if(cart !== null) {
        return (
            <p>Hello</p>
            //  <div className="cartContainer">
            //      <Table responsive bordered striped hover>
            //          <thead>
            //              <tr>
            //                  <th>Product</th>
            //                  <th>Quantity</th>
            //                  <th>Total</th>
            //              </tr>
            //          </thead>
            //          <tbody>
            //              {cart.discs.map(disc => 
            //                  <tr key={disc.id}>
            //                      <td>
            //                          <div className="image_div">
            //                              <img src={disc.imageUrl} alt="My Disc" />
            //                          </div>
            //                          <div className="productInfo">
            //                              <p>{disc.brand.name} {disc.plasticName} - {disc.weight}g {disc.condition} </p>
            //                          </div>
            //                      </td>
            //                  </tr>
            //              )}
            //          </tbody>
            //      </Table>
            //  </div>
        ) 
    }
    else {
        return (
            <h4>Your Cart is Empty</h4>
        )
    }


}
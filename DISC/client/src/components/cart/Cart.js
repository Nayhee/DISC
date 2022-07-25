import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getUsersCurrentCart } from "../modules/cartManager";
import { getLoggedInUser } from "../modules/userProfileManager";
import "./Cart.css";

export default function Cart({user}) {

    return (
        <h3>cart</h3>
    )
    // const [cart, setCart] = useState(null);
    // const [total, setTotal] = useState();

    // const getCart = () => {
    //     getUsersCurrentCart(user.id).then((c) => setCart(c));
    // }

    // const getTotal = () => {
    //     let newTotal = 0;
    //     cart.discs.forEach(cartDisc => {
    //         newTotal += cartDisc.price;
    //     });
    //     setTotal(newTotal);
    // }

    // useEffect(() => {
    //     getCart()
    //     getTotal();
    // }, [cart])

    // if(cart !== null) {
    //     return (
    //          <div className="cartContainer">
    //              <Table responsive bordered striped hover>
    //                  <thead>
    //                      <tr>
    //                          <th>Product</th>
    //                          <th>Quantity</th>
    //                          <th>Total</th>
    //                      </tr>
    //                  </thead>
    //                  <tbody>
    //                      {cart?.discs.map(disc => 
    //                          <tr key={disc.id}>
    //                              <td>
    //                                  <div className="image_div">
    //                                      <img src={disc.imageUrl} alt="My Disc" />
    //                                  </div>
    //                                  <div className="productInfo">
    //                                      <p>{disc.brand.name} {disc.plasticName} - {disc.weight}g {disc.condition} </p>
    //                                  </div>
    //                              </td>
    //                          </tr>
    //                      )}
    //                  </tbody>
    //              </Table>
    //          </div>
    //     ) 
    // }
    // else {
    //     return (
    //         <h4>Your Cart is Empty</h4>
    //     )
    // }


}
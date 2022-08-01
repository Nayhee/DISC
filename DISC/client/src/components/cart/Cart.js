import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getUsersCurrentCart, removeDiscFromCart, getCartDiscId } from "../modules/cartManager";
import { getLoggedInUser } from "../modules/userProfileManager";
import { Link } from "react-router-dom";
import "./Cart.css";
import { getImageById } from "../modules/imageManager";


export default function Cart({user}) {

    const [cart, setCart] = useState(null);
    const [total, setTotal] = useState(null);

    const getCart = () => {
        getUsersCurrentCart(user.id).then(setCart);
    }

    const calculateTotal = () => {
        let cartTotal = 0;
        cart.discs.forEach(disc => {
            cartTotal += disc.price;
        })
        setTotal(cartTotal);
    }

    useEffect(() => {
        if(user !== null && cart == null ) {
            getCart();
        };
    }, [])

    //extra one I didn't get to work before getting off. 
    // useEffect(() => {
    //     if(user !== null && cart == null ) {
    //         getCart();
    //         cart.discs.forEach((disc) => {
    //             disc.imageId !== null ? getImageById(disc.imageId).then((url) => disc.imageUrl = url)
    //             :
    //             disc.imageUrl = disc.imageUrl;
    //         })
    //     };
    // }, [])

    useEffect(() => {
        if(user !== null && cart !== null) {
            calculateTotal();
        }
    }, [cart])

    const handleDeleteCartDisc = (discId) => {
        getCartDiscId(cart.id, discId)
        .then((cartDiscId) => removeDiscFromCart(cartDiscId))
        .then(() => getCart());
    }

    if(cart !== null && cart.discs.length < 1) {
        return (
            <div className="emptyCartWrapper">
                <h3>Your Cart is Empty!</h3>
                <Link to={`/discs`}>
                    <Button color="primary" type="button">
                        Keep Shopping
                    </Button>
                </Link>
            </div>
        )
    }

    if(cart !== null && cart.discs.length > 0) {
        return (
             
             <div className="cartWrapper">
                <h2 className="cartHeader">Shopping Cart</h2>
                <div className="cartDiscListWrapper">
                    <div className="labelWrapper">
                        <div className="labelsWrapper">
                            <div className="productLabel">Product</div>
                            <div className="quantityLabel">Quantity</div>
                            <div className="totalLabel">Total</div>
                        </div>
                    </div>
                    {cart.discs.map(disc => 
                        <div className="cartRow" key={disc.id}>
                            <div className="cartImage">
                                <img src={disc.imageUrl} alt="My Disc" />
                            </div>
                            <div className="cartInfo">
                                <p>{disc.brand.name} {disc.name} / {disc.plastic} Plastic / {disc.weight}g / {disc.condition} </p>
                            </div>
                            <div className="cartQuantity">
                                <p>-</p>
                                <p>1</p>
                                <p>+</p>
                            </div>
                            <div className="cartProductTotal">${disc.price}</div>
                            <div className="cartRemoveDiscButton" type="button">
                                <i onClick={() => handleDeleteCartDisc(disc.id)} className="fa-solid fa-trash fa-xl"></i>  
                            </div>
                        </div>
                    )}

                    <div className="cartTotal">
                            <div className="subTotal">
                                <h5 className="sub">Subtotal:   </h5>
                                <h5 className="total">${total}</h5>
                            </div>
                            {/* <p className="taxNote">Taxes calculated at checkout</p> */}
                            <div className="checkoutButtonDiv">
                                <Link className="checkoutButton" to={`./order/${cart.id}`}>
                                    {cart.discs.length > 0 ? <Button color="primary" className="DetailsButton">Checkout </Button> : ""}
                                </Link>
                            </div>
                    </div>
                </div>
             </div>
        ) 
    }
    else {
        return null;
    }


}
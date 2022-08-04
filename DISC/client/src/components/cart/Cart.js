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
    const [discs, setDiscs] = useState(null);

    //make this get called on 2nd run afater cart is set. 
    const getCart = () => {
        getUsersCurrentCart(user?.id)
        .then((cart) => {
            setCart(cart);
            setDiscs(cart.discs);
        });
    }

    const getImages = () => {
        let newCart = {...cart};
        let newDiscs = newCart.discs;

        let promises = [];

        newDiscs.forEach(disc => {
            promises.push(
                getImageById(disc.imageId)
                .then((url) => {
                    disc.imageUrl = url
                    return disc;
                })
            )
        })
        Promise.all(promises)
        .then(setDiscs);
    }

    useEffect(() => {
        if(user !== null && cart == null ) {
            getCart();
        };
    }, [])

    useEffect(() => {
        if(cart !== null) {
            calculateTotal();
            getImages();
        }
    }, [cart])


    const calculateTotal = () => {
        let cartTotal = 0;
        let cartCopy = {...cart};
        cartCopy.discs.forEach(disc => {
            cartTotal += disc.price;
        })
        setTotal(cartTotal);
    }


    const handleDeleteCartDisc = (discId) => {
        getCartDiscId(cart.id, discId)
        .then((cartDiscId) => removeDiscFromCart(cartDiscId))
        .then(() => getCart());
    }

    if(cart !== null && cart?.discs.length < 1) {
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
                    {discs?.map(disc =>  (
                        <div className="cartRow" key={disc.id}>
                            <div className="cartImage">
                                <img src={disc?.imageUrl} alt="My Poop Disc" />
                            </div>
                            <div className="cartInfo">
                                <p>{disc.brand.name} {disc.name} / {disc.plastic} Plastic / {disc.weight}g / {disc.condition}</p>
                            </div>
                            <div className="cartQuantity">
                                <p>-</p>
                                <p>1</p>
                                <p>+</p>
                            </div>
                            <div className="cartProductTotal">${disc.price}</div>
                            <div className="cartRemoveDiscButton" type="button">
                                <i onClick={() => handleDeleteCartDisc(disc.id)} className="bggray2 text-danger star fa-solid fa-trash fa-xl"></i>  
                            </div>
                        </div>
                    ))}

                    <div className="cartTotal">
                            <div className="subTotal">
                                <h5 className="sub">Subtotal:   </h5>
                                <h5 className="total">${total}</h5>
                            </div>
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
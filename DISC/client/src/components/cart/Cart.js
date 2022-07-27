import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { getUsersCurrentCart, removeDiscFromCart, getCartDiscId } from "../modules/cartManager";
import { getLoggedInUser } from "../modules/userProfileManager";
import { Link } from "react-router-dom";
import "./Cart.css";

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

    if(cart !== null) {
        return (
             <div className="cartContainer">
                 <h2 className="cartHeader">{user.displayName}'s Cart</h2>
                 <Table responsive bordered striped hover>
                     <thead>
                         <tr>
                             <th>Disc</th>
                             <th>Name</th>
                             <th>Plastic</th>
                             <th>Brand</th>
                             <th>Weight</th>
                             <th>Condition</th>
                             <th>Quantity</th>
                             <th>Price</th>
                             <th></th>
                         </tr>
                     </thead>
                     <tbody>
                         {cart.discs.map(disc => 
                             <tr className="dataRow" key={disc.id}>
                                 <td className="productImage">
                                    <img src={disc.imageUrl} alt="My Disc" />
                                 </td>

                                 <td className="discName">
                                    {disc.name}
                                 </td>

                                 <td className="discPlastic">{disc.plastic}</td>

                                 <td className="discBrand">{disc.brand.name}</td>

                                 <td className="discWeight">{disc.weight}g</td>

                                 <td className="discCondition">{disc.condition}</td>
            
                                 <td className="productQuantity">1</td>

                                 <td className="productPrice">${disc.price}</td>

                                 <td>
                                    <div type="button">
                                        <i onClick={() => handleDeleteCartDisc(disc.id)} className="fa-solid fa-trash fa-xl"></i>  
                                    </div>
                                 </td>
                             </tr>
                         )}
                     </tbody>
                 </Table>

                 <div className="cartTotal">
                    <h4>Total: ${total}</h4>
                    <p className="taxNote">Taxes calculated at checkout</p>
                    <Link className="checkoutButtonDiv" to={`./order/${cart.id}`}>
                        {cart.discs.length > 0 ? <Button color="primary" className="DetailsButton">Checkout </Button> : ""}
                    </Link>
                 </div>
             </div>
        ) 
    }
    else {
        return (
            <div className="cartContainer">
                <h2 className="cartHeader">Your Cart is Empty</h2>
             </div>
        )
    }


}
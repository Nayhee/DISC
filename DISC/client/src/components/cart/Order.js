import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Order.css";
import { getUsersCurrentCart } from "../modules/cartManager";
import {addOrder} from "../modules/orderManager";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";


export default function Checkout({user}) {

    const navigate = useNavigate();
    const {cartId} = useParams();
    
    const [cart, setCart] = useState(null);
    const [productTotal, setProductTotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [orderTotal, setOrderTotal] = useState(0);
    
    const [order, setOrder] = useState({
        userProfileId: user?.id,
        cartId: cartId,
        total: 0,
        shippingCountry: "",
        shippingAddress: "",
        shippingCity: "",
        shippingState: "",
        shippingZip: "",
        shippingFirstName: "",
        shippingLastName: "",
    });

    const roundToTwoDecimals = (num) => {
        return num.toFixed(2);
    }

    const calculateProductTotal = (cart) => {
        let productTot = 0;
        cart.discs.forEach(disc => {
            productTot += disc.price;
        })
        setProductTotal(productTot);
        return productTot;
    }

    const calculateTaxes = (prodTotal) => {
        let tax = prodTotal * .07;
        setTaxes(tax);
        return tax;
    }
    
    const getCart = () => {
        getUsersCurrentCart(user.id)
        .then((cart) => {
            setCart(cart);
            let prodTotal = calculateProductTotal(cart);
            let tax = calculateTaxes(prodTotal);
            setOrderTotal(prodTotal + tax + 5);
        })
    }

    useEffect(() => {
        if(user !== null) {
            getCart();
        }
    }, [])

    const handleInputChange = (evt) => {
        const newOrder = {...order}
        let userInputValue = evt.target.value;
        newOrder[evt.target.id] = userInputValue;
        setOrder(newOrder);
    }

    const handleClickSaveOrder = () => {
        const newOrder = {...order}
        newOrder.total = orderTotal;
        addOrder(newOrder)
        .then(() => navigate("/receipt"))
        .catch((err) => alert(`An error occured: ${err.message}`));
    }

    if(cart !== null) {
        return (
            
            <div className="orderContainer">
                <Form className="orderForm">
                <h3 className="orderHeader">Order</h3>
                <h5 className="shipping">Shipping Address </h5>
    
                <FormGroup>
                  <Label for="shippingFirstName">First Name</Label>
                  <Col sm={15}>
                      <Input
                        type="text"
                        name="shippingFirstName"
                        id="shippingFirstName"
                        placeholder={"First Name"}
                        onChange={handleInputChange}
                      />
                  </Col>
                </FormGroup>
    
                <FormGroup>
                  <Label for="shippingLastName">Last Name</Label>
                  <Col sm={15}>
                      <Input
                        type="text"
                        name="shippingLastName"
                        id="shippingLastName"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                      />
                  </Col>
                </FormGroup>
    
                <FormGroup>
                  <Label for="shippingCountry">Country/Region</Label>
                  <Col sm={15}>
                  <select
                      name="shippingCountry"
                      id="shippingCountry"
                      onChange={handleInputChange}
                    >
                      <option value="">Select Country</option>
                      <option key="USA" value="United States">United States</option>
                    </select>
                  </Col>
                </FormGroup>
    
                <FormGroup>
                  <Label for="shippingAddress">Address</Label>
                  <Col sm={15}>
                      <Input
                        type="text"
                        name="shippingAddress"
                        id="shippingAddress"
                        placeholder="Address"
                        onChange={handleInputChange}
                      />
                  </Col>
                </FormGroup>
    
                <div className="cityStateZip">
                    <FormGroup>
                    <Label for="shippingCity">City</Label>
                    <Col sm={15}>
                        <Input
                            type="text"
                            name="shippingCity"
                            id="shippingCity"
                            placeholder="City"
    
                            onChange={handleInputChange}
                        />
                    </Col>
                    </FormGroup>
                    <FormGroup>
                    <Label for="shippingState">State</Label>
                    <Col sm={15}>
                        <Input
                            type="text"
                            name="shippingState"
                            id="shippingState"
                            placeholder="State"
    
                            onChange={handleInputChange}
                        />
                    </Col>
                    </FormGroup>
                    <FormGroup>
                    <Label for="shippingZip">Zip Code</Label>
                    <Col sm={15}>
                        <Input
                            type="text"
                            name="shippingZip"
                            id="shippingZip"
                            placeholder="Zip Code"
                     
                            onChange={handleInputChange}
                        />
                    </Col>
                    </FormGroup>
                </div>
    
    
                <div className="orderTotals">
                    <div className="productTotal">
                        <p>Product Total: ${roundToTwoDecimals(productTotal)}</p>
                    </div>
                    <div className="taxTotal">
                        <p>{`Taxes (7%): `}${roundToTwoDecimals(taxes)}</p>
                    </div>
                    <div className="shippingTotal">
                        <p>Shipping - USPS Standard: $5.00 </p>
                    </div>
                    <div className="orderTotal">
                        <h5><b>Order Total: ${roundToTwoDecimals(orderTotal)}</b></h5>
                    </div>
                </div>
      
                <div className="orderButtonContainer">
                    <Button color="primary" className="btn btn-primary" onClick={handleClickSaveOrder}>
                    Submit Order
                    </Button>
                </div>
              </Form>
            </div>
        )
    }
    else {
        return null;
    }

    

}




 //can't do payment until get order #!
    // const [payment, setPayment] = useState({
    //     orderId: 0,
    //     userId: user.id,
    //     amount: 0,
    // });
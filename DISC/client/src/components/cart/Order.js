import React, { useEffect, useState } from "react";
import { getLoggedInUser } from "../modules/userProfileManager";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    
    const [order, setOrder] = useState({
        userId: user.id,
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

    const calculateProductTotal = () => {
        let productTot = 0;
        cart.discs.forEach(disc => {
            productTot += disc.price;
        })
        setProductTotal(productTot);
    }

    const calculateTaxes = () => {
        let tax = (productTotal * .07);
        setTaxes(tax);
    }
    
    const getCart = () => {
        getUsersCurrentCart(user.id).then(setCart);
    }

    useEffect(() => {
        if(user !== null && cart == null) {
            getCart();
        }
    }, [])

    useEffect(() => {
        if(user !== null && cart !== null && productTotal == 0) {
            calculateProductTotal();
        }
    }, [])

    useEffect(() => {
        if(productTotal !== 0) {
            calculateTaxes();
        }
    }, [productTotal])

    const handleInputChange = (evt) => {
        const newOrder = {...order}
        let userInputValue = evt.target.value;
        newOrder[evt.target.id] = userInputValue;
        setOrder(newOrder);
    }

    const handleClickSaveOrder = () => {
        addOrder(order)
        .then(() => navigate("/receipt"))
        .catch((err) => alert(`An error occured: ${err.message}`));
    }

    if(order?.total !== 0) {
        return (
            
            <div className="orderContainer">
                <Form className="orderForm">
                <h3>Order</h3>
                <h6>Shipping Address </h6>
    
                <FormGroup>
                  <Label for="shippingFirstName">First Name</Label>
                  <Col sm={15}>
                      <Input
                        type="text"
                        name="shippingFirstName"
                        id="shippingFirstName"
                        placeholder={"First Name"}
                        value={order.shippingFirstName}
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
                        value={order.shippingLastName}
                        onChange={handleInputChange}
                      />
                  </Col>
                </FormGroup>
    
                <FormGroup>
                  <Label for="shippingCountry">Country/Region</Label>
                  <Col sm={15}>
                  <select
                      value={order.shippingCountry}
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
                        value={order.shippingAddress}
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
                            value={order.shippingCity}
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
                            value={order.shippingState}
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
                            value={order.shippingZip}
                            onChange={handleInputChange}
                        />
                    </Col>
                    </FormGroup>
                </div>
    
    
                <div className="orderTotals">
                    <div className="productTotal">
                        <div>Product Total</div>
                        <div>{productTotal}</div>
                    </div>
                    <div className="taxTotal">
                        <div>{`Taxes (7%)`}</div>
                        <div>${taxes}</div>
                    </div>
                    <div className="shippingTotal">
                        <div>Shipping - USPS Standard</div>
                        <div>$5</div>
                    </div>
                    <div className="orderTotal">
                        <div><b>Order Total</b></div>
                        <div><b>${productTotal + taxes}</b></div>
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
        return (
            <div className="orderError">
                <h1>WHY WON'T IT WORK</h1>
            </div>
        )
    }

    

}




 //can't do payment until get order #!
    // const [payment, setPayment] = useState({
    //     orderId: 0,
    //     userId: user.id,
    //     amount: 0,
    // });
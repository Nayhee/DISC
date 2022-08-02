import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Order.css";
import { getUsersCurrentCart } from "../modules/cartManager";
import {addOrder, updateOrder, getOrderById} from "../modules/orderManager";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { updateOrderDiscs } from "../modules/discManager";

export default function OrderEditForm() {

    const navigate = useNavigate();
    const {orderId} = useParams();

    const [order, setOrder] = useState({})

    useEffect(() => {
        getOrderById(orderId)
        .then(order => {
            setOrder(order);
        })
    }, [])

    const handleInputChange = (evt) => {
        const stateToChange = { ...order };

        if(evt.target.value === 'true') {
            stateToChange[evt.target.id] = true;
        }
        else {
            stateToChange[evt.target.id] = false;
        }
        setOrder(stateToChange);
    };

    const handleEditOrder = () => {
        console.log(order);
        let newOrder = {...order};
        delete newOrder.userProfile
        updateOrder(newOrder).then(() => {
            navigate('/admin');
        })
    };

    return (
        <div className="formContainer">
          <Form className="orderEditForm">
            <h3>Update Order #{order?.id}</h3>

            <FormGroup>
              <Label for="isPaymentReceived">Payment Received?</Label>
              <Col sm={15}>
                <select
                  value={order?.isPaymentReceived}
                  name="isPaymentReceived"
                  id="isPaymentReceived"
                  onChange={handleInputChange}
                >
                  <option key="Paid" value="true">Yes</option>
                  <option key="NotPaid" value="false">No</option>
                </select>
              </Col>

            </FormGroup>
      
            <Button color="primary" className="btn btn-primary" onClick={handleEditOrder}>
              Submit
            </Button>
          </Form>
        </div>
    )

}
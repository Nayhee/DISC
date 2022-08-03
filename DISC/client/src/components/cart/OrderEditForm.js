import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Order.css";
import { getUsersCurrentCart } from "../modules/cartManager";
import {addOrder, updateOrder, getOrderById} from "../modules/orderManager";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { updateOrderDiscs } from "../modules/discManager";
import { addPayment } from "../modules/paymentManager";

export default function OrderEditForm() {

    const navigate = useNavigate();
    const {orderId} = useParams();

    const [order, setOrder] = useState(null)
    const [payment, setPayment] = useState({
        orderId: orderId,
        amount: 0,
    })

    useEffect(() => {
        getOrderById(orderId)
        .then(order => {
            setOrder(order);
        })
    }, [])

    const handleInputChange = (evt) => {
        
        if(evt.target.id == "amount" || evt.target.id == "paymentDate") {
            const stateCopy = {...payment};
            stateCopy[evt.target.id] = evt.target.value;
            setPayment(stateCopy);
        }
        
        else {
          const stateToChange = { ...order };
  
          if(evt.target.value === 'true') {
              stateToChange[evt.target.id] = true;
          }
          else {
              stateToChange[evt.target.id] = false;
          }
          setOrder(stateToChange);
        }
      
    };

    const handleEditOrder = () => {
      if(order.isPaymentReceived && payment.amount >= order.total) {
        let newPayment = {...payment};
        newPayment.userProfileId = order.userProfileId;
        addPayment(newPayment);
      }

      let newOrder = {...order};
      newOrder.id = orderId;
      delete newOrder.userProfile;
      updateOrder(newOrder).then(() => {
          navigate('/admin');
      })

    };

    if(order !== null) {
        
      return (
            <div className="formContainer">
              <Form className="orderEditForm">
                <h3 className="updateOrderHeader">Update Order #{order?.id}</h3>
                <p className="customer">Customer - {order?.userProfile.name}</p>
    
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
    
                {order?.isPaymentReceived ? 
                    <>
                      <FormGroup>
                      <Label for="amount">Payment Amount</Label>
                      <Col >
                          <Input
                              type="text"
                              name="amount"
                              id="amount"
                              onChange={handleInputChange}
                          />
                      </Col>
                      </FormGroup>
                      <FormGroup>
                      <Label for="paymentDate">Payment Date</Label>
                      <Col >
                          <Input
                              type="date"
                              name="paymentDate"
                              id="paymentDate"
                              onChange={handleInputChange}
                          />
                      </Col>
                      </FormGroup>
                    </>
                    :
                    " "
                }
          
                <Button color="primary" className="btn btn-primary" onClick={handleEditOrder}>
                  Submit
                </Button>
              </Form>
            </div>
        )
    }
    else {
      return null;
    }


}
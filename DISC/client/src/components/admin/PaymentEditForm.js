import React, { useState, useEffect } from "react";
import { getPaymentById, updatePayment} from "../modules/paymentManager";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./Payment.css";
import { splitDate } from "../Helpers";

export default function PaymentEditForm() {

    const navigate = useNavigate();
    const {paymentId} = useParams();
    
    const[payment, setPayment] = useState(null)

    useEffect(() => {
        getPaymentById(paymentId)
        .then(payment => {
            setPayment(payment);
        })
    }, [])

    const handleInputChange = (evt) => {
        const stateCopy= { ...payment};
        stateCopy[evt.target.id] = evt.target.value;
        setPayment(stateCopy);
    };

    const handleEditPayment = () => {
        let newPayment = {...payment};
        newPayment.id = parseInt(paymentId);
        newPayment.amount = parseInt(newPayment.amount);
        newPayment.userProfileId = payment.userProfileId;
        
        delete newPayment.userProfile;
        console.log(newPayment);
        updatePayment(newPayment).then(() => {
            navigate('/admin');
        })
    };

    if(payment !== null) {
        return (
            <div className="formContainer">
              <Form className="paymentEditForm">
                <h3 className="updatePaymentHeader">Update Payment #{payment?.id}</h3>
                <p className="customer">Customer - {payment?.userProfile.name}</p>

                <FormGroup>
                  <Label for="amount">Payment Amount</Label>
                  <Col >
                        <Input
                              type="text"
                              name="amount"
                              id="amount"
                              value={payment?.amount}
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
                              value={splitDate(payment?.paymentDate)}
                              onChange={handleInputChange}
                          />
                      </Col>
                      </FormGroup>
          
                <Button color="primary" className="btn btn-primary" onClick={handleEditPayment}>
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
import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../modules/userProfileManager";
import { useParams, useNavigate} from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";


export default function UserEditForm() {
    
    const navigate = useNavigate();
    const {userId} = useParams();
    
    const[user, setUser] = useState(
        {
            name: "",
            email: "",
            isAdmin: false,
        }
    )

    useEffect(() => {
        getUserById(userId)
        .then(user => {
            setUser(user);
        })
    }, [userId])

    const handleInputChange = (evt) => {
        const stateToChange = { ...user };

        if(evt.target.value === 'true') {
            stateToChange[evt.target.id] = true;
        }
        else {
            stateToChange[evt.target.id] = false;
        }
        setUser(stateToChange);
    };

    const handleEditUser = () => {
        updateUser(user).then(() => {
            navigate('/users');
        })
    };

    return (

        <div className="formContainer">
          <Form className="discForm">
            <h3>Update User #{user?.id}</h3>

            <FormGroup>
              <Label for="name">Name</Label>
              <Col sm={15}><h6>{user.name}</h6></Col>
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Col sm={15}><h6>{user.email}</h6></Col>
            </FormGroup>

            <FormGroup>
              <Label for="isAdmin">UserType</Label>
              <Col sm={15}>
                <select
                  value={user?.isAdmin}
                  name="isAdmin"
                  id="isAdmin"
                  onChange={handleInputChange}
                >
                  <option value="">Select UserType</option>
                  <option key="Admin" value="true">Admin</option>
                  <option key="User" value="false">User</option>
                </select>
              </Col>

            </FormGroup>
      
            <Button className="btn btn-primary" onClick={handleEditUser}>
              Submit
            </Button>
          </Form>
        </div>
    )
}
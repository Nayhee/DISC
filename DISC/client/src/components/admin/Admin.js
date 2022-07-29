import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../modules/userProfileManager";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import "./Admin.css"
import {getAllOrders} from "../modules/orderManager";
import {splitDate} from "../Helpers";

export default function Admin() {

    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));
    }

    const getOrders = () => {
        getAllOrders().then(setOrders);
    }

    useEffect (() => {
        getUsers();
        getOrders();
    }, [])

    const handleDeleteUser = (id) => {
        deleteUser(id)
        .then(() => navigate("/users"))
    }


    return (
        <div className="userListContainer">
            
            <div className="addDiscButton">
                <Link to={`/discs/add`}>
                    <Button color="success" type="button">
                        Add Disc
                    </Button>
                </Link>
            </div>

            <h4>Orders</h4>
            <Table responsive bordered striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Order Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map(order => 
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.userProfile.name}</td>
                            <td>{splitDate(order.orderDate)}</td>
                            <td>${order.total}</td>
                            {order.isPaymentReceived == 0 ? 
                                <td>No</td>
                                :
                                <td>Yes</td>
                            }
                            <td>
                                <div className="discDetailButtons">
                                    <div className="discDetailButton">
                                        <Link to={`/orders/edit/${order.id}`}>
                                            <i className="fa-solid fa-pen-to-square fa-xl"></i> 
                                        </Link>
                                    </div>
                                </div>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            
            <h4>Users</h4>
            <Table responsive bordered striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>UserType</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => 
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.isAdmin == true ? 'Admin' : 'User'}
                            </td>
                            <td>
                                <div className="discDetailButtons">
                                    <div className="discDetailButton">
                                        <Link to={`/users/edit/${user.id}`}>
                                            <i className="fa-solid fa-pen-to-square fa-xl"></i> 
                                        </Link>

                                    </div>
                                    <div type="button">
                                        <i onClick={() => handleDeleteUser(user.id)} className="fa-solid fa-trash fa-xl"></i>  
                                    </div>
                                </div>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
        
    )
}
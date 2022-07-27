import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../modules/userProfileManager";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import "./Admin.css"
import {getAllOrders} from "../modules/orderManager";

export default function Admin() {

    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([]);

    const Navigate = useNavigate();

    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));
    }

    const getOrders = () => {
        getAllOrders().then(setOrders);
        //or do some linq on it to get the most recent 5 orders!
    }

    useEffect (() => {
        getUsers();
        getOrders();
    }, [])

    const handleDeleteUser = (id) => {
        deleteUser(id)
        .then(() => Navigate("/users"))
    }

    const splitDate = (dateTime) => {
        let newDateTime = dateTime.toString();
        console.log(newDateTime);
        let dates = newDateTime.split("T");
        return dates[0];
    }


    return (
        <div className="userListContainer">
            
            <h4>Orders</h4>
            <Table responsive bordered striped hover>
                <thead>
                    <tr>
                        <th>Order #</th>
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
                        <th>Id #</th>
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
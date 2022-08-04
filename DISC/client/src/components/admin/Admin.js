import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../modules/userProfileManager";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import "./Admin.css"
import {getAllOrders} from "../modules/orderManager";
import {splitDate} from "../Helpers";
import {getAllPayments} from "../modules/paymentManager";

export default function Admin() {

    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([])
    const [numOrders, setNumOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);

    const navigate = useNavigate();

    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));
    }

    const getOrders = () => {
        getAllOrders()
        .then((orders) => {
            let sales = 0;
            orders.forEach(order => sales += order.total);
            setTotalSales(sales);
            setNumOrders(orders.length);
            setOrders(orders);
        })
    }

    const getPayments = () => {
        getAllPayments().then(payments => setPayments(payments));
    }

    useEffect (() => {
        getOrders();
        getPayments();
        getUsers();
    }, [])

    const handleDeleteUser = (id) => {
        deleteUser(id)
        .then(() => navigate("/users"))
    }

    return (
        <div className="userListContainer">

            <div className="totalOrdersWrapper">
                <div className="totalOrderQuantity">
                    <h4 style={{color: "#F0F0F0"}}>Total Orders</h4>
                    <h4>{numOrders}</h4>
                </div>
                <div className="totalOrderAmount">
                    <h4 style={{color: "#F0F0F0"}}>Total Sales</h4>
                    <h4>${totalSales}</h4>
                </div>
            </div>

            <div className="orderTableWrapper">
                <h4>Orders</h4>
                <Table responsive bordered striped hover>
                    <thead>
                        <tr>
                            <th>Id</th>
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
                                {order.isPaymentReceived ? 
                                    <td style={{color: "green"}}>Yes</td>
                                    :
                                    <td style={{color: "red"}}>No</td>
                                }
                                <td>
                                    <div className="discDetailButtons">
                                        <div className="discDetailButton">
                                            <Link to={`/order/edit/${order.id}`}>
                                                <i className="fa-solid fa-pen-to-square fa-xl"></i> 
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>


            <div className="paymentTableWrapper">
                <h4>Payments</h4>
                <Table responsive bordered striped hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Order Id</th>
                            <th>Payment Date</th>
                            <th>User Name</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments?.map(p => 
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.orderId}</td>
                                <td>{splitDate(p.paymentDate)}</td>
                                <td>{p.userProfile.name}</td>
                                <td>${p.amount}</td>
                                <td>
                                    <div className="discDetailButtons">
                                        <div className="discDetailButton">
                                            <Link to={`/payment/edit/${p.id}`}>
                                                <i className="fa-solid fa-pen-to-square fa-xl"></i> 
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

            </div>


            <div className="userTableWrapper">
                <h4>Users</h4>
                <Table responsive bordered striped hover>
                    <thead>
                        <tr>
                            <th>Id</th>
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
                                            <Link to={`/user/edit/${user.id}`}>
                                                <i className="fa-solid fa-pen-to-square fa-xl"></i> 
                                            </Link>

                                        </div>
                                        <div type="button" className="bggray2 text-danger star">
                                            <i onClick={() => handleDeleteUser(user.id)} className="fa-solid fa-trash fa-xl"></i>  
                                        </div>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

            </div>
            
        </div>
        
    )
}
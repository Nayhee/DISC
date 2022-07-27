import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../modules/userProfileManager";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import "./Admin.css"

export default function Admin() {

    const [users, setUsers] = useState([])

    const Navigate = useNavigate();

    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));
    }

    useEffect (() => {
        getUsers();
    }, [users])

    const handleDeleteUser = (id) => {
        deleteUser(id)
        .then(() => Navigate("/users"))
      }


    return (
        <div className="userListContainer">
            
            <h4>Order Summary</h4>
            <Table responsive bordered striped hover>
                <thead>
                    <tr>
                        <th>Order #</th>
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
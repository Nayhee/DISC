import React, { useEffect, useState } from "react";
import { getAllUsers } from "../modules/userProfileManager";
import { useNavigate } from "react-router-dom";
import { Button, Table } from "reactstrap";
import "./User.css"

export default function UserList() {

    const [users, setUsers] = useState([])

    const Navigate = useNavigate();

    const getUsers = () => {
        getAllUsers().then(users => setUsers(users));
    }

    useEffect (() => {
        getUsers();
    }, [])

    console.log(users);

    return (
        <div className="userListContainer">
            <Table responsive bordered striped hover>
                <thead>
                    <tr>
                        <th>Id #</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>UserType</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => 
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin == true ? 'Admin' : 'User'}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
        
    )
}
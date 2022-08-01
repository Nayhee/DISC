import { React, useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from "reactstrap";
import { logout } from "../modules/authManager";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"
import { getImageById } from "../modules/imageManager";

export default function Header({isLoggedIn, userType}) {
    
    const location = useLocation();

    const [imageUrl, setImagUrl] = useState();

    //the logo is ID 14.
    //logo 2 is 15.

    useEffect(() => {
        getImageById(14)
        .then((url) => setImagUrl(url)); 
    }, [])

        return (
                    <>
                        <div className="headerAndNav">
                            <div className="nav_logo_container">
                                <img className="nav_logo" src={imageUrl}/>
                            </div>
    
                            <div className="navFullContainer">
                                <ul className="navbar">
    
                                    {isLoggedIn && (
                                        <li className="navbar__item">
                                            <Link className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`} to="/"><i className="fa-solid fa-house-chimney fa-xl"></i>Home</Link>
                                        </li>
                                    )}
                                   
                                    {isLoggedIn && (
                                        <li className="navbar__item">
                                            <Link className={`navbar__link ${location.pathname === '/discs' ? 'active' : ''}`} to="/discs">Discs</Link>
                                        </li>
                                    )}
                                    
    
                                    {isLoggedIn && userType === true && (
                                        <li className="navbar__item">
                                            <Link className={`navbar__link ${location.pathname === '/admin' ? 'active' : ''}`} to="/admin">Admin</Link>
                                        </li>
                                    )}
    
                                    {isLoggedIn && userType === true && (
                                        <li className="navbar__item">
                                            <Link className={`navbar__link ${location.pathname === '/discs/add' ? 'active' : ''}`} to="/discs/add">Add Disc</Link>
                                        </li>
                                    )}
    
                                    {isLoggedIn && (
                                        <li className="navbar__item">
                                            <Link className={`navbar__link ${location.pathname === '/puttTracker' ? 'active' : ''}`} to="/puttTracker">Putt Tracker</Link>
                                        </li>
                                    )}
    
    
                                    {isLoggedIn && (
                                        <li className="navbar__item">
                                            <Link className="navbar__link" to="/" onClick={logout}>Logout</Link>
                                        </li>
                                    )}
    
                                    {!isLoggedIn && (
                                        <>
                                            <li className="navbar__item">
                                                <Link className="navbar__link" to="/login">Login</Link>
                                            </li>
                                            <li className="navbar__item">
                                                <Link className="navbar__link" to="/register">Register</Link>
                                            </li>
                                        </>
                                    )}
    
                                    {isLoggedIn && (
                                        <li className="navbar__item">
                                            <Link className={`navbar__link ${location.pathname === '/cart' ? 'active' : ''}`} to="/cart"><i className="fa-solid fa-cart-shopping fa-xl"></i>Cart</Link>
                                        </li>
                                    )}      
                                </ul>
                            </div>
                        </div>
                    </>
                )

    }
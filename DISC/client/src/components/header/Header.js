import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from "reactstrap";
import { logout } from "../../modules/authManager";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"

export default function Header({isLoggedIn, userType}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const location = useLocation();

    return (
                <>
                    
                    <div className="headerAndNav">

                        <div className="nav_logo_container">
                            <img className="nav_logo" src="Images/tnLOGO.png"/>
                        </div>

                        <div className="navFullContainer">
                            <ul className="navbar">

                                {isLoggedIn && (
                                    <li className="navbar__item">
                                        <Link className="navbar__link" to="/"><i className="fa-solid fa-house-chimney fa-xl"></i></Link>
                                    </li>
                                )}

                                {isLoggedIn && (
                                    <li className="navbar__item">
                                        <Link className={`navbar__link ${location.pathname === '/discs' ? 'active' : ''}`} to="/discs">Discs</Link>
                                    </li>
                                )}

                                {isLoggedIn && userType === 1 && (
                                    <li className="navbar__item">
                                        <Link className={`navbar__link ${location.pathname === '/admin' ? 'active' : ''}`} to="/admin">Admin</Link>
                                    </li>
                                )}

                                {isLoggedIn && (
                                    <li className="navbar__item">
                                        <Link className={`navbar__link ${location.pathname === '/cart' ? 'active' : ''}`} to="/cart">Cart</Link>
                                    </li>
                                )}

                                
                                <li className="navbar__item">
                                    <Link className={`navbar__link ${location.pathname === '/learn' ? 'active' : ''}`} to="/learn">Learn</Link>
                                </li>
                                

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
                                    
                            </ul>
                        </div>

                    </div>
                    
                </>
            )
}
import { Link } from "react-router-dom";
import "./Home.css";
import React, {useEffect, useState} from "react";
import { addCart, getUsersCurrentCart } from "./components/modules/cartManager";

export default function Home({user}) {

    const [userInStorage, setUserInStorage] = useState(sessionStorage.getItem("disc_user") !== null)
    const [cartCreated, setCartCreated] = useState(false);
    
    const CreateCart = () => {
        let Cart = {userProfileId: user.id};
        addCart(Cart).then(() => setCartCreated(true));
    }
    
    const sendUserToStorage = () => {
        let userToSend = user;
        sessionStorage.setItem("disc_user", JSON.stringify(userToSend));
        setUserInStorage(true);
    }

    useEffect(() => {
        if (user!== null && cartCreated == false && !userInStorage) {
            CreateCart();
            // sendUserToStorage();
        }
    })


    useEffect(() => {
        if(cartCreated && !userInStorage) {
            sendUserToStorage();
        }
    })
    
    

    // console.log(user);


    return (
        <>
            <div className="home_container">
                
                <div className="home">

                    <div className="home_pic">
                        <img className="imgHome" src="images/RickyRoomOnSide.png"/>
                        <div className="textOnPicContainer">
                            <h1 className="textOnPicHeader">Ricky<br></br>Wysocki</h1>
                            <p className="textOnPic">Limited Edition Tour Series 3 Pack</p>

                        </div>
                        <Link to={`/discs`}>
                            <button className="buttonOnPic">Get Yours</button>
                        </Link>
                    </div>

                    <div className="homeAboutAndWhy">

                        <div className="home_about">
                            <h2>What is Tennessee Discs?</h2>
                            <p>Tennessee Discs is a digital retailer of premium disc golf gear, including new and used discs, bags and apparel. Tennessee Discs was founded in 2021 with one purpose in mind, to grow the game. We help new and existing players find the gear that's right for them at an affordable cost. Let's find your game. </p>
                            <img src="images/kids3.jpg"/>

                        </div>

                        <div className="home_why">
                            <h2>Why shop at Tennessee Discs?</h2>
                            <p>Why buy from Tennessee Discs instead of another retailer? It's a question we get a lot and the answer is simple. Tennessee Discs helps grow the game by donating 10% of the profit from each disc sold to the Disc Golf Foundation, supporting local disc golf communities all throughout the country.</p>
                            <img src="images/kids6.jpg"/>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}
import React, {useEffect, useState} from "react";
import "./Learn.css";

export default function Learn() {
    
    return (
        <>
            <div className="learnContainer">
                    <h2 className="learnHeader">New to disc golf?</h2>
                    <p className="learnHeader2">Checkout these instructional videos from the best players in the world</p>
                    <br></br>
                <div className="videosContainer">
                    <div className="formVideos">
                        <h5>Form Videos</h5>
                        <p>VIDEO HERE</p>
                    </div>
                    <div className="flightNumberVideos">
                        <h5>Flight Number Videos</h5>
                        <p>VIDEO HERE</p>
                    </div>
                    <div className="gripVideos">
                        <h5>Grip Videos</h5>
                        <p>VIDEO HERE</p>
                    </div>
                </div>
            </div>
        </>
    )
}
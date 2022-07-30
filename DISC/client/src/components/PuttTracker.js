import React, {useEffect, useState} from "react";
import "./PuttTracker.css";
import { addRound } from "./modules/roundManager";


export default function PuttTracker({user}) {
    
    //Putt att the top, then user scorecard, then rounds List.

    const [round, setRound ] = useState({
        userProfileId: user?.id,
    })
    const [isLoading, setIsLoading] = useState(true)

    const handleInputChange = (event) => {
        const newRound = {...round}
        let userInputValue = parseInt(event.target.value);
        newRound[event.target.id] = userInputValue;
        setRound(newRound);
    }

    const handleClickSaveRound = (event) => {
        event.preventDefault();
        if(round.distance > 0 && round.puttsTaken > 0 && round.puttsMade > 0) {
            setIsLoading(true);
            let newRound = {...round};
            newRound.distance = parseInt(round.distance);
            newRound.puttsTaken = parseInt(round.puttsTaken);
            newRound.puttsMade = parseInt(round.puttsMade);
            addRound(newRound)
            .then(setIsLoading(false))
        } else {
            window.alert("Please complete each field")
        }
    }

    return (
        <>
            <main style={{ textAlign: "center" }}>
            
            <div className='howToPlayDiv'>
                <h4>How It Works:</h4>
                <ol> 
                    <li className="howToPlayItem">Throw some putts</li>
                    <li className="howToPlayItem">Input your results</li>
                    <li className="howToPlayItem">Click submit round</li>
                </ol>
            </div>
            
            <form className="newRoundForm">
                <h1 className="newRoundFormTitle">Track New Round</h1>

                <div className="newRoundGridDiv">

                    <div className="newRoundGroup">
                        <label htmlFor="distance">Distance:</label>
                        <input
                        type="text"
                        id="distance" 
                        className="newRoundControls"
                        onChange={handleInputChange} 
                        required
                        maxLength="3"
                        placeholder="20"
                        value={round.distance} />
                    </div>

                    <div className="newRoundGroup">
                        <label htmlFor="putts"># Putts:</label>
                        <input
                        type="text"
                        id="putts" 
                        className="newRoundControls"
                        onChange={handleInputChange} 
                        required
                        maxLength="3"
                        placeholder="10"
                        value={round.puttsTaken} />
                    </div>

                    <div className="newRoundGroup">
                        <label htmlFor="made"># Made:</label>
                        <input
                        type="text"
                        id="made" 
                        className="newRoundControls"
                        onChange={handleInputChange} 
                        required
                        maxLength="3"
                        placeholder="8"
                        value={round.puttsMade} />
                    </div>

                </div>

                <button 
                type="button"
                className="submitRoundButton"
                disabled={isLoading}
                onClick={handleClickSaveRound}>
                    Submit Round
                </button>

            </form>
        </main>
        </>
    )
}















    {/* <div className="learnContainer">
            <h2 className="learnHeader">New To Disc Golf?</h2>
            <p className="learnHeader2">Checkout these instructional videos from the best players in the world</p>
        <div className="videosContainer">
            <div className="formVideos">
                <h5>Improve Your Form</h5>
                <iframe src="https://www.youtube.com/watch?v=1SddjMdLrYo">
                </iframe>
            </div>
            <div className="flightNumberVideos">
                <h5>Learn About Flight Numbers</h5>
                <p>VIDEO HERE</p>
            </div>
            <div className="gripVideos">
                <h5>Find Your Grip</h5>
                <p>VIDEO HERE</p>
            </div>
        </div>
    </div> */}
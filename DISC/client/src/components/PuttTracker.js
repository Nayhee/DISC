import React, {useEffect, useReducer, useState} from "react";
import "./PuttTracker.css";
import { addRound, getAUsersRounds, deleteRound} from "./modules/roundManager";
import { RoundCard } from "./round/RoundCard";


export default function PuttTracker({user}) {
    
    //Putt att the top, then user scorecard, then rounds List.

    const [round, setRound ] = useState({
        userProfileId: user?.id,
    })

    const [totalRoundsCount, setTotalRoundsCount] = useState();
    const [totalPutts, setTotalPutts] = useState();
    const [puttsMade, setPuttsMade] = useState();
    const [puttPercentage, setPuttPercentage] = useState();
    const [distances, setDistances] = useState([]);
    const [selectedDistance, setSelectedDistance] = useState(0);
    const [filteredRounds, setFilteredRounds] = useState([]);
    const [allUsersRounds, setAllUsersRounds] = useState([]);

    const decimalToPercentage = (decimal) => {
        let percent = decimal * 100;
        return Math.round(percent);
    }

    const isolateUniqueDistances = (allRounds) => {
        let setOfDistances = new Set()
        allRounds.forEach(round => setOfDistances.add(round.distance));
        //convert set Object to an Array. 
        let distancesArray = []
        for(const dist of setOfDistances) {
            distancesArray.push(dist)
        }
        return distancesArray;        
    }

    const scorecardCalcs = (rounds) => {
        //# of total rounds is number of objects in the fetched "AllRounds" array. Set state.  
        let roundCount = rounds.length;
        setTotalRoundsCount(roundCount);

        //set puttCount to 0, then for each round, add that round's number of putts to the count and SET state. 
        let puttCount = 0;
        rounds.forEach(r => puttCount += r.puttsTaken)
        setTotalPutts(puttCount);

        //set madeCount to 0, then for each round, add that round's number of made putts to the count and SET State. 
        let madeCount = 0;
        rounds.forEach(r => madeCount += r.puttsMade)
        setPuttsMade(madeCount);

        let decimal = madeCount / puttCount;
        //New Users have no rounds, which returns NaN, I solve by placing initial userFriendly placeholder on the DOM.  
        let percentage = decimalToPercentage(decimal)
        if(isNaN(percentage)) {
            setPuttPercentage("-")
        } else {
            setPuttPercentage(`${percentage}%`)
        }
    }

    const populateScorecard = () => {
        scorecardCalcs(allUsersRounds)
    }

    const handleFilterChange = (event) => {
        let distanceSelected = parseInt(event.target.value);
        setSelectedDistance(distanceSelected);
        setFilteredRounds(allUsersRounds.filter(round => round.distance === distanceSelected));
        //if they picked ALL, setFilteredRounds with ALL of the users rounds.
        if(distanceSelected === 0) {
            setFilteredRounds(allUsersRounds)
        }
    }
    
    const handleInputChange = (event) => {
        const newRound = {...round}
        let userInputValue = parseInt(event.target.value);
        newRound[event.target.id] = userInputValue;
        setRound(newRound);
    }


    const handleSubmitRound = (event) => {
        event.preventDefault();
        if(round.distance > 0 && round.puttsTaken > 0 && round.puttsMade > 0) {
            let newRound = {...round};
            newRound.distance = parseInt(round.distance);
            newRound.puttsTaken = parseInt(round.puttsTaken);
            newRound.puttsMade = parseInt(round.puttsMade);
            addRound(newRound)
            .then((alert("Round submitted successfully!")))
            .then(() => roundFunc())
        } else {
            window.alert("Please complete each field")
        }
    }

    const handleDeleteRound = (roundId) => {
        deleteRound(roundId)
        .then(() => roundFunc())
    }

    const roundFunc = () => {
        getAUsersRounds(user?.id)
        .then(allRounds => {
            setAllUsersRounds(allRounds); // setAllUsersRounds. 
            setFilteredRounds(allRounds) //set filteredRounds to All initially. 
            let distancesToSet = isolateUniqueDistances(allRounds); 
            setDistances(distancesToSet); //sets the distances for them to select from. 
        })
        .then(() => scorecardCalcs(allUsersRounds))
    }

    useEffect(() => {
        roundFunc();
    }, [])

    useEffect(() => {
        populateScorecard();
    }, [selectedDistance])    //when SelectedDistance changes, run populate scorecard again. 

    useEffect(() => {
        populateScorecard();
    }, [allUsersRounds])      //when the users rounds change, run populate scorecard again. 

    useEffect(() => {
        scorecardCalcs(filteredRounds)
    }, [filteredRounds])      //re-run the scorecard calc when user selects different distance filter. 


    return (
        <>  
        <h1 className="puttTrackerHeader">Putt Tracker</h1>
        <div className="pageWrapper">

            <div className="newRoundContainer"> 
                <form className="newRoundForm">
                    <h3 className="newRoundFormTitle">New Round</h3>

                    <div className="newRoundGridDiv">

                        <div className="newRoundGroup">
                            <label htmlFor="distance">Distance</label>
                            <input
                            type="text"
                            id="distance" 
                            className="newRoundControls"
                            onChange={handleInputChange} 
                            required
                            maxLength="3"
                            placeholder="20"
                           />
                        </div>

                        <div className="newRoundGroup">
                            <label htmlFor="putts"># Putts</label>
                            <input
                            type="text"
                            id="puttsTaken" 
                            className="newRoundControls"
                            onChange={handleInputChange} 
                            required
                            maxLength="3"
                            placeholder="10"
                            />
                        </div>

                        <div className="newRoundGroup">
                            <label htmlFor="made"># Made</label>
                            <input
                            type="text"
                            id="puttsMade" 
                            className="newRoundControls"
                            onChange={handleInputChange} 
                            required
                            maxLength="3"
                            placeholder="8"
                            />
                        </div>
                    </div>

                    <button 
                        type="button"
                        className="submitRoundButton"
                        onClick={handleSubmitRound}>
                        Submit Round
                    </button>
                </form>
            </div>
                

            <div className="scorecardContainer">
                    
                    <div className="userScorecard">
                        <h3>{user?.displayName}'s Scorecard</h3>

                        <div className="filterScorecard">
                            <label htmlFor="distance">Filter by Distance </label>
                            <select name="distance" id="distance" onChange={handleFilterChange} className="filterSelect">
                                <option value={0}>All</option>
                                {distances.map(d => (
                                    <option key={d} value={d}>{d} ft</option>
                                ))}
                            </select>
                        </div>

                        <div className="wrapper">
                            <div className="scorecardItem">Total Rounds</div>
                            <div className="scorecardItem">{totalRoundsCount}</div>
                            <div className="scorecardItem">Total Putts</div>
                            <div className="scorecardItem">{totalPutts}</div>
                            <div className="scorecardItem">Total Made</div>
                            <div className="scorecardItem">{puttsMade}</div>
                            <div className="scorecardPercLabel">Putting %</div>
                            <div className="scorecardPercValue">{puttPercentage}</div>
                        </div>
                    </div>
            </div>
        </div>

        <div className="roundListContainer">

                <div className="roundListHeader">
                    <h2>{user?.displayName}'s Rounds</h2>
                </div>

                <div className="roundListBody">
                    <div className="labelsAndListContainer">

                        <div className="roundListLabels">
                            <div className="roundListLabel">Date:</div>
                            <div className="roundListLabel">Distance:</div>
                            <div className="roundListLabel"># Putts:</div>
                            <div className="roundListLabel"># Made:</div>
                            <div className="roundListLabel">% Made:</div>
                            <div className="roundListLabel"></div>
                        </div>
                        <div className="roundList">
                            {allUsersRounds?.map(round => 
                                <RoundCard
                                    key={round.id}
                                    round={round}
                                    handleDeleteRound={handleDeleteRound}
                                />)}
                        </div>
                    </div>
                </div>

            </div>
            
        </>
    )
}















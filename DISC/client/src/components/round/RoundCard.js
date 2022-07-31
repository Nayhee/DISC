import React from "react"
import "./Round.css"
import { splitDate } from "../Helpers";

export const RoundCard = ({ round, handleDeleteRound }) => {
    
    const decimalPuttPercentage = round.puttsMade / round.puttsTaken;
    let twoDec = decimalPuttPercentage.toFixed(2);
    const puttPercentage = twoDec * 100;
 

    return (
      <div className="roundContainer">

          <div className="roundRow">{splitDate(round.date)} </div>
          <div className="roundRow">{round.distance}ft </div>
          <div className="roundRow">{round.puttsTaken} </div>
          <div className="roundRow">{round.puttsMade} </div>
          <div className="roundRow"><b>{puttPercentage}%</b></div>
          <div className="roundDeleteButton">
              <button type="button" onClick={()=> handleDeleteRound(round.id)}>Delete</button>
          </div>



      </div>
    );
  }
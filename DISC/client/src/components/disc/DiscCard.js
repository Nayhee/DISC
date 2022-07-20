import React from "react"
import "./Disc.css"
import { Link } from "react-router-dom";
import { Button } from "reactstrap";


export const DiscCard = ({ disc }) => {
    return (
      <div className="card-disc">
        <div className="card-disc-content">

          <div className="image_div">
              <img src={disc.imageUrl} alt="My Disc" />
          </div>

          <h2><span className="card-disc-name">
            {disc.name}
          </span></h2>

          <div className="flightNumsContainer">
                    <div className="flightNum">{disc.speed}</div>
                    <div className="flightNum">{disc.glide}</div>
                    <div className="flightNum">{disc.turn}</div>
                    <div className="flightNum">{disc.fade}</div>
          </div>

          
          <div className="DetailsButtonsContainer">
            <Link className="DetailsButtonDiv" to={`discs/${disc.id}`}>
                <Button className="DetailsButton">View Details</Button>
            </Link>
          </div>

        </div>
      </div>
    );
  }
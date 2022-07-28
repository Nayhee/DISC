import React, { useState, useEffect } from "react"
import "./Disc.css"
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { getImageById } from "../modules/imageManager";


export const DiscCard = ({ disc }) => {
  
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if(disc.imageId !== null) {
      getImageById(disc.imageId)
      .then((url) => setImageUrl(url));
    } 
    else {
      setImageUrl(disc.imageUrl);
    }
  }, [])
  
  return (
      <div className="card-disc">
        <div className="card-disc-content">

          <div className="image_div">
              <img src={imageUrl} alt="My Disc" />
          </div>

          <h2><span className="card-disc-name">
            {disc.plasticName}
          </span></h2>

          <div className="flightNumsContainer">
                    <div className="flightNum">{disc.speed}</div>
                    <div className="flightNum">{disc.glide}</div>
                    <div className="flightNum">{disc.turn}</div>
                    <div className="flightNum">{disc.fade}</div>
          </div>

          
          <div className="DetailsButtonsContainer">
            <Link className="DetailsButtonDiv" to={`./${disc.id}`}>
                <Button color="primary" className="DetailsButton">View Details</Button>
            </Link>
          </div>

        </div>
      </div>
    );
  }
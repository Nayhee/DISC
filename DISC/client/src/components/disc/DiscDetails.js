import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDiscById } from "../../modules/discManager";
import { Button } from "reactstrap";
import {FormatPrice} from "../Helpers";
import "./Disc.css"


export default function DiscDetails({user}) {
      const [disc, setDisc] = useState();
      const {id} = useParams();
      
      useEffect(() => {
        getDiscById(id).then(setDisc);
      }, [id])

      if(!disc)
      {
        return null;
      }

      let formattedPrice = FormatPrice(disc.price);

      return (
          <div className="discDetailContainer">
              
              <div className="discDetailLeft">
                    <div className="discDetailImage"> 
                        <img src={disc.imageUrl} alt="My Disc" />
                    </div>

                    <div className="discDetailFlightNums">

                      <div className="speedContainer">
                          <div className="speedLabel">Speed</div>
                          <div className="speedValue">{disc.speed}</div>
                      </div>
                      <div className="glideContainer">
                          <div className="glideLabel">Glide</div>
                          <div className="glideValue">{disc.glide}</div>
                      </div>
                      <div className="turnContainer">
                          <div className="turnLabel">Turn</div>
                          <div className="turnValue">{disc.turn}</div>
                      </div>
                      <div className="fadeContainer">
                          <div className="fadeLabel">Fade</div>
                          <div className="fadeValue">{disc.fade}</div>
                      </div>

                    </div>

              </div>
              
              <div className="discDetailRight">
                  <h1 className="discDetailDiscName">{disc.namePlastic}</h1>
                  <p className="discDetailPrice">${formattedPrice}</p>
                  <p className="discDetailWeight">Weight: {disc.weight}g</p>
                  <p className="discDetailDescription">{disc.description}</p>

                  <Button className="AddToCartButton">
                        Add To Cart   
                  </Button>

              </div>

          </div>
      )


  }
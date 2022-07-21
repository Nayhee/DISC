import { Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDiscById, deleteDisc, getAllDiscs } from "../modules/discManager";
import { Button, Badge } from "reactstrap";
import {FormatPrice} from "../Helpers";
import "./Disc.css"
import { useNavigate } from "react-router-dom";


export default function DiscDetails({user}) {
      const [disc, setDisc] = useState();
      const {id} = useParams();
      const navigate = useNavigate();
      
      useEffect(() => {
        getDiscById(id).then(setDisc);
      }, [id])

      if(!disc)
      {
        return null;
      }


      
      let formattedPrice = FormatPrice(disc.price);

      const handleDeleteDisc = (id) => {
        deleteDisc(id)
        .then(() => Navigate("./discs"))
      }

      let tags = disc?.tags;
    
      console.log(disc);
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
                  <h1 className="discDetailDiscName">{disc.brand?.name} {disc.PlasticName}</h1>
                  <p className="discDetailPrice">Price: ${formattedPrice}</p>
                  <p className="discDetailWeight">Weight: {disc.weight}g</p>
                  {tags?.map(tag =>
                    <Badge color="info" key={tag.id} className="tag">{tag.name}</Badge>)}
                  <p className="discDetailDescription">{disc.description}</p>

                  
                    <div className="discDetailButtons">

                        <Button color="primary" className="discDetailButton">Add To Cart</Button>

                        {user?.isAdmin ? 
                            <div className="discDetailButton">
                                <i className="fa-solid fa-pen-to-square fa-xl"></i> 
                            </div>
                            : ""
                            }
                        {user?.isAdmin ? 
                            <div className="discDetailButton">
                                <i className="fa-solid fa-trash fa-xl"></i>  
                            </div>
                            : ""
                            }

                    </div>

              </div>

          </div>
      )


  }
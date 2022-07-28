import React, { useEffect, useState } from "react";
import "./Disc.css";
import { useNavigate } from "react-router-dom";
import { DiscCard } from "./DiscCard";
import { Button } from "reactstrap";
import { getAllDiscs, searchDiscByName } from "../modules/discManager";

export default function DiscList({user}) {

    const [discs, setDiscs] = useState([])
    
    const navigate = useNavigate();

    const getDiscs = () => {
        getAllDiscs().then(discs => setDiscs(discs));
    }

    const handleDiscSearch = (event) => {
        if(event.keyCode === 13) {
            searchDiscByName(event.target.value)
            .then(setDiscs);
        }
    }

    useEffect(() => {
        getDiscs();
    }, [])
    
    if(discs.length > 0)
    {
        return (
            <>          
                <div className="discListPageContainer">
                    <section className="add-disc-container"> 
                        <h2>All Discs</h2>
                        <div className="searchDiv">
                            <input type="text" id="discSearch" placeholder="Search by name..." onKeyUp={handleDiscSearch} />
                            <div className="searchButton"><i type="button" className="fa-solid fa-magnifying-glass fa-lg"></i></div>
                            

                        </div>
                    </section>
    
                    <div className="disc-list">
                        {discs.map(disc =>
                            <DiscCard
                                key={disc.id}
                                disc={disc}    
                            />)}
                    </div>
                </div>  
            </>
        )
    }
    else 
    {
        return null;
    }

}








    // return (
    //     <>          
    //         <div className="discListPageContainer">
    //             <section className="add-disc-container"> 
    //                 <h2>All Discs</h2>
    //                 <Button type="button"
    //                     onClick={() => {navigate("./discs/create")}}>
    //                         Add Disc
    //                     </Button>
    //             </section>

    //             <div className="disc-list">
    //                 {discs.map(disc =>
    //                     <DiscCard
    //                         key={disc.id}  //unique key for React to keep track of items and to re-render only things that have changed. 
    //                         disc={disc}    //pass the disc object and its properties to child component (discCard) 
    //                         // handleDeleteDisc={handleDeleteDisc} //pass the delete func to child comp for the card's delete button. 
    //                     />)}
    //             </div>
    //         </div>  
    //     </>
    // )
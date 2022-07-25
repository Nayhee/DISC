import React, { useEffect, useState } from "react";
import "./Disc.css";
import { useNavigate } from "react-router-dom";
import { DiscCard } from "./DiscCard";
import { Button } from "reactstrap";
import { getAllDiscs } from "../modules/discManager";

export default function DiscList({user}) {

    const [discs, setDiscs] = useState([])
    
    const navigate = useNavigate();

    const getDiscs = () => {
        getAllDiscs().then(discs => setDiscs(discs));
    }


    useEffect(() => {
        getDiscs();
    }, [])
    
    if(user?.isAdmin)
    {
        return (
            <>          
                <div className="discListPageContainer">
                    <section className="add-disc-container"> 
                        <h2>All Discs</h2>
                        <Button color="success" type="button"
                            onClick={() => {navigate("./add")}}>
                                Add Disc
                            </Button>
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
        return (
            <>          
                <div className="discListPageContainer">
                    <section className="add-disc-container"> 
                        <h2>All Discs</h2>
                    </section>
                    
                    <div className="disc-list">
                        {discs.map(disc =>
                            <DiscCard
                                key={disc.id}  //unique key for React to keep track of items and to re-render only things that have changed. 
                                disc={disc}    //pass the disc object and its properties to child component (discCard) 
                                // handleDeleteDisc={handleDeleteDisc} //pass the delete func to child comp for the card's delete button. 
                            />)}
                    </div>
                </div>  
            </>
        )
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
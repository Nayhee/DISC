import React, { useEffect, useState } from "react";
import { getAllDiscs } from "../../modules/discManager";
import "./Disc.css";
import { useNavigate } from "react-router-dom";
import { DiscCard } from "./DiscCard";
import { Button } from "reactstrap";

export const DiscList = ({user}) => {
    const [discs, setDiscs] = useState([])
    const [isAdmin, setIsAdmin] = useState(false);

    if(user?.IsAdmin == 1)
    {
        setIsAdmin(true);
    }

    const getDiscs = () => {
        getAllDiscs().then(discs => setDiscs(discs));
    }

    const navigate = useNavigate();

    
    useEffect(() => {
        getDiscs();
    }, [])
    
    //I HAVE THE FULL RETURN COMMNTED OUT BELOW FOR WHEN I FIX THE FIREBASE STUFF. 

        return (
            <>          
                <div className="discListPageContainer">
                    <section className="add-disc-container"> 
                        <h2>All Discs</h2>
                        <Button type="button"
                            onClick={() => {navigate("./discs/create")}}>
                                Add Disc
                            </Button>
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



// if(isAdmin)
//     {
//         return (
//             <>          
//                 <div className="discListPageContainer">
//                     <section className="add-disc-container"> 
//                         <h2>All Discs</h2>
//                         <Button type="button"
//                             className={discs.length > 0 ? 'add-disc-button' : 'addDiscButton'}
//                             onClick={() => {navigate("/discs/create")}}>
//                                 Add Disc
//                             </Button>
//                     </section>
    
//                     <div className="disc-list">
//                         {discs.map(disc =>
//                             <DiscCard
//                                 key={disc.id}  //unique key for React to keep track of items and to re-render only things that have changed. 
//                                 disc={disc}    //pass the disc object and its properties to child component (discCard) 
//                                 // handleDeleteDisc={handleDeleteDisc} //pass the delete func to child comp for the card's delete button. 
//                             />)}
//                     </div>
//                 </div>  
//             </>
//         )
//     }
//     else 
//     {
//         return (
//             <>          
//                 <div className="discListPageContainer">
//                     <div className="disc-list">
//                         {discs.map(disc =>
//                             <DiscCard
//                                 key={disc.id}  //unique key for React to keep track of items and to re-render only things that have changed. 
//                                 disc={disc}    //pass the disc object and its properties to child component (discCard) 
//                                 // handleDeleteDisc={handleDeleteDisc} //pass the delete func to child comp for the card's delete button. 
//                             />)}
//                     </div>
//                 </div>  
//             </>
//         )
//     }
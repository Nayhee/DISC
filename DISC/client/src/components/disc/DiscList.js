import React, { useEffect, useState } from "react";
import "./Disc.css";
import { useNavigate } from "react-router-dom";
import { DiscCard } from "./DiscCard";
import { Button, Input } from "reactstrap";
import { getAllDiscs, searchDiscByName } from "../modules/discManager";

export default function DiscList({user}) {

    const [discs, setDiscs] = useState([])
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState();

    const getDiscs = () => {
        getAllDiscs().then(discs => setDiscs(discs));
    }

    const handleQueryInput = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
    }

    const handleSearchSubmit = () => {
            searchDiscByName(query)
            .then((searchDiscs) => {
                if(searchDiscs.length == 0) {
                    alert("No results matching your search");
                    getAllDiscs();
                }
                else {
                    setDiscs(searchDiscs);
                }
            });
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
                        <h2 className="discsButton" type="button" onClick={getDiscs}>Discs</h2>
                        <div className="searchDiv">
                            <Input type="text" id="discSearch" placeholder="Search by name..." onChange={handleQueryInput} />
                            <div className="searchButton"><i type="button" onClick={handleSearchSubmit} className="fa-solid fa-magnifying-glass fa-md"></i></div>
                        </div>
                        {/* {discs.length < initialDiscCount ? <Button type="button">All Discs</Button> : "" } */}
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
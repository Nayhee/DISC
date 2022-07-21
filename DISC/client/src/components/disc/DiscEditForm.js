import React, { useState, useEffect } from "react";
import { getDiscById, updateDisc, getAllBrands } from "../modules/discManager";
import { Button } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function DiscEditForm({user}) {
    
    const [disc, setDisc] = useState({ 
        name: "",
        description: "",
        weight: 0,
        brandId: 0,
        forSale: true,
        condition: "",
        speed: 0,
        glide: 0,
        turn: 0, 
        fade: 0, 
        plastic: "",
        price: 0,
        imageUrl: "",
    })
    const [isLoading, setIsLoading] = useState(true);
    const [brands, setBrands] = useState([]);

    const {discId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDiscById(discId)
        .then(disc => {
            setDisc(disc);
            setIsLoading(false);
        })
    }, [discId])

    useEffect(() => {
        getAllBrands()
        .then(allBrands => {
            setBrands(allBrands)
        })
    }, [])

    

}
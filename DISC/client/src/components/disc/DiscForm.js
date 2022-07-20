import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { addDisc, getAllBrands } from "../modules/discManager";
import './Disc.css'
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default function DiscForm() {

    const [disc, setDisc] = useState({
        name: "",
        description: "",
        weight: 0,
        brandId: 0,
        forSale: 1,
        condition: "",
        speed: 0,
        glide: 0,
        turn: 0, 
        fade: 0, 
        plastic: "",
        price: 0,
        imageUrl: "",
    })

    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        getAllBrands()
        .then(allBrands => {
            setBrands(allBrands)
        })
        setIsLoading(false);
    }, [])

    const handleInputChange = (evt) => {
        const newDisc = {...disc}
        let userInputValue = evt.target.value;
        newDisc[evt.target.id] = userInputValue;
        setDisc(newDisc);
    }

    const handleIntegerChange = (evt) => {
        const newDisc = { ...disc }
        let userInputValue = parseInt(evt.target.value);
        newDisc[evt.target.id] = userInputValue;
        setDisc(newDisc);
    }

    const handleClickSaveDisc = () => {
        addDisc(disc)
        .then(() => navigate("/discs"))
        .catch((err) => alert(`An error occured: ${err.message}`));
    }

    return (
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              value={disc.name}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="description"
              value={disc.description}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="condition">Condition</Label>
            <select
              value={disc.condition}
              name="condition"
              id="condition"
              onChange={handleInputChange}
            >
              <option value="">Select Condition</option>
              <option key="new" value="New">New</option>
              <option key="used" value="Used">Used</option>
            </select>
          </FormGroup>
    
          <FormGroup>
            <Label for="brandId">Brand</Label> <br></br>
            <select
              value={disc.brandId}
              name="brandId"
              id="brandId"
              onChange={handleIntegerChange}
            >
              <option value="0">Select Brand</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </FormGroup>
    
          <FormGroup>
            <Label for="imageUrl">Image Url</Label>
            <Input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={disc.imageUrl}
              onChange={handleInputChange}
            />
          </FormGroup>
    
          <FormGroup>
            <Label for="plastic">Plastic</Label>
            <Input
              type="text"
              name="plastic"
              id="plastic"
              value={disc.plastic}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="weight">Weight</Label>
            <Input
              type="text"
              name="weight"
              id="weight"
              value={disc.weight}
              onChange={handleIntegerChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="text"
              name="price"
              id="price"
              value={disc.price}
              onChange={handleIntegerChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="speed">Speed</Label>
            <Input
              type="text"
              name="speed"
              id="speed"
              value={disc.speed}
              onChange={handleIntegerChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="glide">Glide</Label>
            <Input
              type="text"
              name="glide"
              id="glide"
              value={disc.glide}
              onChange={handleIntegerChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="turn">Turn</Label>
            <Input
              type="text"
              name="turn"
              id="turn"
              value={disc.turn}
              onChange={handleIntegerChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="fade">Fade</Label>
            <Input
              type="text"
              name="fade"
              id="fade"
              value={disc.fade}
              onChange={handleIntegerChange}
            />
          </FormGroup>
          <Button className="btn btn-primary" onClick={handleClickSaveDisc}>
            Submit
          </Button>
        </Form>
      );

}
import React, { useState, useEffect } from "react";
import { getDiscById, updateDisc, getAllBrands } from "../modules/discManager";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";


export default function DiscEditForm() {
    
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

    const [brands, setBrands] = useState([]);

    const {discId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getDiscById(discId)
        .then(disc => {
            setDisc(disc);
        })
    }, [])

    useEffect(() => {
        getAllBrands()
        .then(allBrands => {
            setBrands(allBrands)
        })
    }, [])

    const handleInputChange = (evt) => {
        const stateToChange = { ...disc };
        stateToChange[evt.target.id] = evt.target.value;
        setDisc(stateToChange);
    };

    const handleIntegerChange = (evt) => {
        const newDisc = { ...disc }
        let userInputValue = parseInt(evt.target.value);
        newDisc[evt.target.id] = userInputValue;
        setDisc(newDisc);
    }

    const handleEditDisc = () => {
        if (disc.name !== "" && disc.description !== "" && disc.condition !== "" && disc.plastic !== "" && disc.imageUrl !== "" && disc.weight !== 0 && disc.brandId !== 0 && disc.speed !== 0 && disc.glide !== 0 && disc.price !== 0) {
            console.log(disc);
            updateDisc(disc).then(() => {
                navigate(`/discs`);
            });
        } else {
        alert("Please enter all required disc info");
        }
    };

    return (
        <div className="formContainer">
          <Form className="discForm">
            <h3>Update {disc?.name}</h3>
            <FormGroup>
              <Label for="name">Name</Label>
              <Col sm={15}>
                  <Input
                    type="text"
                    name="name"
                    required
                    autoFocus
                    id="name"
                    value={disc?.name}
                    onChange={handleInputChange}
                  />

              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="description"
                  required
                  id="description"
                  value={disc?.description}
                  onChange={handleInputChange}
                />

              </Col>

            </FormGroup>
            <FormGroup>
              <Label for="condition">Condition</Label>
              <Col sm={15}>
                <select
                  value={disc?.condition}
                  name="condition"
                  id="condition"
                  onChange={handleInputChange}
                >
                  <option value="">Select Condition</option>
                  <option key="new" value="New">New</option>
                  <option key="used" value="Used">Used</option>
                </select>
              </Col>

            </FormGroup>
      
            <FormGroup>
              <Label for="brandId">Brand</Label> <br></br>
              <Col sm={15}>
                <select
                  value={disc?.brandId}
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
              </Col>

            </FormGroup>
      
            <FormGroup>
              <Label for="imageUrl">Image Url</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="imageUrl"
                  required
                  id="imageUrl"
                  value={disc?.imageUrl}
                  onChange={handleInputChange}
                />
              </Col>

            </FormGroup>
      
            <FormGroup>
              <Label for="plastic">Plastic</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="plastic"
                  required
                  id="plastic"
                  value={disc?.plastic}
                  onChange={handleInputChange}
                />

              </Col>

            </FormGroup>
            <FormGroup>
              <Label for="weight">Weight</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="weight"
                  required
                  id="weight"
                  value={disc?.weight}
                  onChange={handleIntegerChange}
                />

              </Col>

            </FormGroup>
            <FormGroup>
              <Label for="price">Price</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="price"
                  required
                  id="price"
                  value={disc?.price}
                  onChange={handleIntegerChange}
                />

              </Col>

            </FormGroup>
            <FormGroup>
              <Label for="speed">Speed</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="speed"
                  required
                  id="speed"
                  value={disc?.speed}
                  onChange={handleIntegerChange}
                />

              </Col>

            </FormGroup>
            <FormGroup>
              <Label for="glide">Glide</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="glide"
                  required
                  id="glide"
                  value={disc?.glide}
                  onChange={handleIntegerChange}
                />

              </Col>

            </FormGroup>
            <FormGroup>
              <Label for="turn">Turn</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="turn"
                  required
                  id="turn"
                  value={disc?.turn}
                  onChange={handleIntegerChange}
                />

              </Col>

            </FormGroup>
            <FormGroup>
              <Label for="fade">Fade</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="fade"
                  required
                  id="fade"
                  value={disc?.fade}
                  onChange={handleIntegerChange}
                />

              </Col>

            </FormGroup>
            <Button className="btn btn-primary" onClick={handleEditDisc}>
              Submit
            </Button>
          </Form>
        </div>
    )

}
import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { addDisc, getAllBrands, getAllTags } from "../modules/discManager";
import './Disc.css'
import { Col, Button, Form, FormGroup, Label, Input} from "reactstrap";

export default function DiscForm() {

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

    const [tags , setTags] = useState([]);
    const [brands, setBrands] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        getAllBrands()
        .then(allBrands => {
            setBrands(allBrands)
        });
        getAllTags()
        .then(allTags => {
          allTags.forEach((tag) => tag.checked = false)
          setTags(allTags)
        });
    }, [])

    const handleCheckbox = (evt) => {
      const newTags = structuredClone(tags)
      const actualId = evt.target.id -1;
      newTags[actualId].checked = !newTags[actualId].checked;
      setTags(newTags);
    }

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
      const newTags = structuredClone(tags);
      let trueTags = newTags.filter(t => t.checked === true);
      disc.tags = trueTags;
      addDisc(disc)
        .then(() => navigate("/discs"))
        .catch((err) => alert(`An error occured: ${err.message}`));
    }


    return (
        <div className="formContainer">
          <Form className="discForm">
            <h3>Add Disc</h3>
            <FormGroup>
              <Label for="name">Name</Label>
              <Col sm={15}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
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
                  id="description"
                  placeholder="description"
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <label><b>Tags</b></label>
              <div>
                {tags?.map((t) => (
                    <div key={t.id}>
                      <input className="tag"
                      type="checkbox"
                      name={t.name}
                      id={t.id}
                      value={t.name}
                      onChange={handleCheckbox} />
                      <label htmlFor={t.name}>{t.name}</label>
                      <br></br>
                    </div>
                ))}
              </div>
            </FormGroup>

            <FormGroup>
              <Label for="condition">Condition</Label>
              <Col sm={15}>
                <select
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
                  id="imageUrl"
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
                  id="plastic"
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
                  id="weight"
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
                  id="price"
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
                  id="speed"
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
                  id="glide"
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
                  id="turn"
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
                  id="fade"
                  onChange={handleIntegerChange}
                />

              </Col>

            </FormGroup>
            <Button className="btn btn-primary" onClick={handleClickSaveDisc}>
              Submit
            </Button>
          </Form>
        </div>
      );

}
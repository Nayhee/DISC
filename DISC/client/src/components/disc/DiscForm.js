import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { addDisc, getAllBrands, getAllTags } from "../modules/discManager";
import './Disc.css'
import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { postImage } from "../modules/imageManager";

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
        imageId: 0,
    })

    const [tags , setTags] = useState([]);
    const [brands, setBrands] = useState([])

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const Navigate = useNavigate();

    const [imageId, setImageId] = useState(0);
    const [image, setImage] = useState({});
    const imageFormData = new FormData();

    const [Disabled, setDisabled] = useState(false);

    const handleSelectImage = (e) => {
      setImage(...e.target.files);
    };

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

    const handleSaveImage = (e) => {
      e.preventDefault();
      imageFormData.append("data", image);
      postImage(imageFormData)
        .then((r) => {
          let id = parseInt(r.headers.get("location").split("Image/")[1]);
          setImageId(id);
          setDisabled(true);
          toggle();
        });
    };

    const handleClickSaveDisc = () => {
      if(imageId > 0 && disc.name !== "" && disc.description !== "" && disc.condition !== "" && disc.plastic !== "" && disc.weight !== 0 && disc.brandId !== 0 && disc.speed !== 0 && disc.glide !== 0 && disc.price !== 0 ) {
          disc.imageId = imageId;
          const newTags = structuredClone(tags);
          let trueTags = newTags.filter(t => t.checked === true);
          disc.tags = trueTags;
          addDisc(disc)
            .then(() => Navigate("/discs"))
            .catch((err) => alert(`An error occured: ${err.message}`));
      } else {
        alert("Please upload 1 image and complete all fields")
      }
    }


    return (
        
        <>
       
        <div className="formContainer">
          
          <div className="discForm">
              <h3>Add Disc</h3>
              <Form onSubmit={handleSaveImage}>
                <h6>Upload an Image</h6>
                <Input type="file" id="imageToUpload" onChange={handleSelectImage} />
                <Button style={{margin: ".5vw 0vw 1vw 0vw"}} color="success"
                  id="imageSubmitButton"
                  required
                  type="submit"
                  disabled={Disabled}
                >
                  Add Image
                </Button>
          </Form>
          
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Col sm={15}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
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
              <Label for="description">Description</Label>
              <Col sm={15}>
                <Input
                  type="text"
                  name="description"
                  id="description"
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
                  placeholder="ex: 173"
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
              <Label>Tags</Label>
              <div>
                {tags?.map((t) => (
                    <div key={t.id}>
                      <input className="tag"
                      type="checkbox"
                      name={t.name}
                      id={t.id}
                      value={t.name}
                      onChange={handleCheckbox} />
                      <label style={{fontWeight: "normal"}} htmlFor={t.name}>{t.name}</label>
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
      
            <div className="flightNumbers">

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
            </div>

            <Button color="primary" className="btn btn-primary" onClick={handleClickSaveDisc}>
              Submit
            </Button>
          </Form>
        </div>
      </div>

      <Modal
          isOpen={modal}
          toggle={toggle}
          >
          <ModalHeader toggle={toggle}>Image Uploaded Successfully!</ModalHeader>
      </Modal>

      </>

    );

}
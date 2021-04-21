import axios from 'axios'
import{React, useState} from 'react'
import {useHistory} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import {Form ,Row,Col,InputGroup,Button, Container,Alert,Modal} from "react-bootstrap"

import DatePicker from 'react-datepicker/dist/react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const useStyles=makeStyles(theme=>({
    number:{
        "input[type=number]::-webkit-outer-spin-button":
        {
            "-webkit-appearance": "none",
            margin: "0"
        },
        "input[type=number]::-webkit-inner-spin-button":{
        "-webkit-appearance": "none",
        margin: "0"
        }
    }

}))
export default function CreateFuel()

{
    const email=localStorage.getItem("email")
    const classes = useStyles();
    let history=useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const [fuelInfo,setFuelInfo]=useState({
        gallon:null,
        date:new Date(),
        slug:localStorage.getItem('slug_profile'),
        profile:localStorage.getItem('slug_profile'),
        errors:{
            gallon:'',
            slug:''
        }
    })
    
    const [error,setError]=useState("")
    const handleChange=(e)=>{
        setFuelInfo({...fuelInfo,[e.target.name]:e.target.value})
    }

    
    const createfuel=(e)=>{
       
        e.preventDefault();
        if(fuelInfo.gallon===null)
        {
            fuelInfo.errors.gallon="How Much Gallon you want?"
        }
        if(fuelInfo.gallon<10)
        {
            fuelInfo.errors.gallon="at least 10 gallon?"
        }
        if(fuelInfo.slug===null)
        {
            fuelInfo.errors.gallon="Required Slug"
        }
        
        axios.post("http://127.0.0.1:8000/api/fuel/create",fuelInfo)
        
            .then((err)=>{
                if(err.data) {
                    setError(err.data);
                    console.log(err.data)
                }
                localStorage.setItem("Gallon",fuelInfo.gallon)
                //localStorage.setItem("Gallon",req.params.id)
                
                
            })
            .catch(err=>{
                setError(err.response.data)
                console.log(err.response)
            })
    }
    return(
        <Container>
            
            <h1>Gas Form</h1>
            {error?(
                <Alert variant="danger">{error}</Alert>
            ):null}
            <Form onSubmit={createfuel}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Delivery Date</Form.Label>
                    <Form.Control type="date" name="date" onChange={handleChange}/>
                    
                    
                </Form.Group>
            
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Gallon</Form.Label>
                    <Form.Control type="number" name="gallon" min="1" defaultValue={10} step="any" placeholder="Gallon" onChange={handleChange}/>
                    
                    {fuelInfo.errors.gallon.length>0 && 
                        <span>{fuelInfo.errors.gallon}</span>}
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control type="text" name="slug" value={fuelInfo.slug} disabled onChange={handleChange}/>
                    
                    {fuelInfo.errors.slug.length>0 && 
                        <span>{fuelInfo.errors.slug}</span>}
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Profile</Form.Label>
                    <Form.Control type="text" name="profile" onChange={handleChange} disabled value={fuelInfo.profile}/>
                    
                    {fuelInfo.errors.slug.length>0 && 
                        <span>{fuelInfo.errors.slug}</span>}
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleShow}>
                    Submit
                </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Continuew Purchase?
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Yes I want
                    </Button>
                    <Button variant="primary" href={`/admin/profile`}>No</Button>
                    </Modal.Footer>
                </Modal>
            </Form>
            
        </Container>

    )
}
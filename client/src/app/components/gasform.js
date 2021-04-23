import axios from 'axios'
import{React, useEffect, useState} from 'react'
import {useHistory} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import {Form ,Row,Col,InputGroup,Button, Container,Alert,Modal} from "react-bootstrap"
import HeaderNav from './headerNav';
import DatePicker from 'react-datepicker/dist/react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { checkAuth } from './check';

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
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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
        slug:localStorage.getItem('id'),
        profile:localStorage.getItem('id'),
        errors:{
            gallon:'',
            slug:''
        }
    })
    const[profile,setProfile]=useState([])
    const[length,setLength]=useState([])
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
        if(fuelInfo.gallon<100)
        {
            fuelInfo.errors.gallon="at least 100 gallon?"
            
        }
        if(fuelInfo.slug===null)
        {
            fuelInfo.errors.gallon="Required Slug"
        }
        
        axios.post("http://127.0.0.1:8000/api/fuel/create",fuelInfo)
       
            .then((err)=>{
                if(err.data) {
                    setError(err.data);
                    setShow(false)
                    window.location.reload(false)
                    console.log(err.data)
                }
                localStorage.setItem("Gallon",fuelInfo.gallon)
                
                //localStorage.setItem("Gallon",req.params.id)
                
                
            })
            .catch(err=>{
                setError(err.response.data)
                alert("Error in purchasing gas")
                console.log(err.response)
            })
        
    }
    const check=()=>{
        if(fuelInfo.gallon>99 && fuelInfo.gallon!==null) return true

    }

    const getUser=()=>{
       
        
        axios.get(`http://127.0.0.1:8000/api/profile/find/${fuelInfo.profile}`)
        .then(res=>{
            setProfile(res.data)
            console.log(res)
            
        })
        .catch(err=>{
            console.log(err.response)
            
        })
    }
    const gethist=()=>{
        axios.get(`http://127.0.0.1:8000/api/fuel/gethist/${fuelInfo.profile}`)
        .then(res=>{
            setLength(res.data)
            console.log(res)
            
        })
        .catch(err=>{
            console.log(err.response)
            
        })
    }

    const SuggestFirst=(state,gallon)=>
    {
        if(state!=='TX' && gallon>999) return '$'+numberWithCommas((((0.04-0+0.02+0.1)*1.5)+1.5))
        else if(state!=='TX'&& gallon<1000) return '$'+numberWithCommas(((0.04-0+0.03+0.1)*1.5)+1.5)

        else if(state==='TX' && gallon>999) return '$'+numberWithCommas((((0.02-0+0.02+0.1)*1.5)+1.5))
        else if(state==='TX'&& gallon<1000) return '$'+numberWithCommas(((0.02-0+0.03+0.1)*1.5)+1.5)
    }

    const SuggestSecond=(state,gallon)=>
    {
        if(state!=='TX' && gallon>999) return '$'+numberWithCommas((((0.04-0.01+0.02+0.1)*1.5)+1.5))
        else if(state!=='TX'&& gallon<1000) return '$'+numberWithCommas(((0.04-0.01+0.03+0.1)*1.5)+1.5)

        else if(state==='TX' && gallon>999) return '$'+numberWithCommas((((0.02-0.01+0.02+0.1)*1.50)+1.50))
        else if(state==='TX'&& gallon<1000) return '$'+numberWithCommas((((0.02-0.01+0.03+0.1)*1.50)+1.50))
    }


    const calculateFirst=(state,gallon)=>
    {
        if(state!=='TX' && gallon>999) return '$'+numberWithCommas((((0.04-0+0.02+0.1)*1.5)+1.5)*gallon)
        else if(state!=='TX'&& gallon<1000) return '$'+numberWithCommas((((0.04-0+0.03+0.1)*1.5)+1.5)*gallon)

        else if(state==='TX' && gallon>999) return '$'+numberWithCommas((((0.02-0+0.02+0.1)*1.5)+1.5)*gallon)
        else if(state==='TX'&& gallon<1000) return '$'+numberWithCommas((((0.02-0+0.03+0.1)*1.5)+1.5)*gallon)
    }

    const calculateSecond=(state,gallon)=>
    {
        if(state!=='TX' && gallon>999) return '$'+numberWithCommas((((0.04-0.01+0.02+0.1)*1.5)+1.5)*gallon)
        else if(state!=='TX'&& gallon<1000) return '$'+numberWithCommas((((0.04-0.01+0.03+0.1)*1.5)+1.5)*gallon)

        else if(state==='TX' && gallon>999) return '$'+numberWithCommas((((0.02-0.01+0.02+0.1)*1.50)+1.50)*gallon)
        else if(state==='TX'&& gallon<1000) return '$'+numberWithCommas((((0.02-0.01+0.03+0.1)*1.50)+1.50)*gallon)
    }
    
    useEffect(()=>{
        getUser()
        gethist()
        
    },[])
    return(
        <>
        <HeaderNav/>
        <Container>
            
            <h1 className="gasf-header">Gas Form</h1>
            {error||fuelInfo.errors.gallon?(
                <Alert variant="danger" style={{left:"90px"}}>{error}</Alert>
            ):null}
            <Form onSubmit={createfuel} className="gasf-form" id="form">
                <p>Current Price: $1.50/gallon</p>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Delivery Date</Form.Label>
                    <Form.Control className="inputDate" type="date" name="date" onChange={handleChange}/>
                    
                    
                </Form.Group>
            
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Gallon</Form.Label>
                    <Form.Control className="inputGas" type="number" name="gallon" min="1" step="any" placeholder="Type Gallon at least 100" onChange={handleChange}/>
                    
                    {fuelInfo.errors.gallon.length>0 && 
                        <span style={{color:"red"}}>{fuelInfo.errors.gallon}</span>}
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
                <Button variant="primary"  onClick={handleShow} disabled={!check()} className="button">
                    Submit
                </Button>
                {/* Modal form confirm */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Purchased</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Suggested Price: {length.length===0?(SuggestFirst(profile.state,fuelInfo.gallon)):(SuggestSecond(profile.state,fuelInfo.gallon))}
                        <br/>
                        Total: {length.length===0?(calculateFirst(profile.state,fuelInfo.gallon)):(calculateSecond(profile.state,fuelInfo.gallon))}


                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary"  onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={createfuel}>
                        Purchase
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
            
        </Container>
                        </>
    )
}
import axios from 'axios';
import {React,useState,componentDidMount, useEffect} from 'react'    
import {Button,Form,Col,Container, Alert}   from 'react-bootstrap'
import {useHistory} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import HeaderNav from './headerNav';

const useStyles=makeStyles(theme=>({
    span:{
        color:"red"
    },
    text:{
        textAlign:"center"
    }

}))

export default function CreateProfile()
{
    const classes = useStyles();
    const states = [
        "please choose state",
        "AL",
        "AK",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
      ];
      
      const id=localStorage.getItem("id")
      let history = useHistory();
      const [getUser,setUser]=useState([])
      const [err,setErr]=useState("")
      const [profleInfo,SetProfileInfo]=useState({
        email:null,
        fullname:null,
        address1:null,
        address2:null,
        city:null,
        state:null,
        zipcode:null,
        profile_id:id,
        outOfState:null,
        slug:localStorage.getItem("id"),
        user:localStorage.getItem("id"),
        errors:{
            fullname:'',
            email:'',
            address1:'',
            state:'',
            city:'',
            zipcode:'',
            state:'',
            slug:''
        }
      });
      const [validated,setValidated]=useState(false)
      const [error,setError]=useState("")
      const handleChange=(e)=>{
        SetProfileInfo({...profleInfo,[e.target.name]:e.target.value})
        
        
      }
      

      const createprofile=(e)=>{
        e.preventDefault();
        // const form=e.currentTarget;
        // if(form.checkValidity()===false){
        //     e.preventDefault();
        //     e.stopPropagation();
        // }
        // setValidated(true)
        
        if(profleInfo.fullname===null)
            {
                profleInfo.errors.fullname="pls provide name";
                
                console.log(profleInfo.errors.fullname)
            }
        if(profleInfo.email===null)
            {
                profleInfo.errors.email="pls provide email"
                
                console.log(profleInfo.errors.email)
            }
        if(profleInfo.address1===null)
            {
                profleInfo.errors.address1="pls provide address"
                
                console.log(profleInfo.errors.address)
            }
        if(profleInfo.state===null)
            {
                profleInfo.errors.state="pls provide state"
                
                console.log(profleInfo.errors.state)
            }
        if(profleInfo.zipcode===null)
            {
                profleInfo.errors.zipcode="pls provide zipcode"
                
                console.log(profleInfo.errors.zipcode)
        }
        if(profleInfo.city===null)
            {
                profleInfo.errors.city="pls provide city"
                
                console.log(profleInfo.errors.city)
        }
        if(profleInfo.slug===null)
            {
                profleInfo.errors.slug="pls provide slug with 3 characters"
                
                console.log(profleInfo.errors.city)
        }
        axios.post("http://127.0.0.1:8000/api/profile/create",profleInfo)
            .then(res=>{
                    if(res.data)
                    {
                        setError(res.data)
                        console.log(res)
                        var obj=JSON.parse(res.config.data)
                        console.log(obj)
                        
                    }
                    localStorage.setItem("slug_profile",profleInfo.slug)
                    history.push("/create/profile")
                
            })
            .catch(err=>{
                setError(err.response.data)
                if(err.response.data==="user existed")
                {
                    setErr(err.response.data)
                    alert("your already registered the profile!")
                    history.push("/admin/profile")
                }
                console.log(err)
            })
          
      }
      const check=()=>{
          if(profleInfo.fullname!==null && profleInfo.email!==null && profleInfo.address1!==null && profleInfo.city!==null && profleInfo.state!==null && profleInfo.zipcode!==null && profleInfo.zipcode.length>4) return true
      }
      
    //   useEffect(()=>{
    //     CheckProfile()
    //   },[])
    return(
        <>
        <HeaderNav/>
        <Container style={{marginLeft:"300px"}}>
            
            <h1 className={classes.text}>
                Customer Profile
            </h1>
            {error?(<Alert variant='danger'><h3>{error}</h3></Alert>):null}
            
            <Form onSubmit={createprofile}>

                <Form.Row>
                   
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control  type="text" placeholder="Enter Name" name="fullname" onChange={handleChange}  />
                        {profleInfo.errors.fullname.length>0 && 
                        <span className={classes.span}>{profleInfo.errors.fullname}</span>}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
                        {profleInfo.errors.email.length>0 && 
                        <span className={classes.span}>{profleInfo.errors.email}</span>}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>User</Form.Label>
                        <Form.Control type="number" name="user" value={profleInfo.user} disabled onChange={handleChange}/>
                        
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>slug</Form.Label>
                        <Form.Control type="text" name="slug" value={profleInfo.user} disabled onChange={handleChange} maxLength={3} placeholder="slug" />
                        {profleInfo.errors.slug.length>0 && 
                        <span className={classes.span}>{profleInfo.errors.slug}</span>}
                    </Form.Group>
                    </Form.Row>
                
                    <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="1234 Main St" name="address1" maxLength={50} onChange={handleChange}/>
                    {profleInfo.errors.address1.length>0 && 
                        <span className={classes.span}>{profleInfo.errors.address1}</span>}
                    </Form.Group>
                
                    <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control type="text" placeholder="(optional) Apartment, studio, or floor" name="address2" maxLength={50} onChange={handleChange} />
                    </Form.Group>
                
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" maxLength={20} onChange={handleChange} />
                        {profleInfo.errors.city.length>0 && 
                        <span className={classes.span}>{profleInfo.errors.city}</span>}
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control name="state" onChange={handleChange} as="select">
                            {states.map((state,defaultValue)=>(
                                <option key={defaultValue}>{state}</option>
                            ))}
                            {profleInfo.errors.state.length>0 && 
                        <span className={classes.span}>{profleInfo.errors.state}</span>}
                        </Form.Control>
                    </Form.Group>
                
                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" name="zipcode" onChange={handleChange} maxLength={9} className="zip"/>
                        {profleInfo.errors.zipcode.length>0 && 
                        <span className={classes.span}> {profleInfo.errors.zipcode}</span>}
                    </Form.Group>
                </Form.Row>
                
                <Button variant="primary" type="submit" disabled={!check()}>
                    Submit
                </Button>
                
            </Form>
           
        </Container>
        </>
        
    )
}

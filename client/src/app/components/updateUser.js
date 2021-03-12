import {React,useState} from "react"
import {Form,Button,Col,Container,Alert,Card} from 'react-bootstrap'
import axios from 'axios';
import HeaderNav from './headerNav';
export default function UpdateUser(props)
{
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
    const[UpdateUsers,setUpdateUser]=useState({
        address1:null,
        address2:null,
        city:null,
        state:null,
        zipcode:null,

    })
    const [error,setError]=useState("")
    const [success,setSuccess]=useState("")
    const [show,setShow]=useState(false)
    const handleChange=(e)=>{
        setUpdateUser({...UpdateUsers,[e.target.name]:e.target.value})
    }
    const updateUser=(e)=>{
        e.preventDefault()
        const slug=props.match.params.slug
        //const json = JSON.stringify(UpdateUsers)
        //console.log(json)
        axios.put(`http://127.0.0.1:8000/api/profile/update/${slug}`,UpdateUsers)
        .then(res=>{
            setSuccess(res.data.message)
            console.log(res.data.message)
            setShow(false)
        }).catch(err=>{
            setError(err.response.data)
            console.log(err.response.data)
            setShow(true)
        })
    }
    
    return (
        <>
        <HeaderNav/>
        <Container style={{margin:"100px 100px 100px auto"}}>
            
            
            {error?(<Alert show={show} variant="danger" style={{textAlign:"center"}}>
                    {error}
                </Alert>):null}
            {success?(<Alert variant="success">
                    {success}
            </Alert>):null}
            <Card>
            <Card.Header><h1 style={{textAlign:"center"}}>Updating User</h1></Card.Header>
            <Card.Body>
            <Form onSubmit={updateUser}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address1" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control type="text" name="address2" onChange={handleChange}/>
                    </Form.Group>
                </Form.Row>

                

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="city" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..." name="state" onChange={handleChange}>
                    {states.map((state,defaultValue)=>(
                                    <option key={defaultValue}>{state}</option>
                                ))}
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zipcode </Form.Label>
                    <Form.Control name="zipcode" onChange={handleChange} maxLength={9}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Out Of State</Form.Label>
                        <Form.Control name="outOfState" onChange={handleChange} as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                            
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

            
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </Card.Body>
            </Card>
        </Container>
        </>
        
    )
}
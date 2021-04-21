import {React,useState} from 'react';
import axios from 'axios';
import {Col, Container, Row,Form,Button,Card,Alert} from 'react-bootstrap'
import { makeStyles } from "@material-ui/core/styles";
import {useHistory} from "react-router-dom"

const useStyles=makeStyles(theme=>({
        top:{
            marginTop:"50px"
        },
        button:{
            marginTop:"20px"
        },
        text:{
            marginTop:"20px",
            textAlign:"center"
        
        },
        link:{
            textAlign:"center",
            textDecoration:"none",
            '&:hover':{
                textDecoration:"none"
            }
            
            
        },
        button:{
            display:"block",
            margin:"10px 0",
            width:"100%"
        },
        alert:{
            textAlign:"center"
        }
    
}))
export default function Signup()
{
    const [signupInfo,setSignupInfo]=useState({
        username:null,
        password:null,
        passwordConfirm:null,
        profile:null,
    });
    const classes = useStyles();
    const [error,setError]=useState("");
    const[success,setSuccess]=useState("")
    const handleChange=(e)=>{
        setSignupInfo({...signupInfo,[e.target.name]:e.target.value})
    }
    let history=useHistory();
    const signup=(e)=>{
        if(signupInfo.username===null || signupInfo.username===" "){
            setError("Please type information")
        }
        axios
        .post("http://127.0.0.1:8000/api/users/register",signupInfo)
        .then((res)=>{
            
            
            history.push("/login");
            console.log(res)
            
        })
        .catch(err=>{
            
            setError(err.response.data);
            console.log(err.response)
           

        })
        e.preventDefault();
    };
    return(
        <Container fluid className={classes.top}>
            <Row className="justify-content-md-center mx-auto">
                <Col md="4">
                    <Card >
                        <h3 className={classes.text} style={{fontFamily: "Dancing Scrip"}}>Register</h3>
                        {error ?(
                            [
                                'danger',
                            ].map((variant, idx) => (
                                <Alert  className="px-4 py-3" className={classes.alert} key={idx} variant={variant}>
                                    {error}
                                </Alert>
                            ))
                        ):null}
                        
                        <fieldset>
                        <Form onSubmit={signup} className="px-4 py-3">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" name="username" onChange={handleChange} />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicpasswordConfirm">
                                <Form.Label>Password Confirm</Form.Label>
                                <Form.Control type="password" placeholder="Password Confirm" name="passwordConfirm" onChange={handleChange}/>
                            </Form.Group>

        
                                <hr>
                                </hr>
                                <Row className="justify-content-md-center">
                                    <Col md="auto"><a href="/login" className={classes.link}> Already have an account?</a></Col>
                                </Row>
                            
                                <hr>
                                </hr>
                            <Row>
                                <Col> 
                                    <Button variant="primary" type="submit" className={classes.button}>
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                           
                        </Form>
                        </fieldset>

                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
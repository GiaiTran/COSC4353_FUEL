import axios from 'axios';
import {React,useState,state, useEffect} from 'react'
import { Container,Alert,Form,Col,Card,Row,Button } from 'react-bootstrap';
import {useHistory} from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import {checkAuth,CheckProfile} from "./check"
const useStyles=makeStyles(theme=>({
    top:{
        marginTop:"150px"
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

const getNewToken=()=>{
    let token=localStorage.getItem('token');
    if(token)
    {
        axios.post("http://127.0.0.1:8000/api/users/token",{
            refreshToken:localStorage.getItem('refreshToken'),
            username:localStorage.getItem('username')
        }).then(res=>{
            localStorage.setItem("token",res.data);
            setTimeout(getNewToken,300)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
function Check()
    {
        const [getUser,setUser]=useState([]);
        axios.get("http://127.0.0.1:8000/api/profile/getall").
            then(res=>{
                setUser(res.data)
                const k=localStorage.getItem("id")
                console.log(getUser)
                const array=[]
                getUser.map((i)=>{
                    array.push(i.user)
                })
                if(array.includes(parseInt(k)))
                {   
                    console.log("true")
                    return true
                }
                else{
                    console.log("false")
                    return false
                }
            }
            )
         
    }
export default function Login()
{
    let history = useHistory();
    const [error,setError]=useState("");
    const [getUser,setUser]=useState([]);
    const [loginInfo,SetlogInInfo]=useState({
        username:"",
        password:"",
        
    });
    
    const classes = useStyles();
   
    const handleChange=(e)=>{
        SetlogInInfo({...loginInfo,[e.target.name]:e.target.value})
    }
    
    const login=(e)=>{
        e.preventDefault()
        axios.post("http://127.0.0.1:8000/api/users/signin",loginInfo)
        .then((res,err)=>{
            if(err)
            {
                console.log(err)
            }
            else{
                console.log(res.data)
                localStorage.setItem("id",res.data.id);
                localStorage.setItem("token",res.data.accessToken);
                localStorage.setItem("username",res.data.username);
                
                // axios.get("http://127.0.0.1:8000/api/profile/getall").
                // then(res=>{
                //     setUser(res.data)
                //     const k=localStorage.getItem("id")
                //     console.log(getUser)
                //     const array=[]
                //     getUser.map((i)=>{
                //         array.push(i.user)
                //     })
                //     if(array.includes(parseInt(k)))
                //     {   
                //         console.log("true")
                //         return true
                //     }
                //     else{
                //         console.log("false")
                //         return false
                //     }
                // })
                
            
                    
                    //history.push("/create/profile")
                
                //setTimeout(getNewToken,300);
                
            }
                
        })
        .catch(err=>{
            setError(err.response.data);
            console.log(err.response.data)
        })
    };
    
    // useEffect(()=>{
        
    //     check()
    // },[])
   
    return(
        <Container fluid className={classes.top} >
            <Row className="justify-content-md-center mx-auto">
                <Col md="4">
                    <Card >
                        <h3 className={classes.text} style={{fontFamily: "Dancing Scrip"}}>Sign In</h3>
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
                        <Form onSubmit={login} className="px-4 py-3">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                            </Form.Group>
                                <hr>
                                </hr>
                                <Row className="justify-content-md-center">
                                    <Col md="auto"><a href="/"> Become Memebership?</a></Col>
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
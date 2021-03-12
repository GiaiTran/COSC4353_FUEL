import axios from 'axios'
import {React,useState,useEffect} from 'react'
import { Table,Card, Container, CardDeck,ListGroup,ListGroupItem,Col,Row,Button,Alert} from 'react-bootstrap'
import Tooltip from 'react-tooltip-lite';
import { makeStyles } from "@material-ui/core/styles";
import './style.css'
import { NavLink } from 'react-router-dom';
import moment from "moment";
import HeaderNav from './headerNav';


const useStyles=makeStyles(theme=>({
    

}))
export default function GetAllUser()
{
    const classes = useStyles();
    const [error,setError]=useState("")
    const [dataUser,setDataUser]=useState([])
    const [fuel,setFuel]=useState([])
    const getdata=()=>{
        axios.get("http://127.0.0.1:8000/api/profile/getall" )
    .then(res=>{
        setDataUser(res.data.data)
        
        
        console.log(res.data.data)
        
        dataUser.map(i=>console.log(i.user_profile))
        
        //console.log(res.data)
        //user_profile
    }).catch(err=>{
        console.log(err.data)
    })
    }
    const getFuel=()=>{
        axios.get("http://127.0.0.1:8000/api/fuel/getall")
        .then(res=>{
            setFuel(res.data)
            console.log(res.data)
            
        }).catch(err=>{
            console.log(err)
        })
    }

    

    function dele(slug,e)
    {
        
        axios.delete(`http://127.0.0.1:8000/api/profile/delete/${slug}` )
       
        .then(res=>{
            
            console.log(res)
            setError("OK user deleted")
            window.location.reload();
            localStorage.removeItem("slug_profile")
        }).catch(err=>{
            setError("You cannot delete it")
            console.log(err)
        })
    }
    console.log(fuel.length)
    useEffect(()=>{
        getdata()
        getFuel()
        
    },[])
    

    
    return(
    
        <>
        
        <HeaderNav/>
        <Container>
        <Card style={{marginTop:"20px",textAlign:"center",marginLeft:"60px"}}>
        <Card.Header as="h5">Manage Users</Card.Header>
            <Card.Body>
                <Card.Title>Total User Registered/Purchased Gas</Card.Title>
                <Card.Text>
                    {dataUser.length}
                </Card.Text>
                
            </Card.Body>
        </Card>
        
        {/* <Row>
        <Col md={3}> */}
        {error?<Alert variant="danger" style={{marginTop:"20px",marginBottom:"20px",marginLeft:"60px",textAlign:"center"}}>
                <h3>{error}</h3>
            </Alert>:null}
        <Row>
        {/* {dataUser&&dataUser.length>0&&dataUser.map((i)=>
        
        // <Col xs={1} md={5} style={{marginTop:"20px",marginBottom:"20px",marginLeft:"80px"}}>
        //     <CardDeck>
        //         <Card>
        //             <Card.Body>
        //                 <Card.Title style={{textAlign:"center"}}><a href={`/detail/${i.slug}`}>{i.slug}</a></Card.Title>
        //                 <ListGroup className="list-group-flush">
        //                     <ListGroupItem>Full Name: {i.fullname}</ListGroupItem>
        //                     <ListGroupItem>Email: {i.email}</ListGroupItem>
        //                     <ListGroupItem>Profile
        //                         <ul className="tip-list">
        //                             <li>Username: {i.user_profile?(i.user_profile.username):(<span>Null</span>)}</li>
        //                             <li>Role: {i.user_profile?(i.user_profile.role):(<span>Null</span>)}</li>
        //                             {fuel&&fuel.length>0&&fuel.map((j)=>
        //                                 <div>{j.profile===i.slug?(<li>
        //                                     {j.date}
        //                                     <ul><li><span style={{fontWeight:"bold"}}>Gallon purchased: </span>{j.gallon}</li></ul>
                                        
                                        
        //                                 </li>):null}</div>
                                    
        //                             )}
        //                             {fuel&&fuel.length>0&&fuel.map((j)=>
        //                                 <div>{j.profile===null?(<li>
                                            
        //                                     <li><span style={{fontWeight:"bold"}}>Not Register</span></li>
                                        
                                        
        //                                 </li>):null}</div>
                                    
        //                             )} 
                                
        //                         </ul>

        //                     </ListGroupItem>
        //                 </ListGroup>
        //             </Card.Body>
        //             <Card.Footer style={{paddingLeft:"40%",paddingRight:"50%"}}>
                    
        //             <Button onClick={() => dele(i.slug)}>Delete</Button>
        //             </Card.Footer>
        //         </Card>
        //     </CardDeck>
        //     </Col>
                <div>dasdasd</div>
        
        )} */}
        <Table striped bordered hover size="sm" style={{marginTop:"20px",marginBottom:"20px",marginLeft:"60px"}}>
            <thead>
                <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>
                <th>Gallon purchased</th>
                
                </tr>
            </thead>
            <tbody>
                
                {dataUser&&dataUser.length>0&&dataUser.map((i)=>
                    <tr>
                        <td><a href={`/detail/${i.slug}`}>{i.slug}</a></td>
                        <td>{i.fullname}</td>
                        <td>{i.email}</td>
                        <td>{i.user?(i.user_profile.username):<span>null</span>}</td>
                        <td>{i.user?(i.user_profile.role):<span>null</span>}</td>
                        <td>
                            {fuel&&fuel.length>0&&fuel.map((j)=>
                                
                                    <span>
                                       
                                        {j.profile===i.slug&&j.profile!==null ?(
                                            <Table>
                                             <thead>
                                                <tr>Date: <span>{moment(j.date).format("MMM Do YYYY")}</span></tr>
                                                <tr>Gallon: <span>{j.gallon}</span></tr>
                                            </thead>
                                            </Table>

                                            ):null}
                                            
                                       
                                        
                                        
                                        </span>


                                
                        
                            )}


                        </td>
                    </tr>
                
                
                )}
               
                
            </tbody>
            </Table>

            
        {/* </Col>
        </Row> */}
        </Row>
       
        </Container>
        </>
      
        

        

        
    )
}
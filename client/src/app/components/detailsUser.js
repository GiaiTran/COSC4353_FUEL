import axios from 'axios';
import {React,Component,useState} from 'react'
import { Redirect } from "react-router-dom";
import{Table,Container, Nav,Modal,Button,Form,Row,Col,CardDeck,Card,NavLink} from 'react-bootstrap'
import HeaderNav from './headerNav';
class Details extends Component{
    constructor(props){
        super(props);
        this.state={
            id:null,
            users:"",
            //modalShow:false
            update:{
                address1:null,
                address2:null,
                city:null,
                state:null,
                zipcode:null
            },
            history:"",
            redirect:false
        }
    };
    
    componentDidMount(){
        //const{match:{params}}=this.props;
        //this.setState({modalShow:false})
        const slug=this.props.match.params.slug
        console.log(slug)
        axios.get(`http://127.0.0.1:8000/api/profile/find/${slug}`)
        .then(res=>{
            if(res.data.profile===null){
                this.setState({redirect:true})
                //alert("Profile empty")
                
            }
            
            this.setState({users:res.data.profile})
            
            //console.log(this.state.users)
        }).catch(err=>{
            console.log(err.response)
        })
    
    }
    
    render()
    
    
    {
        //const modal=this.state.modalShow
        //console.log(modal)
        const user=this.state.users
        console.log(user)
        if(this.state.redirect){
            return (<Redirect to="/create/profile"></Redirect>)
        }

        else
        {
            return(
                //<div>{user.users.FullName}</div>
                <>
    
                <HeaderNav/>
                <Container style={{width:"500px",alignContent:"center"}}>
                <Card className="mx-auto" style={{margin:"150px auto",float: "none"}} >
                    <Card.Header className="text-center">About User</Card.Header>
                    <Card.Body>
                        <Card.Title className="text-center">
                            {user.fullname}
                            <br/>
                            {user.email}
                        
                        </Card.Title>
                        <Card.Text>
                        
                        <span>Address:  </span>{user.address1}
                        
                        <span style={{float:"right"}}>Address 2:  {user.address2}</span>
                        <br/>
                        <br/>
                        <span>City:  </span>{user.city}
                        
                        <span style={{float:"right",marginRight:"95px"}}>State:  {user.state}</span>
                        <br/>
                        <br/>
                        <span>Zipcode:  </span>{user.zipcode}
                       
                        <span style={{float:"right",marginRight:"45px"}}>Out Of State:  {user.outOfState}</span>
                        </Card.Text>
            
                    </Card.Body>
                    <Card.Footer className="text-center"><a href={`/profile/update/${user.slug}`}>Update</a></Card.Footer>
                    <Card.Footer className="text-center"><a href={`/history/${user.slug}`}>View Transactions</a></Card.Footer>
                </Card>
            </Container>
            
            </>
            )

        }
        
    }
}


export default Details
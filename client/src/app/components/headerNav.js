import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios'
import {Nav, NavItem, Navbar, NavDropdown, Container} from 'react-bootstrap';

import "./style.css"


class Example extends React.Component {
    constructor(props)
    {
        super(props)
        this.state={
            user:""
        }

    }
    // checkUser=()=>{
    //     axios.get("http://127.0.0.1:8000/api/profile/getall")
    //     .then(res=>{
    //         this.setState({user:res.data.data})
    //         const k=localStorage.getItem("id")
    //         const array=[]
    //             this.state.user.map((i)=>{
    //                 array.push(i.user)
    //             })
    //             if(array.includes(parseInt(k)))
    //             {
    //                 return true
                    
    //             }
    //             else{
    //                 return false
    //             }
    //     })
    // }
    logout=(props)=>{
        
        localStorage.clear();
        this.props.history.push("/login") 
    }
    render() {
        
        return (
            <>
            
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{position:"sticky",top:0,zIndex:"100"}}>
                <Navbar.Brand href="#home" style={{paddingLeft:"22px"}}>Gas Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    
                    </Nav>
                    <Nav style={{paddingRight:"40px"}}>
                    <NavDropdown title="Welcome User" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                
            </Navbar>
            <div class="sidenav">
                    <a href="/admin/profile">Admin Page</a>
                    {this.checkUser===true?(<a href="#">Tao` Lao</a>):(<a href="/create/profile">Create</a>)}
                    
                    <a href="/create/gas">Gas Create</a>
                    <a href="#">Contact</a>
            </div>
            


            
          
          
          </>
        );
    }
}
export default withRouter(Example)
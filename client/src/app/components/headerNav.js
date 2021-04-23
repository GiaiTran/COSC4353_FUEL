import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios'
import {Nav, NavItem, Navbar, NavDropdown, Container} from 'react-bootstrap';
import {CheckProfile} from './check'
import "./style.css"


class Example extends React.Component {
    constructor(props)
    {
        super(props)
        this.state={
            user:""
        }

    }
    logout=()=>{
        
        localStorage.clear();
        this.props.history.push("/login")
    }
    render() {
        const user=localStorage.getItem('username')
        
     
        return (
            <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{position:"sticky",top:0,zIndex:"100"}}>
                <Navbar.Brand href="#home" style={{paddingLeft:"22px"}}>Gas Project</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    
                    </Nav>
                    <Nav style={{paddingRight:"40px"}}>
                    <NavDropdown title={`welcome ${user}`} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/admin/profile">Admin Page</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/create/profile">Create Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                
            </Navbar>
            <div class="sidenav">
                    
                    {CheckProfile?(<a href={`/detail/${localStorage.getItem("id")}`}>Update</a>)
                    :(<a href="/create/profile">Create</a>)}
                    
                    <a href="/create/gas">Gas Purchase</a>
                    <a href={`/history/${localStorage.getItem("id")}`}>User Report</a>  
            </div>
          </>

        );
    
    }
}
export default withRouter(Example)
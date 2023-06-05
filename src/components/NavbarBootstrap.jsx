import React from "react";
import { Link } from 'react-router-dom';
import {Navbar,Nav,Form,Button,Container} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'
import './NavbarStyles.css'
import Footer from "./Footer";
const customStyle={
  position: "fixed",
  objectfit: "cover",  
  width: "100%",
  height: "20px",
  zindex: "10"
};
const NavbarBootstrap = ({connect}) =>{
  return( 
    <div style={customStyle}>
      <Navbar bg="transparent" expand="lg" variant="light">
      <Container fluid>
        <Navbar.Brand href="#"><FontAwesomeIcon className="Icon" icon={faLocationDot} flip/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '140px',color: "white"}}
            navbarScroll
          >

            
            <Nav.Link style={{color:"white"}} className="item" to={"/"}>Home</Nav.Link>
            <Nav.Link style={{color:"white"}} className="item" to={"./Footer"}>About</Nav.Link>           
          </Nav>
          <Form className="d-flex">
            <Button className="button" onClick={() => connect()}>Connect</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div> 
  )
}
export default NavbarBootstrap;



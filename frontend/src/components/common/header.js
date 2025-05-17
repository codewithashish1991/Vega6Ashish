import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

class Header extends Component {
  constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
  };

  async handleSubmit(event){
    event.preventDefault();
    console.log("logout");
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    axios.get('http://localhost:5000/api/auth/logout', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      console.log(response.data);
      localStorage.clear();
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  render() {
    let userinfo = "";
    if(localStorage.getItem('user')){
      userinfo = JSON.parse(localStorage.getItem('user'));
      console.log(userinfo.username);
    }
    return (
      <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="#home">Blogs</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {(!localStorage.getItem('user')) ? (
              <><Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link></>
            ) : (
             <Nav.Link as={Link} to="/blog-add">Add New Blog</Nav.Link>
            ) }
          </Nav>
          {(localStorage.getItem('user')) ? (
            <>
           <p style= {{ "color" : "white"}}> {(userinfo.profile_pic) ? <img src = {userinfo.profile_pic} width= "50"/> : ""} {userinfo.name}  &nbsp; <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Logout
                  </Button></p>
           </>
          ) : ""}
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;

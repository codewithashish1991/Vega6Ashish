import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = { 
          username: "",
          password: ""
        };
      }
    componentDidMount() {
        document.title = "Blog - Login";
    }
    handleChange(event) {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    async handleSubmit(event){
      event.preventDefault();
       if(this.state.username == ""){
        alert("Please enter your username. ");
        return;
      }

      if(this.state.username == ""){
        alert("Please enter password. ");
        return;
      }

      const data = {};
        data.username = this.state.username;
        data.password = this.state.password;
        const _this = this;
        axios.post('http://localhost:5000/api/auth/login',  data)
        .then(function (res) {
          if(res.data.message){
            alert(res.data.message);
          } else {
            const user = res.data.user_details;
            const accessToken  = res.data.accessToken;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            window.location.href = '/';
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  render() {
    return (
      <Container fluid style={{ height: "84vh" }}>
        <Row className="center-wrapper">
            <Col lg="3"></Col>
            <Col lg="6"  style={{ marginTop: '120px' }}>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name= "username" placeholder="Enter Username" onChange={this.handleChange} value = {this.state.username} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name= "password" placeholder="Password"  onChange={this.handleChange} value = {this.state.password} />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </Form>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
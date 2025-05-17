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
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveUser = this.saveUser.bind(this);;
    this.formData = new FormData();
    this.state = {
      name: "", 
      username: "",
      password: "",
      age: 1,
      image:"",
      img_url:"",
      disable: false
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    document.title = "Blog - Register";
  }

  handleChangeFile(event) {
    const file = event.target.files[0];
    this.setState({ ["image"] : file });
  }

  async uploadImageToCloud(image){
    this.formData.append("file" , image);
    this.formData.append("upload_preset", "ml_default");
    let data = "";

    await axios.post('https://api.cloudinary.com/v1_1/dmlinluv6/image/upload',  this.formData)
    .then(function (response) {
      data = response.data["secure_url"];  
    })
    .catch(function (error) {
      console.log(error);
    });
      this.setState({["img_url"]: data});
  }

  saveUser(){
    const data = {};
    data.name = this.state.name;
    data.username = this.state.username;
    data.password = this.state.password;
    data.age = this.state.age;
    data.profile_pic = this.state.img_url;
    data.is_active = this.state.is_active;
    axios.post('http://localhost:5000/api/auth/register',  data)
    .then(function (res) {
      if(res.data.res){
        alert(res.data.res);
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  async handleSubmit(event){
    event.preventDefault();


    if(this.state.name == ""){
      alert("Please enter your name. ");
      return;
    }

    if(this.state.username == ""){
      alert("Please enter username. ");
      return;
    }

     if(this.state.age < 1 || this.state.age > 99){
      alert("Please enter a valid age. ");
      return;
    }

    if(this.state.password == ""){
      alert("Please enter a valid password. ");
      return;
    }

    if(this.state.image != ""){
      const res = await this.uploadImageToCloud(this.state.image);
    }

    this.saveUser();
  }
  render() {
    return (
      <Container fluid style={{ height: "84vh" }}>
        <Row className="center-wrapper">
          <Col lg="3"></Col>
            <Col lg="6" className ="mt-3">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" name = "name" placeholder="Enter name" onChange={this.handleChange} value = {this.state.name} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name = "username" placeholder="Enter Username" onChange={this.handleChange} value = {this.state.email} required  />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicage">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name = "age"  placeholder="Enter Age" min="1" max="99" placeholder="10" onChange={this.handleChange}  value = {this.state.age} />
                  </Form.Group>

                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Profile image</Form.Label>
                    <Form.Control name="image" type="file" onChange={this.handleChangeFile}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name = "password"  placeholder="Password" onChange={this.handleChange} value = {this.state.passord} required />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={this.handleSubmit} disabled = {this.state.disable}>
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
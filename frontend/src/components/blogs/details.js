import React, { Component } from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import withRouter from './withRouter';
import { Link } from 'react-router-dom';

class BlogDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      id: "",
      title: "",
      description: "",
      picture: ""
    };
  }
  
  componentDidMount() {
    document.title = this.state.title;
    const { id } = this.props.params;
    console.log(id);
    axios.get('http://localhost:5000/api/blogs/get/'+ id)
    .then(response => {
      if(response.data.record && response.data.record._id){
        const data = {};
        data.id = response.data.record._id;
        data.title = response.data.record.title;
        data.description = response.data.record.description;
        data.picture = response.data.record.picture;
        this.setState(data);
      }else{
        window.location.href = '/';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  render() {
    return (
      <Container fluid fluid style={{ minHeight: "84vh" }} >
        <Row >
            <Col key={this.state.id} lg-12 className="mt-3">
              <Card>
                <Card.Img
                  variant="top"
                  src={(this.state.picture) ? this.state.picture : "https://fastly.picsum.photos/id/786/536/354.jpg?hmac=0TkQvcKWPM-R5HIIabuS27C1-WrmGiGDULismUVKpb0" }
                  style={{ marginTop: '10px', width: "50%", height:"auto", marginLeft: '10px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{this.state.title}</Card.Title>
                  <Card.Text>
                    {this.state.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Link to="/" style={{ textDecoration: 'none' }} className="mt-3 mb-3">
            <Button variant="primary" style={{ color: 'white' }}>
              Back
            </Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

export default withRouter(BlogDetails);
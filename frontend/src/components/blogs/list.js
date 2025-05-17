import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Blog from './blog'

class BlogList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      blogs: []
    };
  }
  
  componentDidMount() {
    document.title = "Blog - Welcome to our blogs";
    axios.get('http://localhost:5000/api/blogs/list')
    .then(response => {
      if(response.data.blogs && response.data.blogs.length > 0){
        this.setState({blogs: response.data.blogs} );
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  render() {
    return (
      <Container fluid >
        <Row className="center-wrapper">
        {this.state.blogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}

        {(this.state.blogs.length >0) ? "" : (<h1>No blogs found.</h1>) } 
        </Row>
      </Container>
    );
  }
}

export default BlogList;
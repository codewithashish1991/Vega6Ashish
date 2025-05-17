import React, { Component } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: null,
      is_active: true,
    };
  }

  componentDidMount() {
    document.title = 'Blog - Add Blog';
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeFile = (event) => {
    const file = event.target.files[0];
    this.setState({ image: file });
  };

  uploadImageToCloud = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default'); // Replace with your upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dmlinluv6/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { title, description, image, is_active } = this.state;

    if (!title.trim()) {
      alert('Please enter blog title.');
      return;
    }

    if (!description.trim()) {
      alert('Please enter description.');
      return;
    }

    let img_url = '';
    if (image) {
      img_url = await this.uploadImageToCloud(image);
      if (!img_url) {
        alert('Image upload failed. Please try again.');
        return;
      }
    }

    const data = {
      title,
      description,
      picture: img_url,
      is_active,
    };

    const accessToken = JSON.parse(localStorage.getItem('accessToken'));

    try {
      const res = await axios.post('http://localhost:5000/api/blogs/create', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data.res) {
        alert(res.data.res);
        window.location.href = '/';
        // Optionally, redirect or reset form here
      }
    } catch (error) {
      console.error('Blog creation failed:', error);
    }
  };

  render() {
    const { title, description } = this.state;

    return (
      <Container fluid style={{ height: '84vh' }}>
        <Row className="center-wrapper">
          <Col lg="3"></Col>
          <Col lg="6" className="mt-3">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Blog title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  onChange={this.handleChange}
                  value={title}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Blog Description"
                  onChange={this.handleChange}
                  value={description}
                />
              </Form.Group>

              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Blog Image</Form.Label>
                <Form.Control type="file" onChange={this.handleChangeFile} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Blog
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AddBlog;

import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

class Blog extends Component {
	constructor(props) {
	    super(props);
	    this.state = { 
	    	id: props.blog._id,
		    title: props.blog.title,
		    desc: props.blog.description,
		    picture: props.blog.picture,
	    };
	  }
  render() {
	  return (
	  	<Row>
	  		<Col lg-12 className="mt-3">
			    <Card >
			    {(this.state.picture) ? (
			    	<Card.Img
			      	variant="top"
			      	src={this.state.picture}
			      	style={{ width: '200px', height: '200px', marginTop: '10px', marginLeft: '10px', objectFit: 'cover' }}
			      />
		    	) : (
			      <Card.Img
			      	variant="top"
			      	src="https://fastly.picsum.photos/id/786/536/354.jpg?hmac=0TkQvcKWPM-R5HIIabuS27C1-WrmGiGDULismUVKpb0"
			      	style={{ width: '200px', height: '200px', marginTop: '10px', marginLeft: '10px', objectFit: 'cover' }}
			      />
		    	)}
			      <Card.Body>
			        <Card.Title>{this.state.title}</Card.Title>
			        <Card.Text>
			          {this.state.desc.length > 50 ? this.state.desc.slice(0, 50) + "..." : this.state.desc}
			        </Card.Text>
			       <Link to={`/blog-details/${this.state.id}`} style={{ textDecoration: 'none' }}>
				    <Button variant="primary" style={{ color: 'white' }}>
				      More
				    </Button>
				  </Link>
			      </Card.Body>
			    </Card>
	  		</Col>
		</Row>
	  );
	}
}

export default Blog;
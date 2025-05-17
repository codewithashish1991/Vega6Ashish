import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div  className=" bg-dark text-center text-lg-left">
        <div className='text-center p-3 text-light' style={{ backgroundColor: 'rgba(0, 0, 0, 1)', textColor: 'white' }}>
          &copy; {new Date().getFullYear()} Copyright:{' '}
            Blogs
        </div>
      </div>
    );
  }
}


export default Footer;
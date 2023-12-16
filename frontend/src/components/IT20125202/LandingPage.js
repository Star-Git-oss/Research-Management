import React, { Component } from 'react'
import jwt_decode from 'jwt-decode';
import image from '../../images/land.jpg';

export default class LandingPage extends Component {
  componentDidMount() {
    document.title = "Home"
  }
  render() {
    return (
      <div className="container" style={{ minHeight: '100vh' }}>
        {/* <div className='jumbotron mt-5'> */}
          {/* <div align="center" className='col-sm-8 mx-auto'>
            <hr />
            <h1>Research Project Management Tool</h1>
            <hr /><br /><br />
          </div> */}

          <div className='container' style={{ position: 'relative', textAlign: 'center' }}>
            <img src={image} class="img-fluid" alt="Research Project Management Tool" style={{ minWidth: '100%', minHeight: '100vh', opacity: '0.7' }}></img>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <h1 class="display-5" style={{ fontFamily: 'Stencil Std, fantasy' }}>Research Project Management Tool</h1>
            </div>
          </div>
        {/* </div> */}
      </div>
    )
  }
}

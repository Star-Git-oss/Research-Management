import React, { Component } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

class NavBar extends Component {

  constructor() {
    super();
    this.state = {
      type: '',
    }
  }

  componentDidMount() {
    document.title = "NavBar"
    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        // type: decoded.type.toString(),
        type: decoded.type,

      })
    }
  }

  logOut(e) {
    e.preventDefault();
    swal({
      title: "Are you sure you want to log out?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willLogout) => {
        if (willLogout) {
          swal("Logout successfully!", "", "success")
            .then((value) => {
              if (value) {
                localStorage.removeItem('userToken');
                this.props.history.push(`/user/login`)
                window.location.reload();
              }
            });
        } else {
          swal("Redirecting...");
        }
      });


  }

  render() {

    const loginRegLink = (
      <ul className='nav nav-tabs'>
        <li className='nav-item'>
          <a className="nav-link" aria-current="page" href="/user/login" style={{ textDecoration: 'none', color: 'white' }}>Login</a>
        </li>
        <li className='nav-item'>
          <a className="nav-link" aria-current="page" href="/user/registration" style={{ textDecoration: 'none', color: 'white' }}>Register</a>
        </li>
      </ul>
    )

    let userLink;

    // NavBar Links for students
    if (this.state.type === 'Student') {
      userLink = (
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/home" style={{ textDecoration: 'none', color: 'white' }}>Home</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/student/topics" style={{ textDecoration: 'none', color: 'white' }}>Topics</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/profile" style={{ textDecoration: 'none', color: 'white' }}>Profile</a>
          </li>

          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ textDecoration: 'none', color: 'white' }}>
              Dropdown
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> */}         

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" aria-current="page" href="#" style={{ textDecoration: 'none', color: 'white' }} id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
            Student Groups
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/student/group/add">Create Group</a></li>
                <li><a className="dropdown-item" href="/student/group/view">View Group</a></li>
            </ul>
          </li> 

           <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" aria-current="page" href="#" style={{ textDecoration: 'none', color: 'white' }} id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
                Requests
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/supervisor/request">Send Request</a></li>
                <li><a className="dropdown-item" href="/request/summary">Request Summary</a></li>
            </ul>
          </li> 

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" aria-current="page" href="#" style={{ textDecoration: 'none', color: 'white' }} id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
            Submissions
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/student/submitiontype/view">Submissions List</a></li>
                <li><a className="dropdown-item" href="/student/submitionsp/view">Add Submission</a></li>
                <li><a className="dropdown-item" href="/student/marks/view">View Marks</a></li>
                <li><a className="dropdown-item" href="/student/group/evaluation/view">My Sessions And Marks</a></li>
            </ul>
          </li>

          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/view/documentTemplate" style={{ textDecoration: 'none', color: 'white' }}>Templates</a>
          </li> 

          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/contactus" style={{ textDecoration: 'none', color: 'white' }}>Contact Us</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/aboutus" style={{ textDecoration: 'none', color: 'white' }}>About Us</a>
          </li>

          <li className='nav-item'>
            <a href='/user/login' onClick={this.logOut.bind(this)} className="nav-link" style={{ textDecoration: 'none', color: 'white' }}>
              Log out
            </a>
          </li>
        </ul>
      )
    }

    // NavBar Links for Supervisor
    else if (this.state.type === 'Supervisor') {
      userLink = (
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/home" style={{ textDecoration: 'none', color: 'white' }}>Home</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/profile" style={{ textDecoration: 'none', color: 'white' }}>Profile</a>
          </li>
          {/* <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/submitions/view" style={{ textDecoration: 'none', color: 'white' }}>Submitions</a>
          </li> */}
              <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" aria-current="page" href="#" style={{ textDecoration: 'none', color: 'white' }} id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
            Submissions
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/submitions/view">View Submissions</a></li>
                <li><a className="dropdown-item" href="/marks/view">Add / Edit Marks</a></li>
            </ul>
          </li>  <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/create/feedback" style={{ textDecoration: 'none', color: 'white' }}>Feedback</a>
          </li>

          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/contactus" style={{ textDecoration: 'none', color: 'white' }}>Contact Us</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/aboutus" style={{ textDecoration: 'none', color: 'white' }}>About Us</a>
          </li>
          <li className='nav-item'>
            <a href='/user/login' onClick={this.logOut.bind(this)} className="nav-link" style={{ textDecoration: 'none', color: 'white' }}>
              Log out
            </a>
          </li>         
        </ul>
      )
    }

    // NavBar Links for Panel Member
    else if (this.state.type === 'Panel Member') {
      userLink = (
        <ul className='nav nav-tabs'>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/home" style={{ textDecoration: 'none', color: 'white' }}>Home</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/profile" style={{ textDecoration: 'none', color: 'white' }}>Profile</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/panel/topic/list" style={{ textDecoration: 'none', color: 'white' }}>Topics</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/evaluation/add" style={{ textDecoration: 'none', color: 'white' }}>Evaluations</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/contactus" style={{ textDecoration: 'none', color: 'white' }}>Contact Us</a>
          </li>
          <li className='nav-item'>
            <a className="nav-link" aria-current="page" href="/user/aboutus" style={{ textDecoration: 'none', color: 'white' }}>About Us</a>
          </li>
          <li className='nav-item'>
            <a href='/user/login' onClick={this.logOut.bind(this)} className="nav-link" style={{ textDecoration: 'none', color: 'white' }}>
              Log out
            </a>
          </li>
        </ul>
      )
    }


    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#212F3C' }}>
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{ color: 'white' }}>RPMS</a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">

              </span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-md-center"
              id="navbarSupportedContent"
            >
              {/* <div className='navbar-nav ms-auto mb-2 mb-lg-0'></div> */}
              <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              </ul>
              {localStorage.userToken ? userLink : loginRegLink}

            </div>
          </div>
        </nav>
      </div>
    )
  }
}


export default withRouter(NavBar);
import React, { Component } from 'react'

export default class AdminNavBar extends Component {
  onlogout = (e) => {
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
                window.history.forward();
                window.location = "http://localhost:3000/admin/login";
              }
            });
        } else {
          swal("Redirecting...");
        }
      });
    e.preventDefault();
    

  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/admin/home">RPMS - Admin</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/admin/home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/users">User Roles</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/admin/topiclist">Topics</a>
                </li>

                 <li className="nav-item">
                  <a className="nav-link" href="/student/groups/view">Student Groups</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/submitiontype/add">Submissions</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/documentTemp">Template</a>
                </li>
                                
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Manage Supervisors
                  </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="/supervisor/add">Add Supervisor Details</a></li>
                    <li><a className="dropdown-item" href="/supervisor/view">View Supervisor Details</a></li>
                </ul>     
                    
                </li>            

              </ul>
              {/* <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}

              <div className="btn-group dropstart">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="btn btn-outline-dark btn-sm" aria-current="page" onClick={this.onlogout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </nav >
      </div >
    )
  }
}

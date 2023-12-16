// admin - view user roles
import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../admin/AdminNavBar';
import swal from 'sweetalert';


export default class UserRoles_Supervisors extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    document.title = "User Roles"

    // redirect to the login page if the user is not logged in
    if (!localStorage.token) {
      swal("Please login first", "", "warning")
        .then((value) => {
          if (value) {
            this.props.history.push(`/admin/login`)
            window.location.reload();
          }

        });

    }
    this.retrieveUsers();
  }

  retrieveUsers() {
    const type = 'Supervisor'
    axios.get(`http://localhost:5000/users/${type}`).then(res => {
      if (res.data.success) {
        this.setState({
          users: res.data.existingUsers
        });

        // console.log(this.state.users);
      }
    });
  }

  onDelete = (id) => {
    //with a confirmation 
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user details",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:5000/user/delete/${id}`).then((res) => {
            swal("User Deleted Permanently!", "", "success")
              .then((value) => {
                if (value) {
                  this.retrieveUsers();
                }

              });
          })

        } else {
          swal("Cancelled. The user details are safe!");
        }
      });
  }

  handleSearchArea = (e) => {
    // console.log(e.currentTarget.value)

    const searchKey = e.currentTarget.value;

    axios.get('http://localhost:5000/users').then(res => {
      if (res.data.success) {

        this.filterData(res.data.existingUsers, searchKey);
      }
    });

  }

  filterData(users, searchKey) {
    const searchResult = users.filter((user) =>
      user.idNumber.toLowerCase().includes(searchKey) ||
      user.name.toLowerCase().includes(searchKey) ||

      user.idNumber.toUpperCase().includes(searchKey) ||
      user.name.toUpperCase().includes(searchKey) ||

      user.idNumber.includes(searchKey) ||
      user.name.includes(searchKey)
    )

    this.setState({
      users: searchResult
    })
  }

  render() {
    return (
      <div className='container'>
        <br />
        <AdminNavBar />
        <br />

        <div className="container">
          <div className='row'>
            <div className='col-lg-9 mt-2 mb-2'>
              <h1>Users</h1>
            </div>
            <div className='col-lg-3 mt-2 mb-2'>
              <input
                className='form-control'
                type="search"
                placeholder="Search User"
                name="searchQuery"
                onChange={this.handleSearchArea}>
              </input>
            </div>
            <hr /><br />
          </div>
          <div className='row'>
            <div className="btn-group">
              <a href="/admin/users" className="btn btn-outline-dark active" aria-current="page">All Users</a>
              <a href="/admin/panelmembers" className="btn btn-outline-dark">Panel Members</a>
              <a href="/admin/students" className="btn btn-outline-dark">Students</a>
              <a href="/admin/supervisors" className="btn btn-outline-dark">Supervisors</a>
            </div>
          </div>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th scope='col'> # </th>
                <th scope='col'> ID Number </th>
                <th scope='col'> Name </th>
                <th scope='col'> Email </th>
                <th scope='col'> Mobile </th>
                <th scope='col'> Research Field </th>
                {/* <th scope='col'> Registered Date </th> */}
                <th scope='col'> </th>
                {/* <th scope='col'> Password </th> */}
              </tr>
            </thead>

            <tbody>
              {this.state.users.map((users, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>
                    <a href={`/admin/user/${users._id}`} style={{ textDecoration: 'none' }}>
                      {users.idNumber}
                    </a>
                  </td>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>{users.mobile}</td>
                  <td>{users.researchfield}</td>
                  {/* <td>{users.dateRegistered}</td> */}
                  {/* <td>{users.password}</td> */}
                  <td>
                    <a className='btn btn-outline-success' href={`/admin/edituser/${users._id}`}>
                      <i className='fas fa-edit'></i> &nbsp;Update
                    </a>
                    &nbsp;
                    <a className='btn btn-outline-danger' href="#" onClick={() => this.onDelete(users._id)}>
                      <i className='fas fa-trash'></i> &nbsp;Delete
                    </a>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
          {/* <button className='btn btn-success'> <a href='/add' style={{ textDecoration: 'none', color: 'white' }}> Create New Post  </a></button> */}
        </div>
      </div>
    )
  }
}


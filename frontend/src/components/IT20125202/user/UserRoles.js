// admin - view user roles
import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../admin/AdminNavBar';
import swal from 'sweetalert';
import { PieChart } from 'react-minimal-pie-chart';

export default class UserRoles extends Component {

  constructor(props) {
    super(props);

    this.state = {
      all: 0,
      students: 0,
      supervisors: 0,
      panelmembers: 0,
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
    let all = 0;
    let students = 0;
    let panel = 0;
    let supervisors = 0;

    axios.get('http://localhost:5000/users').then(res => {
      if (res.data.success) {
        this.setState({
          users: res.data.existingUsers
        });

        this.state.users.forEach(user => {
          if (user.type === "Student") {
            students = students + 1;
          }
          else if (user.type === "Supervisor") {
            supervisors = supervisors + 1;
          }
          else if (user.type === "Panel Member") {
            panel = panel + 1;
          }
          all = all + 1;
        });

        this.setState({
          all: all,
          students: students,
          supervisors: supervisors,
          panelmembers: panel
        })

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
      user.type.toLowerCase().includes(searchKey) ||

      user.idNumber.toUpperCase().includes(searchKey) ||
      user.name.toUpperCase().includes(searchKey) ||
      user.type.toUpperCase().includes(searchKey) ||

      user.idNumber.includes(searchKey) ||
      user.name.includes(searchKey) ||
      user.type.includes(searchKey)
    )

    this.setState({
      users: searchResult
    })
  }

  getStat = () => {

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
                <th scope='col'> Type </th>
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
                  <td>{users.type}</td>
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
          <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.getStat()}>
            Show Statistics
          </button>
          <br /><br /><br />

          <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Registered user counts</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <dl className='row' style={{ width: '100vh', margin: '0px 0px 0px 0px' }} >
                    <dt className='col-sm-3'>All users</dt>
                    <dd className='col-sm-9'>{this.state.all}</dd>

                    <dt className='col-sm-3'>Panel Members</dt>
                    <dd className='col-sm-9'>{this.state.panelmembers}</dd>

                    <dt className='col-sm-3'>Students</dt>
                    <dd className='col-sm-9'>{this.state.students}</dd>

                    <dt className='col-sm-3'>Supervisors</dt>
                    <dd className='col-sm-9'>{this.state.supervisors}</dd>
                  </dl>
                </div>
                <PieChart radius={40}
                  label={(data) => data.dataEntry.title}
                  labelStyle={{
                    fontSize: "5px",
                    fontColor: "FFFFFA",
                    fontWeight: "100",
                  }}
                  reveal
                  data={[
                    { title: 'Panel Members', value: this.state.panelmembers, color: '#E38627'},
                    { title: 'Students', value: this.state.students, color: '#C13C37' },
                    { title: 'Supervisors', value: this.state.supervisors, color: '#6A2135' },
                  ]}
                />
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


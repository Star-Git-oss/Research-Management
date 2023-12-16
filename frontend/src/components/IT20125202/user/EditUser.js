// admin - update users
import React, { Component } from 'react'
import AdminNavBar from '../admin/AdminNavBar';
import axios from 'axios';
import swal from 'sweetalert';

export default class EditUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      idNumber: "",
      name: "",
      email: "",
      mobile: "",
      groupId: "",
      researchfield: "",
      panel: "",
      type: "",
      password: ""
    }
  }

  handleInputChange = (e) => {

    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id;

    const { idNumber, name, email, mobile, groupId, researchfield, panel, type, password } = this.state;

    const data = {
      idNumber: idNumber,
      name: name,
      email: email,
      mobile: mobile,
      groupId: groupId,
      researchfield: researchfield,
      panel: panel,
      type: type,
      password: password
    }

    // validations-------------------------------------------------------------
    let validated = true;
    if (data.idNumber === '') {
      validated = false;
      swal({
        title: "",
        text: "ID number cannot be empty",
        icon: "warning",
      });
    }
    else if (data.name === '' || data.name.length < 5) {
      validated = false;
      swal({
        title: "",
        text: "Name cannot be empty",
        icon: "warning",
      });
    }
    else if (!data.email.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      validated = false;
      swal({
        title: "",
        text: "Please enter a valid email",
        icon: "warning",
      });
    }
    else if (!data.mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
      validated = false;
      swal({
        title: "",
        text: "Please enter a valid mobile number",
        icon: "warning",
      });
    }

    // console.log(data)

    if (validated) {
      axios.put(`http://localhost:5000/user/update/${id}`, data).then((res) => {
        if (res.data.success) {
          swal("User details updated successfully!", "", "success")
            .then((value) => {
              if (value) {
                this.props.history.push(`/admin/users`)
                window.location.reload();
              }

            });
        }
      })
    }
  }

  componentDidMount() {

    document.title = "Edit user details"

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

    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/user/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          idNumber: res.data.user.idNumber,
          name: res.data.user.name,
          email: res.data.user.email,
          mobile: res.data.user.mobile,
          groupId: res.data.user.groupId,
          researchfield: res.data.user.researchfield,
          panel: res.data.user.panel,
          type: res.data.user.type,
          password: res.data.user.password
        })

        // console.log(this.state.user);
      }
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
              <h1>User Details</h1>
            </div>
            <hr /><br />
          </div>
          <div className='col-md-8 mt-4 mx-auto'>
            <form className='needs-validation' noValidate>
              <div className='form-group' style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>ID number</label>
                <input
                  type="text"
                  className='form-control'
                  name="idNumber"
                  placeholder=""
                  value={this.state.idNumber}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group' style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Name with Initials</label>
                <input
                  type="text"
                  className='form-control'
                  name="name"
                  placeholder=""
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group' style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Email</label>
                <input
                  type="email"
                  className='form-control'
                  name="email"
                  placeholder=""
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className='form-group' style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Mobile</label>
                <input
                  type="email"
                  className='form-control'
                  name="mobile"
                  placeholder=""
                  value={this.state.mobile}
                  onChange={this.handleInputChange}
                />
              </div>

              {this.state.type === 'Student' &&
                <span>
                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Group ID</label>
                    <input
                      type="text"
                      className='form-control'
                      name="groupId"
                      value={this.state.groupId}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </span>}

              {this.state.type === 'Supervisor' &&
                <span>
                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Research Field</label>
                    <input
                      type="text"
                      className='form-control'
                      name="researchfield"
                      value={this.state.researchfield}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </span>}

              {this.state.type === 'Panel Member' &&
                <span>
                  <div className='form-group' style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Panel</label>
                    <input
                      type="text"
                      className='form-control'
                      name="panel"
                      value={this.state.panel}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </span>}


              <div className='form-group' style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Type</label>
                <input
                  type="text"
                  className='form-control'
                  name="type"
                  value={this.state.type}
                  onChange={this.handleInputChange}
                  readOnly
                />
              </div>

              {/* <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}>Password</label>
              <input
                type="password"
                className='form-control'
                name="password"
                placeholder=""
                value={this.state.password}
                onChange={this.handleInputChange}
                readOnly
              />
            </div> */}

              <button className='btn btn-success' type="submit" style={{ maeginTop: '15px' }} onClick={this.onSubmit}>
                <i className='far fa-check-square'></i>
                &nbsp; Update
              </button>
              &nbsp;&nbsp;
              <a
                href="/admin/users"
                class="btn btn-outline-success"
                tabindex="-1"
                role="button"
                aria-disabled="true">
                Back
              </a>

            </form>
          </div>
        </div>
      </div>
    )
  }
}

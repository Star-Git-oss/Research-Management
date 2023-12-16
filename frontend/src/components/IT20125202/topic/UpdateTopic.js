//Staff update status and add comments
import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import jwt_decode from 'jwt-decode';

export default class UpdateTopic extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userType: "",
      groupId: "",
      topicR: "",
      description: "",
      status: "",
      comments: ""
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

    const { groupId, topicR, description, status, comments } = this.state;

    const data = {
      groupId: groupId,
      topicR: topicR,
      description: description,
      status: status,
      comments: comments
    }
    // console.log(data)


    // validations--------------------------------------------------------
    let validated = true;
    if (this.state.userType === 'Student') {
      if (this.state.status === 'Rejected') {
        validated = false;
        swal({
          title: "You cannot edit this",
          text: "Please create a new topic request",
          icon: "warning",
        });
      }
      else if (this.state.topicR === '' || this.state.description === '') {
        validated = false;
        swal({
          title: "",
          text: "Topic and Description cannot be empty",
          icon: "warning",
        });
      }
    }
    else {
      if ((this.state.status === 'Accepted' || this.state.status === 'Rejected') && this.state.comments === '') {
        validated = false;
        swal({
          title: "",
          text: "Please give your comments",
          icon: "warning",
        });
      }
    }

    // update validated data
    if (validated) {
      axios.put(`http://localhost:5000/topic/update/${id}`, data).then((res) => {
        if (res.data.success) {
          swal("Topic updated successfully!", "", "success")
            .then((value) => {
              if (value) {
                if (this.state.userType === 'Panel Member') {
                  this.props.history.push(`/panel/topic/list`);
                  window.location.reload();
                }
                else {
                  this.props.history.push(`/student/topics`);
                  window.location.reload();
                }
              }

            });
        }
      })
    }
  }

  componentDidMount() {

    document.title = "Update Topic"

    // redirect to the login page if the user is not logged in
    if (!localStorage.userToken) {
      swal("Please login first", "", "warning")
        .then((value) => {
          if (value) {
            this.props.history.push(`/user/login`)
            window.location.reload();
          }

        });

    }

    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);
    this.setState({
      userType: decoded.type,
    })

    const id = this.props.match.params.id;

    // get the selected topic details
    axios.get(`http://localhost:5000/topic/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          groupId: res.data.topic.groupId,
          topicR: res.data.topic.topicR,
          description: res.data.topic.description,
          status: res.data.topic.status,
          comments: res.data.topic.comments
        })
        // console.log(this.state.topic);
      }
    })
  }

  render() {

    return (
      <div className="container" style={{ padding: '50px 50px 50px 50px', background: 'white', minHeight: '100vh' }}>
        <div className='col-lg-9 mt-2 mb-2'>
          <h1>Update Topic</h1>
        </div>
        <hr /><br />
        <div className='col-md-8 mt-4 mx-auto'>
          <form className='needs-validation' noValidate>
            <div className='form-group' style={{ marginBottom: '15px' }}>
              <label style={{ marginBottom: '5px' }}><b>Group ID</b></label>
              <input
                type="text"
                className='form-control'
                name="groupId"
                value={this.state.groupId}
                onChange={this.handleInputChange}
                required
                readOnly
              />
            </div>

            {/* Display only if the user is a student  */}
            {this.state.userType === 'Student' &&
              <span>
                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}><b>Topic</b></label>
                  <input
                    type="text"
                    className='form-control'
                    name="topicR"
                    value={this.state.topicR}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}><b>Description</b></label>
                  <textarea
                    type="text"
                    className='form-control'
                    name="description"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}><b>Status</b></label>
                  <textarea
                    type="text"
                    className='form-control'
                    name="status"
                    value={this.state.status}
                    onChange={this.handleInputChange}
                    readOnly
                  />
                </div>

                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}><b>Comments</b></label>
                  <input
                    type="text"
                    className='form-control'
                    name="comments"
                    placeholder=""
                    value={this.state.comments}
                    onChange={this.handleInputChange}
                    readOnly
                  />
                </div>
              </span>}

            {/* Display only if the user is a panel member */}
            {this.state.userType === 'Panel Member' &&
              <span>
                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}><b>Topic</b></label>
                  <input
                    type="text"
                    className='form-control'
                    name="topicR"
                    placeholder="Enter research topic"
                    value={this.state.topicR}
                    onChange={this.handleInputChange}
                    readOnly
                  />
                </div>

                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}><b>Description</b></label>
                  <textarea
                    type="text"
                    className='form-control'
                    name="description"
                    placeholder="Enter a description about the topic"
                    value={this.state.description}
                    onChange={this.handleInputChange}
                    readOnly
                  />
                </div>

                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}><b>Status</b></label>
                  <select name="status" value={this.state.status} onChange={this.handleInputChange} className="form-select">
                    <option value="Pending" >Pending</option>
                    <option value="Accepted" >Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className='form-group' style={{ marginBottom: '15px' }}>
                  <label style={{ marginBottom: '5px' }}><b>Comments</b></label>
                  <input
                    type="text"
                    className='form-control'
                    name="comments"
                    placeholder=""
                    value={this.state.comments}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </span>}

            <button className='btn btn-success' type="submit" style={{ maeginTop: '15px' }} onClick={this.onSubmit}>
              <b><i className='far fa-check-square'></i>
                &nbsp; Update</b>
            </button>

            &nbsp;&nbsp;

            {/* Back button for students */}
            {this.state.userType === 'Student' &&
              <span>
                <a
                  href="/student/topics"
                  class="btn btn-outline-success"
                  tabindex="-1"
                  role="button"
                  aria-disabled="true">
                  <b>Back</b>
                </a>
              </span>}

            {/* Back button for panel members */}
            {this.state.userType === 'Panel Member' &&
              <span>
                <a
                  href="/panel/topic/list"
                  class="btn btn-outline-success"
                  tabindex="-1"
                  role="button"
                  aria-disabled="true">
                  <b>Back</b>
                </a>
              </span>}

          </form>

        </div>
      </div>
    )
  }
}


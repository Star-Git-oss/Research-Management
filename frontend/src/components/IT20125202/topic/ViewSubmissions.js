//student - view submitted topics
import React, { Component } from 'react'
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import swal from 'sweetalert';

export default class ViewSubmissions extends Component {
  constructor() {
    super();
    this.state = {
      groupId: '',
      topics: []
    }
  }

  componentDidMount() {
    document.title = "Topic Submissions"

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

    const id = decoded.groupId
    this.setState({
      groupId: id,
    })

    this.retrieveTopics(id);
  }

  retrieveTopics(id) {
    axios.get(`http://localhost:5000/topic/submissions/${id}`).then(res => {

      if (res.data.success) {

        this.setState({
          topics: res.data.existingTopics
        });

        // console.log(this.state.topics);
      }
    });
  }

  onDelete = (id, grpID, status) => {
    // with a confirmation 

    // allow a group member(student) to delete their topic only if the status is pending
    if (status === 'Pending') {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover the details",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`http://localhost:5000/topic/delete/${id}`).then((res) => {
              swal("Topic details deleted permanently!", "", "success")
                .then((value) => {
                  if (value) {
                    this.retrieveTopics(grpID);
                  }

                });
            })

          } else {
            swal("Cancelled. Topic details are safe!");
          }
        });
    }
    else {
      swal({
        title: "",
        text: "You cannot delete this anymore",
        icon: "warning",
      });
    }

  }

  render() {
    return (
      <div className="container" style={{ padding: '50px 50px 50px 50px', background: 'white', minHeight: '100vh' }}>
        <div className='row'>
          <div className='col-lg-9 mt-2 mb-2'>
            <h1>Topics</h1>
          </div>
          <hr />
          <h5 style={{ textAlign: 'right', color: '#4682B4' }}><b>Group ID: {this.state.groupId}</b></h5>

        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope='col'> # </th>
              {/* <th scope='col'> Group ID </th> */}
              <th scope='col'> Topic </th>
              <th scope='col'> Description </th>
              <th scope='col'> Status </th>
              <th scope='col'> Comments </th>
              <th scope='col'></th>
            </tr>
          </thead>

          <tbody>
            {this.state.topics.map((topics, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                {/* <td>{topics.groupId}</td> */}
                <td>{topics.topicR}</td>
                <td>{topics.description}</td>
                <td>{topics.status}</td>
                <td>{topics.comments}</td>
                <td>
                  <a className='btn btn-outline-success' href={`/panel/topic/update/${topics._id}`}>
                    <i className='fas fa-edit'></i> &nbsp;Update
                  </a>
                  &nbsp;
                  <a className='btn btn-outline-danger' href="#" onClick={() => this.onDelete(topics._id, topics.groupId, topics.status)}>
                    <i className='fas fa-trash'></i> &nbsp;Delete
                  </a>
                </td>
              </tr>

            ))}
          </tbody>
        </table>

        <br />
        <a className='btn btn-outline-success' href='/student/topic/registration'>
          <i className='fas fa-edit'></i> &nbsp; New Topic
        </a>
      </div>
    )
  }
}

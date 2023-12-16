// view the topic list - admin  
import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../admin/AdminNavBar';
import swal from 'sweetalert';


export default class ViewListAdmin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      topics: []
    };
  }

  componentDidMount() {
    document.title = "Research Topic Requests"

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
    
    this.retrieveTopics();
  }

  //method for get request
  retrieveTopics() {
    axios.get('http://localhost:5000/topics').then(res => {
      if (res.data.success) {
        this.setState({
          topics: res.data.existingTopics
        });

        // console.log(this.state.topics);
      }
    });
  }

  onDelete = (id) => {
    //with a confirmation 
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this topic request",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:5000/topic/delete/${id}`).then((res) => {
            swal("Deleted Permanently!", "", "success")
              .then((value) => {
                if (value) {
                  this.retrieveTopics();
                }

              });
          })

        } else {
          swal("Cancelled.");
        }
      });
  }

  handleSearchArea = (e) => {
    // console.log(e.currentTarget.value)

    const searchKey = e.currentTarget.value;

    axios.get('http://localhost:5000/topics').then(res => {
      if (res.data.success) {

        this.filterData(res.data.existingTopics, searchKey);
      }
    });

  }

  filterData(topics, searchKey) {
    const searchResult = topics.filter((topic) =>
      topic.groupId.toLowerCase().includes(searchKey) ||
      topic.topicR.toLowerCase().includes(searchKey) ||
      topic.status.toLowerCase().includes(searchKey) ||

      topic.groupId.toUpperCase().includes(searchKey) ||
      topic.topicR.toUpperCase().includes(searchKey) ||
      topic.status.toUpperCase().includes(searchKey) ||

      topic.groupId.includes(searchKey) ||
      topic.topicR.includes(searchKey) ||
      topic.status.includes(searchKey)
    )

    this.setState({
      topics: searchResult
    })
  }

  render() {
    return (
      <div className='container'>
        <br/>
        <AdminNavBar />
        <br />

        <div className="container">
          <div className='row'>
            <div className='col-lg-9 mt-2 mb-2'>
              <h1>Topics</h1>
            </div>
            <div className='col-lg-3 mt-2 mb-2'>
              <input
                className='form-control'
                type="search"
                placeholder="Search"
                name="searchQuery"
                onChange={this.handleSearchArea}>
              </input>
            </div>
            <hr/><br/>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope='col'> # </th>
                <th scope='col'> Group ID </th>
                <th scope='col'> Topic </th>
                <th scope='col'> Description </th>
                <th scope='col'> Status </th>
                <th scope='col'> Comments </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.topics.map((topics, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>
                    {/* <a href={`/admin/topic/${topics._id}`} style={{ textDecoration: 'none' }}>
                      {topics.groupId}
                    </a> */}
                    {topics.groupId}
                  </td>
                  <td>{topics.topicR}</td>
                  <td>{topics.description}</td>
                  <td>{topics.status}</td>
                  <td>{topics.comments}</td>
                  <td>
                    {/* <a className='btn btn-outline-success' href={`/topic/update/${topics._id}`}>
                      <i className='fas fa-edit'></i> &nbsp;Update
                    </a> */}
                    {/* &nbsp; */}
                    <a className='btn btn-outline-danger' href="#" onClick={() => this.onDelete(topics._id)}>
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



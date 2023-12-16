import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class ViewTopic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: {}
    };
  }

  componentDidMount() {
    document.title = "Topic Registration Details"

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
    
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/topic/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          topic: res.data.topic
        })
        // console.log(this.state.topic);
      }
    })
  }

  render() {

    const { groupId, topicR, description, status, comments } = this.state.topic;
    return (
      <div className="container" style={{padding: '50px 50px 50px 50px', background: 'white', minHeight: '100vh'}}>
        <div className='col-lg-9 mt-2 mb-2'>
          <h1>Topic Request Details</h1>
        </div>
        <hr /><br />

        <div>
          <dl className='row'>
            <dt className='col-sm-3'>Group ID</dt>
            <dd className='col-sm-9'>{groupId}</dd>

            <dt className='col-sm-3'>Topic</dt>
            <dd className='col-sm-9'>{topicR}</dd>

            <dt className='col-sm-3'>Description</dt>
            <dd className='col-sm-9'>{description}</dd>

            <dt className='col-sm-3'>Status</dt>
            <dd className='col-sm-9'>{status}</dd>

            <dt className='col-sm-3'>Comments</dt>
            <dd className='col-sm-9'>{comments}</dd>
          </dl>

          <a
            href="/panel/topic/list"
            class="btn btn-outline-dark"
            tabindex="-1"
            role="button"
            aria-disabled="true">
            Back
          </a>
        </div>
      </div>
    )
  }
}

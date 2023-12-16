import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";
import swal from "sweetalert";

export default class AddNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeTitle: "",
      noticeMessage: "",
      to: "",
    };
  }

  componentDidMount() {
    document.title = "Add Notice";
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { noticeTitle, noticeMessage, to } = this.state;

    const data = {
        noticeTitle: noticeTitle,
        noticeMessage: noticeMessage,
        to: to,
    };

    axios.post("http://localhost:5000/notice/add", data).then((res) => {
      if (res.data.success) {
        swal("Notice Added Successfully")
        .then((value) => {
            window.location = '/view/notice';
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <br />
        <AdminNavBar />
        <br />
        <h4>Add Notice</h4>
        <hr />
        
        <div className="container">
        <div className="container bg-light text-dark p-5" style={{ "max-width": "500px", "border": "2px solid #000000"}}>
          <center>
              <h4>Add Notice</h4>
          </center>
          <br />
          <form onSubmit={this.onSubmit} encType="multipart/form-data">

          <div className="mb-3">
              <label className="form-label">Notice Title</label>
              <input
                type="text"
                className="form-control"
                id="noticeTitle"
                name="noticeTitle"
                value={this.state.noticeTitle}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Notice Message</label>
              <input
                type="text"
                className="form-control"
                id="noticeMessage"
                name="noticeMessage"
                value={this.state.noticeMessage}
                onChange={this.handleInputChange}
              />
            </div>

            <label className="form-label">To</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="to"
              value={this.state.to}
              onChange={this.handleInputChange}
            >
              <option defaultValue>Select</option>
              <option value="Student">Student</option>
              <option value="Superviosr and Panel Member">Superviosr and Panel Member</option>
              <option value="Both">Both</option>
            </select>
            <br/>
            
            <center>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </center>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

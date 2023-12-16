import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";
export default class CreateResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupid:"",
      name: "",
      position: "",
      feedback: "",
      status: "",
    };
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

    const { groupid ,name, position, feedback, status } = this.state;

    const data = {
      groupid:groupid,
      name: name,
      position: position,
      feedback: feedback,
      status: status,
    };

    console.log(data);

    axios.post("http://localhost:5000/request/save", data).then((res) => {
      if (res.data.success) {
        swal("Response Successful", "", "success");
          this.setState({
            groupid:"",
            name: "",
            position: "",
            feedback: "",
            status: "",
          });
      }
    });
  };

  render() {
    return (
      <div className="container px-5 my-3">        
        <div className="container border border-dark bg-light mt-5 col-lg-10">
          <div className="form-group row">
            <div className="col-lg-12 margin-tb">
              <div className="float-left">
                &nbsp;
                <h2>Provide Response for students</h2>
                &nbsp;
              </div>
            </div>
          </div>

          <form onSubmit={this.onSubmit}>

          <div className="col-md-12">
                <div className="form-group">
                  <strong>Group ID :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter group id"
                    name="groupid"
                    pattern="G[0-9]{3}"
                    title="Group ID is Invalid"
                    value={this.state.groupid}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              &nbsp;
            
              <div className="col-md-12">
                <div className="form-group">
                  <strong>Name :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              &nbsp;
              <div className="col-md-12">
                <div className="form-group">
                  <strong>Position :</strong>
                  <select
                    className="form-control"
                    name="position"
                    value={this.state.position}
                    onChange={this.handleChange}
                  >
                    <option value="Not">Not Selected</option>
                    <option value="Supervisor">Supervisor </option>
                    <option value="Co Supervisor">Co Supervisor </option>
                  </select>
                </div>
              </div>
          
            &nbsp;
       
              <div className="col-md-12">
                <div className="form-group">
                  <strong>Feedback (word count-100) :</strong>
                  <textarea
                    type="text"
                    className="form-control"
                    rows="3"
                    maxLength="100"
                    name="feedback"
                    placeholder="Feedback "
                    value={this.state.feedback}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              &nbsp;
              <div className="col-md-12">
                <div className="form-group">
                  <strong>Status :</strong>
                  <select                  
                    className="form-control"
                    name="status"
                    value={this.state.status}
                    onChange={this.handleChange}
                  >
                    <option value="Not">Not Selected</option>
                    <option value="Accept">Accept </option>
                    <option value="Decline">Decline </option>
                  </select>
                </div>
              </div>
         
            &nbsp;
            <div className="col-md-12">
              <div className="form-group">
                <button className="btn btn-outline-primary" type="submit">
                  &nbsp;<i className="fa fa-paper-plane" > Send </i>
                </button>
              </div>
            </div>
            &nbsp;
          </form>
        </div>
      </div>
    );
  }
}

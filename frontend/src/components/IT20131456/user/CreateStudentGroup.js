import React, { Component } from "react";
import axios from "axios";



export default class CreateStudentGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType:"",
      groupid: "",
      groupname: "",
      studentid1: "",
      studentname1: "",
      studentid2: "",
      studentname2: "",
      studentid3: "",
      studentname3: "",
      studentid4: "",
      studentname4: "",
      topic: "Not Updated",
      supervisorname: "Not Updated",
      cosupervisorname: "Not Updated",
      panelmembername: "Not Updated",
      status: "Not Reviewed",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      groupid,
      groupname,
      studentid1,
      studentname1,
      studentid2,
      studentname2,
      studentid3,
      studentname3,
      studentid4,
      studentname4,
      supervisorname,
      cosupervisorname,
      panelmembername,
      status,
    } = this.state;

    const data = {
      groupid: groupid,
      groupname: groupname,
      studentid1: studentid1,
      studentname1: studentname1,
      studentid2: studentid2,
      studentname2: studentname2,
      studentid3: studentid3,
      studentname3: studentname3,
      studentid4: studentid4,
      studentname4: studentname4,
      supervisorname: supervisorname,
      cosupervisorname: cosupervisorname,
      panelmembername: panelmembername,
      status: status,
    };

    console.log(data);

        axios.post("http://localhost:5000/sgroup/save", data).then((res) => {
      if (res.data.success) {
        swal("Group Registerd Successfully", "", "success")
        .then((value)=>{
          window.location = "/home"
        });

          this.setState({
            groupid: "",
            groupname: "",
            studentid1: "",
            studentname1: "",
            studentid2: "",
            studentname2: "",
            studentid3: "",
            studentname3: "",
            studentid4: "",
            studentname4: "",
            supervisorname: "Not Updated",
            cosupervisorname: "Not Updated",
            panelmembername: "Not Updated",
            status: "Not Reviewed",
          });
      }
    });
  };

  render() {    
    return (
      <div className="container px-5 my-5">
        <div className="container border border-dark bg-light mt-5 ">
          <div className="form-group row">
            <div className="col-lg-12 margin-tb">
              <div className="float-left">
                &nbsp;
                <h2>Create Student Group</h2>
                &nbsp;
              </div>
            </div>
          </div>

          <form onSubmit={this.onSubmit}>
            <div className="row ">
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Group ID :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Group id -Gxxx"
                    name="groupid"
                    pattern="G[0-9]{3}"
                    title="Group ID is Invalid"
                    value={this.state.groupid}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Group Name :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Group name"
                    name="groupname"
                    value={this.state.groupname}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            &nbsp;
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Student_1 ID (group leader) :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter id -ITxxxx"
                    name="studentid1"
                    pattern="IT[0-9]{4}"
                    title="Student ID is Invalid"
                    value={this.state.studentid1}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Student_1 Name (group leader) :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="studentname1"
                    value={this.state.studentname1}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            &nbsp;
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Student_2 ID :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter id"
                    name="studentid2"
                    pattern="IT[0-9]{4}"
                    title="Student ID is Invalid"
                    value={this.state.studentid2}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Student_2 Name :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="studentname2"
                    value={this.state.studentname2}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            &nbsp;
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Student_3 ID :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter id"
                    name="studentid3"
                    pattern="IT[0-9]{4}"
                    title="Student ID is Invalid"
                    value={this.state.studentid3}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Student_3 Name :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="studentname3"
                    value={this.state.studentname3}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            &nbsp;
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Student_4 ID :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter id"
                    name="studentid4"
                    pattern="IT[0-9]{4}"
                    title="Student ID is Invalid"
                    value={this.state.studentid4}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <strong>Student_4 Name :</strong>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="studentname4"
                    value={this.state.studentname4}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            &nbsp;
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control"
                    name="supervisorname"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control"
                    name="cosupervisorname"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
            &nbsp;
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control"
                    name="panelmembername"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="hidden"
                    className="form-control"
                    name="status"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <button className="btn btn-outline-primary" type="submit">
                  <i className="fa fa-save"> Save </i>
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

import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";

export default class EditStudentGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      topic: "",
      supervisorname: "",
      cosupervisorname: "",
      panelmembername: "",
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
    const id = this.props.match.params.id;

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
      topic,
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
      topic: topic,
      supervisorname: supervisorname,
      cosupervisorname: cosupervisorname,
      panelmembername: panelmembername,
      status: status,
    };

    console.log(data);

    axios.put(`http://localhost:5000/sgroup/update/${id}`, data).then((res) => {
      if (res.data.success) {
        swal("Details Updated Successfully", "", "success");
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
          topic: "",
          supervisorname: "",
          cosupervisorname: "",
          panelmembername: "",
          status: "",
        });
      }
    });
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/sgroup/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          groupid: res.data.stugroup.groupid,
          groupname: res.data.stugroup.groupname,
          studentid1: res.data.stugroup.studentid1,
          studentname1: res.data.stugroup.studentname1,
          studentid2: res.data.stugroup.studentid2,
          studentname2: res.data.stugroup.studentname2,
          studentid3: res.data.stugroup.studentid3,
          studentname3: res.data.stugroup.studentname3,
          studentid4: res.data.stugroup.studentid4,
          studentname4: res.data.stugroup.studentname4,
          topic: res.data.stugroup.topic,
          supervisorname: res.data.stugroup.supervisorname,
          cosupervisorname: res.data.stugroup.cosupervisorname,
          panelmembername: res.data.stugroup.panelmembername,
          status: res.data.stugroup.status,
        });

        console.log(this.state.stugroup);
      }
    });
  }
  render() {
    return (
      <div className="container px-5 my-3">
        <br />
        <AdminNavBar />
        <br />
        
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              class="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Edit Student Group Details
            </button>
            <button
              class="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Edit Evaluator Details
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <div className="container border border-dark bg-light mt-5 ">
              <div className="form-group row">
                <div className="col-lg-12 margin-tb">
                <div className="float-left">
                    &nbsp;
                    <h2>Edit Student Group Details</h2>
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
                        readOnly
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
                        readOnly
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
                <div className="col-md-12">
                  <div className="form-group">
                    <a
                      className="btn btn-outline-primary"
                      type="submit"
                      href={`/student/groups/view`}
                    >
                      <i className="fa fa-arrow-circle-left"> Back </i>
                    </a>
                    &nbsp;
                    <button className="btn btn-outline-success" type="submit">
                      <i class="fa fa-check-circle"> Update </i>
                    </button>
                  </div>
                </div>
                &nbsp;
              </form>
            </div>
          </div>
          <div
            class="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            <div className="container border border-dark bg-light mt-5 ">
              <div className="form-group row">
                <div className="col-lg-12 margin-tb">
                  <div className="float-left">
                    &nbsp;
                    <h2> Edit Evaluator Details</h2>
                    &nbsp;
                  </div>
                </div>
              </div>

              <form onSubmit={this.onSubmit}>
                <div className="row ">
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Supervisor Name :</strong>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Supervisor name"
                        name="supervisorname"
                        value={this.state.supervisorname}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Co Supervisor Name :</strong>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Cosupervisor name"
                        name="cosupervisorname"
                        value={this.state.cosupervisorname}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                &nbsp;
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Panel Member Name :</strong>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter panel member name"
                        name="panelmembername"
                        value={this.state.panelmembername}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <strong>Status:</strong>
                      <select
                        className="form-control"
                        name="status"
                        value={this.state.status}
                        onChange={this.handleChange}
                      >
                        <option value="Not">Not Selected</option>
                        <option value="Reviewed">Reviewed </option>
                        <option value="Not Reviewed">Not Reviewed </option>
                      </select>
                    </div>
                  </div>
                </div>
                &nbsp;
                <div className="col-md-12">
                  <div className="form-group">
                    <a
                      className="btn btn-outline-primary"
                      type="submit"
                      href={`/student/groups/view`}
                    >
                      <i className="fa fa-arrow-circle-left"> Back </i>
                    </a>
                    &nbsp;
                    <button className="btn btn-outline-success" type="submit">
                      <i class="fa fa-check-circle"> Update </i>
                    </button>
                  </div>
                </div>
                &nbsp;
              </form>
            </div>
            <br />
            <br /> <br />
            <br /> <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

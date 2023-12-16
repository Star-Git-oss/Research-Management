import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

export default class AddMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: "",
      type: "",
      smarks: "",
      pmarks: "",
      marks: "",
      gradingStatus: "",
      status: "Marked",
      markedby: "",
    };
  }

  componentDidMount() {
    document.title = "Add Marks";

    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        markedby: decoded.name,
      });
    }

    setTimeout(() => {
      this.retriveSubmitions();
    }, 1000);
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
    const id = this.props.match.params.id;
    const {
      groupId,
      type,
      smarks,
      pmarks,
      marks,
      gradingStatus,
      status,
      markedby,
    } = this.state;

    //calculate marks
    console.log(marks); //20
    console.log(smarks); //2
    console.log(pmarks); //6
    let ssm = parseInt(smarks);
    let ppm = parseInt(pmarks);
    let ssmp = (marks * ssm) / 100;
    let ppmp = (marks * ppm) / 100;
    let rmarks = ssmp + ppmp; //26
    console.log(rmarks);

    let totmarks = marks - rmarks;
    console.log(totmarks);
    let orgmarks = totmarks.toFixed(2);

    if (orgmarks < 0) {
      orgmarks = 0;
    }

    const data = {
      groupId: groupId,
      type: type,
      marks: orgmarks,
      gradingStatus: gradingStatus,
      markedby: markedby,
    };
    console.log(data);
    //save marks
    axios.post(`http://localhost:5000/mark/save`, data).then((res) => {
      if (res.data.success) {
        swal("Marks Added Successfully !", "", "success").then((value) => {
          window.location = "/submitions/view";
        });

        this.setState({
          groupId: "",
          type: "",
          marks: "",
          gradingStatus: "",
          markedby: "",
        });
      }
    });

    const statusdata = {
      status: status,
    };

    //update status
    const ids = this.props.match.params.id;
    axios
      .put(`http://localhost:5000/submition/update/${ids}`, statusdata)
      .then((res) => {
        if (res.data.success) {
          console.log("Updated Successfully");
        }
      });
  };

  retriveSubmitions() {
    // if(this.props.match && this.props.match.params.id){
    const id = this.props.match.params.id;

    //retrive submition data
    axios.get(`http://localhost:5000/submition/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          groupId: res.data.submition.groupId,
          type: res.data.submition.type,
        });
        console.log(this.state);
      }
    });

    // }
  }

  render() {
    return (
      <div className="container">
        <div className="ms-4 me-4 mt-2 mb-2">
          <div className="row">
            <div className="col-sm-8">
              <div className="col-md-12 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Add Marks</h1>
                <form className="needs-validation" onSubmit={this.onSubmit}>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <strong>Group ID</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="groupId"
                      placeholder="Enter Group Id"
                      value={this.state.groupId}
                      onChange={this.handleInputChange}
                      disabled
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <strong>Type</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="submitionType"
                      placeholder="Enter Submition Type"
                      value={this.state.type}
                      onChange={this.handleInputChange}
                      disabled
                    />
                  </div>

                  <div className="row">
                    <div className="col-sm-4">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          <strong>Submission On Time (?/100)</strong>
                        </label>

                        <select
                          className="form-select"
                          name="smarks"
                          value={this.state.smarks}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option smarks="Select Minus Marks" selected>
                            Select Minus Percentage
                          </option>
                          <option smarks="0">0</option>
                          <option smarks="10">10</option>
                          <option smarks="20">20</option>
                          <option smarks="30">30</option>
                          <option smarks="50">50</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-4">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          <strong>Checking Plagiarism (?/100)</strong>
                        </label>

                        <select
                          className="form-select"
                          name="pmarks"
                          value={this.state.pmarks}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option pmarks="Select Minus Marks" selected>
                            Select Minus Percentage
                          </option>
                          <option pmarks="0">0</option>
                          <option pmarks="10">10</option>
                          <option pmarks="20">20</option>
                          <option pmarks="30">30</option>
                          <option pmarks="100">100</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          <strong>Marks (?/100)</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="marks"
                          placeholder="Enter Marks  ?/100"
                          value={this.state.marks}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-8">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          <strong>Grading Status</strong>
                        </label>

                        <select
                          className="form-select"
                          name="gradingStatus"
                          value={this.state.gradingStatus}
                          onChange={this.handleInputChange}
                          required
                        >
                          <option gradingStatus="not selected yet" selected>
                            Select Status
                          </option>
                          <option gradingStatus="Panel 01">Bad</option>
                          <option gradingStatus="Panel 02">Normal</option>
                          <option gradingStatus="Panel 03">Nice Work</option>
                          <option gradingStatus="Panel 04">Good</option>
                          <option gradingStatus="Panel 05">excellent</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-4">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          <strong>Marked By</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="markedby"
                          placeholder="Marked By"
                          value={this.state.markedby}
                          onChange={this.handleInputChange}
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    style={{ margintop: "15px" }}
                  >
                    <i className="far fa-check-square"></i>
                    &nbsp; Add Marks
                  </button>
                </form>
              </div>
            </div>
            <div className="col-sm-4">
              <div class="card mt-5 mb-5">
                <h5 class="card-header">Guide To Add Marks</h5>
                <div class="card-body">
                  <h5 class="card-title">About Minus Marks</h5>
                  <p class="card-text">
                    <strong>Submission On Time</strong> <br></br> 1 Day Late
                    &nbsp; &nbsp; -- 10% <br></br> 2 Days Late &nbsp; -- 20%
                    <br></br> 3 Days Late &nbsp; -- 30% <br></br> More Than 3 --
                    50%
                  </p>

                  <p class="card-text">
                    <strong>Checking Plagiarism</strong> <br></br>
                    More than 20% Plagiarism -- 10% <br></br>
                    More than 30% Plagiarism -- 20%
                    <br></br>
                    More than 40% Plagiarism -- 30% <br></br>
                    More than 50% Plagiarism -- 100%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

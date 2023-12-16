import React, { Component } from "react";
import axios from "axios";
import SviewEvaluation from "./SviewEvaluation";
import jwt_decode from "jwt-decode";

export default class SviewSubmitionType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitiontypes: [],
      groupId: "",
    };
  }

  componentDidMount() {
    document.title = "Sub Type";

    if (!localStorage.userToken) {
      swal("Please login first", "", "warning").then((value) => {
        if (value) {
          this.props.history.push(`/user/login`);
          window.location.reload();
        }
      });
    }

    //get group id using the user token
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    const id = decoded.groupId;
    this.setState({
      groupId: id,
    });

    setTimeout(() => {
      this.retrivesubmitionTypes();
    }, 1000);

    // if (localStorage.userToken) {
    //   const usertoken = localStorage.userToken;
    //   const decoded = jwt_decode(usertoken);
    //   this.setState({
    //     groupId: decoded.groupId,
    //   });
    // }

    //     setTimeout(()=>{
    //       this.retrivesubmitionTypes();

    //     },1000);
  }
  //retrive submitiontypes
  retrivesubmitionTypes() {
    axios.get("http://localhost:5000/submitiontypes").then((res) => {
      if (res.data.success) {
        this.setState({
          submitiontypes: res.data.existingsubmitonTypes,
        });

        console.log(this.state.submitiontypes);
      }
    });
  }
  //delete submitiontype
  onDelete = (id) => {
    axios
      .delete(`http://localhost:5000/submitiontype/delete/${id}`)
      .then((res) => {
        alert("Deleted Successfully");
        this.retrivesubmitionTypes();
      });
  };
  //filter submitiontype
  filterData(submitiontypes, searchKey) {
    const result = submitiontypes.filter(
      (submitiontype) =>
        submitiontype.submitionType.toLowerCase().includes(searchKey) ||
        submitiontype.deadLine.toLowerCase().includes(searchKey) ||
        submitiontype.Status.toLowerCase().includes(searchKey) ||
        submitiontype.submitionType.includes(searchKey) ||
        submitiontype.deadLine.includes(searchKey) ||
        submitiontype.Status.includes(searchKey)
    );

    this.setState({ submitiontypes: result });
  }
  //search submitiontype
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/submitiontypes").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingsubmitonTypes, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">
            <div className="ms-4">
              <div className="mt-4">
                <div className="row">
                  <div className="col-lg-7 mt-2 mb-2">
                    <h4>
                    Submissions List -{" "}
                      <a
                        href="/student/group/evaluation/view"
                        style={{ textDecoration: "none" }}
                      >
                        {this.state.groupId}
                      </a>
                    </h4>
                  </div>
                  <div className="col-lg-5 mt-2 mb-2">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search"
                      name="searchQuery"
                      onChange={this.handleSearchArea}
                    ></input>
                  </div>
                </div>

                {this.state.submitiontypes.map((submitiontypes, index) => (
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="card border-secondary mt-2 mb-4">
                        <div class="card-body">
                          <div class="card-header">
                            <h5 class="card-title">
                              {" "}
                              {submitiontypes.submitionType} Submission{" "}
                            </h5>
                          </div>

                          <p class="card-text"></p>
                          <p>
                            <strong>Description</strong>
                          </p>
                          <p> {submitiontypes.description}</p>
                          <p>
                            <strong>Guideline</strong>
                          </p>
                          <p>{submitiontypes.guidelines}</p>

                          <p>
                            {" "}
                            <strong>Allocated Marks</strong>
                          </p>
                          <p>{submitiontypes.almarks}%</p>

                          <p>
                            <strong>Deadline</strong>
                          </p>
                          <p>
                            {submitiontypes.deadLine} &nbsp;&nbsp;&nbsp;&nbsp; -
                            {submitiontypes.Status}-
                          </p>

                          <div className="row">
                            <div className="col-lg-4"></div>

                            <div className="col-lg-4">
                              <a
                                href="/student/submitionsp/view"
                                class="btn btn-light btn-outline-dark"
                              >
                                <i class="fa fa-plus-circle" aria-hidden="true">
                                  <strong>&nbsp;Submit Here</strong>
                                </i>
                              </a>
                            </div>

                            <div className="col-lg-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <SviewEvaluation></SviewEvaluation>
          </div>
        </div>
      </div>
    );
  }
}

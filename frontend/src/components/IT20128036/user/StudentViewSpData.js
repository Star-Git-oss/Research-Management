import React, { Component } from "react";
import axios from "axios";
import { StudentMarksSp } from "./StudentMarksSp";
import jwt_decode from "jwt-decode";

export default class StudentViewSpData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      evaluations: [],
    };
  }

  componentDidMount() {
    document.title = "Group Data";

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
      this.retriveEvaluations();
    }, 1000);

    // if (localStorage.userToken) {
    //   const usertoken = localStorage.userToken;
    //   const decoded = jwt_decode(usertoken);
    //   this.setState({
    //     groupId: decoded.groupId,
    //   });
    // }

    // setTimeout(()=>{
    //       this.retriveEvaluations();

    // },1000);
  }

  //retrive evaluations
  retriveEvaluations() {
    const gid = this.state.groupId;
    console.log(gid);
    axios.get(`http://localhost:5000/evaluation/group/${gid}`).then((res) => {
      if (res.data.success) {
        this.setState({
          evaluations: res.data.existingEvaluations,
        });

        console.log(this.state.evaluations);
      }
    });
  }

  //filter evaluation
  filterData(evaluations, searchKey) {
    const result = evaluations.filter(
      (evaluation) =>
        evaluation.groupId.toLowerCase().includes(searchKey) ||
        evaluation.evaluationTopic.toLowerCase().includes(searchKey) ||
        evaluation.date.toLowerCase().includes(searchKey) ||
        evaluation.groupId.includes(searchKey) ||
        evaluation.evaluationTopic.includes(searchKey) ||
        evaluation.date.includes(searchKey)
    );

    this.setState({ evaluations: result });
  }
  //search evaluation
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    id = this.state.groupId;
    axios.get(`http://localhost:5000/evaluation/group/${id}`).then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingEvaluations, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <center>
            <h5 className="mt-4 ">
              Group ID :{" "}
              <span className="text-primary" style={{ fontSize: "19px" }}>
                {this.state.groupId}
              </span>
            </h5>
          </center>

          <div className="col-sm-4">
            <div className="mt-2  mb-2 ms-2">
              <div className="row">
                <div className="col-lg-10 mt-2 mb-2">
                  <h4>Your Evaluation Session</h4>
                </div>
                <div className="col-lg-2 mt-2 mb-2">
                  {/* <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input> */}
                </div>
              </div>

              {this.state.evaluations.map((evaluations, index) => (
                <div class="row">
                  <div class="col-sm-12">
                    <div class="card border-primary mt-2 mb-2">
                      <div class="card-body">
                        <div class="card-header">
                          <h5 class="card-title"> Session {index + 1} </h5>
                        </div>

                        <p class="card-text">
                          <strong>{evaluations.groupId} </strong>Students, your{" "}
                          {evaluations.evaluationTopic} session will be held on{" "}
                          <strong>{evaluations.date}</strong> from{" "}
                          <strong>{evaluations.from}</strong> to{" "}
                          <strong>{evaluations.to}</strong> with the{" "}
                          {evaluations.panel}. Your participation is mandatory.
                          You can connect via the link below.{" "}
                        </p>

                        <div className="row">
                          <div className="col-lg-4">
                            <a
                              href={evaluations.link}
                              target="_blank"
                              class="btn btn-outline-primary"
                            >
                              <i class="fa fa-link" aria-hidden="true"></i>Join
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-sm-8">
            <StudentMarksSp></StudentMarksSp>
          </div>
        </div>
      </div>
    );
  }
}

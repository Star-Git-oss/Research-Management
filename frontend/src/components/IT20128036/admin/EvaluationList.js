import React, { Component } from "react";
import axios from "axios";
import AddEvaluation from "./AddEvaluation";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

export default class EvaluationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluations: [],
      panel: "",
    };
  }

  componentDidMount() {
    document.title = "Eval List";

    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        panel: decoded.panel,
      });
    }

    setTimeout(() => {
      this.retriveEvaluations();
    }, 1000);
  }
  //retrive evaluations
  retriveEvaluations() {
    const pnel = this.state.panel;
    axios.get(`http://localhost:5000/evaluation/panel/${pnel}`).then((res) => {
      if (res.data.success) {
        this.setState({
          evaluations: res.data.existingEvaluations,
        });

        console.log(this.state.evaluations);
      }
    });
  }
  //delete evaluation
  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/evaluation/delete/${id}`)
          .then((res) => {
            this.retriveEvaluations();
          });

        swal("Evaluation Session  has been deleted!", "", "success");
      } else {
        swal("Your file is safe!");
      }
    });
  };
  //search filter
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

    const pnel = this.state.panel;
    axios.get(`http://localhost:5000/evaluation/panel/${pnel}`).then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingEvaluations, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="me-4 mt-4 mb-2">
        <div className="row">
          <div className="col-sm-6 mt-2 mb-2">
            <h4>All Evaluations</h4>
          </div>
          <div className="col-sm-6 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </div>
        </div>

        {this.state.evaluations.map((evaluations, index) => (
          <div class="row">
            <div class="col-sm-12">
              <div class="card mt-2 mb-2">
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
                    {evaluations.panel}. Your participation is mandatory. You
                    can connect via the link below.{" "}
                  </p>

                  <div className="row">
                    <div className="col-lg-4">
                      <a
                        href={evaluations.link}
                        class="btn btn-outline-success"
                      >
                        <i class="fa fa-link" aria-hidden="true"></i>Join
                      </a>
                    </div>

                    <div className="col-lg-4">
                      <a
                        href={`/evaluation/edit/${evaluations._id}`}
                        class="btn btn-outline-primary"
                      >
                        {" "}
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        Update
                      </a>
                    </div>

                    <div className="col-lg-4">
                      <a
                        href="#"
                        class="btn btn-outline-danger"
                        onClick={() => {
                          this.onDelete(evaluations._id);
                        }}
                      >
                        {" "}
                        <i class="fa fa-trash" aria-hidden="true"></i>Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

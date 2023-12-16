import React, { Component } from "react";
import axios from "axios";

export default class SviewEvaluation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluations: [],
    };
  }

  componentDidMount() {
    this.retriveEvaluations();
  }
  //retrive evaluations
  retriveEvaluations() {
    axios.get("http://localhost:5000/evaluations").then((res) => {
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
    axios
      .delete(`http://localhost:5000/evaluation/delete/${id}`)
      .then((res) => {
        alert("Deleted Successfully");
        this.retriveEvaluations();
      });
  };
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

    axios.get("http://localhost:5000/evaluations").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingEvaluations, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="me-4 mt-4 mb-2">
        <div className="row">
          <div className="col-lg-6 mt-2 mb-2">
            <h4>All Evaluation Sessions</h4>
          </div>
          <div className="col-lg-6 mt-2 mb-2">
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
                    {evaluations.panel}. Your participation is mandatory. You
                    can connect via the link below.{" "}
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
    );
  }
}

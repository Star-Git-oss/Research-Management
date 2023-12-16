import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import EvaluationList from "./EvaluationList";
import jwt_decode from "jwt-decode";

export default class AddEvaluation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      evaluationTopic: "",
      panel: "",
      date: "",
      from: "",
      to: "",
      link: "",
      subject: "About Your Evaluation Session.",
      text: "Your session has been added to the website. Please see the details and let your team members know. --Auto Generated Email--",
    };
  }

  componentDidMount() {
    document.title = "Add Evaluation";

    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        panel: decoded.panel,
      });
    }
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
      groupId,
      evaluationTopic,
      panel,
      date,
      from,
      to,
      link,
      subject,
      text,
    } = this.state;

    const data = {
      groupId: groupId,
      evaluationTopic: evaluationTopic,
      panel: panel,
      date: date,
      from: from,
      to: to,
      link: link,
    };
    console.log(data);
    //save evaluations
    axios.post("http://localhost:5000/evaluation/save", data).then((res) => {
      if (res.data.success) {
        swal("Added Evaluation Successfully !", "", "success").then((value) => {
          window.location = "/evaluation/add";
        });

        this.setState({
          groupId: "",
          evaluationTopic: "",
          panel: "",
          date: "",
          from: "",
          to: "",
          link: "",
        });
      }
    });

    // Send data to Email Service
    const emailData = {
      groupId: groupId,
      subject: subject,
      text: text,
      type: evaluationTopic,
      panel: panel,
      date: date,
      from: from,
      to: to,
      link: link,
    };
    //send email to group members
    axios
      .post("http://localhost:5000/submitiont/email", emailData)
      .then((res) => {
        if (res.data.success) {
          console.log("Sent Email Successfully");
        } else {
          console.log("Not Sent Email ");
        }
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-7">
            <div className="ms-4">
              <div className="row">
                <div className="col-sm-12">
                  <div className="col-sm-12 mt-4">
                    <h1 className="h3 mb-3 font-weight-normal">
                      Add New Evaluation Session
                    </h1>
                    <hr />
                    <form className="needs-validation" onSubmit={this.onSubmit}>
                      <div className="row">
                        <div className="col-sm-4">
                          <div
                            className="form-group"
                            style={{ marginBottom: "15px" }}
                          >
                            <label style={{ marginBottom: "5px" }}>
                              <strong>Group ID</strong>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="groupId"
                              placeholder="Enter Group ID -Gxxx"
                              pattern="G[0-9]{3}"
                              title="Group ID is Invalid"
                              value={this.state.groupId}
                              onChange={this.handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-8">
                          <div
                            className="form-group"
                            style={{ marginBottom: "15px" }}
                          >
                            <label style={{ marginBottom: "5px" }}>
                              <strong>Evaluation Type</strong>
                            </label>

                            <select
                              className="form-select"
                              name="evaluationTopic"
                              value={this.state.evaluationTopic}
                              onChange={this.handleInputChange}
                              required
                            >
                              <option
                                evaluationTopic="not selected yet"
                                selected
                              >
                                Select Type
                              </option>
                              <option evaluationTopic="Topic Assessment Document">
                                Topic Assessment Document
                              </option>
                              <option evaluationTopic="Proposal Document">
                                Proposal Document
                              </option>
                              <option evaluationTopic="Presentation Slides">
                                Presentation Slides
                              </option>
                              <option evaluationTopic="Final Thesis">
                                Final Thesis
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          <strong>Panel</strong>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          name="panel"
                          value={this.state.panel}
                          onChange={this.handleInputChange}
                          disabled
                        />
                        {/* <option dressCode="not selected yet" selected>
                          Select Panel
                        </option>
                        <option panel="Panel 01">Panel 01</option>
                        <option panel="Panel 02">Panel 02</option>
                        <option panel="Panel 03">Panel 03</option>
                        <option panel="Panel 04">Panel 04</option>
                        <option panel="Panel 05">Panel 05</option>
                        <option panel="Panel 06">Panel 06</option>
                      </select> */}
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          <strong>Date</strong>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={this.state.date}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      <div className="row">
                        <div
                          className="form-group col-6"
                          style={{ marginBottom: "15px" }}
                        >
                          <label style={{ marginBottom: "5px" }}>
                            <strong>From</strong>
                          </label>
                          <input
                            type="time"
                            className="form-control"
                            name="from"
                            value={this.state.from}
                            onChange={this.handleInputChange}
                            required
                          />
                        </div>

                        <div
                          className="form-group col-6"
                          style={{ marginBottom: "15px" }}
                        >
                          <label style={{ marginBottom: "5px" }}>
                            <strong>To</strong>
                          </label>
                          <input
                            type="time"
                            className="form-control"
                            name="to"
                            value={this.state.to}
                            onChange={this.handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          <strong>Link</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="link"
                          placeholder="Enter Session Link"
                          value={this.state.link}
                          onChange={this.handleInputChange}
                          required
                        />
                      </div>

                      <button
                        className="btn btn-outline-success"
                        type="submit"
                        style={{ margintop: "15px" }}
                        // onClick={this.onSubmit}
                      >
                        <i className="far fa-check-square"></i>
                        &nbsp; Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-5">
            <div className="row">
              <div className="col-12">
                <EvaluationList></EvaluationList>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

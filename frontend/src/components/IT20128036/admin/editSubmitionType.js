import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";

export default class EditSubmitonType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitionType: "",
      description: "",
      almarks: "",
      deadLine: "",
      Status: "",
      guidelines: "",
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
    const id = this.props.match.params.id;
    const {
      submitionType,
      description,
      almarks,
      deadLine,
      Status,
      guidelines,
    } = this.state;

    const data = {
      submitionType: submitionType,
      description: description,
      almarks: almarks,
      deadLine: deadLine,
      Status: Status,
      guidelines: guidelines,
    };
    console.log(data);
    //update submitiontype
    axios
      .put(`http://localhost:5000/submitiontype/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          swal(" Updated Successfully !", "", "success").then((value) => {
            window.location = "/submitiontype/add";
          });

          this.setState({
            submitionType: "",
            description: "",
            almarks: "",
            deadLine: "",
            Status: "",
            guidelines: "",
          });
        }
      });
  };

  componentDidMount() {
    document.title = "Edit SubType";
    // if(this.props.match && this.props.match.params.id){
    const id = this.props.match.params.id;

    //retrive submitiontype to update
    axios.get(`http://localhost:5000/submitiontype/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          submitionType: res.data.submitiontype.submitionType,
          description: res.data.submitiontype.description,
          almarks: res.data.submitiontype.almarks,
          deadLine: res.data.submitiontype.deadLine,
          Status: res.data.submitiontype.Status,
          guidelines: res.data.submitiontype.guidelines,
        });
        console.log(this.state);
      }
    });

    // }
  }

  render() {
    return (
      <div className="container">
        <br />
        <AdminNavBar />

        <div className="col-12 mt-4">
          <div className="ms-4 me-4">
            <h1 className="h3 mb-3 font-weight-normal">Edit Submission Type</h1>
            <form className="needs-validation" noValidate>
              <div className="row">
                <div className="col-sm-7">
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <strong>Submission Type</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="submitionType"
                      placeholder="Edit Submition Type"
                      value={this.state.submitionType}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-sm-5">
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <strong>Allocated Marks</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="almarks"
                      placeholder="Edit Allocated Marks"
                      value={this.state.almarks}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>
                  <strong>Description</strong>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Edit Description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <strong>Deadline</strong>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="deadLine"
                      value={this.state.deadLine}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <strong>Submission Status</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="Status"
                      value={this.state.Status}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>
                  <strong>Guidelines</strong>
                </label>
                <textarea
                  className="form-control"
                  name="guidelines"
                  value={this.state.guidelines}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    style={{ margintop: "15px" }}
                    onClick={this.onSubmit}
                  >
                    <i className="far fa-check-square"></i>
                    &nbsp; Update
                  </button>
                </div>
                {/* <div className="col-sm-6">
  <a className="btn btn-outline-dark" href="/submitiontype/add">Back</a>
</div> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

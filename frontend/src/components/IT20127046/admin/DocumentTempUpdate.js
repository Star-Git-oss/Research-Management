import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";
import swal from "sweetalert";

export default class DocumentTempUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentType: "",
      otherType: "",
      description: "",
      file: "",
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

    const { documentType, otherType, description } = this.state;

    const data = {
      documentType: documentType,
      otherType: otherType,
      description: description,
    };

    axios.put(`http://localhost:5000/document/update/${id}`, data)
    .then((res) => {
        if (res.data.success) {
            swal("Document Update Successful!")
            .then((value) => {
                window.location = '/documentTemp';
            });
        }
    });
  };

  componentDidMount() {
    document.title = "Update Template";

    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/document/get/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          documentType: res.data.document.documentType,
          otherType: res.data.document.otherType,
          description: res.data.document.description,
          file: res.data.document.files,
        });
      }
    });
  }

  render() {
    return (
      <div className="container">
        <br />
        <AdminNavBar />
        <br />
        <h4>Update Document Template</h4>
        <hr />

        <div className="container">
          <div
            className="container bg-light text-dark p-5"
            style={{ "max-width": "500px", border: "2px solid #000000" }}
          >
            <center>
              <h4>Update Document Template</h4>
            </center>
            <br />
            <button type="button" className="btn btn-secondary">
              <a
                href="/documentTemp"
                style={{ textDecoration: "none", color: "white" }}
              >
                Back to Previuos Page
              </a>
            </button>{" "}
            <br />
            <br />
            <form encType="multipart/form-data">
              <label className="form-label">Select Document Type</label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="documentType"
                value={this.state.documentType}
                onChange={this.handleInputChange}
              >
                <option defaultValue>Select Dcoument Type</option>
                <option value="Proposal">Proposal Document Template</option>
                <option value="Presentation">Presentation Template</option>
                <option value="Final Thesis">Final Thesis Template</option>
                <option value="Other">Other Template</option>
              </select>

              <div className="mb-3">
                <label className="form-label">Other Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="otherType"
                  name="otherType"
                  aria-describedby="emailHelp"
                  value={this.state.otherType}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  aria-describedby="emailHelp"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Default file input example <p>{this.state.file}</p>
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="file"
                  filename="file"
                  /*onChange={this.onChangeFile}*/
                />
              </div>

              <center>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                >
                  Update
                </button>
              </center>
            </form>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

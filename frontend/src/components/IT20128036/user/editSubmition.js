import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";

export default class EditSubmition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: "",
      type: "",
      description: "",
      files: "",
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
    const { groupId, type, description, files } = this.state;

    const data = {
      groupId: groupId,
      type: type,
      description: description,
      files: files,
    };
    console.log(data);
    //update submition
    axios
      .put(`http://localhost:5000/submition/update/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          swal("Updated Successfully", "", "success").then((value) => {
            window.location = `/student/submitionsp/view/${groupId}`;
          });

          this.setState({
            groupId: "",
            type: "",
            description: "",
            files: "",
          });
        }
      });
  };

  componentDidMount() {
    document.title = "Edit Submition";
    // if(this.props.match && this.props.match.params.id){
    const id = this.props.match.params.id;
    //retrive submition to update
    axios.get(`http://localhost:5000/submition/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          groupId: res.data.submition.groupId,
          type: res.data.submition.type,
          description: res.data.submition.description,
          files: res.data.submition.files,
        });
        console.log(this.state);
      }
    });

    // }
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-12 mt-4 ">
          <div className="mx-5">
            <h1 className="h3 mb-3 font-weight-normal">Edit Submission</h1>
            <form className="needs-validation" noValidate>
              <div className="row">
                <div className="col-4">
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <strong>Group Id</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="groupId"
                      placeholder="Edit Group Id"
                      value={this.state.groupId}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-8">
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      <strong>Type</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="type"
                      placeholder="Edit Type"
                      value={this.state.type}
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

              <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ marginBottom: "5px" }}>
                  <strong>Files</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="files"
                  placeholder="Edit Files"
                  value={this.state.files}
                  onChange={this.handleInputChange}
                  disabled
                />
              </div>

              <button
                className="btn btn-outline-success"
                type="submit"
                style={{ margintop: "15px" }}
                onClick={this.onSubmit}
              >
                <i className="far fa-check-square"></i>
                &nbsp; Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

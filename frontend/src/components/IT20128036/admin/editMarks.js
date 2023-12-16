import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";

export default class EditMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: "",
      gradingStatus: "",
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
    const { marks, gradingStatus } = this.state;

    const data = {
      marks: marks,
      gradingStatus: gradingStatus,
    };
    console.log(data);
    //update marks
    axios.put(`http://localhost:5000/mark/update/${id}`, data).then((res) => {
      if (res.data.success) {
        swal(" Updated Successfully !", "", "success").then((value) => {
          window.location = "/marks/view";
        });

        this.setState({
          marks: "",
          gradingStatus: "",
        });
      }
    });
  };

  componentDidMount() {
    document.title = "Edit Marks";
    // if(this.props.match && this.props.match.params.id){
    const id = this.props.match.params.id;

    //retrive marks to update
    axios.get(`http://localhost:5000/mark/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          marks: res.data.mark.marks,
          gradingStatus: res.data.mark.gradingStatus,
        });
        console.log(this.state);
      }
    });

    // }
  }

  render() {
    return (
      <div className="col-md-8 mt-4 mx-auto">
        <h1 className="h3 mb-3 font-weight-normal">Edit Marks</h1>
        <form className="needs-validation" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Marks</label>
            <input
              type="text"
              className="form-control"
              name="marks"
              placeholder="Edit Marks"
              value={this.state.marks}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px" }}>Grading Status</label>
            <input
              type="text"
              className="form-control"
              name="gradingStatus"
              placeholder="Edit Grading Status"
              value={this.state.gradingStatus}
              onChange={this.handleInputChange}
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
    );
  }
}

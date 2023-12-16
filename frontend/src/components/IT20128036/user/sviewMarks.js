import React, { Component } from "react";
import { useRef } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

export default class sviewMarks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marks: [],
    };
  }

  componentDidMount() {
    document.title = "Marks";
    this.retriveMarks();
  }
  //retrive marks
  retriveMarks() {
    axios.get("http://localhost:5000/marks").then((res) => {
      if (res.data.success) {
        this.setState({
          marks: res.data.existingMarks,
        });

        console.log(this.state.marks);
      }
    });
  }

  //delete marks
  onDelete = (id) => {
    axios.delete(`http://localhost:5000/mark/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.retriveMarks();
    });
  };

  //filter marks
  filterData(marks, searchKey) {
    const result = marks.filter(
      (mark) =>
        mark.groupId.toLowerCase().includes(searchKey) ||
        mark.type.toLowerCase().includes(searchKey) ||
        mark.gradingStatus.toLowerCase().includes(searchKey) ||
        mark.groupId.includes(searchKey) ||
        mark.type.includes(searchKey) ||
        mark.gradingStatus.includes(searchKey)
    );

    this.setState({ marks: result });
  }

  //search marks
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/marks").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingMarks, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="ms-4 me-4 mt-2 mb-2">
          <div className="row mt-2 mb-2">
            <div className="col-lg-4 mt-2 mb-2">
              <a href="/student/pdf/export" className="btn btn-outline-dark">
                Export PDF
              </a>
            </div>

            <div className="col-lg-5 mt-2 mb-2">
              <h4>Marks Of Submissions</h4>
            </div>

            <div className="col-lg-3 mt-2 mb-2">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                name="searchQuery"
                onChange={this.handleSearchArea}
              ></input>
            </div>
          </div>

          <table className="table table-light table-striped table-hover mt-4 mb-4">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Group ID</th>
                <th scope="col">Submission Type</th>
                <th scope="col">Marks (?/100)</th>
                <th scope="col">Grading Status</th>
                <th scope="col">Marked By</th>
              </tr>
            </thead>
            <tbody>
              {this.state.marks.map((marks, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>

                  <td>{marks.groupId}</td>

                  <td>{marks.type}</td>

                  <td>{marks.marks}</td>
                  <td>{marks.gradingStatus}</td>
                  <td>{marks.markedby}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

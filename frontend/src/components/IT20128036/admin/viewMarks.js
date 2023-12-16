import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

export default class viewMarks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marks: [],
      markedby: "",
    };
  }

  componentDidMount() {
    document.title = "Edit Marks";

    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        markedby: decoded.name,
      });
    }

    setTimeout(() => {
      this.retriveMarks();
    }, 1000);
  }
  //retrive marks
  retriveMarks() {
    const name = this.state.markedby;
    axios.get(`http://localhost:5000/marks/supervisor/${name}`).then((res) => {
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
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:5000/mark/delete/${id}`).then((res) => {
          this.retriveMarks();
        });

        swal("Deleted Successfully", "", "success");
      } else {
        swal("Your file is safe!");
      }
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

    const name = this.state.markedby;
    axios.get(`http://localhost:5000/marks/supervisor/${name}`).then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingMarks, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="ms-4 me-4 mt-2 mb-2">
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h4>Marks</h4>
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

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Group ID</th>
                <th scope="col">Submission Type</th>
                <th scope="col">Marks</th>
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

                  <td>
                    <a
                      className="btn btn-outline-primary"
                      href={`/marks/edit/${marks._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-outline-danger"
                      href="#"
                      onClick={() => {
                        this.onDelete(marks._id);
                      }}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-outline-success">
            <a
              href="/submitions/view"
              style={{ textDecoration: "none", color: "black" }}
            >
              Add Marks
            </a>
          </button>
        </div>
      </div>
    );
  }
}

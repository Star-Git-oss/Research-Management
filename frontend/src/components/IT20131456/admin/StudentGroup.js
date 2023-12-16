import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";

export default class StudentGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentgroups: [],
    };
  }

  componentDidMount() {
    this.retrieveStudentGropus();
  }

  retrieveStudentGropus() {
    axios.get("http://localhost:5000/sgroups").then((res) => {
      if (res.data.success) {
        this.setState({
          studentgroups: res.data.existingstudentgroups,
        });

        console.log(this.state.studentgroups);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:5000/sgroup/delete/${id}`).then((res) => {
      swal("Are you sure to delete the Group Details?", "", "warning");
      this.retrieveStudentGropus();
    });
  };

  filterData(studentgroups, searchKey) {
    const result = studentgroups.filter(
      (studentgroup) =>
        studentgroup.groupid.toLowerCase().includes(searchKey) ||
        studentgroup.groupname.toLowerCase().includes(searchKey) ||
        studentgroup.status.toLowerCase().includes(searchKey) ||
        studentgroup.groupid.toUpperCase().includes(searchKey) ||
        studentgroup.groupname.toUpperCase().includes(searchKey) ||
        studentgroup.status.toUpperCase().includes(searchKey) ||
        studentgroup.groupid.includes(searchKey) ||
        studentgroup.groupname.includes(searchKey) ||
        studentgroup.status.includes(searchKey)
    );
    this.setState({ studentgroups: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/sgroups").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingstudentgroups, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container px-5 my-3">
        <br />
        <AdminNavBar />
        <br />

        <div className="row">
          <div className="float-left col-lg-9 mt-2 mb-2">
            &nbsp;
            <h2>Student Groups</h2>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            &nbsp;
            <input
              className="form-control border border-dark"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>
          </div>
          <hr />
        </div>

        <table className="table table-striped table-bordered">
          <thead className=" text-light" style={{ background: "#000080" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Group ID</th>
              <th scope="col">Group Name</th>
              <th scope="col">Student ID</th>
              <th scope="col">Student Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.studentgroups.map((studentgroups, index) => (
              <tr>
                <th>{index + 1}</th>

                <td>{studentgroups.groupid}</td>

                <td>{studentgroups.groupname}</td>

                <td>
                  <tr>{studentgroups.studentid1}</tr>

                  <tr>
                    <td>{studentgroups.studentid2} </td>
                  </tr>

                  <tr>
                    <td>{studentgroups.studentid3} </td>
                  </tr>

                  <tr>
                    <td>{studentgroups.studentid4} </td>
                  </tr>
                </td>

                <td>
                  <tr>{studentgroups.studentname1}</tr>

                  <tr>
                    <td>{studentgroups.studentname2} </td>
                  </tr>

                  <tr>
                    <td>{studentgroups.studentname3} </td>
                  </tr>

                  <tr>
                    <td>{studentgroups.studentname4} </td>
                  </tr>
                </td>

                <td>{studentgroups.status}</td>

                <td>
                  <a
                    className="btn btn-outline-primary"
                    href={`/student/group/view/admin/${studentgroups._id}`}
                  >
                    <i className="fa fa-eye"></i>&nbsp;View
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-outline-success"
                    href={`/student/group/update/${studentgroups._id}`}
                  >
                    <i className="fa fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-outline-danger"
                    href="#"
                    onClick={() => this.onDelete(studentgroups._id)}
                  >
                    <i className="fa fa-trash"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

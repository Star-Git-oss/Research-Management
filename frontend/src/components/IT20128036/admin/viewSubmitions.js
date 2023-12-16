import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import fileDownload from "js-file-download";

export default class ViewSubmitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitions: [],
    };
  }

  componentDidMount() {
    document.title = "View Submitions";
    this.retrieveSubmitions();
  }

  // To get all submition data
  retrieveSubmitions() {
    axios.get("http://localhost:5000/submition/all").then((res) => {
      if (res.data.success) {
        this.setState({
          submitions: res.data.exsitingSubmitions,
        });
        console.log(this.state.submitions);
      }
    });
  }

  //filter submitions
  filterData(submitions, searchKey) {
    const result = submitions.filter(
      (submition) =>
        submition.groupId.toLowerCase().includes(searchKey) ||
        submition.type.toLowerCase().includes(searchKey) ||
        submition.files.toLowerCase().includes(searchKey) ||
        submition.groupId.includes(searchKey) ||
        submition.type.includes(searchKey) ||
        submition.files.includes(searchKey)
    );

    this.setState({ submitions: result });
  }

  //search submitions
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/submition/all").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.exsitingSubmitions, searchKey);
      }
    });
  };

  // Download File
  downloadFile = (fileName) => {
    const data = {
      fileName: fileName,
    };

    axios({
      url: "http://localhost:5000/file/download",
      data,
      method: "POST",
      responseType: "blob",
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, fileName);
    });
  };

  //delete submitions
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
          .delete(`http://localhost:5000/submition/delete/${id}`)
          .then((res) => {
            this.retrieveSubmitions();
          });

        swal("Deleted Successfully", "", "success");
      } else {
        swal("Your file is safe!");
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="ms-4 me-4 mt-2 mb-2">
          <div className="row">
            <div className="col-lg-4 mt-2 mb-2">
              <a className="btn btn-outline-dark" href="/marks/view">
                <i className="fas fa-eye"></i>&nbsp;View Marks
              </a>
            </div>
            <div className="col-lg-4 mt-2 mb-2">
              <h4>All Submissions</h4>
            </div>
            <div className="col-lg-4 mt-2 mb-2">
              <div className="row">
                <div className="col-1">
                  {" "}
                  <i class="fa fa-search" aria-hidden="true"></i>
                </div>
                <div className="col-11">
                  {" "}
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search . . . . . ."
                    name="searchQuery"
                    onChange={this.handleSearchArea}
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Group ID</th>
                <th scope="col">Type</th>
                <th scope="col">Description</th>
                <th scope="col">Submitted Date</th>
                <th scope="col">Status</th>

                <th scope="col">Preview</th>
                <th scope="col">Delete</th>
                <th scope="col">Add Marks</th>
              </tr>
            </thead>
            <tbody>
              {this.state.submitions.map((submitions, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{submitions.groupId}</td>
                  <td>{submitions.type}</td>
                  <td>{submitions.description}</td>
                  <td>{submitions.postDate}</td>
                  <td>{submitions.status}</td>
                  <td>
                    <a
                      className="btn btn-outline-success"
                      onClick={() => this.downloadFile(submitions.files)}
                    >
                      <i class="fa fa-download" aria-hidden="true">
                        <br />
                        Download
                      </i>
                    </a>
                  </td>

                  <td>
                    <a
                      className="btn btn-outline-danger"
                      href="#"
                      onClick={() => {
                        this.onDelete(submitions._id);
                      }}
                    >
                      <i className="fas fa-trash-alt">
                        <br />
                        Delete{" "}
                      </i>
                    </a>
                  </td>

                  <td>
                    <a
                      className="btn btn-outline-primary"
                      href={`/marks/add/${submitions._id}`}
                    >
                      <i className="fas fa-plus">
                        <br />
                        Marks
                      </i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

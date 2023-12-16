import React, { Component } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import AddSubmition from "./Submitions";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

export default class ViewSubmitionssp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      submitions: [],
    };
  }

  componentDidMount() {
    document.title = "Submition";

    if (!localStorage.userToken) {
      swal("Please login first", "", "warning").then((value) => {
        if (value) {
          this.props.history.push(`/user/login`);
          window.location.reload();
        }
      });
    }

    //get group id using the user token
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    const id = decoded.groupId;
    this.setState({
      groupId: id,
    });

    setTimeout(() => {
      this.retrieveSubmitions();
    }, 1000);

    // if (localStorage.userToken) {
    //   const usertoken = localStorage.userToken;
    //   const decoded = jwt_decode(usertoken);
    //   this.setState({
    //     groupId: decoded.groupId,
    //   });
    // }

    //     setTimeout(()=>{
    //       this.retrieveSubmitions();

    //     },1000);
  }

  //retrive submition using group id
  retrieveSubmitions() {
    // const gid = this.props.match.params.id ;
    console.log(this.state.groupId);
    //console.log("Hello")
    const gid = this.state.groupId;
    axios.get(`http://localhost:5000/submition/group/${gid}`).then((res) => {
      if (res.data.success) {
        this.setState({
          submitions: res.data.exsitingSubmitions,
        });
        console.log(this.state.submitions);
      }
    });
  }

  //delete submition
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

        swal("Your Submition has been deleted", "", "success");
      } else {
        swal("Your file is safe!");
      }
    });
  };

  //Download File
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

  //filter submition
  filterData(submitions, searchKey) {
    const result = submitions.filter(
      (submition) =>
        submition.type.toLowerCase().includes(searchKey) ||
        submition.files.toLowerCase().includes(searchKey) ||
        submition.type.includes(searchKey) ||
        submition.files.includes(searchKey)
    );

    this.setState({ submitions: result });
  }

  //search submition
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    const gid = this.state.groupId;
    axios.get(`http://localhost:5000/submition/group/${gid}`).then((res) => {
      if (res.data.success) {
        this.filterData(res.data.exsitingSubmitions, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <AddSubmition></AddSubmition>
          </div>

          <div className="col-sm-6">
            <div className="mt-4 mb-2 me-4">
              <div className="row">
                <div className="col-lg-7 mt-2 mb-2">
                  <h4>Your Submissions</h4>
                </div>
                <div className="col-lg-5 mt-2 mb-2">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    name="searchQuery"
                    onChange={this.handleSearchArea}
                  ></input>
                </div>
              </div>

              {this.state.submitions.map((submitions, index) => (
                <div class="row">
                  <div class="col-sm-12">
                    <div class="card border-secondary mt-3 mb-3">
                      <div class="card-body">
                        <div class="card-header">
                          <h5 class="card-title">
                            <p>Group {submitions.groupId} </p>
                          </h5>

                          <div className="row mt-4 mb-4">
                            <div className="col-lg-4">
                              <a
                                className="btn btn-outline-success"
                                onClick={() =>
                                  this.downloadFile(submitions.files)
                                }
                              >
                                <i class="fa fa-download" aria-hidden="true">
                                  <br />
                                  Download
                                </i>
                              </a>
                            </div>

                            <div className="col-lg-3">
                              <a
                                className="btn btn-outline-primary"
                                href={`/student/submition/edit/${submitions._id}`}
                              >
                                <i className="fas fa-edit">
                                  <br />
                                  Edit
                                </i>
                              </a>
                            </div>

                            <div className="col-lg-4">
                              <a
                                className="btn btn-outline-danger"
                                href="#"
                                onClick={() => {
                                  this.onDelete(submitions._id);
                                }}
                              >
                                <i className="fas fa-trash-alt">
                                  <br />
                                  Delete
                                </i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <p class="card-text"></p>
                        <p>
                          <strong>Type</strong>
                        </p>
                        <p> {submitions.type}</p>
                        <p>
                          <strong>Description</strong>
                        </p>
                        <p>{submitions.description}</p>

                        <p>
                          <strong>File Name</strong>
                        </p>
                        <p>{submitions.files}</p>

                        {/*                          
                    <div className="row mt-4 mb-4">
                      <div className="col-lg-4">
                      
                      <a className='btn btn-outline-success' onClick={() => this.downloadFile(submitions.files)}><i class="fa fa-download" aria-hidden="true"><br/>Download</i></a>
                      
                      </div>

                      <div className="col-lg-3">
                      <a className="btn btn-outline-warning" href={`/submition/student/edit/${submitions._id}`}>
                  <i className="fas fa-edit"><br/>Edit</i>
                </a>
                      </div>

                      <div className="col-lg-4">

                      <a className="btn btn-outline-danger" href="#" onClick={()=>{
                  this.onDelete(submitions._id)
                }}>
                  <i className="fas fa-trash-alt"><br/>Delete</i>
                </a>

                      </div>
                    </div> */}

                        {/* 
                    <div className="row mt-4 mb-4">
                      <div className="col-lg-4">
                      
                      <a className='btn btn-outline-dark' onClick={() => this.downloadFile(submitions.files)}><i class="fa fa-download" aria-hidden="true"><br/>Download</i></a>
                      
                      </div>

                      <div className="col-lg-4">
                      <a className="btn bg-info btn-outline-dark" href={`/submition/student/edit/${submitions._id}`}>
                  <i className="fas fa-edit"><br/>Edit</i>
                </a>
                      </div>

                      <div className="col-lg-4">

                      <a className="btn btn-outline-dark" href="#" onClick={()=>{
                  this.onDelete(submitions._id)
                }}>
                  <i className="fas fa-trash-alt"><br/>Delete</i>
                </a>

                      </div>
                    </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

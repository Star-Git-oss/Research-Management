import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import fileDownload from "js-file-download";
import RightSidePanel from "../RightSidePanel";

export default class ViewDocumentTemplate extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
      documentTemplate: []
    };
  }

  componentDidMount() {
    document.title = "Document Template";
    
    // Check user login
    if (!localStorage.userToken) {
      swal({
        title: "Please login first",
        icon: "warning",
      }).then((value) => {
        if (value) {
          this.props.history.push("/user/login");
          window.location.reload();
        }
      });
    } else {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        userType: decoded.type,
      });
    }

    this.retrieveDocumentTemp();
  }

  // To get all data
  retrieveDocumentTemp() {
    axios.get("http://localhost:5000/template/getAll").then((res) => {
      if (res.data.success) {
        this.setState({
          documentTemplate: res.data.exsitingDocumentTemp,
        });
        console.log(this.state.documentTemplate)
      }
    });
  }

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

  render() {
    // If user not logged
    const loginRegLink = (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className="nav-link"
            aria-current="page"
            href="/user/login"
            style={{ textDecoration: "none", color: "white" }}
          >
            Login
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            aria-current="page"
            href="/user/registration"
            style={{ textDecoration: "none", color: "white" }}
          >
            Register
          </a>
        </li>
      </ul>
    );

    // Internal CSS
    const headlineBar = {
      backgroundColor: "#DCDCDC",
      padding: "5px",
      marginBottom: "5px",
    };


    return (
      <div className="container">
        {localStorage.userToken ? (
          <div>
            <br />
            <h4><i class="fa fa-file-text" aria-hidden="true"></i>&nbsp;&nbsp;Document Template</h4>
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-9">
                  <div style={headlineBar}>
                    <h6>Note</h6>
                  </div>
                  <div className="container">
                    <p>
                      Download template for create Proposal Document, Presentation, Final Thesis
                    </p>
                  </div>

                  <div style={headlineBar}>
                    <h6>Proposal Document Template</h6>
                  </div>
                  <div className="container">
                    {this.state.documentTemplate.map((template, index) => {
                        if (template.documentType === "Proposal") {
                        return (
                            <div key={index} className="mb-2">
                                <p><i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; {template.files} - {template.description}</p>
                                <a
                                    className="btn btn-sm btn-outline-primary m-2"
                                    onClick={() =>
                                    this.downloadFile(template.files)
                                    }
                                >
                                    Download
                                </a>
                            </div>
                        );
                        }
                    })}
                  </div>

                  <div style={headlineBar}>
                    <h6>Presentation Template</h6>
                  </div>
                  <div className="container">
                    {this.state.documentTemplate.map((template, index) => {
                        if (template.documentType === "Presentation") {
                            return (
                                <div key={index} className="mb-2">
                                    <p><i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; {template.files} - {template.description}</p>
                                    <a
                                        className="btn btn-sm btn-outline-primary m-2"
                                        onClick={() =>
                                        this.downloadFile(template.files)
                                        }
                                    >
                                        Download
                                    </a>
                                </div>
                            );
                        }
                    })}
                  </div>

                  <div style={headlineBar}>
                    <h6>Final Thesis Template</h6>
                  </div>
                  <div className="container">
                    {this.state.documentTemplate.map((template, index) => {
                        if (template.documentType === "Final Thesis") {
                            return (
                                <div key={index} className="mb-2">
                                    <p><i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; {template.files} - {template.description}</p>
                                    <a
                                        className="btn btn-sm btn-outline-primary m-2"
                                        onClick={() =>
                                        this.downloadFile(template.files)
                                        }
                                    >
                                        Download
                                    </a>
                                </div>
                            );
                        }
                    })}
                  </div>

                  <div style={headlineBar}>
                    <h6>Other Template</h6>
                  </div>
                  <div className="container">
                    {this.state.documentTemplate.map((template, index) => {
                        if (!(template.documentType === "Proposal" || template.documentType === "Presentation" || template.documentType === "Final Thesis")) {
                            return (
                                <div key={index} className="mb-2">
                                    <p><i class="fa fa-file-text-o" aria-hidden="true"></i>&nbsp; {template.files} - {template.description}</p>
                                    <a
                                        className="btn btn-sm btn-outline-primary m-2"
                                        onClick={() =>
                                        this.downloadFile(template.files)
                                        }
                                    >
                                        Download
                                    </a>
                                </div>
                            );
                        }
                    })}
                  </div>
                </div>
                <div className="col-3">
                  <RightSidePanel />
                </div>
              </div>
            </div>
          </div>
        ) : (
          loginRegLink
        )}
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import fileDownload from "js-file-download";
import RightSidePanel from "../RightSidePanel";

export default class ViewMarkingScheme extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
      markingSchemTitle: [],
    };
  }

  componentDidMount() {
    document.title = "Marking Scheme";
    
    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        userType: decoded.type,
      });
    }

    this.retrieveTitles();
  }

  // Get marking titles from db
  retrieveTitles() {
    axios.get("http://localhost:5000/getAll/markingTitles").then((res) => {
      if (res.data.success) {
        this.setState({
          markingSchemTitle: res.data.existingMarkingTitles,
        });
        console.log(this.state.markingSchemTitle);
      }
    });
  }

  render() {
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

    let userContent;

    if (this.state.userType === "Student") {
      userContent = <p>Hello Student</p>;
    } else if (this.state.userType === "Supervisor" || "Panel Member") {
      userContent = <p>Hello Supervisor</p>;
    }

    return (
      <div className="container">
        {localStorage.userToken ? (
          <div>
            <br />
            <h4><i class="fa fa-table" aria-hidden="true"></i>&nbsp;&nbsp;Marking Schemes</h4>
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-9">
                  <div style={headlineBar}>
                    <h6>Note</h6>
                  </div>
                  <div className="container">
                    <p>
                      View and download marking schemes realted to assignment
                    </p>
                  </div>
                  
                  <div style={headlineBar}>
                    <h6>Marking Schemes</h6>
                  </div>

                  <div className="container">
                    <hr />
                    {this.state.markingSchemTitle.map((data, index) => (
                      <div key={index}>
                        <p>{data.moduleName}</p>
                        <p>{data.assignment}</p>

                        <a
                          className="btn btn-outline-success m-2"
                          href={`/user/display/marking/${data._id}`}
                        >
                          View
                        </a>
                        <a
                          className="btn btn-outline-primary m-2"
                          href={`/user/download/marking`}
                        >
                          Download
                        </a>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-3">
                  <RightSidePanel/>
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

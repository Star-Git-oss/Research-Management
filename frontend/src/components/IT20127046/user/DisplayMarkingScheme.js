import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import fileDownload from "js-file-download";
import RightSidePanel from "../RightSidePanel";

export default class DisplayMarkingScheme extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
      markingSchemTitle: [],
      markingCriteria: [],
      moduleName: "",
      assignment: "",
    };
  }

  componentDidMount() {
    document.title = "Marking Scheme";

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

    this.getMarkingCriteria();
  }

  getMarkingCriteria() {
    const titleID = this.props.match.params.id;

    // Get marking scheme title details
    axios
      .get(`http://localhost:5000/markingTitle/get/${titleID}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            markingSchemTitle: res.data.schemeTitle,
            moduleName: res.data.schemeTitle.moduleName,
            assignment: res.data.schemeTitle.assignment,
          });
          console.log(this.state.markingSchemTitle);
        }
      });

    // Get marking scheme criterias
    axios.get(`http://localhost:5000/markings/get/${titleID}`).then((res) => {
      if (res.data.success) {
        this.setState({
          markingCriteria: res.data.existingMarkingCriteria,
        });
      }
      //console.log(this.state.markingCriteria);
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
                    <h6>Marking Schemes</h6>
                  </div>
                  <br />

                  <div className="container">
                    <div className="container border border-secondary">
                      <div className="container p-4">
                        <center>
                          <h5>Marking Schem</h5>
                          <h5>{this.state.moduleName}</h5>
                          <h6>{this.state.assignment}</h6>
                        </center>

                        <table className="table">
                          <thead>
                            <tr className="b ">
                              <th scope="col">No</th>
                              <th scope="col">Criteria</th>
                              <th scope="col">Allocate Mark</th>
                            </tr>
                          </thead>

                          <tbody>
                            {this.state.markingCriteria.map((data, index) => (
                              <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{data.criteria}</td>
                                <td>{data.allocateMark} </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <br />
                        <br />
                      </div>
                    </div>
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

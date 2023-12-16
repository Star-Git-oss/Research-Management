import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import RightSidePanel from "../RightSidePanel";
import SquadUnitLogo from "../../../../public/images/SquadUnit.jpeg";
import BlankProfile from "../../../../public/images/BlankProfile.png";
import SLIITResearchLogo from "../../../../public/images/SLIITResearchLogo.png";

export default class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
    };
  }

  componentDidMount() {
    document.title = "About Us";

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
  }

  render() {
    // Internal CSS
    const headlineBar = {
      backgroundColor: "#DCDCDC",
      padding: "5px",
      marginBottom: "5px",
    };

    return (
      <div className="container">
        <div>
          <br />
          <h4>About Us</h4>
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-9">
                <div style={headlineBar}>
                  <h6>About the System</h6>
                </div>
                <div className="container">
                  <center>
                    <img
                      src={SLIITResearchLogo}
                      style={{ width: "220px", height: "220px" }}
                    />
                  </center>
                </div>
                <div className="container">
                  <p>
                    SLIIT Research project team is looking for a system, which
                    has the capability of managing the Research project and
                    automating certain tasks.
                  </p>
                </div>

                <div style={headlineBar}>
                  <h6>How to Use</h6>
                </div>
                <div className="container">
                  <p>
                    All SLIIT undergraduates must do a research project in their
                    4th year. This Research Project module is a 16 credit, two
                    semesters long project. A student group must find a research
                    topic in a specific research field and send it to a
                    supervisor who has interests in the same research field.
                    Once the supervisor accepted the topic, they must find a
                    co-supervisor of the same research interest.
                  </p>
                  <p>
                    After finalizing the supervisor student must send a document
                    including the topic details of the Research. Then topic
                    evaluation panel will evaluate the topic and send feedback
                    to the student group. If the topic is accepted, they can
                    continue to do the project. If rejected, they must find a
                    new topic and submit it back.
                  </p>
                  <p>
                    There are several evaluation stages. Document submissions
                    are evaluated by the supervisor or the co-supervisor.
                    Presentations will be evaluated by a separate panel. The
                    final Thesis will be Double evaluated by the supervisor and
                    a blind reviewer.
                  </p>
                </div>

                <div style={headlineBar}>
                  <h6>Developed By</h6>
                </div>
                <br />
                <div className="container">
                  <center>
                    <img
                      src={SquadUnitLogo}
                      style={{ width: "220px", height: "180px" }}
                    />
                  </center>
                </div>
                <br />
                <div className="container">
                  <div className="row">
                    <div className="col p-3 mb-2 m-2 bg-light text-dark">
                      <center>
                        <img
                          src={BlankProfile}
                          style={{
                            width: "150px",
                            height: "150px",
                            marginBottom: "5px",
                          }}
                        />
                        <p>Samararathna L.H.</p>
                        <p>Undergraduate Software Engineering</p>
                        <p>Sri Lanka Institute of Information Technology</p>
                        <p>Sri Lanka</p>
                      </center>
                    </div>
                    <div className="col p-3 mb-2 m-2 bg-light text-dark">
                      <center>
                        <img
                          src={BlankProfile}
                          style={{
                            width: "150px",
                            height: "150px",
                            marginBottom: "5px",
                          }}
                        />
                        <p>Kumarasinghe K.M.K.D.</p>
                        <p>Undergraduate Software Engineering</p>
                        <p>Sri Lanka Institute of Information Technology</p>
                        <p>Sri Lanka</p>
                      </center>
                    </div>
                    <div className="col p-3 mb-2 m-2 bg-light text-dark">
                      <center>
                        <img
                          src={BlankProfile}
                          style={{
                            width: "150px",
                            height: "150px",
                            marginBottom: "5px",
                          }}
                        />
                        <p>Mendis T.C.U.</p>
                        <p>Undergraduate Software Engineering</p>
                        <p>Sri Lanka Institute of Information Technology</p>
                        <p>Sri Lanka</p>
                      </center>
                    </div>
                    <div className="col p-3 mb-2 m-2 bg-light text-dark">
                      <center>
                        <img
                          src={BlankProfile}
                          style={{
                            width: "150px",
                            height: "150px",
                            marginBottom: "5px",
                          }}
                        />
                        <p>Herath G.G.T.K.</p>
                        <p>Undergraduate Software Engineering</p>
                        <p>Sri Lanka Institute of Information Technology</p>
                        <p>Sri Lanka</p>
                      </center>
                    </div>
                  </div>
                </div>
                <br />

                <div style={headlineBar}>
                  <h6>Terms and Conditions</h6>
                </div>
                <div className="container">
                  <p>Terms and Conditions</p>
                </div>
              </div>
              <div className="col-3">
                <RightSidePanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

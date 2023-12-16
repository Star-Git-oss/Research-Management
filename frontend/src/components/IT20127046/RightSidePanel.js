import React, { Component } from "react";
import jwt_decode from "jwt-decode";

export default class RightSidePanel extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
    };
  }

  componentDidMount() {
    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        userType: decoded.type,
      });
    }
  }

  render() {
    // Side Panel Links
    let markingSchemeLink;
    let documentTemplateLink;

    if (this.state.userType === "Student") {
      markingSchemeLink = "/user/view/marking";
      documentTemplateLink = "/user/view/documentTemplate";
    } else if (this.state.userType === "Supervisor" || "Panel Member") {
      markingSchemeLink = "/user/view/marking";
      documentTemplateLink = "/user/view/documentTemplate";
    }

    // Group Chat Links
    let groupChatLink;

    if (this.state.userType === "Student") {
      groupChatLink = (
        <a href={"/chatAppStudent"}>
          <div
            className="p-2 mb-2 text-white"
            style={{ background: "#008080", textDecoration: "none" }}
          >
            <a className="btn text-white">
              <i class="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;Join
              Group Chat
            </a>
          </div>
        </a>
      );
    } else if (
      this.state.userType === "Supervisor" ||
      this.state.userType === "Panel Member"
    ) {
      groupChatLink = (
        <a href={"/chatAppAdmin"}>
          <div
            className="p-2 mb-2 text-white"
            style={{ background: "#008080", textDecoration: "none" }}
          >
            <a className="btn text-white">
              <i class="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;Join
              Group Chat
            </a>
          </div>
        </a>
      );
    }

    return (
      <div>
        <div className="p-3 mb-2 bg-light text-dark">
          <p className="h6">
            <i class="fa fa-external-link" aria-hidden="true"></i>
            &nbsp;&nbsp;Quick Links
          </p>
          <hr />

          <div>
            <a href="">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Users
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href="/student/group/view">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-users" aria-hidden="true"></i>
                  &nbsp;&nbsp;Student Groups
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href="">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-book" aria-hidden="true"></i>
                  &nbsp;&nbsp;Topics
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href="">
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-file-text" aria-hidden="true"></i>
                  &nbsp;&nbsp;Submissions
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href={documentTemplateLink}>
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-file-text" aria-hidden="true"></i>
                  &nbsp;&nbsp;Document Template
                </a>
              </div>
            </a>
          </div>

          <div>
            <a href={markingSchemeLink}>
              <div
                className="p-2 mb-2 text-white"
                style={{ background: "#212F3C", textDecoration: "none" }}
              >
                <a className="btn text-white">
                  <i class="fa fa-table" aria-hidden="true"></i>
                  &nbsp;&nbsp;Marking Schemes
                </a>
              </div>
            </a>
          </div>
        </div>

        <div className="p-3 mb-2 bg-light text-dark">
          <p className="h6">
            <i class="fa fa-comments" aria-hidden="true"></i>&nbsp;&nbsp;Group
            Chat
          </p>
          <hr />
          <div>{groupChatLink}</div>
        </div>
      </div>
    );
  }
}

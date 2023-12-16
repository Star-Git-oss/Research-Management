import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import swal from "sweetalert";
import RightSidePanel from "../RightSidePanel";

export default class ContactUs extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
      users: [],
      studentMsgs: [],

      userID: "",
      userName: "",
      panelMember: "",
      subject: "",
      message: "",
      replay: "",

      viewMyMsgSection: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  componentDidMount() {
    document.title = "Contact Us";
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
        userID: decoded.idNumber,
        userName: decoded.name,
      });
    }

    this.getUserEmails();
    this.getStudentMsg();
  }

  // ***** Student Role Functions ***** //

  // Get user emails
  getUserEmails() {
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.success) {
        this.setState({
          users: res.data.existingUsers,
        });
      }
      //console.log(this.state.users);
    });
  }

  // Add student messages
  onSubmitMsg = (e) => {
    e.preventDefault();

    const { userID, userName, panelMember, subject, message } = this.state;

    const data = {
      userID: userID,
      userName: userName,
      panelMember: panelMember,
      subject: subject,
      message: message,
      replay: "Pending",
    };

    console.log(data);

    axios.post("http://localhost:5000/supprtMsg/add", data).then((res) => {
      if (res.data.success) {
        swal("Message Send Successful");
      }
    });
  };

  // Display student messages section
  onViewMyMsg() {
    this.setState({
      viewMyMsgSection: true,
    });
  }


  // ***** Panel Member and Supervisor Role Functions ***** //

  // Get Student Messages
  getStudentMsg() {
    axios.get("http://localhost:5000/supprtMsg/getAll").then((res) => {
      if (res.data.success) {
        this.setState({
          studentMsgs: res.data.existingMessages,
        });
      }
      //console.log(this.state.users);
    });
  }

  // Send Replay
  onSendReplay(replayID) {
    swal("Enter Replay:", {
      content: "input",
    }).then((replay) => {
      const data = {
        replay: replay,
      };
      axios
        .put(`http://localhost:5000/supprtMsg/update/${replayID}`, data)
        .then((res) => {
          if (res.data.success) {
            swal("Replay Send Successful");
          }
        });
    });
  }

  // Delete Student Message
  onDeleteMsg(MsgID) {
    swal({
      title: "Are you sure?",
      text: "Delete this Message",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/supprtMsg/delete/${MsgID}`)
          .then((res) => {
            swal("Deleted Successfull!", {
              icon: "success",
            });

            setTimeout(() => {
              this.getStudentMsg();
            }, 1000);
          });
      } else {
      }
    });
  }

  render() {

    // Redirect to login page
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

    // Check Student and Panel Member/Supervisor

    let groupChatLink; // Group chat link
    let supportMsg; // Support msg section -> Student (Send Msg) & Panel Member/Supervisor -> View Msgs
    let myMsgStudent; // Student -> View sent msgs

    if (this.state.userType === "Student") {
      groupChatLink = (
        <a className="btn btn-outline-success mb-4 p-4" href="/chatAppStudent">
          <i class="fa fa-comments fa-2xl" aria-hidden="true">
            &nbsp;Join Group Chat
          </i>
        </a>
      );
      supportMsg = (
        <div
          className="p-3 mb-2 bg-light text-dark"
          style={{ maxWidth: "500px" }}
        >
          <form onSubmit={this.onSubmitMsg}>
            <label className="form-label">Panel Member or Supervisor</label>
            <select
              style={{ maxWidth: "400px" }}
              className="form-select"
              aria-label="Default select example"
              name="panelMember"
              value={this.state.panelMember}
              onChange={this.handleInputChange}
            >
              <option defaultValue>Select</option>
              {this.state.users.map((user, index) => {
                if (
                  user.type === "Supervisor" ||
                  user.type === "Panel Member"
                ) {
                  return <option value={user.name}>{user.name}</option>;
                }
              })}
            </select>
            <label htmlFor="subject">Subject</label>
            <input
              style={{ maxWidth: "400px" }}
              type="text"
              className="form-control"
              id="subject"
              name="subject"
              value={this.state.subject}
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              style={{ maxWidth: "400px" }}
              rows="3"
              type="text"
              className="form-control"
              id="message"
              name="message"
              value={this.state.message}
              onChange={this.handleInputChange}
              required
            />

            <button type="submit" className="btn btn-outline-success mt-2 mb-2">
              Send
            </button>
          </form>
        </div>
      );
      myMsgStudent = (
        <div>
          <a
            className="btn btn-outline-success"
            onClick={() => this.onViewMyMsg()}
          >
            My Messages
          </a>
          <br />

          {!this.state.viewMyMsgSection ? (
            <p></p>
          ) : (
            <div className="p-3 mb-2 bg-light text-dark">
              <button className="btn btn-outline-danger" onClick={() => {this.setState({viewMyMsgSection: false})}}>X</button>
              <table className="table">
                <thead>
                  <tr className="b ">
                    <th scope="col">No</th>
                    <th scope="col">Panal Member</th>
                    <th scope="col">Title</th>
                    <th scope="col">Message</th>
                    <th scope="col">Reply</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.studentMsgs.map((msg, index) => {
                    if (msg.userID === this.state.userID) {
                      return (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{msg.panelMember}</td>
                          <td>{msg.subject}</td>
                          <td>{msg.message}</td>
                          <td>{msg.replay}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    } else if (
      this.state.userType === "Supervisor" ||
      this.state.userType === "Panel Member"
    ) {
      groupChatLink = (
        <a className="btn btn-outline-success mb-4 p-4" href="/chatAppAdmin">
          <i class="fa fa-comments fa-2xl" aria-hidden="true">
            &nbsp;Join Group Chat
          </i>
        </a>
      );
      supportMsg = (
        <div className="p-3 mb-2 bg-light text-dark">
          <h6>Student Messages</h6>

          <table className="table">
            <thead>
              <tr className="b ">
                <th scope="col">No</th>
                <th scope="col">Student ID</th>
                <th scope="col">Student Name</th>
                <th scope="col">Title</th>
                <th scope="col">Message</th>
                <th scope="col">Replay</th>
              </tr>
            </thead>

            <tbody>
              {this.state.studentMsgs.map((msg, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{msg.userID}</td>
                  <td>{msg.userName}</td>
                  <td>{msg.subject}</td>
                  <td>{msg.message}</td>
                  <td>
                    <a
                      className="btn btn-outline-success"
                      onClick={() => this.onSendReplay(msg._id)}
                    >
                      Send Replay
                    </a>
                  </td>

                  <td className="text-center">
                    <a
                      className="btn btn-outline-danger"
                      onClick={() => this.onDeleteMsg(msg._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="container">
        {localStorage.userToken ? (
          <div>
            <br />
            <h4>Contact Us</h4>
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-9">
                  <div style={headlineBar}>
                    <h6>Chat with Group</h6>
                  </div>
                  <div className="container">
                    <p>Chat with your group members and allocate supervisor</p>
                    <div className="">{groupChatLink}</div>
                  </div>

                  <div style={headlineBar}>
                    <h6>Support Message</h6>
                  </div>
                  <div className="container">
                    <p>Send problems to your Supervisor or Panael Member</p>
                  </div>

                  <div className="container">{supportMsg}</div>
                  <div className="container">{myMsgStudent}</div>

                  <br />

                  <div style={headlineBar}>
                    <h6>Contact Info</h6>
                  </div>
                  <div className="container">
                    <p>Supervisors and Panel Memebrs contact informations</p>
                  </div>
                  <div className="container">
                    {this.state.users.map((user, index) => {
                      if (
                        user.type === "Supervisor" ||
                        user.type === "Panel Member"
                      ) {
                        return (
                          <div
                            key={index}
                            className="p-3 mb-2 bg-light text-dark"
                            style={{ "max-width": "400px" }}
                          >
                            <p>
                              <i className="fa fa-user" aria-hidden="true"></i>
                              &nbsp;{user.type} - {user.name}
                            </p>
                            <p>
                              {" "}
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              ></i>
                              &nbsp;Email - {user.email}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                  <br />
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

import React, { Component } from "react";
import axios from 'axios';
import HomeImage from "../../../public/images/Home.jpg";
import RightSidePanel from "./RightSidePanel";
import jwt_decode from "jwt-decode";
import SLIITResearchLogo from "../../../public/images/SLIITResearchLogo.png";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      userType: "",
      notices: []
    };
  }

  componentDidMount() {
    document.title = "Home";

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

    this.retrieveNotice();
    
  }

  retrieveNotice() {
    axios.get("http://localhost:5000/notice/getAll").then((res) => {
      if (res.data.success) {
        this.setState({
          notices: res.data.exsitingNotices,
        });
        //console.log(this.state.documentTemp);
      }
    });
  }
  
  render() {
    return (
      <div className="container">
        <div>
          <br />
          <div className="container">
            <h4>
              <i class="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;Home
            </h4>
            <hr />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-9">
                <div>
                  <img
                    src={HomeImage}
                    style={{
                      width: "100%",
                      height: "auto",
                      marginBottom: "20px",
                    }}
                  />
                </div>
                <div>
                  <div className="p-3 mb-2 bg-light text-dark">
                    <p className="h6">
                      <i class="fa fa-envelope-o" aria-hidden="true"></i>
                      &nbsp;&nbsp;Notice
                    </p>
                    <hr />

                    <div>
                      {this.state.notices.map((notice, index)=> (
                        <div key={index}>
                          <h6>{notice.noticeTitle}</h6>
                          <p>{notice.noticeMessage}</p>
                          <hr/>
                        </div>
                      ))}
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="container">
                  <center>
                    <img
                      src={SLIITResearchLogo}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </center>
                </div>
                <RightSidePanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import image from "../../../images/group.jpg";

export default class ViewStudentGroup extends Component {
  constructor() {
    super();
    this.state = {
      studentgroup: [],
      groupid: "",
      groupname: "",
      studentid1: "",
      studentname1: "",
      studentid2: "",
      studentname2: "",
      studentid3: "",
      studentname3: "",
      studentid4: "",
      studentname4: "",     
      supervisorname: "",
      cosupervisorname: "",
      panelmembername: "",
      status: "",
    };
  }


  componentDidMount() {  

    if (localStorage.userToken) {
      const usertoken = localStorage.userToken;
      const decoded = jwt_decode(usertoken);
      this.setState({
        groupId: decoded.groupId,
      });
    }

    setTimeout(() => {
      this.retrivesgroup();
    }, 1000);
  }

  retrivesgroup() {
    const gId = this.state.groupId; 
    console.log(gId);

    axios.get(`http://localhost:5000/stugroup/${gId}`).then((res) => {
      if (res.data.success) {
        console.log("scuuess");
        this.setState({
          studentgroup: res.data.stugroup,       
          groupid:res.data.stugroup.groupid,
          groupname:res.data.stugroup.groupname,
          studentid1:res.data.stugroup.studentid1,
          studentname1:res.data.stugroup.studentname1,
          studentid2:res.data.stugroup.studentid2,
          studentname2:res.data.stugroup.studentname2,
          studentid3:res.data.stugroup.studentid3,
          studentname3:res.data.stugroup.studentname3,
          studentid4:res.data.stugroup.studentid4,
          studentname4:res.data.stugroup.studentname4,    
          supervisorname:res.data.stugroup.supervisorname,
          cosupervisorname:res.data.stugroup.cosupervisorname,
          panelmembername:res.data.stugroup.panelmembername,
          status:res.data.stugroup.status,
        });

        console.log(this.state.studentgroup);
      }
    });
  }

  render() {
    return (
      
      <div className="container px-5 my-5">
        <div className="float-left my-3">
          &nbsp;
          <h2>View Student Group (Student)</h2>
        </div>
        <hr />       

        <div class="card mb-3 col-md-12 card border-dark my-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={image}
                style={{ height: "580px", width: "420px" }}
                className="img-fluid rounded-start mt-1"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div className="card-header text-center">
                <h3>{this.state.groupname} - {this.state.groupid}</h3>
              </div>
              <div class="card-body mx-5 my-5">
                <h5>
                  <span style={{ fontSize: "24px" }}>Student_1 : </span>
                  <span
                    className="text-primary"
                    style={{ fontSize: "19px" }}
                  >{this.state.studentid1} - {this.state.studentname1}</span>
                </h5>
                <h5>
                  <span style={{ fontSize: "24px" }}>Student_2 : </span>
                  <span
                    className="text-primary"
                    style={{ fontSize: "19px" }}
                  >{this.state.studentid2} - {this.state.studentname2}</span>
                </h5>

                <h5>
                  <span style={{ fontSize: "24px" }}>Student_3 : </span>
                  <span
                    className="text-primary"
                    style={{ fontSize: "19px" }}
                  >{this.state.studentid3} - {this.state.studentname3}</span>
                </h5>

                <h5>
                  <span style={{ fontSize: "24px" }}>Student_4 : </span>
                  <span
                    className="text-primary"
                    style={{ fontSize: "19px" }}
                  >{this.state.studentid4} - {this.state.studentname4}</span>
                </h5>
                <br />
                <h5>
                  <span style={{ fontSize: "24px" }}>Supervisor : </span>
                  <span
                    className="text-primary"
                    style={{ fontSize: "19px" }}
                  >{this.state.supervisorname}</span>
                </h5>

                <h5>
                  <span style={{ fontSize: "24px" }}>Cosupervisor : </span>
                  <span
                    className="text-primary"
                    style={{ fontSize: "19px" }}
                  >{this.state.cosupervisorname}</span>
                </h5>

                <h5>
                  <span style={{ fontSize: "24px" }}>Panelmember : </span>
                  <span
                    className="text-primary"
                    style={{ fontSize: "19px" }}
                  >{this.state.panelmembername}</span>
                </h5>
                <br />
                <h4>
                  <span style={{ fontSize: "24px" }}>Status : </span>
                  <span
                    className="text-primary"
                    style={{ fontSize: "19px" }}
                  >{this.state.status}</span>
                </h4>
              </div>
              <div className="col-md-3 px-5">
                <a className="btn btn-outline-primary" type="submit" href={`/home`}>
                  <i className="fa fa-arrow-circle-left"> Back </i>
                </a>
              </div>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

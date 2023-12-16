import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";
import image from "../../../images/group.jpg";

export default class ViewStudentGroupAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentgroup: [],
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/sgroup/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          studentgroup: res.data.stugroup,
        });

        console.log(this.state.studentgroup);
      }
    });
  }
  render() {
    const {
      groupid,
      groupname,
      studentid1,
      studentname1,
      studentid2,
      studentname2,
      studentid3,
      studentname3,
      studentid4,
      studentname4,
      supervisorname,
      cosupervisorname,
      panelmembername,
      status,
    } = this.state.studentgroup;

    return (

      <div className="container px-5 my-3">
         <br />
        <AdminNavBar />
        <br />

        <div className="float-left my-3">
          &nbsp;
          <h2>View Student Group (Admin)</h2>
        </div>
        <hr />

        <div class="card mb-3 col-md-12 card border-dark my-3">
          <div class="row g-0">
            <div class="col-md-4">
              <img
                src={image}
                style={{ height: "580px" ,width:"420px"}}
                className="img-fluid rounded-start mt-1"
                alt="..."
              />
            </div>
            <div class="col-md-8">
              <div className="card-header text-center">
                <h3>
                  {groupname} - {groupid}
                </h3>
              </div>
              <div class="card-body mx-5 my-5">
                <h5>
                  <span style={{ fontSize: "24px" }}>Student_1 : </span>
                  <span className="text-primary" style={{ fontSize: "19px" }}>
                 
                    {studentid1} - {studentname1}
                  </span>
                </h5>
                <h5>
                  <span style={{ fontSize: "24px" }}>Student_2 : </span>
                  <span className="text-primary" style={{ fontSize: "19px" }}>
                 
                    {studentid2} - {studentname2}
                  </span>
                </h5>

                <h5>
                  <span style={{ fontSize: "24px" }}>Student_3 : </span>
                  <span className="text-primary" style={{ fontSize: "19px" }}>
                 
                    {studentid3} - {studentname3}
                  </span>
                </h5>

                <h5>
                  <span style={{ fontSize: "24px" }}>Student_4 : </span>
                  <span className="text-primary" style={{ fontSize: "19px" }}>
                 
                    {studentid4} - {studentname4}
                  </span>
                </h5>
                <br />
                <h5>
                  <span style={{ fontSize: "24px" }}>Supervisor : </span>
                  <span className="text-primary" style={{ fontSize: "19px" }}>
                 
                    {supervisorname}
                  </span>
                </h5>

                <h5>
                  <span style={{ fontSize: "24px" }}>Cosupervisor : </span>
                  <span className="text-primary" style={{ fontSize: "19px" }}>
                 
                    {cosupervisorname}
                  </span>
                </h5>

                <h5>
                  <span style={{ fontSize: "24px" }}>Panelmember : </span>
                  <span className="text-primary" style={{ fontSize: "19px" }}>
                 
                    {panelmembername}
                  </span>
                </h5>
                <br />
                <h4>
                  <span style={{ fontSize: "24px" }}>Status : </span>
                  <span className="text-primary" style={{ fontSize: "19px" }}>
                 
                    {status}
                  </span>
                </h4>
              </div>
              <div className="col-md-3 px-5">
                <a className="btn btn-outline-primary" type="submit" href={`/student/groups/view`}>
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

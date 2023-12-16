import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default class RequestSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      requestsummary: [],     
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
      this.retriverequest();
    }, 1000);
  }

  retriverequest() {

    const gId = this.state.groupId;  
    console.log(gId);

    axios.get(`http://localhost:5000/request/summary/${gId}`).then((res) => {
      if (res.data.success) {
        this.setState({
          requestsummary: res.data.supervisorrequest,          
        });

        console.log(this.state.requestsummary);
      }
    });
  }

   render() {
    return (      
      <div className="container px-5 my-3">      
        <div className="row">
          <div className="float-left col-lg-9 mt-2 mb-2">
            &nbsp;
            <h2>Request Summary - {this.state.groupId} </h2>
            &nbsp;            
          </div>         
        </div>

        <table className="table ">
          <thead >
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Position</th>
              <th scope="col">Feedback</th>
              <th scope="col">Status</th>      
            </tr>
          </thead>
          <tbody>
            {this.state.requestsummary.map((requestsummary, index) => (
              <tr >
                <th>{index + 1}</th>
                <td>{requestsummary.name}</td>
                <td>{requestsummary.position}</td>
                <td>{requestsummary.feedback}</td>
                <td >           
                <a
                    className="btn btn-secondary disabled"
                    href=""
                  >
                  {requestsummary.status}
                  </a>
              </td>
              </tr>
            ))}
          </tbody>

         
            


        </table>
      </div>
    );
  }
}
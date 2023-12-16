import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export class StudentMarksSp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: "",
      marks: [],
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
      this.retriveMarks();
    }, 1000);
  }

  //retrive marks
  retriveMarks() {
    const id = this.state.groupId;
    axios.get(`http://localhost:5000/marks/group/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          marks: res.data.existingMarks,
        });

        console.log(this.state.marks);
      }
    });
  }

  render() {
    return (
      <div className="me-2">
        <table className="table table-white  mt-4 mb-4">
          <thead>
            <tr>
              <th scope="col">Submission Type</th>
              <th scope="col">Marks (?/100)</th>
              <th scope="col">Grading Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.marks.map((marks, index) => (
              <tr>
                <td>{marks.type}</td>

                <td>{marks.marks}</td>
                <td>{marks.gradingStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

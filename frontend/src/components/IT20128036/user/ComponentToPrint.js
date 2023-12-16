import React, { Component } from "react";
import axios from "axios";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      marks: [],
    };
  }

  componentDidMount() {
    document.title = "Marks";
    this.retriveMarks();
  }
  //retrive marks
  retriveMarks() {
    axios.get("http://localhost:5000/marks").then((res) => {
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
      <div className="container">
        <table className="table table-light table-striped table-hover mt-4 mb-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Group ID</th>
              <th scope="col">Submission Type</th>
              <th scope="col">Marks (?/100)</th>
              <th scope="col">Grading Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.marks.map((marks, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>

                <td>{marks.groupId}</td>

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

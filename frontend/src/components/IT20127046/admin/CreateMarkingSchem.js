import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";
import swal from 'sweetalert';

export default class CreateMarkingSchem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: "",
      assignment: "",
      criteria: "",
      allocateMark: "",
      markingSchemTitleID: "",
      markingCriteria: [],
      addCriteriaBtn: true
    };
  }

  componentDidMount() {
    document.title = "Create Marking Scheme";
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

  onSubmitTitle = (e) => {
    e.preventDefault();
    const { moduleName, assignment } = this.state;

    const data = {
      moduleName: moduleName,
      assignment: assignment,
    };
    console.log(data);

    axios.post("http://localhost:5000/add/markingTitle", data).then((res) => {
      if (res.data.success) {
        swal("Title Added");

        this.setState({
          markingSchemTitleID: res.data.saveTitle,
          addCriteriaBtn: false
        });
      }
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { markingSchemTitleID, criteria, allocateMark } = this.state;

    const data = {
      markingSchemTitleID: markingSchemTitleID,
      criteria: criteria,
      allocateMark: allocateMark,
    };

    console.log(data);

    axios.post("http://localhost:5000/add/marking", data).then((res) => {
      if (res.data.success) {
        //swal("Marking Criteria Added");

        this.setState({
          criteria: "",
          allocateMark: "",
        });
      }
    });

    setTimeout(() => {
      this.getMarkingCriteria();
    }, 1000);
  };

  getMarkingCriteria() {
    const titleID = this.state.markingSchemTitleID;

    axios.get(`http://localhost:5000/markings/get/${titleID}`).then((res) => {
      if (res.data.success) {
        this.setState({
          markingCriteria: res.data.existingMarkingCriteria,
        });
      }
    });
  }

  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete this Marking Scheme Criteria",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {

        axios.delete(`http://localhost:5000/makingCriteria/delete/${id}`).then((res) => {
            swal("Deleted Successfull!", {
                icon: "success",
            });

            setTimeout(() => {
                this.retrieveTitles();
            }, 1000);
        }); 
      } else {}
    });
  };

  // retriveCriteria() {
  //     axios.get("http://localhost:5000/get/markings").then((res) => {
  //         if (res.data.success) {
  //             this.setState({
  //                 markingCriteria: res.data.existingMarkingDetails,
  //             });

  //             console.log(this.state.markingCriteria);
  //         }
  //     });
  // }

  render() {
    return (
      <div className="container">
        <br />
        <AdminNavBar />
        <br />
        <h4>Create Marking Schem</h4>
        <hr />

        <div className="container p-3 mb-2 bg-light text-dark">
          <div className="row">
            <div className="col">
              <div className="border border-secondary m-2 p-4 rounded">
                <form onSubmit={this.onSubmitTitle}>
                  <h4>Set Marking Schem Title</h4>

                  <label htmlFor="moduleName">Module</label>
                  <input
                    style={{ width: "400px" }}
                    type="text"
                    className="form-control"
                    id="moduleName"
                    name="moduleName"
                    value={this.state.moduleName}
                    onChange={this.handleInputChange}
                    required
                  />

                  <label htmlFor="assignment">Assignment</label>
                  <input
                    style={{ width: "400px" }}
                    type="text"
                    className="form-control"
                    id="assignment"
                    name="assignment"
                    value={this.state.assignment}
                    onChange={this.handleInputChange}
                    required
                  />

                  <button type="submit" className="btn btn-outline-primary mt-2 mb-2">
                    Set Title&nbsp; <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className="col">
              <div className="border border-secondary m-2 p-4 rounded">
                <form onSubmit={this.onSubmit}>
                  <h4>Set Marking Scheme Criteria</h4>

                  <label htmlFor="criteria">Criteria</label>
                  <input
                    style={{ width: "400px" }}
                    type="text"
                    className="form-control"
                    id="criteria"
                    name="criteria"
                    value={this.state.criteria}
                    onChange={this.handleInputChange}
                    required
                  />

                  <label htmlFor="allocateMark">Allocate Mark</label>
                  <input
                    style={{ width: "400px" }}
                    type="text"
                    className="form-control"
                    id="allocateMark"
                    name="allocateMark"
                    value={this.state.allocateMark}
                    onChange={this.handleInputChange}
                    required
                    pattern="[0-9]{1,2}"
                    title="Input only number less than 100"
                  />

                  <button type="submit" className="btn btn-outline-primary mt-2 mb-2" disabled={this.state.addCriteriaBtn}>
                    Add Criteria&nbsp; <i class="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <center>
          <a className="btn btn-outline-success m-2" onClick={() => {
            swal("Marking Scheme Added successful").then((value) => {window.location = '/view/marking';})
          }}>Submit Marking Scheme</a>
        </center>

        <br />
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
                <th scope="col">
                  <center>No</center>
                </th>
                <th scope="col">
                  <center>Criteris</center>
                </th>
                <th scope="col">
                  <center>Allocate Mark</center>
                </th>
              </tr>
            </thead>

            <tbody>
              {this.state.markingCriteria.map((data, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data.criteria}</td>
                  <td>{data.allocateMark} </td>

                  <td className="text-center">
                    <a className="btn btn-outline-success" href={``}>
                      <i className="fa fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-outline-danger"
                      href="#"
                      onClick={() => this.onDelete(data._id)}
                    >
                      <i className="fa fa-trash"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
          <br/>
          </div>
        </div>
      </div>
    );
  }
}

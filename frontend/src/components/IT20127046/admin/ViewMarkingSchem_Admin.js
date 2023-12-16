import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";
import UpdateMarkingTitle from "./MarkingSchemUpdate";
import swal from 'sweetalert';

export default class ViewMarkingSchem_Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: "",
      assignment: "",
      criteria: "",
      allocateMark: "",
      markingSchemTitleID: "",
      markingCriteria: [],
      markingSchemTitle: [],
      tableSection: true,
      headerSection: true,
      updateID: "",
    };
  }

  componentDidMount() {
    document.title = "Marking Scheme";

    this.retrieveTitles();
  }

  // Get marking titles from db
  retrieveTitles() {
    axios.get("http://localhost:5000/getAll/markingTitles").then((res) => {
      if (res.data.success) {
        this.setState({
          markingSchemTitle: res.data.existingMarkingTitles,
        });
        console.log(this.state.markingSchemTitle);
      }
    });
  }

  // Get marking criteria bellowns to marking title
  onGetMarkingCriteria = (titleID, moduleName, assignment) => {
    this.setState({
      moduleName: moduleName,
      assignment: assignment,
    });

    this.getMarkingCriteria(titleID);
  };

  getMarkingCriteria(titleID) {
    axios.get(`http://localhost:5000/markings/get/${titleID}`).then((res) => {
      if (res.data.success) {
        this.setState({
          markingCriteria: res.data.existingMarkingCriteria,
          tableSection: false,
          headerSection: true,
        });
      }
      console.log(this.state.markingCriteria);
    });
  }

  // After clcik marking titles update -> open update section
  onUpdate = (titleID) => {
    this.setState({
      updateID: titleID,
      headerSection: false,
    });
  };

  // This return from MarkingSchemeUpdate child componenet
  changeUpdateSection = (returnState) => {

    if(returnState) {
        this.setState({
            headerSection: true,
            tableSection: true
        });
        setTimeout(() => {
            this.retrieveTitles();
            //this.getMarkingCriteria(updateid);
        }, 1000);
    }else{
        this.setState({
            headerSection: true
        });
    }
    
  };

  // Delete specific marking scheme title
  onDeleteTitle = (titleID) => {
    // Delete conformation alert
    swal({
      title: "Are you sure?",
      text: "Delete this Marking Scheme",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {

        axios.delete(`http://localhost:5000/markingTitle/delete/${titleID}`).then((res) => {
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

  // Delete specific marking scheme criteria
  onDeleteCriteria = (criteriaID) => {
    swal({
        title: "Are you sure?",
        text: "Delete this Marking Scheme Criteria",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
  
          axios.delete(`http://localhost:5000/makingCriteria/delete/${criteriaID}`).then((res) => {
              swal("Deleted Successfull!", {
                  icon: "success",
              });
  
              setTimeout(() => {
                  this.retrieveTitles();
              }, 1000);
          }); 
        } else {}
      });
  }

  render() {
    return (
      <div className="container">
        <br />
        <AdminNavBar />
        <br />
        <h4>Marking Schemes</h4>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <h6>View Marking Schemes</h6>

              <center>
                <a className="btn btn-success m-2" href="/add/marking">
                  Create Marking Scheme
                </a>
              </center>

              <div className="container p-3 mb-2 bg-light text-dark">
                <hr />
                {this.state.markingSchemTitle.map((data, index) => (
                  <div key={index}>
                    <h6>{data.moduleName}</h6>
                    <p>{data.assignment}</p>

                    <a
                      className="btn btn-outline-primary m-2"
                      href="#"
                      onClick={() =>
                        this.onGetMarkingCriteria(
                          data._id,
                          data.moduleName,
                          data.assignment
                        )
                      }
                    >
                      View
                    </a>
                    <a
                      className="btn btn-outline-success m-2"
                      onClick={() => this.onUpdate(data._id)}
                    >
                      Edit
                    </a>
                    <a
                      className="btn btn-outline-danger m-2"
                      onClick={() => this.onDeleteTitle(data._id)}
                    >
                      Delete
                    </a>
                    <hr />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-9">
              {this.state.headerSection ? (
                <h6> View Marking Secheme Details</h6>
              ) : (
                <UpdateMarkingTitle
                  data={{
                    updateID: this.state.updateID,
                    chnageSection: this.changeUpdateSection,
                  }}
                />
              )}

              {this.state.tableSection ? (
                <p>Select a Marking Scheme</p>
              ) : (
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
                          <th scope="col">No</th>
                          <th scope="col">Criteria</th>
                          <th scope="col">Allocate Mark</th>
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
                                <i className="fa fa-edit"></i>
                              </a>
                              &nbsp;
                              <a
                                className="btn btn-outline-danger"
                                href="#"
                                onClick={() => this.onDeleteCriteria(data._id)}
                              >
                                <i className="fa fa-trash"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <br />
                    <br />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

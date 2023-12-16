import React, { Component } from "react";
import axios from "axios";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";

export default class SupervisorDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      supervisordetails: [],
    };
  }

  componentDidMount() {
    this.retrieveSupervisorDetails();
  }

  retrieveSupervisorDetails() {
    axios.get("http://localhost:5000/supervisors").then((res) => {
      if (res.data.success) {
        this.setState({
          supervisordetails: res.data.existingsupervisordetails,
        });

        console.log(this.state.supervisordetails);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:5000/supervisor/delete/${id}`).then((res) => {
      swal("Are you sure to delete the Supervisor Details?", "", "warning");
      this.retrieveSupervisorDetails();
    });
  };

  filterData(supervisordetails,searchKey) {
    const result = supervisordetails.filter((supervisordetail) =>
      supervisordetail.supervisorid.toLowerCase().includes(searchKey)||
      supervisordetail.supervisorname.toLowerCase().includes(searchKey)||
      supervisordetail.researchfield.toLowerCase().includes(searchKey)||
      supervisordetail.email.toLowerCase().includes(searchKey)||

      supervisordetail.supervisorid.toUpperCase().includes(searchKey)||
      supervisordetail.supervisorname.toUpperCase().includes(searchKey)||
      supervisordetail.researchfield.toUpperCase().includes(searchKey)||
      supervisordetail.email.toUpperCase().includes(searchKey)||

      supervisordetail.supervisorid.includes(searchKey)||
      supervisordetail.supervisorname.includes(searchKey)||
      supervisordetail.researchfield.includes(searchKey)||
      supervisordetail.email.includes(searchKey)
    
      );
    this.setState({ supervisordetails: result });
  }
 

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:5000/supervisors").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingsupervisordetails, searchKey);
      }      
    });
  };

  render() {
    return (
      <div className="container px-5 my-3">
         <br />
        <AdminNavBar />
        <br />

        <div className="row">
          <div className="float-left col-lg-9 mt-2 mb-2">
            &nbsp;
            <h2>Supervisor Details</h2>                    
          </div>         
        
          <div className="col-lg-3 mt-2 mb-2">
            &nbsp;
            <input
              className="form-control border border-dark"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            ></input>        
          </div>
          <hr />
        </div>

        <div>  
          <a className="btn btn-outline-success"  href={`/supervisor/add`}>
              <i className="fa fa-edit"></i>&nbsp;Add New Supervisor
          </a>
        </div>
        &nbsp;

        <table className="table table-striped table-bordered">
          <thead className=" text-light" style={{ background: "#000080" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Supervisor ID</th>
              <th scope="col">Supervisor Name</th>
              <th scope="col">Research Field</th>
              <th scope="col">Email</th>       
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.supervisordetails.map((supervisordetails, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{supervisordetails.supervisorid}</td>
                <td>{supervisordetails.supervisorname}</td>
                <td>{supervisordetails.researchfield}</td>
                <td>{supervisordetails.email}</td>

               

                <td>                  
                  <a
                    className="btn btn-outline-success"
                    href={`/supervisor/update/${supervisordetails._id}`}
                  >
                    <i className="fa fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-outline-danger"
                    href="#"
                    onClick={() => this.onDelete(supervisordetails._id)}
                  >
                    <i className="fa fa-trash"></i>&nbsp;Delete
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
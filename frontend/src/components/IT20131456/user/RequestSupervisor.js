import React, { Component } from "react";
import axios from "axios";

export default class RequestSupervisor extends Component {

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
        <div className="row">
          <div className="float-left col-lg-9 mt-2 mb-2">
            &nbsp;
            <h2>Send Request</h2>                    
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
        </div>
          <hr/> 
          <br/>
        {this.state.supervisordetails.map((supervisordetails, index) => (

        <div class="card border border-dark my-3">
          <h5 class="card-header">{index + 1} - {supervisordetails.researchfield}</h5>
            <div class="card-body">
              <h5 class="card-title">{supervisordetails.supervisorname}</h5>           
              <p class="card-text">{supervisordetails.email}</p>
              <a href={`/create/request/${supervisordetails._id}`} class="btn btn-outline-primary">
              <i class="fa fa-paper-plane"></i>&nbsp;Send Request
              </a>
            </div>
        </div>        
        ))}
        
        
      </div>
    );
  }
}

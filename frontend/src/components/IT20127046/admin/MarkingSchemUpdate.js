import React, { Component } from "react";
import axios from "axios";
import swal from 'sweetalert';

export default class MarkingSchemUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateID: "",
      moduleName: "",
      assignment: "",
    };
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

  // Get id send from ViewMarkingScheme_Admin parent components and get marking title details using id
  componentDidMount() {
    document.title = "Update Marking Scheme";

    const updateid = this.props.data.updateID;
    
    this.setState({
      updateID: updateid
    });

    axios.get(`http://localhost:5000/markingTitle/get/${updateid}`).then((res) => { 
        if(res.data.success){
            this.setState({
              moduleName:res.data.schemeTitle.moduleName,
              assignment:res.data.schemeTitle.assignment,
            });
            
        }
    });
  }

  // After click update button -> update details and callback parent componenet
  onSubmitUpdate = (e) => {
    e.preventDefault();

    const id = this.state.updateID;

    const {moduleName, assignment} = this.state;

        const data = {
          moduleName:moduleName,
          assignment:assignment
        }

        axios.put(`http://localhost:5000/markingTitle/update/${id}`,data).then((res)=>{
            if(res.data.success){
                swal({
                    title: "Update Successfull!",
                    icon: "success"
                  });  
            }
        })

    this.props.data.chnageSection(true);

  };

  render() {
    return (
      <div className="container">
        <div className="container p-3 mb-2 text-dark" style={{ backgroundColor: "#F0FFFF" }}>

        <a className="btn btn-outline-danger mb-2" onClick={() => {this.props.data.chnageSection(false);}}>
            <i class="fa fa-times" aria-hidden="true"></i>
        </a>
        
          <h6>Update Marking Scheme</h6>
          
          <form onSubmit={this.onSubmitUpdate}>
            <div className="row">
              <div className="col">
                <label htmlFor="moduleName">Module</label>
                <input
                  style={{ width: "350px" }}
                  type="text"
                  className="form-control"
                  id="moduleName"
                  name="moduleName"
                  value={this.state.moduleName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col">
                <label htmlFor="assignment">Assignment</label>
                <input
                  style={{ width: "350px" }}
                  type="text"
                  className="form-control"
                  id="assignment"
                  name="assignment"
                  value={this.state.assignment}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <br/>

            <button type="submit" className="btn btn-outline-primary mt-2 mb-2">
              Update&nbsp; <i class="fa fa-edit" aria-hidden="true"></i>
            </button>

          </form>
        </div>

      </div>
    );
  }
}

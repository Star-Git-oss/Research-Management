import React, { Component } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import AdminNavBar from "../../IT20125202/admin/AdminNavBar";
import swal from "sweetalert";

export default class DocumentTemp_Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentTemp: [],
    };
  }

  componentDidMount() {
    document.title = "Document Template";

    this.retrieveDocumentTemp();
  }

  // To get all data
  retrieveDocumentTemp() {
    axios.get("http://localhost:5000/template/getAll").then((res) => {
      if (res.data.success) {
        this.setState({
          documentTemp: res.data.exsitingDocumentTemp,
        });
        console.log(this.state.documentTemp);
      }
    });
  }

  // To delete data
  onDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete this Document",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5000/document/delete/${id}`)
          .then((res) => {
            swal("Deleted Successfull!", {
              icon: "success",
            });

            setTimeout(() => {
              this.retrieveDocumentTemp();
            }, 1000);
          });
      } else {
      }
    });

    // axios.delete(`http://localhost:5000/document/delete/${id}`).then((res) => {
    //   alert("Delete Successful");
    //   this.retrieveDocumentTemp();
    // });
  };

  // Download File
  downloadFile = (fileName) => {
    const data = {
      fileName: fileName,
    };

    axios({
      url: "http://localhost:5000/file/download",
      data,
      method: "POST",
      responseType: "blob",
    }).then((res) => {
      console.log(res);
      fileDownload(res.data, fileName);
    });
  };

  // Search
  handleSearchArea = (e) => {
    
    const serachKey = e.currentTarget.value;

    axios.get("http://localhost:5000/template/getAll").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.exsitingDocumentTemp, serachKey)
      }
    });
  }

  filterData(posts, serachKey) {
    const result = posts.filter((post) => 
      post.documentType.toLowerCase().includes(serachKey) ||
      post.otherType.toLowerCase().includes(serachKey) ||
      post.description.toLowerCase().includes(serachKey) ||
      post.files.toLowerCase().includes(serachKey)
    )
    
    this.setState({
      documentTemp:result
    })
  }

  render() {
    return (
      <div className="container">
        <br />
        <AdminNavBar />
        <br />
        <h4>Document Template</h4>
        <hr />

        <div className="container">
          <div>
            <a className="btn btn-success m-2" href="/add/documentTemp">
              Add Template
            </a>
          </div>
          <br />

          <div className="mb-4">
            <input
              style={{maxWidth:"400px"}} 
              type="search" 
              className="form-control border border-dark" 
              name="searchQuery"
              id="search" 
              placeholder="Serach....."
              onChange={this.handleSearchArea}
            />
          </div>

          <div className="container p-3 mb-2 bg-light text-dark">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Document Type</th>
                  <th scope="col">Other Type</th>
                  <th scope="col">Description</th>
                  <th scope="col">File</th>
                  <th scope="col">Preview</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.documentTemp.map((documentTemp, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{documentTemp.documentType}</td>
                    <td>{documentTemp.otherType}</td>
                    <td>{documentTemp.description}</td>
                    <td>{documentTemp.files}</td>
                    <td>
                      <a
                        className="btn btn-outline-primary"
                        onClick={() => this.downloadFile(documentTemp.files)}
                      >
                        Download
                      </a>
                    </td>
                    <td>
                      <a
                        className="btn btn-outline-success"
                        href={`/edit/documentTemp/${documentTemp._id}`}
                      >
                        Update
                      </a>
                    </td>
                    <td>
                      <a
                        className="btn btn-outline-danger"
                        onClick={() => this.onDelete(documentTemp._id)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

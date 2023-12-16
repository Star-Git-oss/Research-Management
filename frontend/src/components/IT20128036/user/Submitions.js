import React, { useState, useEffect, set } from "react";
import axios from "axios";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";

function AddSubmition() {
  const [groupId, setgroupId] = useState("");
  const [type, settype] = useState("");
  const [file, setfile] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    const usertoken = localStorage.userToken;
    const decoded = jwt_decode(usertoken);

    setgroupId(decoded.groupId);
  }, []);

  // componentDidMount() {
  //   document.title = "User Profile";
  //   if (localStorage.userToken) {
  //     const usertoken = localStorage.userToken;
  //     const decoded = jwt_decode(usertoken);
  //     this.setState({
  //       userType: decoded.type,
  //     });
  //   }

  // }

  const onChangeFile = (e) => {
    setfile(e.target.files[0]);
  };

  const onChangeClick = (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("groupId", groupId);
    formdata.append("type", type);
    formdata.append("file", file);
    formdata.append("description", description);

    setgroupId("");
    settype("");
    setdescription("");
    //save submition
    axios
      .post("http://localhost:5000/submition", formdata)
      .then(() => {
        swal("Submitted Successfully !", "", "success").then((value) => {
          window.location = `/student/submitionsp/view`;
        });
      })
      .catch((err) => {
        swal("Error", "Something Wrong !", "warning");
      });
  };

  return (
    <div className="ms-4 mt-4 mb-4">
      <div
      // style={{
      //   margin: "20px 50px 50px 0px",
      //   padding: "50px",
      //   backgroundColor: "",
      //   border: "2px solid gray",
      //   borderRadius: "10px",
      // }}
      >
        <center>
          <h3 style={set}>Add Submission</h3>
        </center>
        <br />
        <form onSubmit={onChangeClick} encType="multipart/form-data">
          <div className="row">
            <div className="col-sm-5">
              <div class="mb-3">
                <label for="exampleInputText1" class="form-label">
                  <strong> Group ID</strong>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="groupId"
                  name="groupId"
                  pattern="G[0-9]{3}"
                  title="Group ID is Invalid"
                  placeholder="Enter Group ID -Gxxx"
                  aria-describedby="emailHelp"
                  value={groupId}
                  onChange={(e) => {
                    setgroupId(e.target.value);
                  }}
                  required
                  disabled
                />
              </div>
            </div>

            <div className="col-sm-7 ">
              <label for="exampleInputText1" class="form-label">
                <strong>Submission Type</strong>
              </label>

              <select
                class="form-select"
                aria-label="Default select example"
                name="type"
                value={type}
                onChange={(e) => {
                  settype(e.target.value);
                }}
                required
              >
                <option selected> Select Type</option>
                <option value="Topic Assessment Document">
                  Topic Assessment Document
                </option>
                <option value="Proposal Document">Proposal Document</option>
                <option value="Presentation Slides">Presentation Slides</option>
                <option value="Final Thesis">Final Thesis</option>
              </select>
            </div>
          </div>

          <div class="mb-3 mt-3">
            <label for="exampleInputText1" class="form-label">
              <strong>Enter Description</strong>
            </label>
            <textarea
              rows="4"
              cols="50"
              class="form-control"
              id="description"
              name="description"
              placeholder="Enter Description ......."
              aria-describedby="emailHelp"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              required
            />
          </div>

          <div class="mb-3">
            <label for="formFile" class="form-label">
              {" "}
              <strong> File Input</strong>{" "}
            </label>
            <input
              class="form-control"
              type="file"
              id="file"
              filename="file"
              onChange={onChangeFile}
              required
            />
          </div>
          <center>
            <button type="submit" class="btn btn-light btn-outline-dark">
              {" "}
              <i class="fa fa-plus-circle" aria-hidden="true">
                {" "}
                &nbsp;<strong>Submit</strong>
              </i>
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}
export default AddSubmition;

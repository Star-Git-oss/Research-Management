import React from "react";
import emailjs from "emailjs-com";

const CreateRequest = () => {

 
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hf0hikc",
        "template_ajn4t7c",
        e.target,
        "AopuNlecWrsPFXStu"
      )
      .then((res) => {
        console.log(res);
        swal("Request Send Successfull", "", "success")        
        
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="container px-5 my-3">
      <br/>
      <div className="container border border-dark bg-light mt-5 ">
        <div className="form-group row">
          <div className="col-lg-12 margin-tb">
            <div className="float-left">
              &nbsp;
              <h2>New Request</h2>
              &nbsp;
            </div>
          </div>
        </div>
        <form onSubmit={sendEmail}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <strong>Supervisor Name :</strong>
                <input
                  type="text"
                  className="form-control"
                  name="supervisorname"
                  placeholder="Enter supervisor name"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Group ID :</strong>
                <input
                  type="text"
                  className="form-control"
                  name="groupid"
                  pattern="[G]+[0-9]{3}"
                  placeholder="Enter group id"
                  required
                />
              </div>
            </div>
          </div>
          &nbsp;
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <strong>Subject :</strong>
                <select className="form-control" name="subject">
                  <option value="Not">Not Selected</option>
                  <option value="Selecting Supervisor for a Research Project">
                    Selecting Supervisor for a Research Project
                  </option>
                  <option value="Selecting Co Supervisor for a Research Project">
                    Selecting Co Supervisor for a Research Project
                  </option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <strong>Research Topic :</strong>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter research topic"
                  name="topic"
                  required
                />
              </div>
            </div>
          </div>
          &nbsp;
          <div className="col-md-6">
            <div className="form-group">
              <strong>Discription (word count-75) :</strong>
              <textarea
                type="text"
                className="form-control"
                rows="3"
                maxLength="75"
                name="discription"
                placeholder="Discription "
                required
              />
            </div>
          </div>
          &nbsp;
          <div className="col-md-12">
            <div className="form-group">
              <button
                className="btn btn-outline-primary"
                type="submit"
                value="send"                
              >
                <i className="fa fa-paper-plane" > Send </i>
              </button>
            </div>
          </div>
          &nbsp;
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;


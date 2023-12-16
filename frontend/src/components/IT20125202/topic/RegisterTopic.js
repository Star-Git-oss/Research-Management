//topic registration
import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';

export default class RegisterTopic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupId: "",
            topicR: "",
            description: "",
            status: "Pending",
            comments: ""
        }
    }

    componentDidMount() {
        document.title = "Topic Registration"

        // redirect to the login page if the user is not logged in
        if (!localStorage.userToken) {
            swal("Please login first", "", "warning")
                .then((value) => {
                    if (value) {
                        this.props.history.push(`/user/login`)
                        window.location.reload();
                    }

                });

        }

        //get group id using the user token
        const usertoken = localStorage.userToken;
        const decoded = jwt_decode(usertoken);

        const id = decoded.groupId
        this.setState({
            groupId: id
        })
    }

    handleInputChange = (e) => {

        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { groupId, topicR, description, status, comments } = this.state;

        const data = {
            groupId: groupId,
            topicR: topicR,
            description: description,
            status: status,
            comments: comments
        }
        // console.log(data)

        // Validations-----------------------------------------------------------------
        let validated = true;

        if (groupId === '') {
            validated = false;
            swal({
                title: "",
                text: "You still do not have a group",
                icon: "warning",
            });
        }
        else if (topicR === '') {
            validated = false;
            swal({
                title: "",
                text: "Please enter the topic",
                icon: "warning",
            });
        }
        else if (description === '') {
            validated = false;
            swal({
                title: "",
                text: "Please enter a description about your project",
                icon: "warning",
            });
        }

        // save the validated data
        if (validated) {
            axios.post('http://localhost:5000/topic/save', data).then((res) => {
                if (res.data.success) {
                    swal("Registered successfully!", "", "success")
                        .then((value) => {
                            if (value) {
                                this.props.history.push(`/student/topics`)
                                window.location.reload();
                            }

                        });
                }
            })
        }

    }

    render() {
        return (
            <div className="container" style={{ padding: '50px 50px 50px 50px', background: 'white', minHeight: '100vh' }}>
                <div className='col-lg-9 mt-2 mb-2'>
                    <h1>Research Topic Registration</h1>
                </div>
                <hr />
                <div className='col-md-8 mt-4 mx-auto'>
                    {/* <h1 className='h3 mb-3 font-weight-normal'>Research Topic Registration</h1> */}
                    <br />
                    <form className='needs-validation' noValidate>
                        <div className='form-group' style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}><b>Group ID</b></label>
                            <input
                                type="text"
                                className='form-control'
                                name="groupId"
                                placeholder="Enter your Group ID"
                                value={this.state.groupId}
                                onChange={this.handleInputChange}
                                required
                                readOnly
                            />
                        </div>

                        <div className='form-group' style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}><b>Topic</b></label>
                            <input
                                type="text"
                                className='form-control'
                                name="topicR"
                                placeholder="Enter research topic"
                                value={this.state.topicR}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className='form-group' style={{ marginBottom: '15px' }}>
                            <label style={{ marginBottom: '5px' }}><b>Description</b></label>
                            <textarea
                                type="text"
                                className='form-control'
                                name="description"
                                placeholder="Enter a description about the topic"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                required
                            />
                            {/* <input
                                type="text"
                                className='form-control'
                                name="description"
                                placeholder="Enter a description about the topic"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                required
                            /> */}
                        </div>


                        <button className='btn btn-outline-success' type="submit" style={{ maeginTop: '15px' }} onClick={this.onSubmit}>
                            <b><i className='far fa-check-square'></i>
                                &nbsp; Register</b>
                        </button>

                    </form>

                </div>
            </div>
        )
    }
}
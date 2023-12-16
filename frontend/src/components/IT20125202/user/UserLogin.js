import React, { Component } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

export default class UserLogin extends Component {
    componentDidMount() {
        localStorage.removeItem('userToken');
        document.title = "User Login"
    }

    constructor() {
        super();

        this.state = {
            idNumber: '',
            password: ''
        }

        //to handle the state changes
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            idNumber: this.state.idNumber,
            password: this.state.password
        }

        // validations----------------------------------------------------
        let validated = true;
        if (user.idNumber === '') {
            validated = false;
            swal({
                title: "",
                text: "Please enter your ID number",
                icon: "warning",
            });
        }
        else if (user.password === '') {
            validated = false;
            swal({
                title: "",
                text: "Please enter your password",
                icon: "warning",
            });
        }

        if (validated) {
            axios.post('http://localhost:5000/user/login', {
                idNumber: user.idNumber,
                password: user.password
            }).then(res => {
                swal("Login successful!", "", "success")
                    .then((value) => {
                        if (value) {
                            localStorage.setItem('userToken', res.data)
                            this.props.history.push(`/`)
                            window.location.reload();
                        }

                    });
            }).catch(err => {
                console.log(err);
                swal({
                    title: "",
                    text: "Please check your ID number and password",
                    icon: "warning",
                });
            })
        }
    }


    render() {
        return (
            <div>
                <div className="container" style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: 'white', paddingBottom: '100px', paddingTop: '50px', paddingLeft: '100px', paddingRight: '100px', height: '800px' }}>
                    <h1 style={{ textAlign: 'center', paddingBottom: '10px' }}>Research Project Management System</h1>
                    <hr />
                    <div className="col-md-8 mt-4 mx-auto">
                        
                        <h3 className="h3 mb-3 font-weight-normal" style={{ textAlign: 'center' }}>User Login</h3>
                        <br />
                        <form className="needs-validation" noValidate>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}><b>ID Number</b></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="idNumber"
                                    placeholder="Please enter your registration number"
                                    required
                                    value={this.state.idNumber}
                                    onChange={this.onChange}
                                />

                            </div>
                            <div className="form-group" style={{ marginBottom: '15px' }}>
                                <label style={{ marginBottom: '5px' }}><b>Password</b></label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Please enter the password"
                                    required
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />

                            </div>


                            <div className="d-grid gap-2">
                                <button
                                    className="btn btn-outline-dark"
                                    type="submit"
                                    style={{ marginTop: '15px', width: 'cover'}}
                                    onClick={this.onSubmit}
                                ><b>
                                    Login
                                </b>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

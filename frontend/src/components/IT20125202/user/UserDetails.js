//admin - view specific user details
// user- view user profile
import React, { Component } from 'react';
import axios from 'axios';
import AdminNavBar from '../admin/AdminNavBar';
import swal from 'sweetalert';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        document.title = "User Details"

        // redirect to the login page if the user is not logged in
        if (!localStorage.token) {
            swal("Please login first", "", "warning")
                .then((value) => {
                    if (value) {
                        this.props.history.push(`/admin/login`)
                        window.location.reload();
                    }

                });

        }

        const id = this.props.match.params.id;

        axios.get(`http://localhost:5000/user/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    user: res.data.user
                })

                // console.log(this.state.user);
            }
        })
    }

    render() {

        const { idNumber, name, email, groupId, type, dateRegistered } = this.state.user;
        return (
            <div className='container'>
                <br />
                <AdminNavBar />
                <br />
                <div className="container">
                    <div className='row'>
                        <div className='col-lg-9 mt-2 mb-2'>
                            <h1>User Details</h1>
                        </div>
                        <hr /><br />
                    </div>

                    <dl className='row'>
                        <dt className='col-sm-3'>ID Number</dt>
                        <dd className='col-sm-9'>{idNumber}</dd>

                        <dt className='col-sm-3'>Name</dt>
                        <dd className='col-sm-9'>{name}</dd>

                        <dt className='col-sm-3'>Email</dt>
                        <dd className='col-sm-9'>{email}</dd>

                        <dt className='col-sm-3'>Group ID</dt>
                        <dd className='col-sm-9'>{groupId}</dd>

                        <dt className='col-sm-3'>Type</dt>
                        <dd className='col-sm-9'>{type}</dd>

                        <dt className='col-sm-3'>Registered Date</dt>
                        <dd className='col-sm-9'>{dateRegistered}</dd>
                    </dl>


                    <a
                        href="/admin/users"
                        class="btn btn-outline-dark"
                        tabindex="-1"
                        role="button"
                        aria-disabled="true">
                        Back
                    </a>
                </div>

            </div>
        )
    }
}

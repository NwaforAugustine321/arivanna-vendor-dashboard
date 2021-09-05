import React, { Component } from 'react';
import Link from 'next/link';


class ContactCustomerCare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_first_name: '',
            user_last_name: '',
            user_email: '',
            user_phone_number: '',
            user_contact_query: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        return (
            <div className="ps-contact-info">
                <div className="container">
                    <div className="ps-section__heade">
                        <h3>Contact Customer Support</h3>
                    </div>
                    <div className="ps-section__content">
                        <form className="ps-form--order-tracking">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                <label>First Name</label>
                                <input
                                    className="form-control"
                                    name="user_first_name"
                                    type="text"
                                    placeholder="First Name"
                                    value={this.state.user_first_name}
                                    onChange={this.handleChange}
                                />
                            </div>
                                </div>
                                <div className=" col-md-6">
                                     <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    className="form-control"
                                    name="user_last_name"
                                    type="text"
                                    placeholder="Last Name"
                                    value={this.state.user_last_name}
                                    onChange={this.handleChange}
                                />
                            </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    className="form-control"
                                    name="user_email"
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.user_email}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    className="form-control"
                                    name="user_phone_number"
                                    type="text"
                                    placeholder="Phone Number"
                                    value={this.state.user_phone_number}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Reason For Contact</label>
                                <select
                                    className="form-control"
                                    name="user_contact_query"
                                    value={this.state.user_contact_query}
                                    onChange={this.handleChange}>
                                    <option>Choose your reason for contacting us</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <Link href="/">
                                    <button className="ps-btn ps-btn--fullwidth">
                                        Contact Us
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactCustomerCare;

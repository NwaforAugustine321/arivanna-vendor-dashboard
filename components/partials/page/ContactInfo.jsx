import React from 'react';
import Link from 'next/link';

const ContactInfo = () => (
    <div className="ps-contact-info">
        <div className="container">
            <div className="ps-section__header">
                <h3>Contact Us For Any Questions</h3>
            </div>
            <div className="ps-section__content">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Contact Directly</h4>
                            <p>
                                <Link href="/page/contact-info">
                                    <a>
                                        admin@utopiatech.io
                                    </a>
                                </Link>
                                
                                <span hidden>(+004) 912-3548-07</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Headquarters</h4>
                            <p>
                                <span>Queensland, Australia</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Work With Us</h4>
                            <p>
                                <span>Apply Online</span>
                                <a
                                    target="_blank"
                                    href="https://www.hr.utopiatech.io/apply">
                                    hr.utopiatech.io/apply
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Customer Service</h4>
                            <p>
                                <Link href="/page/contact-info">
                                <a >
                                  
                                    customercare@arivanna.com
                                </a>
                                </Link>
                                <span hidden>(800) 843-2446</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Media Relations</h4>
                            <p>
                                <a href="mailto:media@arivanna.com">
                                    media@arivanna.com
                                </a>
                                <span hidden>(801) 947-3564</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>Vendor Support</h4>
                            <p>
                                <a href="mailto:vendorsupport@arivanna.com">
                                    vendorsupport@arivanna.com
                                </a>
                                <span hidden>(801) 947-3100</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 ">
                        <div className="ps-block--contact-info">
                            <h4>customer support</h4>
                            <p>
                                <span>XXX-XXX-XXX-XX</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);  

export default ContactInfo;

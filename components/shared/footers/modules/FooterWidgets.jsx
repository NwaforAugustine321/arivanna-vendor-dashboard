import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

const FooterWidgets = ({auth}) => {

    const handleReportBug = () => {
        if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
            window.location = '/account/bug-report';
            
        } else {
            window.location = '/account/login';
        }
    };
    return (
        <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title">Contact us</h4>
            <div className="widget_content">
                <p hidden>Call us 24/7</p>
                <h3 hidden>1800 97 97 69</h3>
                <p>
                    Queensland, Australia <br />
                    <a href="mailto: customercare@utopiatech.io">
                        {' '}
                        customercare@utopiatech.io
                    </a>
                </p>
                <ul className="ps-list--social">
                    <li>
                        <a
                            className="facebook"
                            target="_blank"
                            href="https://www.facebook.com/Arivanna-108653488139297">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a
                            className="twitter"
                            target="_blank"
                            href="https://www.linkedin.com/company/79609613">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Quick links</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/terms">
                        <a>Terms, Conditions & Policies</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/returns-and-refunds">
                        <a>Returns & Refunds</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/faqs">
                        <a>FAQs</a>
                    </Link>
                </li>
                <li>
                    <a  onClick={handleReportBug}>Report a Bug</a>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Company</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/about-us">
                        <a>About Us</a>
                    </Link>
                </li>
                <li>
                    <Link href="/page/contact-us">
                        <a>Contact</a>
                    </Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Business</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/account/checkout">
                        <a>Checkout</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop">
                        <a>Shop</a>
                    </Link>
                </li>
                <li>
                    <Link href="/donate">
                        <a>Donate</a>
                    </Link>
                </li>
            </ul>
        </aside>
    </div>
    )
    
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});


export default connect(mapStateToProps)(FooterWidgets);

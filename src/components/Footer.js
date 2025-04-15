/* eslint-disable max-lines */
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import './Footer.css';

export default function Footer() {
    return (
        <MDBFooter className="text-lg-start text-muted footer-main">
            <section className="text-center d-flex justify-content-center justify-content-lg-between p-4 border-bottom footer-social-section container">
                <div className="me-5 d-none d-lg-block footer-social-text">
                    <span>Get connected with us on social networks</span>
                </div>

                <div className="footer-social-icons">
                    <Link to="/" className="me-4  footer-icon-link">
                        <MDBIcon fab icon="facebook-f" />
                    </Link>
                    <Link to="/" className="me-4  footer-icon-link">
                        <MDBIcon fab icon="twitter" />
                    </Link>
                    <Link to="/" className="me-4  footer-icon-link">
                        <MDBIcon fab icon="instagram" />
                    </Link>
                    <Link to="/" className="me-4 footer-icon-link">
                        <MDBIcon fab icon="linkedin" />
                    </Link>
                </div>
            </section>

            <section className="footer-content-section container">
                <MDBContainer className="text-md-start mt-5 footer-container container">
                    <MDBRow className="mt-3">
                        <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4 footer-col">
                            <h6 className="text-uppercase fw-bold mb-4 footer-heading">
                                <MDBIcon color="secondary" icon="gem" className="me-3" />
                                MAMM.
                            </h6>
                            <p className="footer-description">Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4 footer-col">
                            <h6 className="text-uppercase fw-bold mb-4 footer-heading">Businesses</h6>
                            <p>
                                <Link to="/" className="text-reset footer-link">
                                    Development
                                </Link>
                            </p>
                            <p>
                                <Link to="/" className="text-reset footer-link">
                                    Real State
                                </Link>
                            </p>
                            <p>
                                <Link to="/" className="text-reset footer-link">
                                    Green
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4 footer-col">
                            <h6 className="text-uppercase fw-bold mb-4 footer-heading">Useful links</h6>
                            <p>
                                <Link to="/" className="text-reset footer-link">
                                    News & Events
                                </Link>
                            </p>
                            <p>
                                <Link to="/" className="text-reset footer-link">
                                    Help
                                </Link>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4 footer-col">
                            <h6 className="text-uppercase fw-bold mb-4 footer-heading">Contact</h6>
                            <p>
                                <MDBIcon color="secondary" icon="home" className="me-2" /> Dhaka, Bangladesh
                            </p>
                            <p>
                                <MDBIcon color="secondary" icon="envelope" className="me-3" /> info@example.com
                            </p>
                            <p>
                                <MDBIcon color="secondary" icon="phone" className="me-3" /> +01 234 567 88
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className="text-center p-4 footer-copyright">
                © 2025 Copyright:
                <Link className="text-reset fw-bold footer-brand-link" to="https://arbeittechnology.com/">
                    Arbeit Technology
                </Link>
            </div>
        </MDBFooter>
    );
}

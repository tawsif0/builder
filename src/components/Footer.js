/* eslint-disable max-lines */
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import './Footer.css';

export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname !== '/') {
            navigate('/', { state: { fromFooter: true } });
        } else {
            scrollToHero();
        }
    };

    const scrollToHero = () => {
        const hero = document.getElementById('hero-section');
        if (hero) {
            hero.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (location.state?.fromFooter && location.pathname === '/') {
            scrollToHero();
        }
    }, [location]);

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
                            <div onClick={handleClick} role="button" className="mb-4 text-uppercase fw-bold footer-heading">
                                <h6>
                                    <i className="me-3 fas fa-gem text-secondary"></i> MAMM.
                                </h6>
                            </div>

                            <p className="footer-description">
                                MAMM redefines luxury real estate through excellence, innovation, and detail, delivering prestigious developments for discerning investors and buyers.
                            </p>
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
                                <MDBIcon color="secondary" icon="envelope" className="me-3" />
                                mammgrp@gmail.com
                            </p>
                            <p>
                                <MDBIcon color="secondary" icon="phone" className="me-3" />
                                +880 1711-989950
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

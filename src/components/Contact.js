/* eslint-disable max-lines */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';
import handshakeImage from '../assests/images/handshake.jpg';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const imageRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            imageRef.current,
            { clipPath: 'inset(0% 0% 0% 75%)' }, // Start fully hidden from right
            {
                clipPath: 'inset(0% 0% 0% 0%)', // Reveal completely
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1
                }
            }
        );
    }, []);

    return (
        <div ref={sectionRef} className="contact-section text-white py-5">
            <div className="container">
                <div className="row d-flex align-items-stretch">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 className="display-4 fw-bold mb-5">LET’S CONNECT</h1>

                        <Link to="/" className="text-decoration-none">
                            <div className="mb-4 contact-link p-2 rounded">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="text-danger mb-2">Clients</h4>
                                    <span className="text-danger fs-5">↗</span>
                                </div>
                                <p className="text-light m-0">Discover exquisite apartments, commercial spaces, and unmatched luxury with MAMM. to turn your dreams into a reality.</p>
                            </div>
                        </Link>

                        <hr className="border-light" />

                        <Link to="/contact/landowners" className="text-decoration-none">
                            <div className="mb-4 contact-link p-2 rounded">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="text-danger mb-2">Landowners</h4>
                                    <span className="text-danger fs-5">↗</span>
                                </div>
                                <p className="text-light">Share your land with MAMM. and be a part of the architectural splendor. Fill out the form to explore this partnership.</p>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-6 d-flex align-items-stretch">
                        <div className="w-100">
                            <img ref={imageRef} src={handshakeImage} alt="Handshake" className="contact-image w-100 h-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

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
    const headingRef = useRef(null);
    const clientLinkRef = useRef(null);
    const landownerLinkRef = useRef(null);
    const elementsRef = useRef([]);

    useEffect(() => {
        // Image reveal animation (unchanged)
        gsap.fromTo(
            imageRef.current,
            { clipPath: 'inset(0% 0% 0% 75%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: 1,
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Faster text animations with shorter duration and less delay
        elementsRef.current = [headingRef.current, clientLinkRef.current, landownerLinkRef.current];

        elementsRef.current.forEach((el, index) => {
            gsap.fromTo(
                el,
                {
                    x: -50, // Reduced initial offset for faster movement
                    opacity: 0,
                    ease: 'power3.out'
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6, // Faster duration (from 1.5s)
                    delay: index * 0.1, // Shorter stagger delay (from 0.2s)
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'top 50%',
                        toggleActions: 'play none none reset',
                        onEnter: () => gsap.set(el, { x: -50, opacity: 0 }),
                        onEnterBack: () => gsap.set(el, { x: -50, opacity: 0 })
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div ref={sectionRef} className="contact-section text-white py-5">
            <div className="container">
                <div className="row d-flex align-items-stretch">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h1 ref={headingRef} className="display-4 fw-bold mb-5">
                            LET'S CONNECT
                        </h1>

                        <Link to="/contact/clients" className="text-decoration-none">
                            <div ref={clientLinkRef} className="mb-4 contact-links p-2 rounded">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h4 className="text-danger mb-2">Clients</h4>
                                    <span className="text-danger fs-5">↗</span>
                                </div>
                                <p className="text-light m-0">Discover exquisite apartments, commercial spaces, and unmatched luxury with MAMM. to turn your dreams into a reality.</p>
                            </div>
                        </Link>

                        <hr className="border-light" />

                        <Link to="/contact/landowners" className="text-decoration-none">
                            <div ref={landownerLinkRef} className="mb-4 contact-links p-2 rounded">
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

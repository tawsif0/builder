/* eslint-disable max-lines */
import React, { useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Upcoming.css';
import heroDesktop from '../assests/images/upcoming.jpg';
import heroTablet from '../assests/images/upcoming.jpg';
import heroMobile from '../assests/images/upcoming-phone.jpg';

gsap.registerPlugin(ScrollTrigger);

const UpcomingSection = () => {
    const imageRef = useRef(null);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const filterRef = useRef(null);
    const messageBoxRef = useRef(null);

    useEffect(() => {
        // Hero section animations
        gsap.fromTo(
            titleRef.current,
            { y: 300, opacity: 1 },
            {
                y: 0,
                opacity: 2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top center',
                    end: 'center center',
                    scrub: 1
                }
            }
        );

        gsap.fromTo(
            filterRef.current,
            { y: 300, opacity: 1 },
            {
                y: 0,
                opacity: 1.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top center',
                    end: 'center center',
                    scrub: 1
                }
            }
        );

        gsap.fromTo(
            imageRef.current,
            { clipPath: 'inset(0% 25% 0% 25%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
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

        // Message box pop-up animation
        gsap.fromTo(
            messageBoxRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: messageBoxRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1,
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className="upcoming-page" ref={sectionRef}>
            {/* Hero Section */}
            <div className="section-upcoming-title-container">
                <h1 className="section-upcoming-title" ref={titleRef}>
                    UPCOMING
                </h1>
            </div>

            {/* Hero image container */}
            <Container fluid className="hero-upcoming-container position-relative overflow-hidden">
                <div className="upcoming-title-filter-overlay" ref={filterRef}>
                    UPCOMING
                </div>

                <motion.div className="hero-upcoming-picture" ref={imageRef}>
                    <picture>
                        <source media="(max-width: 480px)" srcSet={heroMobile} />
                        <source media="(max-width: 1024px)" srcSet={heroTablet} />
                        <img className="hero-upcoming-img" src={heroDesktop} alt="upcoming" loading="eager" />
                    </picture>
                </motion.div>
                <div className="hero-upcoming-overlay"></div>
            </Container>

            {/* Content Section */}
            <div className="upcoming-section text-white">
                <Container>
                    <div className="message-box text-center mb-5" ref={messageBoxRef}>
                        <h2 className="sections-title">Our Upcoming Projects</h2>
                        <p>
                            At MAMM Properties, we're constantly pushing boundaries to bring you innovative living spaces that redefine luxury. Our upcoming projects represent the next generation of
                            architectural excellence, combining cutting-edge design with sustainable living.
                        </p>
                        <p>
                            From high-rise condominiums with panoramic city views to serene residential communities nestled in nature, our pipeline is filled with exciting developments that will
                            transform the real estate landscape.
                        </p>
                        <p>
                            Stay tuned as we prepare to unveil these magnificent properties that will set new standards in comfort, style, and functionality. Each project is meticulously planned to
                            offer unparalleled living experiences that cater to the most discerning tastes.
                        </p>
                        <p>
                            For inquiries about our upcoming developments, please contact us at{' '}
                            <a href="mailto:info@mamm.com" className="email-link">
                                info@mamm.com
                            </a>
                            . Our team would be delighted to provide you with more information and exclusive previews.
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default UpcomingSection;

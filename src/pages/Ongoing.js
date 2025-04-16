/* eslint-disable max-lines */
import React, { useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Ongoing.css';
import heroDesktop from '../assests/images/bg-pc.png';
import heroTablet from '../assests/images/bg-pc.png';
import heroMobile from '../assests/images/bg.png';

gsap.registerPlugin(ScrollTrigger);

const OngoingSection = () => {
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
        <div className="ongoing-page" ref={sectionRef}>
            {/* Hero Section */}
            <div className="section-ongoing-title-container">
                <h1 className="section-ongoing-title" ref={titleRef}>
                    ONGOING
                </h1>
            </div>

            {/* Hero image container */}
            <Container fluid className="hero-ongoing-container position-relative overflow-hidden">
                <div className="ongoing-title-filter-overlay" ref={filterRef}>
                    ONGOING
                </div>

                <motion.div className="hero-ongoing-picture" ref={imageRef}>
                    <picture>
                        <source media="(max-width: 480px)" srcSet={heroMobile} />
                        <source media="(max-width: 1024px)" srcSet={heroTablet} />
                        <img className="hero-ongoing-img" src={heroDesktop} alt="ongoing projects" loading="eager" />
                    </picture>
                </motion.div>
                <div className="hero-ongoing-overlay"></div>
            </Container>

            {/* Content Section */}
            <div className="ongoing-section text-white">
                <Container>
                    <div className="message-box text-center mb-5" ref={messageBoxRef}>
                        <h2 className="sections-title">OUR ONGOING PROJECTS</h2>
                        <p>
                            At MAMM Properties, we take pride in our portfolio of ongoing projects that stand as testaments to our commitment to excellence in real estate development. Each ongoing
                            property reflects our dedication to quality craftsmanship, innovative design, and sustainable living.
                        </p>
                        <p>
                            Our ongoing projects range from luxurious residential towers to sophisticated commercial complexes, all designed with meticulous attention to detail and built to the
                            highest standards. These spaces don't just meet expectations—they redefine them, offering unparalleled comfort, style, and functionality.
                        </p>
                        <p>
                            From concept to completion, we ensure every project embodies the MAMM philosophy of blending architectural brilliance with practical living solutions. The result is a
                            collection of spaces that don't just house people and businesses, but enhance lifestyles and operations.
                        </p>
                        <p>
                            Explore our ongoing projects and see the MAMM difference. For more information about any of our developments, please contact us at{' '}
                            <a href="mailto:info@mamm.com" className="email-link">
                                info@mamm.com
                            </a>
                            .
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default OngoingSection;

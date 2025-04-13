/* eslint-disable max-lines */
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './OurBusiness.css';
import heroDesktop from '../assests/images/bg-pc.png';
import heroTablet from '../assests/images/bg-pc.png';
import heroMobile from '../assests/images/bg.png';
import devImg from '../assests/images/dev.jpg';
import realEstateImg from '../assests/images/realestate.jpg';
import greenImg from '../assests/images/green.jpg';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const businesses = [
    {
        title: 'MAMM Development',
        subtitle: 'Learn more about our development projects',
        image: devImg,
        link: '#'
    },
    {
        title: 'MAMM Real Estate',
        subtitle: 'Explore our real estate ventures',
        image: realEstateImg,
        link: '#'
    },
    {
        title: 'MAMM Green',
        subtitle: 'Discover our sustainability efforts',
        image: greenImg,
        link: '#'
    }
];

const OurBusiness = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const filterRef = useRef(null);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Hero image reveal animation
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);

    useEffect(() => {
        // Title animation
        gsap.fromTo(
            titleRef.current,
            { y: 100, opacity: 1 },
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

        // Filter animation (separate from title)
        gsap.fromTo(
            filterRef.current,
            {
                y: 100,
                opacity: 1
            },
            {
                y: 0,
                opacity: 1.2, // Lower opacity for the filter effect
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top center',
                    end: 'center center',
                    scrub: 1
                }
            }
        );

        // Hero image reveal animation
        gsap.fromTo(
            heroRef.current,
            { clipPath: 'inset(0% 25% 0% 25%)' },
            {
                clipPath: 'inset(0% 0% 0% 0%)',
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
        <div className="our-business-section" ref={sectionRef}>
            {/* Main title (below image) */}
            <div className="section-business-title-container">
                <h1 className="section-business-title" ref={titleRef}>
                    OUR BUSINESSES
                </h1>
            </div>

            {/* Hero image container */}
            <Container fluid className="hero-business-container position-relative overflow-hidden">
                {/* Filter effect (on image) */}
                <div className="title-filter-overlay" ref={filterRef}>
                    OUR BUSINESSES
                </div>

                <motion.picture
                    className="hero-business-picture"
                    ref={heroRef}
                    style={{
                        scale: heroScale,
                        opacity: heroOpacity
                    }}>
                    {/* Mobile (up to 480px) */}
                    <source media="(max-width: 480px)" srcSet={heroMobile} />
                    {/* Tablet (up to 1024px) */}
                    <source media="(max-width: 1024px)" srcSet={heroTablet} />
                    {/* Desktop (default) */}
                    <img className="hero-business-img" src={heroDesktop} alt="Our Business" loading="eager" />
                </motion.picture>
                <div className="hero-business-overlay"></div>
            </Container>

            {/* Business cards */}
            <Container className="business-card-container py-5">
                <Row className="g-4 justify-content-center">
                    {businesses.map((biz, idx) => (
                        <Col key={idx} md={4} className="business-card-col">
                            <div className="business-card">
                                <img src={biz.image} alt={biz.title} className="card-img" />
                                <div className="bottom-title">
                                    <h5>{biz.title}</h5>
                                </div>
                                <div className="center-plus">+</div>
                                <div className="hover-overlay">
                                    <div>
                                        <h4>{biz.title}</h4>
                                        <p>
                                            <a href={biz.link}>
                                                {biz.subtitle}
                                                <span className="ms-2">
                                                    <svg className="arrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                        <path d="M1 17L17 1L1 17ZM17 1V16.36V1ZM17 1H1.64H17Z" fill="#3C3C3B" className="fill"></path>
                                                        <path
                                                            d="M1 17L17 1M17 1V16.36M17 1H1.64"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="stroke"></path>
                                                    </svg>
                                                </span>
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default OurBusiness;

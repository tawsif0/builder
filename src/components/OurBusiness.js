/* eslint-disable max-lines */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import './OurBusiness.css';
import heroDesktop from '../assests/images/bg-pc.png';
import heroTablet from '../assests/images/bg-pc.png';
import heroMobile from '../assests/images/bg.png';
import devImg from '../assests/images/dev.jpg';
import realEstateImg from '../assests/images/realestate.jpg';
import greenImg from '../assests/images/green.jpg';

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
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    // Scroll-based animations
    const titleY = useTransform(
        scrollYProgress,
        [0, 1],
        [100, -50] // Changed from [100, 0] to [150, -50] for more movement
    );

    const titleOpacity = useTransform(
        scrollYProgress,
        [1, 1.3, 1.8, 1],
        [1, 1, 1, 1.5] // Fades in then slightly out at the end
    );
    const filterY = useTransform(scrollYProgress, [0, 1], [23, -100]); // Slightly less than title for layering
    const filterOpacity = useTransform(scrollYProgress, [1, 1.4], [1, 1.8]); // Different fade timing

    const clipPath = useTransform(scrollYProgress, (latest) => {
        // When scrolling down (progress increases)
        if (scrollYProgress.getPrevious() < latest) {
            return latest < 0.5 ? `inset(0% ${25 - latest * 50}% 0% ${25 - latest * 50}%)` : 'inset(0% 0% 0% 0%)';
        }
        // When scrolling up (progress decreases)
        else {
            return latest < 0.5 ? `inset(0% ${25 - latest * 50}% 0% ${25 - latest * 50}%)` : `inset(0% ${(latest - 0.5) * 50}% 0% ${(latest - 0.5) * 50}%)`;
        }
    });

    const cardY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
    const cardOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

    return (
        <div className="our-business-section" ref={containerRef}>
            {/* Main title */}
            <div className="section-business-title-container">
                <motion.h1
                    className="section-business-title"
                    style={{
                        y: titleY,
                        opacity: titleOpacity
                    }}>
                    OUR BUSINESSES
                </motion.h1>
            </div>

            {/* Hero image container */}
            <Container fluid className="hero-business-container position-relative overflow-hidden">
                <motion.div
                    className="title-filter-overlay"
                    style={{
                        y: filterY,
                        opacity: filterOpacity,
                        transition: 'all 0.4s cubic-bezier(0.17, 0.55, 0.55, 1)'
                    }}>
                    OUR BUSINESSES
                </motion.div>
                <motion.picture className="hero-business-picture" style={{ clipPath }} initial={{ clipPath: 'inset(0% 15% 0% 15%)' }}>
                    <source media="(max-width: 480px)" srcSet={heroMobile} />
                    <source media="(max-width: 1024px)" srcSet={heroTablet} />
                    <img className="hero-business-img" src={heroDesktop} alt="Our Business" loading="eager" />
                </motion.picture>
                <div className="hero-business-overlay"></div>
            </Container>

            {/* Business cards */}
            <Container className="business-card-container py-5">
                <Row className="g-4 justify-content-center">
                    {businesses.map((biz, idx) => (
                        <Col key={idx} md={4} className="business-card-col">
                            <motion.div
                                className="business-card"
                                style={{
                                    y: cardY,
                                    opacity: cardOpacity,
                                    transitionDelay: `${idx * 0.1}s`
                                }}>
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
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default OurBusiness;

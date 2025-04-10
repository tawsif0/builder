/* eslint-disable max-lines */
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import './OurBusiness.css';
import heroImg from '../assests/images/bg.png';
import devImg from '../assests/images/dev.jpg';
import realEstateImg from '../assests/images//realestate.jpg';
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
    const { scrollY } = useScroll();
    const height = useTransform(scrollY, [0, 600], ['50vh', '100vh']);

    return (
        <div className="our-business-section">
            <Container fluid className="position-relative text-center overflow-hidden">
                <h1 className="section-title">OUR BUSINESSES</h1>
                <motion.img src={heroImg} alt="Hero" className="hero-img" style={{ height }} />
            </Container>

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
                                                <span className="ms-2 arrow">&#8594;</span>
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

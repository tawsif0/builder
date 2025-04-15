/* eslint-disable max-lines */
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Landowner.css';
import heroDesktop from '../assests/images/bg-pc.png';
import heroTablet from '../assests/images/bg-pc.png';
import heroMobile from '../assests/images/bg.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const LandownerSection = () => {
    // Section refs
    const sectionsRef = useRef(null);
    const imgRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Hero image reveal animation
    const heroScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);

    // Update the useEffect hook for GSAP animation:
    useEffect(() => {
        if (!imgRef.current) return;

        // Check if browser supports clip-path
        const supportsClipPath = CSS.supports('clip-path', 'inset(0% 25% 0% 25%)');

        // Hero image reveal animation with fallback
        gsap.fromTo(imgRef.current, supportsClipPath ? { clipPath: 'inset(0% 25% 0% 25%)', opacity: 0.7 } : { scale: 1.2, opacity: 0.7 }, {
            ...(supportsClipPath ? { clipPath: 'inset(0% 0% 0% 0%)' } : { scale: 1 }),
            opacity: 1,
            scrollTrigger: {
                trigger: sectionsRef.current,
                start: 'top bottom',
                end: 'center center',
                scrub: 1
            }
        });
    }, []);

    // Landowner form state
    const [formData, setFormData] = useState({
        landAddress: '',
        landSize: '',
        name: '',
        email: '',
        contactNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const temp = {};
        if (!formData.landAddress) temp.landAddress = 'Land address is required';
        if (!formData.landSize) temp.landSize = 'Land size is required';
        if (!formData.name) temp.name = 'Name is required';
        if (!formData.email) temp.email = 'Email is required';
        if (!formData.contactNumber) temp.contactNumber = 'Phone number is required';
        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        emailjs
            .send('your_service_id', 'your_template_id', formData, 'your_user_id')
            .then(() => {
                setSubmitted(true);
                setFormData({
                    landAddress: '',
                    landSize: '',
                    name: '',
                    email: '',
                    contactNumber: ''
                });
                setErrors({});
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
            });
    };

    return (
        <div className="landowner-page" ref={sectionsRef}>
            {/* Hero Section */}

            {/* Main title (below image) */}
            <div className="section-landowner-title-container">
                <h1 className="section-landowner-title">LANDOWNERS</h1>
            </div>

            {/* Hero image container */}
            <Container fluid className="hero-landowner-container position-relative overflow-hidden">
                {/* Filter effect (on image) */}
                <div className="landowner-title-filter-overlay">LANDOWNERS</div>

                <motion.div
                    className="hero-landowner-picture"
                    ref={imgRef}
                    style={{
                        scale: heroScale,
                        opacity: heroOpacity
                    }}>
                    <picture>
                        {/* Mobile (up to 480px) */}
                        <source media="(max-width: 480px)" srcSet={heroMobile} />
                        {/* Tablet (up to 1024px) */}
                        <source media="(max-width: 1024px)" srcSet={heroTablet} />
                        {/* Desktop (default) */}
                        <img className="hero-landowner-img" src={heroDesktop} alt="landlord" loading="eager" />
                    </picture>
                </motion.div>
                <div className="hero-landowner-overlay"></div>
            </Container>

            {/* Form Section */}
            <div className="landowner-section text-white">
                <Container>
                    <div className="message-box text-center mb-5">
                        <h2 className="sections-title">A MESSAGE FOR LANDOWNERS</h2>
                        <p>
                            Live in the cocooned comfort of luxury, bathed in architectural elegance. MAMM Properties presents meticulously crafted residences, where exquisite craftsmanship meets
                            timeless design. Each home is a testament to sophistication, perfectly complementing your distinguished lifestyle.
                        </p>
                        <p>
                            Experience architectural brilliance, unmatched craftsmanship, and unparalleled comfort—hallmarks of every MAMM property. Here, you don't just own a residence; you embrace a
                            life of grandeur and refinement.
                        </p>
                        <p>
                            Harmony with nature awaits you. Every MAMM property is thoughtfully integrated with the natural environment, blending modern luxury with serene greenery for a balanced,
                            tranquil living experience.
                        </p>
                        <p>
                            Interested landowners can reach out to us at
                            <a href="mailto:land@mamm.com" className="email-link">
                                {' '}
                                land@mamm.com
                            </a>{' '}
                            or fill out the form below to explore collaboration opportunities.
                        </p>
                    </div>

                    <div className="form-box container">
                        <h2 className="text-center mb-4">LET'S CONNECT</h2>
                        {submitted && <Alert variant="success">Form submitted successfully!</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <div className="floating-label-group">
                                        <Form.Label>Land Address*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Full Address of the land"
                                            name="landAddress"
                                            value={formData.landAddress}
                                            onChange={handleChange}
                                            className={`custom-input ${errors.landAddress ? 'input-error' : ''}`}
                                        />
                                        {errors.landAddress && <div className="error-text">{errors.landAddress}</div>}
                                    </div>

                                    <div className="floating-label-group">
                                        <Form.Label>Land Size*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="In kathas (Rounded)"
                                            name="landSize"
                                            value={formData.landSize}
                                            onChange={handleChange}
                                            className={`custom-input ${errors.landSize ? 'input-error' : ''}`}
                                        />
                                        {errors.landSize && <div className="error-text">{errors.landSize}</div>}
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="floating-label-group">
                                        <Form.Label>Name*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name *"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`custom-input ${errors.name ? 'input-error' : ''}`}
                                        />
                                        {errors.name && <div className="error-text">{errors.name}</div>}
                                    </div>

                                    <div className="floating-label-group">
                                        <Form.Label>Email*</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Email *"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`custom-input ${errors.email ? 'input-error' : ''}`}
                                        />
                                        {errors.email && <div className="error-text">{errors.email}</div>}
                                    </div>

                                    <div className="floating-label-group">
                                        <Form.Label>Contact Number*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Contact Number *"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className={`custom-input ${errors.contactNumber ? 'input-error' : ''}`}
                                        />
                                        {errors.contactNumber && <div className="error-text">{errors.contactNumber}</div>}
                                    </div>
                                </Col>
                            </Row>

                            <div className="text-center mt-4">
                                <Button type="submit" className="submit-btns">
                                    <span className="arrows-circles">➜</span>
                                    <span>SUBMIT</span>
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default LandownerSection;

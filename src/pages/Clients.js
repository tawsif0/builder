/* eslint-disable max-lines */
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Client.css';
import heroDesktop from '../assests/images/bg-pc.png';
import heroTablet from '../assests/images/bg-pc.png';
import heroMobile from '../assests/images/bg.png';

gsap.registerPlugin(ScrollTrigger);
const ClientSection = () => {
    const imageRef = useRef(null);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const filterRef = useRef(null);
    const messageBoxRef = useRef(null);
    const formContainerRef = useRef(null);
    const formLeftRef = useRef(null);
    const formRightRef = useRef(null);

    useEffect(() => {
        // Hero section animations
        gsap.fromTo(
            titleRef.current,
            { y: 220, opacity: 1 },
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
            { y: 220, opacity: 1 },
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

        // Form container slide-in animation
        gsap.fromTo(
            formContainerRef.current,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: formContainerRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1,
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Left form elements slide from left
        gsap.fromTo(
            formLeftRef.current.querySelectorAll('.floating-label-group'),
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: formLeftRef.current,
                    start: 'top 70%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Right form element slide from right
        gsap.fromTo(
            formRightRef.current.querySelector('.floating-label-group'),
            { x: 100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: formRightRef.current,
                    start: 'top 70%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const temp = {};
        if (!formData.name) temp.name = 'Name is required';
        if (!formData.email) temp.email = 'Email is required';
        if (!formData.contactNumber) temp.contactNumber = 'Phone number is required';
        if (!formData.message) temp.message = 'Message can not be empty';
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
                    name: '',
                    email: '',
                    contactNumber: '',
                    message: ''
                });
                setErrors({});
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
            });
    };

    return (
        <div className="client-page" ref={sectionRef}>
            {/* Hero Section */}
            <div className="section-client-title-container">
                <h1 className="section-client-title" ref={titleRef}>
                    CLIENTS
                </h1>
            </div>

            {/* Hero image container */}
            <Container fluid className="hero-client-container position-relative overflow-hidden">
                <div className="client-title-filter-overlay" ref={filterRef}>
                    CLIENTS
                </div>

                <motion.div className="hero-client-picture" ref={imageRef}>
                    <picture>
                        <source media="(max-width: 480px)" srcSet={heroMobile} />
                        <source media="(max-width: 1024px)" srcSet={heroTablet} />
                        <img className="hero-client-img" src={heroDesktop} alt="client" loading="eager" />
                    </picture>
                </motion.div>
                <div className="hero-client-overlay"></div>
            </Container>

            {/* Form Section */}
            <div className="client-section text-white">
                <Container>
                    <div className="message-box text-center mb-5" ref={messageBoxRef}>
                        <h2 className="sections-title">A message for clients</h2>
                        <p>
                            Acquiring an apartment, a home or even an office space is a person's life-long dream. This dream drives him or her to accumulate the required finance slowly and gradually,
                            which is the start of shaping this dream into reality. This relentless pursuit of realizing such a dream can flow from generation to generation. But finally, when a space
                            is purchased, has anyone thought to what extent this "dream" is actually fulfilled?
                        </p>
                        <p>
                            We know that moment is an important stepping-stone for you, and hence we at MAMM have been preparing for just that. Our apartments, condominiums and commercial complexes
                            compete with the best that the modern world has to offer. From temperature-controlled swimming pools to lush rooftop gardens and terraces, from state-of-the-art gymnasiums
                            to spacious walkways and children's play facilities, you'll find the solution to your need for stylish urban living with us at SHL.
                        </p>
                        <p>
                            Even business becomes a pleasure in our commercial spaces with central air-conditioning, triple-height lobby areas multilayered parking facilities and much more. Because at
                            MAMM, we're not just building spaces; we're crafting dreams into reality, ensuring that your journey to owning a piece of opulence is as exceptional as the dream itself.
                        </p>
                    </div>

                    <div className="form-containers" ref={formContainerRef}>
                        <h2 className="text-center mb-4 mt-4">LET'S CONNECT</h2>
                        {submitted && <Alert variant="success">Form submitted successfully!</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6} ref={formLeftRef}>
                                    <div className="floating-label-group">
                                        <Form.Label>Name*</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Your Name"
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
                                            placeholder="Your Email"
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
                                            placeholder="Your Phone Number"
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                            className={`custom-input ${errors.contactNumber ? 'input-error' : ''}`}
                                        />
                                        {errors.contactNumber && <div className="error-text">{errors.contactNumber}</div>}
                                    </div>
                                </Col>
                                <Col md={6} ref={formRightRef}>
                                    <div className="floating-label-group">
                                        <Form.Label>Your Message Here</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={8}
                                            placeholder="Type your message here..."
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`custom-input custom-textarea ${errors.message ? 'input-error' : ''}`}
                                        />
                                        {errors.message && <div className="error-text">{errors.message}</div>}
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

export default ClientSection;

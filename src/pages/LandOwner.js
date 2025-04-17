/* eslint-disable max-lines */
import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Landowner.css';
import heroDesktop from '../assests/images/bg-pc.png';
import heroTablet from '../assests/images/bg-pc.png';
import heroMobile from '../assests/images/bg.png';

gsap.registerPlugin(ScrollTrigger);
const LandownerSection = () => {
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

        // Right form elements slide from right
        gsap.fromTo(
            formRightRef.current.querySelectorAll('.floating-label-group'),
            { x: 100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
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

    // Landowner form state
    const [formData, setFormData] = useState({
        landAddress: '',
        landSize: '',
        name: '',
        email: '',
        contactNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);

        emailjs
            .send('service_3rnf3rd', 'template_7ctyqbj', formData, 'lUIfSHXMKFhdmS6hP')
            .then(() => {
                toast.success('Form submitted successfully!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
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
                toast.error('Failed to submit form. Please try again.', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="landowner-page" ref={sectionRef}>
                <div className="section-landowner-title-container">
                    <h1 className="section-landowner-title" ref={titleRef}>
                        LANDOWNERS
                    </h1>
                </div>

                {/* Hero image container */}
                <Container fluid className="hero-landowner-container position-relative overflow-hidden">
                    <div className="landowner-title-filter-overlay" ref={filterRef}>
                        LANDOWNERS
                    </div>

                    <motion.div className="hero-landowner-picture" ref={imageRef}>
                        <picture>
                            <source media="(max-width: 480px)" srcSet={heroMobile} />
                            <source media="(max-width: 1024px)" srcSet={heroTablet} />
                            <img className="hero-landowner-img" src={heroDesktop} alt="landlord" loading="eager" />
                        </picture>
                    </motion.div>
                    <div className="hero-landowner-overlay"></div>
                </Container>

                {/* Form Section */}
                <div className="landowner-section text-white">
                    <Container>
                        <div className="message-box text-center mb-5" ref={messageBoxRef}>
                            <h2 className="sections-title">A MESSAGE FOR LANDOWNERS</h2>
                            <p>
                                Live in the cocooned comfort of luxury, bathed in architectural elegance. MAMM Properties presents meticulously crafted residences, where exquisite craftsmanship meets
                                timeless design. Each home is a testament to sophistication, perfectly complementing your distinguished lifestyle.
                            </p>
                            <p>
                                Experience architectural brilliance, unmatched craftsmanship, and unparalleled comfort—hallmarks of every MAMM property. Here, you don't just own a residence; you
                                embrace a life of grandeur and refinement.
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

                        <div className="form-box container" ref={formContainerRef}>
                            <h2 className="text-center mb-4">LET'S CONNECT</h2>

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} ref={formLeftRef}>
                                        <div className="floating-label-group">
                                            <Form.Label>Land Address*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Full Address of the land"
                                                name="landAddress"
                                                value={formData.landAddress}
                                                onChange={handleChange}
                                                className={`custom-input ${errors.landAddress ? 'input-error' : ''}`}
                                                autoComplete="off"
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
                                                autoComplete="off"
                                            />
                                            {errors.landSize && <div className="error-text">{errors.landSize}</div>}
                                        </div>
                                    </Col>

                                    <Col md={6} ref={formRightRef}>
                                        <div className="floating-label-group">
                                            <Form.Label>Name*</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Name *"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`custom-input ${errors.name ? 'input-error' : ''}`}
                                                autoComplete="off"
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
                                                autoComplete="off"
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
                                                autoComplete="off"
                                            />
                                            {errors.contactNumber && <div className="error-text">{errors.contactNumber}</div>}
                                        </div>
                                    </Col>
                                </Row>

                                <div className="text-center mt-4">
                                    <Button type="submit" className="submit-btns" disabled={isSubmitting}>
                                        <span className="arrows-circles">➜</span>
                                        <span> {isSubmitting ? 'SENDING...' : 'SUBMIT'}</span>
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default LandownerSection;

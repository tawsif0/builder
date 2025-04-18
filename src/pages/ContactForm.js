/* eslint-disable max-lines */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ContactForm.css';
import contactImage from '../assests/images/contactPage.png';

const ContactForm = () => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionOneRef = useRef(null);
    const sectionTwoRef = useRef(null);
    const formRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        // Create animations with persistent triggers
        const animations = [
            gsap.from(sectionOneRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionOneRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }),
            gsap.from(sectionTwoRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionTwoRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }),
            gsap.from(formRef.current, {
                scale: 0.8,
                opacity: 0,
                duration: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: formRef.current,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }),
            gsap.from(infoRef.current, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: infoRef.current,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            })
        ];

        ScrollTrigger.refresh();

        return () => {
            animations.forEach((anim) => {
                if (anim.scrollTrigger) anim.scrollTrigger.kill();
                anim.kill();
            });
            ScrollTrigger.clearMatchMedia();
        };
    }, []);

    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.userName.trim()) newErrors.userName = 'Name is required';
        if (!formData.userEmail.trim()) newErrors.userEmail = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) newErrors.userEmail = 'Email is invalid';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the errors in the form', {
                position: 'top-center',
                autoClose: 5000
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await emailjs.send(
                'service_3rnf3rd',
                'template_yayu2wm',
                {
                    user_name: formData.userName,
                    user_email: formData.userEmail,
                    message: formData.message
                },
                'lUIfSHXMKFhdmS6hP'
            );

            setFormData({ userName: '', userEmail: '', message: '' });
            toast.success('Sent successfully!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } catch (error) {
            console.error('Email send error:', error);
            toast.error('Failed to send. Please try again.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div ref={sectionOneRef} className="contact-section-1 text-white">
                <div className="container">
                    <div className="row d-flex align-items-stretch">
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <h1 className="display-4 fw-bold mb-5">CONTACT US</h1>

                            <Link to="/contact/clients" className="text-decoration-none">
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
                                <img src={contactImage} alt="Handshake" className="contact-image-1 w-100 h-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-sections">
                <h2 className="contact-title">GET IN TOUCH</h2>
                <div ref={sectionTwoRef} className="contact-container container">
                    <form className="contact-form container" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="userName" className={`form-input ${errors.userName ? 'error' : ''}`} value={formData.userName} onChange={handleChange} autoComplete="off" />
                            {errors.userName && <div className="error-message">{errors.userName}</div>}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="userEmail" className={`form-input ${errors.userEmail ? 'error' : ''}`} value={formData.userEmail} onChange={handleChange} autoComplete="off" />
                            {errors.userEmail && <div className="error-message">{errors.userEmail}</div>}
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea name="message" className={`form-input ${errors.message ? 'error' : ''}`} rows="4" value={formData.message} onChange={handleChange} autoComplete="off" />
                            {errors.message && <div className="error-message">{errors.message}</div>}
                        </div>
                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            <span className="arrow-circle">&#10140;</span>
                            {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                        </button>
                    </form>

                    <div ref={formRef} className="contact-info container">
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">mammgrp@gmail.com</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Sales:</span>
                            <span className="info-value">+880 1711-989950 </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactForm;

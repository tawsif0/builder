/* eslint-disable max-lines */
import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import './Landowner.css';

const LandownerSection = () => {
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
        <div className="landowner-section text-white">
            <Container>
                <div className="message-box text-center mb-5">
                    <h2 className="section-title">A MESSAGE FOR LANDOWNERS</h2>
                    <p>
                        Live in the cocooned comfort of luxury, bathed in architectural elegance. Aesthetically built with exquisite craftsmanship, we offer you an abode that complements your
                        privileged lifestyle. Be part of the architectural splendor, exquisite craftsmanship and ultimate comfort that is a hallmark of every Shanta property.
                    </p>
                    <p>
                        At Shanta, you don’t just get an urban structure. You get to live in grandeur and style. What’s more, we bring to your sanctuary an essence of nature itself, as every Shanta
                        property is intricately woven with the wonders of the natural environment, offering you a lifestyle that is in harmony with nature.
                    </p>
                    <p>
                        Interested Landowners can mail us at
                        <a href="mailto:land@shantaholdings.com" className="email-link">
                            {' '}
                            land@shantaholdings.com
                        </a>{' '}
                        or fill-up the form below.
                    </p>
                </div>

                <div className="form-box container">
                    <h2 className="text-center mb-4">LET’S CONNECT</h2>
                    {submitted && <Alert variant="success">Form submitted successfully!</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <div className="floating-label-group">
                                    <Form.Label>Land Address*</Form.Label>
                                    <Form.Control type="text" placeholder="Full Address of the land" name="landAddress" value={formData.landAddress} onChange={handleChange} className="custom-input" />
                                    {errors.landAddress && <div className="error-text">{errors.landAddress}</div>}
                                </div>

                                <div className="floating-label-group">
                                    <Form.Label>Land Size*</Form.Label>
                                    <Form.Control type="text" placeholder="In kathas (Rounded)" name="landSize" value={formData.landSize} onChange={handleChange} className="custom-input" />
                                    {errors.landSize && <div className="error-text">{errors.landSize}</div>}
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className="floating-label-group">
                                    <Form.Label>Name*</Form.Label>
                                    <Form.Control type="text" placeholder="Name *" name="name" value={formData.name} onChange={handleChange} className="custom-input" />
                                    {errors.name && <div className="error-text">{errors.name}</div>}
                                </div>

                                <div className="floating-label-group">
                                    <Form.Label>Email*</Form.Label>
                                    <Form.Control type="email" placeholder="Email *" name="email" value={formData.email} onChange={handleChange} className="custom-input" />
                                    {errors.email && <div className="error-text">{errors.email}</div>}
                                </div>

                                <div className="floating-label-group">
                                    <Form.Label>Contact Number*</Form.Label>
                                    <Form.Control type="text" placeholder="Contact Number *" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="custom-input" />
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
    );
};

export default LandownerSection;

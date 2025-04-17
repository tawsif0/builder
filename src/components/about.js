/* eslint-disable max-lines */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './About.css';

const About = () => {
    const ref = useRef();
    const titleRef = useRef();
    const imageRef = useRef();

    // Scroll-based animations with custom easing
    const { scrollYProgress } = useScroll({
        target: imageRef,
        offset: ['start end', 'end start']
    });

    // Enhanced image animation with ease-out curve
    const imageY = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -250], // Increased movement range
        { ease: (t) => t * (2 - t) } // easeOutQuad approximation
    );

    // Add scale effect for parallax
    const imageScale = useTransform(
        scrollYProgress,
        [0, 1],
        [1, 1.05], // Subtle zoom effect
        { ease: (t) => t * (2 - t) }
    );

    // View-based animations
    const isInView = useInView(ref, { once: false, amount: 0.4 });
    const isTitleInView = useInView(titleRef, { once: false, amount: 0.4 });

    const content =
        "Our real estate portfolio reflects a legacy of excellence. Showcasing some of the nation's most prestigious developments, we are committed to delivering exceptional service to both investors and buyers. Our success is founded on unwavering standards and meticulous attention to detail—hallmarks of true luxury and distinction.";
    const words = content.split(' ');

    return (
        <section className="about-section" ref={ref}>
            <div className="container">
                <div className="about-container">
                    {/* Title and Image */}
                    <div className="about-title-container">
                        <motion.div
                            className="title-wrapper"
                            ref={titleRef}
                            initial={{ opacity: 0, x: 100 }}
                            animate={isTitleInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                            <h2 className="about-title">ABOUT</h2>
                            <div className="title-line"></div>
                        </motion.div>
                        <motion.div
                            className="about-image"
                            ref={imageRef}
                            style={{
                                y: imageY,
                                scale: imageScale,
                                transition: 'all 0.1s linear' // Smooth interpolation
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="about-content">
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                className="word"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2 + i * 0.03,
                                    ease: [0.22, 1, 0.36, 1]
                                }}>
                                {word}&nbsp;
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

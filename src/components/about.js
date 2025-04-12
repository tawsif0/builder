/* eslint-disable max-lines */
import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const ref = useRef();
    const titleRef = useRef();
    const imageRef = useRef();

    const isInView = useInView(ref, { once: false, amount: 0.4 });
    const isTitleInView = useInView(titleRef, { once: false, amount: 0.4 });

    useEffect(() => {
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                y: -150,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: 'top bottom',
                    end: '+=600',
                    scrub: true
                }
            });
        }
    }, []);

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
                        <div className="about-image" ref={imageRef}></div>
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

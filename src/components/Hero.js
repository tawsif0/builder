// Updated Hero component
import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hero-title">
                    Setting standards <span className="highlight">.</span>
                    <br />
                    <span className="thin">Redefining excellence</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="hero-subtitle">
                    Pioneering innovation in development, real estate, and sustainable solutions
                </motion.p>
            </div>

            <div className="hero-image-container">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="hero-image">
                    <div className="image-fade"></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

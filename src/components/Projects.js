/* eslint-disable max-lines */
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Projects.css';

const projectsData = [
    {
        type: 'RESIDENTIAL',
        title: 'EVERMORE',
        location: 'Plot 4/1, Road 75 and 80, North Gulshan',
        image: require('../assests/images/dev.jpg')
    },
    {
        type: 'COMMERCIAL',
        title: 'NOVA TOWER',
        location: 'Sector 12, Uttara',
        image: require('../assests/images/green.jpg')
    },
    {
        type: 'MIXED USE',
        title: 'THE ORBIT',
        location: 'Banani Block E',
        image: require('../assests/images/realestate.jpg')
    }
];

const Projects = () => {
    const [current, setCurrent] = useState(0);
    const imageRef = useRef();

    const handleNext = () => {
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                opacity: 0,
                y: -50,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    setCurrent((prev) => (prev + 1) % projectsData.length);
                }
            });
        }
    };

    const handlePrev = () => {
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    setCurrent((prev) => (prev - 1 + projectsData.length) % projectsData.length);
                }
            });
        }
    };

    useEffect(() => {
        if (imageRef.current) {
            gsap.fromTo(imageRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        }
    }, [current]);

    const { type, title, location, image } = projectsData[current];

    return (
        <section className="projects-section">
            <div className="projects-overlay" />
            <div className="projects-content">
                <p className="featured-text">FEATURED PROJECTS</p>
                <p className="project-type">{type}</p>
                <h1 className="project-title">{title}</h1>
                <p className="project-location">{location}</p>

                <div className="navigation">
                    <button onClick={handlePrev} className="arrow left">
                        ←
                    </button>
                    <button onClick={handleNext} className="arrow right">
                        →
                    </button>
                </div>
            </div>
            <div className="project-image" ref={imageRef} style={{ backgroundImage: `url(${image})` }} />
        </section>
    );
};

export default Projects;

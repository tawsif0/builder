/* eslint-disable max-lines */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import './Projects.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projectsData = [
    {
        type: 'COMMERCIAL',
        title: 'DHAKA TOWER',
        location: '203–204, Tejgaon',
        image: require('../assests/images/bg.png')
    },
    {
        type: 'RESIDENTIAL',
        title: 'ATLANTIS',
        location: 'Plot 18, Road 62, North Gulshan',
        image: require('../assests/images/dev.jpg')
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
    const [displayedIndex, setDisplayedIndex] = useState(0);
    const currentRef = useRef(0);

    // Animation refs
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const currentImageRef = useRef(null);
    const nextImageRef = useRef(null);
    const progressItemsRef = useRef([]);
    const progressFillRefs = useRef([]);
    const intervalRef = useRef(null);
    const zoomTweenRef = useRef(null);
    const progressTweenRef = useRef(null);

    const goToSlide = (nextIndex) => {
        if (nextIndex === currentRef.current) return;

        clearInterval(intervalRef.current);
        if (zoomTweenRef.current) zoomTweenRef.current.kill();
        if (progressTweenRef.current) progressTweenRef.current.kill();

        // Reset all progress fills
        progressFillRefs.current.forEach((ref) => {
            if (ref) gsap.set(ref, { scaleX: 0 });
        });

        setDisplayedIndex(nextIndex);

        const currentImage = currentImageRef.current;
        const nextImage = nextImageRef.current;

        gsap.set(nextImage, {
            backgroundImage: `url(${projectsData[nextIndex].image})`,
            y: '100%',
            opacity: 1,
            zIndex: 2
        });

        gsap.set(currentImage, {
            zIndex: 1
        });

        const tl = gsap.timeline({
            onComplete: () => {
                currentImage.style.backgroundImage = `url(${projectsData[nextIndex].image})`;
                gsap.set(currentImage, { y: 0, opacity: 1, zIndex: 2 });
                gsap.set(nextImage, { opacity: 0 });

                currentRef.current = nextIndex;
                setCurrent(nextIndex);

                startZoomAnimation();
                startProgressAnimation(nextIndex);
                startAutoSlide();
            }
        });

        tl.to(
            currentImage,
            {
                y: '-100%',
                duration: 0.8,
                ease: 'power2.inOut'
            },
            0
        );

        tl.to(
            nextImage,
            {
                y: '0%',
                duration: 0.8,
                ease: 'power2.inOut'
            },
            0
        );
    };

    const nextSlide = () => {
        const nextIndex = (currentRef.current + 1) % projectsData.length;
        goToSlide(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = (currentRef.current - 1 + projectsData.length) % projectsData.length;
        goToSlide(prevIndex);
    };

    const startZoomAnimation = () => {
        gsap.set(currentImageRef.current, { scale: 1 });
        zoomTweenRef.current = gsap.to(currentImageRef.current, {
            scale: 1.1,
            duration: 4.8,
            ease: 'none'
        });
    };

    const startProgressAnimation = (index) => {
        const fillRef = progressFillRefs.current[index];
        if (!fillRef) return;

        gsap.set(fillRef, { scaleX: 0 });
        progressTweenRef.current = gsap.to(fillRef, {
            scaleX: 1,
            duration: 5,
            ease: 'none'
        });
    };

    const startAutoSlide = () => {
        intervalRef.current = setInterval(() => {
            nextSlide();
        }, 5000);
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Section scroll animation
        gsap.fromTo(
            sectionRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play play reset reset',
                    markers: false // Set to true to debug positions
                }
            }
        );

        // Content scroll animation
        gsap.fromTo(
            contentRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    end: 'top 50%',
                    toggleActions: 'play play reset reset'
                }
            }
        );

        // Initialize slider
        gsap.set(currentImageRef.current, {
            backgroundImage: `url(${projectsData[current].image})`,
            scale: 1,
            y: 0,
            opacity: 1,
            zIndex: 2
        });

        gsap.set(nextImageRef.current, {
            opacity: 0,
            y: 0,
            zIndex: 1
        });

        setDisplayedIndex(current);
        currentRef.current = current;
        startZoomAnimation();
        startProgressAnimation(current);
        startAutoSlide();

        return () => {
            clearInterval(intervalRef.current);
            if (zoomTweenRef.current) zoomTweenRef.current.kill();
            if (progressTweenRef.current) progressTweenRef.current.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    useEffect(() => {
        progressItemsRef.current.forEach((item, index) => {
            if (item) {
                item.classList.toggle('active', index === displayedIndex);
            }
        });
    }, [displayedIndex]);

    return (
        <section className="projects-section" ref={sectionRef}>
            <div className="projects-overlay" />
            <div className="project-image current" ref={currentImageRef} />
            <div className="project-image next" ref={nextImageRef} />

            <div className="projects-content container" ref={contentRef}>
                <p className="featured-text">FEATURED PROJECTS</p>
                <div className="project-contents">
                    <p className="project-type">{projectsData[displayedIndex].type}</p>
                    <h1 className="project-title">{projectsData[displayedIndex].title}</h1>
                    <p className="project-location">{projectsData[displayedIndex].location}</p>
                </div>
                <div className="navigation-container">
                    <div
                        className="navigation"
                        style={{
                            width: `${projectsData.length * 25 + (projectsData.length - 1) * 8}px`
                        }}>
                        <div className="arrow-buttons">
                            <button className="project-arrow left" onClick={prevSlide}>
                                ←
                            </button>
                            <button className="project-arrow right" onClick={nextSlide}>
                                →
                            </button>
                        </div>

                        <div className="progress-bars">
                            {projectsData.map((_, index) => (
                                <div
                                    key={index}
                                    className={`progress-item ${index === displayedIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    ref={(el) => (progressItemsRef.current[index] = el)}>
                                    <div className="progress-track" />
                                    <div className="progress-fill" ref={(el) => (progressFillRefs.current[index] = el)} style={{ transform: 'scaleX(0)' }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;

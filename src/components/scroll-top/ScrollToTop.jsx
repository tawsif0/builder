import React, { useEffect, useState } from 'react';
import './ScrollToTop.css';

const ScrollToTop = () => {
    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setBackToTopButton(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {backToTopButton && (
                <button className="cm-up" onClick={scrollUp}>
                    <span className="cm-icon">
                        <i className="fas fa-chevron-up"></i>
                    </span>
                </button>
            )}
        </>
    );
};

export default ScrollToTop;

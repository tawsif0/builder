/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import { Navbar, Offcanvas, Container } from 'react-bootstrap';
import { FiMenu } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Nav = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHistory, setMenuHistory] = useState(['main']);
    const [scrolled, setScrolled] = useState(false);
    const [hoverMenu, setHoverMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClose = () => {
        setShowSidebar(false);
        setTimeout(() => {
            setActiveMenu('main');
            setMenuHistory(['main']);
        }, 300);
    };

    const handleShow = () => setShowSidebar(true);

    const scrollToSection = (sectionId) => {
        handleClose();
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300);
    };

    const navigateToMenu = (menuName) => {
        if (['business', 'projects', 'contact'].includes(menuName)) {
            setMenuHistory([...menuHistory, menuName]);
            setActiveMenu(menuName);
        }
    };

    const navigateBack = () => {
        if (menuHistory.length > 1) {
            const newHistory = [...menuHistory];
            newHistory.pop();
            setMenuHistory(newHistory);
            setActiveMenu(newHistory[newHistory.length - 1]);
        }
    };

    const menuVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        exit: {
            x: '100%',
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const renderMenu = () => {
        switch (activeMenu) {
            case 'main':
                return (
                    <motion.div key="main" initial="hidden" animate="visible" exit="exit" variants={menuVariants} className="menu-content">
                        <div className="menu-header">
                            <motion.h2 className="text-gradient" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                EXPLORE
                            </motion.h2>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                Navigate through our website
                            </motion.p>
                        </div>
                        {[
                            { id: 'home', label: 'Home', section: 'hero-section' },
                            { id: 'about', label: 'About', section: 'about-section' },
                            { id: 'business', label: 'Our Business' },
                            { id: 'projects', label: 'Projects' },
                            { id: 'news', label: 'News & Events' },
                            { id: 'contact', label: 'Contact' }
                        ].map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="menu-item"
                                onClick={() => (item.section ? scrollToSection(item.section) : navigateToMenu(item.id))}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + index * 0.05 }}>
                                <span>{item.label}</span>
                                <div className="menu-item-hover"></div>
                                {['business', 'projects', 'contact'].includes(item.id) && <IoIosArrowForward className="menu-arrow" />}
                            </motion.div>
                        ))}
                    </motion.div>
                );
            case 'business':
                return (
                    <motion.div key="business" initial="hidden" animate="visible" exit="exit" variants={menuVariants} className="menu-content">
                        <div className="menu-back" onClick={navigateBack}>
                            <span className="back-arrow">←</span> Our Business
                        </div>
                        <div className="submenu-header">
                            <h3>OUR DIVISIONS</h3>
                        </div>
                        {[
                            { name: 'MAMM Development', path: '/business/development' },
                            { name: 'MAMM Real Estate', path: '/business/real-estate' },
                            { name: 'MAMM Green', path: '/business/green' }
                        ].map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.path}
                                className="submenu-item"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                onClick={handleClose}>
                                <span>{item.name}</span>
                                <div className="submenu-item-hover"></div>
                            </motion.a>
                        ))}
                    </motion.div>
                );
            case 'projects':
                return (
                    <motion.div key="projects" initial="hidden" animate="visible" exit="exit" variants={menuVariants} className="menu-content">
                        <div className="menu-back" onClick={navigateBack}>
                            <span className="back-arrow">←</span> Projects
                        </div>
                        <div className="submenu-header">
                            <h3>OUR PORTFOLIO</h3>
                        </div>
                        {[
                            { name: 'Completed', path: '/projects/completed' },
                            { name: 'Ongoing', path: '/projects/ongoing' },
                            { name: 'Upcoming', path: '/projects/upcoming' }
                        ].map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.path}
                                className="submenu-item"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                onClick={handleClose}>
                                <span>{item.name}</span>
                                <div className="submenu-item-hover"></div>
                            </motion.a>
                        ))}
                    </motion.div>
                );
            case 'contact':
                return (
                    <motion.div key="contact" initial="hidden" animate="visible" exit="exit" variants={menuVariants} className="menu-content">
                        <div className="menu-back" onClick={navigateBack}>
                            <span className="back-arrow">←</span> Contact
                        </div>
                        <div className="submenu-header">
                            <h3>GET IN TOUCH</h3>
                        </div>
                        {[
                            { name: 'General Inquiry', path: '/contact/general' },
                            { name: 'Land Owners', path: '/contact/landowners' },
                            { name: 'Clients', path: '/contact/clients' }
                        ].map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.path}
                                className="submenu-item"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                                onClick={handleClose}>
                                <span>{item.name}</span>
                                <div className="submenu-item-hover"></div>
                            </motion.a>
                        ))}
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar expand={false} className={`sexy-navbar ${scrolled ? 'navbar-scrolled' : ''}`} fixed="top">
                <Container>
                    <Navbar.Brand href="/" className="d-flex align-items-center">
                        <motion.span className="logo-text" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            MAMM
                        </motion.span>
                        <motion.span className="logo-dot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                            .
                        </motion.span>
                    </Navbar.Brand>
                    <motion.div className="menu-button-container" onHoverStart={() => setHoverMenu(true)} onHoverEnd={() => setHoverMenu(false)} onClick={handleShow}>
                        <motion.div
                            className="menu-icon"
                            animate={{
                                rotate: hoverMenu ? 90 : 0,
                                scale: hoverMenu ? 1.1 : 1
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}>
                            <FiMenu size={20} className="menu-icon-svg" />
                        </motion.div>
                        <motion.span
                            className="menu-label"
                            animate={{
                                opacity: hoverMenu ? 1 : 0.8,
                                x: hoverMenu ? 0 : -5
                            }}>
                            MENU
                        </motion.span>
                        <motion.div
                            className="menu-button-hover"
                            animate={{
                                width: hoverMenu ? '100%' : '0%'
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </Container>
            </Navbar>

            <Offcanvas show={showSidebar} onHide={handleClose} placement="end" className="sexy-sidebar" backdropClassName="sidebar-backdrop">
                <Offcanvas.Header closeButton className="mt-3"></Offcanvas.Header>
                <Offcanvas.Body>
                    <AnimatePresence mode="wait">{renderMenu()}</AnimatePresence>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Nav;

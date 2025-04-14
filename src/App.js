import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Navbar';
import Hero from './components/Hero';
import About from './components/about';
import OurBusiness from './components/OurBusiness';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Error from './pages/Error';
import ScrollToTop from './components/scroll-top/ScrollToTop';

const App = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <section id="hero-section">
                                <Nav />
                                <Hero />
                            </section>
                            <About />
                            <OurBusiness />
                            <Projects />
                            <Contact />
                        </>
                    }
                />
                <Route path="*" element={<Error />} /> {/* ✅ Catch-all route */}
            </Routes>
        </>
    );
};

export default App;

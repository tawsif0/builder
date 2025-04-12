import React from 'react';
import Nav from './components/Navbar';
import Hero from './components/Hero';
import About from './components/about';
import OurBusiness from './components/OurBusiness';
import Projects from './components/Projects';

const App = () => {
    return (
        <>
            <section id="hero-section">
                <Nav />
                <Hero />
            </section>
            <About />
            <OurBusiness />
            <Projects />
        </>
    );
};

export default App;

import React from 'react';
import Nav from './components/Navbar';
import Hero from './components/Hero';
import About from './components/about';

const App = () => {
    return (
        <>
            <section id="hero-section">
                <Nav />
                <Hero />
            </section>
            <About />
        </>
    );
};

export default App;

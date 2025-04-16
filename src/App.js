/* eslint-disable max-lines */
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
import Footer from './components/Footer';
import ContactForm from './pages/ContactForm';
import LandownerSection from './pages/LandOwner';
import ClientSection from './pages/Clients';
import UpcomingSection from './pages/Upcoming';
import CompletedSection from './pages/Completed';
import OngoingSection from './pages/Ongoing';

const App = () => {
    return (
        <>
            <Nav />
            <ScrollToTop />
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <section id="hero-section">
                                <Hero />
                            </section>
                            <section id="about-section">
                                <About />
                            </section>
                            <OurBusiness />
                            <Projects />
                            <Contact />
                        </>
                    }
                />
                <Route path="*" element={<Error />} />
                <Route path="/contact/general" element={<ContactForm />} />
                <Route path="/contact/landowners" element={<LandownerSection />} />
                <Route path="/contact/clients" element={<ClientSection />} />
                <Route path="/projects/upcoming" element={<UpcomingSection />} />
                <Route path="/projects/completed" element={<CompletedSection />} />
                <Route path="/projects/ongoing" element={<OngoingSection />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;

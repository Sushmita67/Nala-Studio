import React from 'react';
import AboutSection from '../components/AboutSection';
import WhyNalaSection from '../components/WhyNalaSection';

const AboutPage: React.FC = () => {
  return (
    <div className="pt-24">
      <div className="container-nala py-10">
        <p className="section-label mb-3">About</p>
        <h1 className="section-title">NALA Studio</h1>
      </div>
      <AboutSection compact />
      <WhyNalaSection />
    </div>
  );
};

export default AboutPage;

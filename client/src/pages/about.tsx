import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';
import WhyNalaSection from '../components/WhyNalaSection';
import TeamSection from '../components/TeamSection';

const AboutPage: React.FC = () => {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="NALA Studio"
        description="A modern beauty destination in Kathmandu specializing in nails, lashes, makeup and beauty education."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About' },
        ]}
        actions={
          <>
            <Link to="/book" className="btn-primary">
              Book appointment
            </Link>
            <Link to="/courses" className="btn-secondary">
              View academy
            </Link>
          </>
        }
      />
      <AboutSection compact />
      <TeamSection />
      <WhyNalaSection />
    </>
  );
};

export default AboutPage;

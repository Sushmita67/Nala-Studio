import React from 'react';
import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';
import WhyNalaSection from '../components/WhyNalaSection';
import TeamSection from '../components/TeamSection';
import Button from '../components/ui/Button';

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
            <Button to="/book">Book appointment</Button>
            <Button to="/courses" variant="secondary">
              View academy
            </Button>
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

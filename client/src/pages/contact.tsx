import React from 'react';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Visit or get in touch"
        description="Find us in Phulbari, Kathmandu — or book online and we’ll confirm your appointment."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact' },
        ]}
        actions={<Button to="/book">Book appointment</Button>}
      />
      <ContactSection />
    </>
  );
};

export default ContactPage;

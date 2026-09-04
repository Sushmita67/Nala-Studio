import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';

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
        actions={
          <Link to="/book" className="btn-primary">
            Book appointment
          </Link>
        }
      />
      <ContactSection />
    </>
  );
};

export default ContactPage;

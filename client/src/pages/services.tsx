import React from 'react';
import PageHeader from '../components/PageHeader';
import ServicesSection from '../components/ServicesSection';
import Button from '../components/ui/Button';

const ServicesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Treatments"
        description="Explore eyelash extensions, gel nails, manicure, pedicure and courses. Contact us for pricing, then book a time that works for you."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services' },
        ]}
        actions={<Button to="/book">Book now</Button>}
      />
      <ServicesSection limitPerCategory={0} showViewAll={false} />
    </>
  );
};

export default ServicesPage;

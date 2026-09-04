import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ServicesSection from '../components/ServicesSection';

const ServicesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Treatments"
        description="Explore nails, lashes, brows and beauty treatments. Contact us for pricing, then book a time that works for you."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services' },
        ]}
        actions={
          <Link to="/book" className="btn-primary">
            Book now
          </Link>
        }
      />
      <ServicesSection limitPerCategory={0} showViewAll={false} />
    </>
  );
};

export default ServicesPage;

import React from 'react';
import ServicesSection from '../components/ServicesSection';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      <ServicesSection limitPerCategory={0} showViewAll={false} />
    </div>
  );
};

export default ServicesPage;

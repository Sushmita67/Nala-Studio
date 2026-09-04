import React from 'react';
import GallerySection from '../components/GallerySection';

const GalleryPage: React.FC = () => {
  return (
    <div className="pt-20">
      <GallerySection
        showFilters
        title="Gallery"
        subtitle="Browse nails, lashes, makeup, studio moments and class work from NALA."
      />
    </div>
  );
};

export default GalleryPage;

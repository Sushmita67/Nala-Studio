import React from 'react';
import PageHeader from '../components/PageHeader';
import GallerySection from '../components/GallerySection';

const GalleryPage: React.FC = () => {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Studio work"
        description="A living collection of nails, lashes, makeup and moments from NALA Studio."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Gallery' },
        ]}
      />
      <GallerySection
        showFilters
        showViewAll={false}
        title="Browse by category"
        subtitle="Tap any image to open the lightbox."
      />
    </>
  );
};

export default GalleryPage;

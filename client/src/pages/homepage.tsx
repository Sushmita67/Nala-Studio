import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import WhyNalaSection from '../components/WhyNalaSection';
import CoursesSection from '../components/CoursesSection';
import ReviewsSection from '../components/ReviewsSection';
import InstagramSection from '../components/InstagramSection';
import ContactSection from '../components/ContactSection';

const Homepage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection limitPerCategory={3} showViewAll />
      <GallerySection featuredOnly limit={9} showFilters showViewAll />
      <WhyNalaSection />
      <CoursesSection />
      <ReviewsSection />
      <InstagramSection />
      <ContactSection />
    </>
  );
};

export default Homepage;

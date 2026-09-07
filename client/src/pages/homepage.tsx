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
import CtaStrip from '../components/CtaStrip';

const Homepage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection limitPerCategory={3} showViewAll />
      <GallerySection featuredOnly limit={6} showFilters={false} showViewAll />
      <WhyNalaSection />
      <CoursesSection />
      <ReviewsSection />
      <InstagramSection />
      <CtaStrip />
      <ContactSection />
    </>
  );
};

export default Homepage;

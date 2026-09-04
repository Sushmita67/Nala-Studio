import React from 'react';
import { Link } from 'react-router-dom';
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
      <GallerySection featuredOnly limit={6} showFilters={false} showViewAll />
      <WhyNalaSection />
      <CoursesSection />
      <ReviewsSection />
      <InstagramSection />
      <section className="border-y border-nala-border bg-nala-ivory section-pad-sm">
        <div className="container-nala flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-measure">
            <p className="section-label mb-2">Ready when you are</p>
            <h2 className="section-title text-balance">Book your next visit to NALA</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/book" className="btn-primary">
              Book appointment
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact studio
            </Link>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
};

export default Homepage;

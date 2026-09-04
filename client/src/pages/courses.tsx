import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import CoursesSection from '../components/CoursesSection';

const CoursesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        eyebrow="Academy"
        title="Learn with NALA"
        description="Professional nails and lashes training with working artists. Enquire to discuss schedules and enrollment."
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Academy' },
        ]}
        actions={
          <Link to="/contact" className="btn-primary">
            Enquire to enroll
          </Link>
        }
      />
      <CoursesSection />
    </>
  );
};

export default CoursesPage;

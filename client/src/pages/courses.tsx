import React from 'react';
import PageHeader from '../components/PageHeader';
import CoursesSection from '../components/CoursesSection';
import Button from '../components/ui/Button';

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
        actions={<Button to="/contact">Enquire to enroll</Button>}
      />
      <CoursesSection />
    </>
  );
};

export default CoursesPage;

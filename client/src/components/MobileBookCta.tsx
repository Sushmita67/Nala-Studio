import React from 'react';
import { Link } from 'react-router-dom';

const MobileBookCta: React.FC = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-nala-border/80 bg-nala-ivory/95 px-4 pt-3 backdrop-blur-md safe-pb lg:hidden">
      <Link to="/book" className="btn-primary w-full">
        Book an appointment
      </Link>
    </div>
  );
};

export default MobileBookCta;

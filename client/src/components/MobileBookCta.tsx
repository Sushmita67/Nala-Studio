import React from 'react';
import Button from './ui/Button';

const MobileBookCta: React.FC = () => (
  <div className="fixed inset-x-0 bottom-0 z-40 border-t border-nala-border/80 bg-nala-ivory/95 px-4 pt-3 backdrop-blur-md safe-pb lg:hidden">
    <Button to="/book" className="w-full rounded-full" size="md">
      Book an appointment
    </Button>
  </div>
);

export default MobileBookCta;

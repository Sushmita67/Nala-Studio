import React, { type ReactNode } from 'react';
import SectionHeader from '../SectionHeader';

interface SectionHeaderProps {
  overline?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
  light?: boolean;
}

const UiSectionHeader: React.FC<SectionHeaderProps> = (props) => <SectionHeader {...props} />;

export default UiSectionHeader;

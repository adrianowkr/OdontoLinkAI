import React from 'react';
import { IconProps } from './IconProps';

const CogIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5M12 9.75v4.5m-4.5-4.5v4.5m9-4.5v4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 000-13.5 6 6 0 000 13.5z" />
  </svg>
);

export default CogIcon;

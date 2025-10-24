import React from 'react';
import { IconProps } from './IconProps';

const StethoscopeIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 0a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 013.75 3h16.5a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25m-16.5 0V21a2.25 2.25 0 002.25 2.25h5.25a2.25 2.25 0 002.25-2.25V9.75m-9.75 0h9.75" />
  </svg>
);

export default StethoscopeIcon;

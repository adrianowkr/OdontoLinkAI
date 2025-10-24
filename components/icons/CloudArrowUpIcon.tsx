import React from 'react';
import { IconProps } from './IconProps';

const CloudArrowUpIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M17.25 12a4.5 4.5 0 01-9 0m9 0a4.5 4.5 0 00-9 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-5.962-4.03-10.5-9-10.5s-9 4.538-9 10.5" />
  </svg>
);

export default CloudArrowUpIcon;

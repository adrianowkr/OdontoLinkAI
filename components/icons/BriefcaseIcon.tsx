import React from 'react';
import { IconProps } from './IconProps';

const BriefcaseIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.5-2.25 2.5h-10.5c-1.286 0-2.25-.938-2.25-2.25V14.15M16.5 6.75h-9v4.5h9v-4.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75C6.75 5.625 7.625 4.5 8.75 4.5h6.5c1.125 0 2 1.125 2 2.25v2.25" />
  </svg>
);

export default BriefcaseIcon;

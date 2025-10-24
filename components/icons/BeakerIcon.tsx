
import React from 'react';
import { IconProps } from './IconProps';

const BeakerIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 01-6.23-.693L4.2 15.3m15.6 0-1.275 1.275a2.25 2.25 0 01-3.182 0l-1.275-1.275M4.2 15.3l1.275 1.275a2.25 2.25 0 003.182 0l1.275-1.275m0 0c-2.819.292-5.181.292-8.001 0M12 15c-2.819.292-5.181.292-8.001 0m0 0c-2.819.292-5.181.292-8.001 0" />
  </svg>
);

export default BeakerIcon;

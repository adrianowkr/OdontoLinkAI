import React from 'react';
import { IconProps } from './IconProps';

const PencilSquareIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.82a2.25 2.25 0 01-1.897 1.13-2.25 2.25 0 01-2.475-1.332l-.285-.945a2.25 2.25 0 01.945-2.475l10.582-10.582z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5.25v5.25H9.75" />
    </svg>
);

export default PencilSquareIcon;
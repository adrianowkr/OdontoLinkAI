import React from 'react';
import { IconProps } from './IconProps';

const ChatBubbleOvalLeftIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.372a3.527 3.527 0 01-3.72 0l-3.72-.372C6.347 17.386 5.5 16.393 5.5 15.257V10.97c0-.97.616-1.813 1.5-2.097m6.5 0v2.267a2.25 2.25 0 01-2.25 2.25H8.5" />
    </svg>
);

export default ChatBubbleOvalLeftIcon;

import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M9.9 2.1 7.5 7.5 2.1 9.9l5.4 2.4 2.4 5.4 2.4-5.4 5.4-2.4-5.4-2.4Z" />
    <path d="M20 10.5 18 15l-5-2 2-5Z" />
    <path d="M12 21.5 10 17l-5-2 4-2Z" />
  </svg>
);

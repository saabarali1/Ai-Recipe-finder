import React from 'react';
import { ChefHatIcon } from './icons/ChefHatIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <ChefHatIcon className="h-8 w-8 text-orange-500 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          AI Recipe Finder
        </h1>
      </div>
    </header>
  );
};

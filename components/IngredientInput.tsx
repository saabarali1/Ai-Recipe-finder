import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface IngredientInputProps {
  onGenerate: (ingredients: string) => void;
  isLoading: boolean;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ onGenerate, isLoading }) => {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(ingredients);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-center w-full max-w-xl mx-auto">
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="e.g., chicken, tomatoes, basil"
        className="w-full px-4 py-3 text-lg border-gray-300 rounded-full shadow-sm focus:ring-orange-500 focus:border-orange-500 transition duration-150"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed transition duration-150"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2 -ml-1" />
            Generate
          </>
        )}
      </button>
    </form>
  );
};

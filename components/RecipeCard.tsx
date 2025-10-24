import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const ImagePlaceholder: React.FC = () => (
    <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    </div>
);


export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
      {recipe.imageUrl ? (
        <img className="w-full h-48 object-cover" src={recipe.imageUrl} alt={recipe.recipeName} />
      ) : (
        <ImagePlaceholder />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{recipe.description}</p>
        
        <div className="space-y-4 mt-auto">
          <div>
            <h4 className="font-semibold text-lg text-gray-800 border-b pb-1 mb-2">Ingredients</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {recipe.ingredients.map((ingredient, i) => <li key={i}>{ingredient}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-gray-800 border-b pb-1 mb-2">Instructions</h4>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

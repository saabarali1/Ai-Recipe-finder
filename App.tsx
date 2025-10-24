import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IngredientInput } from './components/IngredientInput';
import { RecipeCard } from './components/RecipeCard';
import { Loader } from './components/Loader';
import { generateRecipes, generateRecipeImage } from './services/geminiService';
import type { Recipe } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipes = useCallback(async (ingredients: string) => {
    if (!ingredients) {
      setError('Please enter some ingredients.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const initialRecipes = await generateRecipes(ingredients);
      setRecipes(initialRecipes.map(r => ({ ...r, imageUrl: '' }))); // Display recipes first

      // Sequentially fetch images to update cards as they load
      const recipesWithImages: Recipe[] = [];
      for (const recipe of initialRecipes) {
        try {
          const imageUrl = await generateRecipeImage(recipe.recipeName);
          const recipeWithImage = { ...recipe, imageUrl };
          recipesWithImages.push(recipeWithImage);
          // FIX: Correctly construct the new recipes array. The original code accessed `r.imageUrl`
          // on objects from `initialRecipes` which do not have this property.
          setRecipes([...recipesWithImages, ...initialRecipes.slice(recipesWithImages.length).map(r => ({ ...r, imageUrl: '' }))]);
        } catch (imgError) {
          console.error(`Failed to generate image for ${recipe.recipeName}`, imgError);
          // Keep the recipe without an image
          recipesWithImages.push({ ...recipe, imageUrl: '' });
          // FIX: Correctly construct the new recipes array. The original code accessed `r.imageUrl`
          // on objects from `initialRecipes` which do not have this property.
          setRecipes([...recipesWithImages, ...initialRecipes.slice(recipesWithImages.length).map(r => ({ ...r, imageUrl: '' }))]);
        }
      }

    } catch (err) {
      console.error(err);
      setError('Sorry, we couldn\'t generate recipes at the moment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's in your fridge?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Enter the ingredients you have, and our AI chef will whip up some delicious recipes for you.
          </p>
          <IngredientInput onGenerate={handleGenerateRecipes} isLoading={isLoading} />
        </div>

        {error && <div className="max-w-3xl mx-auto mt-8 text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>}

        <div className="mt-12">
          {isLoading && <Loader />}
          {!isLoading && recipes.length === 0 && (
             <div className="text-center text-gray-500 py-16">
              <SparklesIcon className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-2xl font-semibold">Ready for some magic?</h3>
              <p>Your culinary creations will appear here.</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard key={`${recipe.recipeName}-${index}`} recipe={recipe} />
            ))}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm mt-8">
        <p>Powered by Gemini. Designed for food lovers.</p>
      </footer>
    </div>
  );
};

export default App;

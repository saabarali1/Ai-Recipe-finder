import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      recipeName: {
        type: Type.STRING,
        description: "The name of the recipe.",
      },
      description: {
        type: Type.STRING,
        description: "A short, appetizing description of the dish.",
      },
      ingredients: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of all ingredients required for the recipe, including quantities.",
      },
      instructions: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Step-by-step instructions to prepare the dish.",
      },
    },
    required: ["recipeName", "description", "ingredients", "instructions"],
  },
};

export async function generateRecipes(ingredients: string): Promise<Omit<Recipe, 'imageUrl'>[]> {
  const prompt = `Generate 3 diverse and delicious recipes based on the following ingredients: ${ingredients}. The recipes should be suitable for a home cook. Ensure the instructions are clear and easy to follow.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const recipes = JSON.parse(jsonText) as Omit<Recipe, 'imageUrl'>[];
    
    if (!Array.isArray(recipes) || recipes.length === 0) {
        throw new Error("AI did not return valid recipes.");
    }

    return recipes;

  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Failed to generate recipes from Gemini API.");
  }
}

export async function generateRecipeImage(recipeName: string): Promise<string> {
    const prompt = `A delicious, high-resolution, professionally photographed plate of "${recipeName}". Appetizing and vibrant, styled for a gourmet food magazine cover.`;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '4:3',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error(`Error generating image for ${recipeName}:`, error);
        throw new Error(`Failed to generate an image for ${recipeName}.`);
    }
}

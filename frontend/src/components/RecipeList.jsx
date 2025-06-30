import React from 'react';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, fetchRecipes, handleEdit }) {
  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          fetchRecipes={fetchRecipes}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export default RecipeList;

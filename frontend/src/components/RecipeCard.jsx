import React from 'react';

function RecipeCard({ recipe, fetchRecipes, handleEdit }) {
  const handleDelete = async () => {
    await fetch(`http://localhost:5000/api/recipes/${recipe.id}`, { method: 'DELETE' });
    fetchRecipes();
  };

  return (
    <div className="recipe-card">
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p><strong>Category:</strong> {recipe.category}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => handleEdit(recipe)}>Edit</button>
    </div>
  );
}

export default RecipeCard;

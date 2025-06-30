import React from 'react';
import RecipeForm from '../components/RecipeForm';
import { useNavigate } from 'react-router-dom';

function AddRecipe() {
  const navigate = useNavigate();

  // ✅ Correct: Single handleAdd function
  const handleAdd = async (recipeData) => {
    await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipeData)
    });

    alert('Recipe added successfully!');
    navigate('/recipes');  // ✅ Redirect to Recipe List page after adding
  };

  return (
    <div className="page add-recipe-page">
      <h2>Add a New Recipe</h2>
      <RecipeForm onAdd={handleAdd} />
    </div>
  );
}

export default AddRecipe;

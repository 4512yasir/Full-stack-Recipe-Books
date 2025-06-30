import React, { useEffect, useState } from 'react';
import RecipeList from '../components/RecipeList';

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);

const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipes');
      const data = await response.json();
      if (Array.isArray(data.recipes)) { // ✅ Correct part
        setRecipes(data.recipes);
      } else {
        setRecipes([]); // fallback
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]); // fallback
    }
  };
  

  useEffect(() => {
    fetchRecipes();
  }, []);
  
  useEffect(() => {
    console.log('Fetched Recipes:', recipes);
  }, [recipes]);

  return (
    <div className="page recipe-list-page">
      <h2>All Recipes</h2>
      <RecipeList
        recipes={recipes}
        fetchRecipes={fetchRecipes}
        handleEdit={() => {}} // Pass empty function to prevent errors
      />
    </div>
  );
}

export default RecipeListPage;

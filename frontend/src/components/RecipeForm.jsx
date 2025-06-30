import React, { useState, useEffect } from 'react';

function RecipeForm({ onAdd, onUpdate, selectedRecipe }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (selectedRecipe) {
      setTitle(selectedRecipe.title);
      setDescription(selectedRecipe.description);
      setCategory(selectedRecipe.category);
      setImageUrl(selectedRecipe.image_url);
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
      setImageUrl('');
    }
  }, [selectedRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipeData = { title, description, category, image_url: imageUrl };

    if (selectedRecipe) {
      onUpdate(selectedRecipe.id, recipeData);
    } else {
      onAdd(recipeData);
    }

    // Clear form
    setTitle('');
    setDescription('');
    setCategory('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Recipe Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL (Optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">{selectedRecipe ? 'Update Recipe' : 'Add Recipe'}</button>
    </form>
  );
}

export default RecipeForm;

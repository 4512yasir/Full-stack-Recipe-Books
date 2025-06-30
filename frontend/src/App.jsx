import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import AddRecipe from './Pages/AddRecipe';
import RecipeListPage from './Pages/RecipeList';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/recipes" element={<RecipeListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

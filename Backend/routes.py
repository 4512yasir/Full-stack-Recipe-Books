from flask import Blueprint, request, jsonify, current_app
from models import db, Recipe
from werkzeug.utils import secure_filename
import os

recipe_routes = Blueprint('recipe_routes', __name__)

# Get all recipes with pagination
@recipe_routes.route('/api/recipes', methods=['GET'])
def get_recipes():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 6, type=int)
    pagination = Recipe.query.paginate(page=page, per_page=per_page, error_out=False)
    recipes = pagination.items

    return jsonify({
        'recipes': [{
            'id': r.id,
            'title': r.title,
            'description': r.description,
            'category': r.category,
            'image_url': r.image_url
        } for r in recipes],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page
    })

# Search recipes
@recipe_routes.route('/api/recipes/search', methods=['GET'])
def search_recipes():
    query = request.args.get('query', '')
    recipes = Recipe.query.filter(
        Recipe.title.ilike(f'%{query}%') | Recipe.category.ilike(f'%{query}%')
    ).all()

    return jsonify([{
        'id': r.id,
        'title': r.title,
        'description': r.description,
        'category': r.category,
        'image_url': r.image_url
    } for r in recipes])

# ✅ Create a new recipe (JSON version)
@recipe_routes.route('/api/recipes', methods=['POST'])
def create_recipe():
    data = request.get_json()

    new_recipe = Recipe(
        title=data['title'],
        description=data['description'],
        category=data['category'],
        image_url=data.get('image_url', '')  # Keep for future image support
    )

    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe created successfully'}), 201

# ✅ Update an existing recipe
@recipe_routes.route('/api/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    data = request.get_json()
    recipe.title = data['title']
    recipe.description = data['description']
    recipe.category = data['category']
    recipe.image_url = data.get('image_url', '')

    db.session.commit()
    return jsonify({'message': 'Recipe updated successfully'})

# ✅ Delete a recipe
@recipe_routes.route('/api/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'})

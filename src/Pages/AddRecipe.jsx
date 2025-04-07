import React, { useState, useEffect } from 'react';
import { 
    Container, 
    TextField, 
    Button, 
    Typography, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Chip,
    Box,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Avatar
} from '@mui/material';

const AddRecipe = () => {
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        cookingTime: '',
        rating: '',
        image: null, // Changed from string to File object
        imagePreview: '', // For displaying the preview
        category: '',
        ingredients: '',
        instructions: '',
        timer: '',
        dietaryTags: [],
        dietaryInput: ''
    });

    const [recipes, setRecipes] = useState([]);
    
    // Available categories and dietary tags
    const categories = ['Drinks', 'Desserts', 'Noodles', 'Pasta', 'Fried Rice'];
    const availableDietaryTags = ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'nut-free', 'keto', 'paleo'];

    // Load saved recipes from localStorage
    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setRecipes(savedRecipes);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecipe(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewRecipe(prev => ({
                    ...prev,
                    image: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddDietaryTag = () => {
        if (newRecipe.dietaryInput && !newRecipe.dietaryTags.includes(newRecipe.dietaryInput)) {
            setNewRecipe(prev => ({
                ...prev,
                dietaryTags: [...prev.dietaryTags, prev.dietaryInput],
                dietaryInput: ''
            }));
        }
    };

    const handleRemoveDietaryTag = (tagToRemove) => {
        setNewRecipe(prev => ({
            ...prev,
            dietaryTags: prev.dietaryTags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleAddRecipe = (e) => {
        e.preventDefault();
        
        // Create a recipe object with the image as a data URL
        const recipeToAdd = {
            ...newRecipe,
            id: Date.now(),
            ingredients: newRecipe.ingredients.split('\n').filter(item => item.trim()),
            instructions: newRecipe.instructions.split('\n').filter(item => item.trim()),
            timer: parseInt(newRecipe.timer) || 0,
            rating: parseFloat(newRecipe.rating) || 0,
            image: newRecipe.imagePreview // Use the preview URL for storage
        };

        // Remove the File object and preview from the saved object
        const { image: file, imagePreview, ...recipeToSave } = recipeToAdd;

        const updatedRecipes = [...recipes, recipeToSave];
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes);
        setNewRecipe({
            title: '',
            cookingTime: '',
            rating: '',
            image: null,
            imagePreview: '',
            category: '',
            ingredients: '',
            instructions: '',
            timer: '',
            dietaryTags: [],
            dietaryInput: ''
        });
        alert('Recipe added!');
    };

    const handleDeleteRecipe = (id) => {
        const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes);
    };

    const handleEditRecipe = (id) => {
        const recipeToEdit = recipes.find(recipe => recipe.id === id);
        setNewRecipe({
            ...recipeToEdit,
            ingredients: recipeToEdit.ingredients.join('\n'),
            instructions: recipeToEdit.instructions.join('\n'),
            dietaryInput: '',
            image: null,
            imagePreview: recipeToEdit.image
        });
        handleDeleteRecipe(id);
    };

    return (
        <Container maxWidth="md" sx={{ paddingTop: '80px' }}>
            {/* White Wrapper for Content */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                {/* Add Recipe Form */}
                <Typography variant="h4" gutterBottom sx={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>
                    Add a New Recipe
                </Typography>

                <form onSubmit={handleAddRecipe}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                        <TextField
                            label="Title"
                            name="title"
                            value={newRecipe.title}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{
                                backgroundColor: 'var(--background-color)',
                                '& .MuiInputBase-root': { borderRadius: '8px' },
                            }}
                        />
                        <TextField
                            label="Cooking Time"
                            name="cookingTime"
                            value={newRecipe.cookingTime}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            sx={{
                                backgroundColor: 'var(--background-color)',
                                '& .MuiInputBase-root': { borderRadius: '8px' },
                            }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">mins</InputAdornment>,
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
                        <TextField
                            label="Rating (0-5)"
                            name="rating"
                            type="number"
                            value={newRecipe.rating}
                            onChange={handleInputChange}
                            fullWidth
                            required
                            inputProps={{ min: 0, max: 5, step: 0.1 }}
                            sx={{
                                backgroundColor: 'var(--background-color)',
                                '& .MuiInputBase-root': { borderRadius: '8px' },
                            }}
                        />
                        <TextField
                            label="Timer (minutes)"
                            name="timer"
                            type="number"
                            value={newRecipe.timer}
                            onChange={handleInputChange}
                            fullWidth
                            sx={{
                                backgroundColor: 'var(--background-color)',
                                '& .MuiInputBase-root': { borderRadius: '8px' },
                            }}
                        />
                    </Box>

                    {/* Image Upload Section */}
                    <Box sx={{ marginBottom: '16px' }}>
                        <Typography variant="subtitle1" sx={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                            Recipe Image
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    background: 'var(--primary-gradient)',
                                    color: 'var(--button-text-color)',
                                    padding: '8px 16px',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    '&:hover': { backgroundColor: 'var(--hover-color)' },
                                }}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Button>
                            {newRecipe.imagePreview && (
                                <Avatar
                                    src={newRecipe.imagePreview}
                                    alt="Preview"
                                    sx={{ width: 100, height: 100, borderRadius: '8px' }}
                                    variant="square"
                                />
                            )}
                        </Box>
                    </Box>

                    <FormControl fullWidth sx={{ marginBottom: '16px', backgroundColor: 'var(--background-color)', borderRadius: '8px' }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            label="Category"
                            name="category"
                            value={newRecipe.category}
                            onChange={handleInputChange}
                            required
                            sx={{ borderRadius: '8px' }}
                        >
                            {categories.map(category => (
                                <MenuItem key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Ingredients (one per line)"
                        name="ingredients"
                        value={newRecipe.ingredients}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{
                            marginBottom: '16px',
                            backgroundColor: 'var(--background-color)',
                            '& .MuiInputBase-root': { borderRadius: '8px' },
                        }}
                    />

                    <TextField
                        label="Instructions (one step per line)"
                        name="instructions"
                        value={newRecipe.instructions}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        multiline
                        rows={4}
                        sx={{
                            marginBottom: '16px',
                            backgroundColor: 'var(--background-color)',
                            '& .MuiInputBase-root': { borderRadius: '8px' },
                        }}
                    />

                    <Box sx={{ marginBottom: '16px' }}>
                        <Typography variant="subtitle1" sx={{ marginBottom: '8px', color: 'var(--primary-color)' }}>
                            Dietary Tags
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <TextField
                                label="Add dietary tag"
                                value={newRecipe.dietaryInput}
                                onChange={(e) => setNewRecipe(prev => ({ ...prev, dietaryInput: e.target.value }))}
                                sx={{
                                    flexGrow: 1,
                                    backgroundColor: 'var(--background-color)',
                                    '& .MuiInputBase-root': { borderRadius: '8px' },
                                }}
                            />
                            <Button
                                variant="outlined"
                                onClick={handleAddDietaryTag}
                                sx={{
                                    color: 'var(--primary-color)',
                                    borderColor: 'var(--primary-color)',
                                    '&:hover': { borderColor: 'var(--hover-color)' },
                                }}
                            >
                                Add
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {availableDietaryTags.map(tag => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onClick={() => {
                                        if (!newRecipe.dietaryTags.includes(tag)) {
                                            setNewRecipe(prev => ({
                                                ...prev,
                                                dietaryTags: [...prev.dietaryTags, tag]
                                            }));
                                        }
                                    }}
                                    color={newRecipe.dietaryTags.includes(tag) ? "primary" : "default"}
                                    sx={{ cursor: 'pointer' }}
                                />
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                            {newRecipe.dietaryTags.map(tag => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onDelete={() => handleRemoveDietaryTag(tag)}
                                    sx={{ backgroundColor: 'var(--secondary-color)' }}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            background: 'var(--primary-gradient)',
                            color: 'var(--button-text-color)',
                            padding: '12px 20px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            '&:hover': { backgroundColor: 'var(--hover-color)' },
                        }}
                        type="submit"
                    >
                        Add Recipe
                    </Button>
                </form>

                {/* Recipe Table */}
                <Typography variant="h5" sx={{ marginTop: '40px', color: 'var(--primary-color)', fontWeight: 'bold' }}>
                    Recipe List
                </Typography>
                <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Title</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Category</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Rating</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Image</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipes.map((recipe) => (
                                <TableRow key={recipe.id} sx={{ '&:hover': { backgroundColor: 'var(--secondary-color)', cursor: 'pointer' } }}>
                                    <TableCell>{recipe.title}</TableCell>
                                    <TableCell>{recipe.category}</TableCell>
                                    <TableCell>{recipe.rating}</TableCell>
                                    <TableCell>
                                        <Avatar
                                            src={recipe.image}
                                            alt={recipe.title}
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: '8px',
                                            }}
                                            variant="square"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                marginRight: '8px',
                                                color: 'var(--primary-color)',
                                                borderColor: 'var(--primary-color)',
                                                '&:hover': { borderColor: 'var(--hover-color)', backgroundColor: 'var(--hover-color)', color: 'white' },
                                            }}
                                            onClick={() => handleEditRecipe(recipe.id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: 'var(--primary-color)',
                                                borderColor: 'var(--primary-color)',
                                                '&:hover': { borderColor: 'var(--hover-color)', backgroundColor: 'var(--hover-color)', color: 'white' },
                                            }}
                                            onClick={() => handleDeleteRecipe(recipe.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Container>
    );
};

export default AddRecipe;
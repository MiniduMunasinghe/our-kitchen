import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, Typography, Container, Button } from '@mui/material';

const RecipeFeed = () => {
    const [recipes, setRecipes] = useState([]);
    const { category } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            navigate('/login');
            return;
        }

        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:3001/recipes');
                const data = await response.json();
                const filteredRecipes = data.filter(
                    (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
                );
                setRecipes(filteredRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [category, navigate]);

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'var(--primary-color)' }}>
                {category?.toUpperCase()} Recipes
            </Typography>
            {recipes.length === 0 ? (
                <Typography align="center" sx={{ color: '#B2369D' }}>
                    No recipes found for this category.
                </Typography>
            ) : (
                recipes.map((recipe) => (
                    <Card
                        key={recipe.id}
                        sx={{
                            marginBottom: '20px',
                            borderRadius: '10px',
                            boxShadow: 3,
                            position: 'relative',
                            '&:hover': {
                                boxShadow: 6,
                                transform: 'scale(1.02)',
                                transition: 'transform 0.3s ease',
                            }
                        }}
                    >
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            style={{
                                width: '100%',
                                height: '300px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                display: 'block'
                            }}
                        />
                        <CardContent
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                borderBottomLeftRadius: '10px',
                                borderBottomRightRadius: '10px',
                                padding: '15px',
                                backdropFilter: 'blur(2px)'
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#FFC62E',
                                    fontWeight: 'bold',
                                    marginBottom: '8px'
                                }}
                            >
                                {recipe.title}
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" sx={{ color: '#FF6F1B' }}>
                                    ⏱️ {recipe.cookingTime}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#FF6F1B' }}>
                                    ⭐ {recipe.rating}
                                </Typography>
                            </div>
                            <Button
                                component={Link}
                                to={`/recipe/${recipe.id}`}
                                variant="outlined"
                                sx={{
                                    color: '#FFC62E',
                                    borderColor: '#FFC62E',
                                    marginTop: '10px',
                                    padding: '6px 12px',
                                    '&:hover': {
                                        backgroundColor: '#FFC62E',
                                        color: '#0A0F4F',
                                    }
                                }}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))
            )}
        </Container>
    );
};

export default RecipeFeed;
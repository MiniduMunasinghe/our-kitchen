import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleRemoveFavorite = (id) => {
        const updatedFavorites = favorites.filter(recipe => recipe.id !== id);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    if (favorites.length === 0) {
        return (
            <Container maxWidth="md" sx={{ paddingTop: '80px' }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: 'var(--primary-color)' }}>
                    No Favorites Yet
                </Typography>
                <Typography variant="body1" align="center" sx={{ color: 'var(--text-color)' }}>
                    Add recipes to your favorites to view them here.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ paddingTop: '80px' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: 'var(--primary-color)' }}>
                My Favorites
            </Typography>
            <Grid container spacing={4}>
                {favorites.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                        <Card sx={{
                            background: 'var(--background-color)',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                            },
                        }}>
                            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderTopLeftRadius: '8px',
                                        borderTopRightRadius: '8px',
                                    }}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: 'var(--primary-color)' }}>
                                        {recipe.title}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: 'var(--primary-gradient)',
                                            color: 'var(--button-text-color)',
                                            '&:hover': {
                                                backgroundColor: 'var(--hover-color)',
                                            },
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            fontWeight: 'bold',
                                            marginTop: '16px',
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent navigating to recipe details while removing from favorites
                                            handleRemoveFavorite(recipe.id);
                                        }}
                                    >
                                        Remove from Favorites
                                    </Button>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Favorites;

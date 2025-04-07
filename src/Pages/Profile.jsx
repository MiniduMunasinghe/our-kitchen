import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            navigate('/login'); // Redirect to login if no user is logged in
        } else {
            setUser(loggedInUser);
        }
    }, [navigate]);

    if (!user) return null; // Wait until user data is loaded

    return (
        <Container maxWidth="md" sx={{ paddingTop: '80px' }}>
            {/* White Wrapper for Content */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: 'var(--primary-color)' }}>
                    Welcome, {user.username}!
                </Typography>

                <Grid container spacing={4}>
                    {/* Favorites Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            background: 'var(--background-color)',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                            },
                        }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{ color: 'var(--primary-color)' }}>
                                    My Favorites
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px' }}>
                                    View and manage your favorite recipes.
                                </Typography>
                                <Link to="/favorites" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" sx={{
                                        background: 'var(--primary-gradient)',
                                        color: 'var(--button-text-color)',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-color)',
                                        },
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                    }}>
                                        Go to Favorites
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Add Recipe Card */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card sx={{
                            background: 'var(--background-color)',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                            },
                        }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom sx={{ color: 'var(--primary-color)' }}>
                                    Add a Recipe
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '16px' }}>
                                    Add your own recipes to the collection.
                                </Typography>
                                <Link to="/add-recipe" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" sx={{
                                        background: 'var(--primary-gradient)',
                                        color: 'var(--button-text-color)',
                                        '&:hover': {
                                            backgroundColor: 'var(--hover-color)',
                                        },
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        fontWeight: 'bold',
                                    }}>
                                        Go to Add Recipe
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Profile;

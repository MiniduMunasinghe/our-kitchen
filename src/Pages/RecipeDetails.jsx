import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, Typography, Button, Box } from '@mui/material';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Store the interval reference in a ref so it persists between renders
    const timerRef = React.useRef(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/recipes/${id}`);
                const data = await response.json();
                setRecipe(data);
                setTimeLeft(data.timer * 60);  // Convert timer to seconds
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();

        // Cleanup function to clear interval when component unmounts
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [id]);

    const handleSaveToFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isAlreadyFavorite = savedFavorites.some(fav => fav.id === recipe.id);

        if (!isAlreadyFavorite) {
            savedFavorites.push(recipe);
            localStorage.setItem('favorites', JSON.stringify(savedFavorites));
        }
    };

    const startTimer = () => {
        // Clear any existing timer first
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        
        setIsTimerRunning(true);
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    setIsTimerRunning(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setIsTimerRunning(false);
        }
    };

    const resetTimer = () => {
        stopTimer(); // Stop the timer first
        setTimeLeft(recipe.timer * 60); // Reset to the original timer in seconds
    };

    if (!recipe) return <div>Loading...</div>;

    return (
        <Container maxWidth="md" sx={{ paddingTop: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, borderRadius: '10px', overflow: 'hidden' }}>
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '10px'
                                }}
                            />
                        </Card>
                    </Grid>

                    <Box sx={{ marginTop: '20px' }}>
                        <Typography variant="h6" sx={{ color: '#0A0F4F', marginBottom: '10px' }}>
                            Instructions
                        </Typography>
                        <ol style={{ paddingLeft: '20px', color: 'var(--text-color)' }}>
                            {recipe.instructions.map((step, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </Box>

                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom sx={{ color: '#0A0F4F' }}>
                            {recipe.title}
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ color: '#FF6F1B' }}>
                            <strong>Cooking Time:</strong> {recipe.cookingTime}
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={{ color: '#602BBD' }}>
                            <strong>Rating:</strong> {recipe.rating} ★
                        </Typography>

                        {/* Timer Display */}
                        {timeLeft > 0 && (
                            <Typography variant="body1" gutterBottom sx={{ color: '#B2369D' }}>
                                <strong>Time Left:</strong> {Math.floor(timeLeft / 60)} minutes {timeLeft % 60} seconds
                            </Typography>
                        )}
                        {timeLeft === 0 && (
                            <Typography variant="body1" gutterBottom sx={{ color: '#B2369D' }}>
                                Time's up!
                            </Typography>
                        )}

                        {/* Timer-related Buttons */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                            {!isTimerRunning ? (
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#FFC62E',
                                        color: '#0A0F4F',
                                        '&:hover': {
                                            backgroundColor: '#FF6F1B',
                                            color: '#FFFFFF',
                                        },
                                        marginBottom: '10px',
                                        borderRadius: '10px'
                                    }}
                                    onClick={startTimer}
                                >
                                    Start Timer
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#FFC62E',
                                            color: '#0A0F4F',
                                            '&:hover': {
                                                backgroundColor: '#FF6F1B',
                                                color: '#FFFFFF',
                                            },
                                            marginBottom: '10px',
                                            borderRadius: '10px'
                                        }}
                                        onClick={stopTimer}
                                    >
                                        Stop Timer
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#FFC62E',
                                            color: '#0A0F4F',
                                            '&:hover': {
                                                backgroundColor: '#FF6F1B',
                                                color: '#FFFFFF',
                                            },
                                            marginBottom: '10px',
                                            borderRadius: '10px'
                                        }}
                                        onClick={resetTimer}
                                    >
                                        Reset Timer
                                    </Button>
                                </>
                            )}
                        </Box>

                        {/* Rest of your component remains the same */}
                        {/* Save to Favorites Button */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#FFC62E',
                                    color: '#0A0F4F',
                                    '&:hover': {
                                        backgroundColor: '#FF6F1B',
                                        color: '#FFFFFF',
                                    },
                                    marginBottom: '10px',
                                    borderRadius: '10px'
                                }}
                                onClick={handleSaveToFavorites}
                            >
                                Save to Favorites
                            </Button>
                        </Box>

                        {/* Social Sharing Buttons */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#FF6F1B',
                                    color: '#FFFFFF',
                                    '&:hover': {
                                        backgroundColor: '#FFC62E',
                                        color: '#0A0F4F',
                                    },
                                    marginBottom: '10px',
                                    borderRadius: '10px'
                                }}
                                onClick={() => {
                                    const shareUrl = `https://wa.me/?text=${encodeURIComponent(
                                        `Check out this recipe: ${recipe.title} - ${window.location.href}`
                                    )}`;
                                    window.open(shareUrl, '_blank');
                                }}
                            >
                                Share on WhatsApp
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default RecipeDetails;
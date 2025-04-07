import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const categories = [
    { name: 'drinks', image: '/images/Dashbord/DBDrinks.jpg' },
    { name: 'desserts', image: '/images/Dashbord/DBDesserts.jpg' },
    { name: 'noodles', image: '/images/Dashbord/DBNoodles.jpg' },
    { name: 'pasta', image: '/images/Dashbord/DBPasta.jpg' },
    { name: 'fried rice', image: '/images/Dashbord/DBFriedrice.jpg' }
];

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{ textAlign: 'center', paddingTop: '20px' }}>
            {/* White Wrapper for Content */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'var(--primary-color)' }}>
                    Recipe Categories
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {filteredCategories.map((cat) => (
                        <Grid item xs={12} sm={6} md={4} key={cat.name}>
                            <Card
                                className="category-card"
                                sx={{
                                    height: '400px',
                                    width: '300px',
                                    backgroundImage: `url(${cat.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '10px',
                                    boxShadow: 3,
                                }}
                            >
                                <CardContent
                                    className="card-content-overlay"
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        borderRadius: '10px',
                                        padding: '10px'
                                    }}
                                >
                                    <Typography variant="h6" color="white" gutterBottom>
                                        {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            color: '#FFC62E',
                                            borderColor: '#FFC62E',
                                            '&:hover': {
                                                backgroundColor: '#FFC62E',
                                                color: '#0A0F4F',
                                            }
                                        }}
                                        onClick={() => navigate(`/category/${cat.name}`)}
                                    >
                                        View Recipes
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    );
};

export default Dashboard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'linear-gradient(to right, #FFB347, #FF6F1B)',
                height: '80px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                zIndex: 1000,
            }}
        >
            <Toolbar sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                height: '100%' 
            }}>
                
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    height: '100%' 
                }}>
                
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img 
                            src="/images/Logo/Logo.jpeg"
                            alt="FoodFusion Logo"
                            style={{ 
                                height: '90px', 
                                width: 'auto',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                borderRadius: '8px'
                            }}
                        />
                    </Box>
                </Box>

        
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                    sx={{
                        backgroundColor: '#FF6F1B',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: '#FFB347',
                        },
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        height: '40px' 
                    }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
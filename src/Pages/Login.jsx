import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/system';

const GradientButton = styled(Button)({
  background: 'linear-gradient(to right, #FFB347, #FF6F1B)',
  color: 'white',
  padding: '10px 20px',
  '&:hover': {
    background: '#e65a13',
  },
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const initializeUsers = () => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.length === 0) {
                // Add mock users if no users are found in localStorage
                const mockUsers = [
                    { username: "user1", password: "user1" },
                    { username: "user2", password: "user2" },
                ];
                localStorage.setItem('users', JSON.stringify(mockUsers));
            }
        };

        initializeUsers();
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        // Validate if the username and password match
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Save the user to localStorage and set login status
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            navigate('/profile'); // Navigate to the profile page after successful login
        } else {
            setError('Invalid username or password.');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ 
            mt: 8,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'var(--background-color)'
        }}>
            <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                    color: 'var(--primary-color)',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    mb: 4
                }}
            >
                Login
            </Typography>
            <Box 
                component="form" 
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'var(--secondary-color)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'var(--primary-color)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--text-color)',
                        }
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'var(--secondary-color)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'var(--primary-color)',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'var(--text-color)',
                        }
                    }}
                />
                {error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                <GradientButton 
                    type="submit" 
                    fullWidth 
                    sx={{ 
                        mt: 3,
                        mb: 2,
                        fontWeight: 'bold'
                    }}
                >
                    Login
                </GradientButton>
            </Box>
        </Container>
    );
};

export default Login;
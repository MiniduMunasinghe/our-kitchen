import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField, Button, Typography, Container, Box,
    Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
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
    const [openSignup, setOpenSignup] = useState(false);
    const [newUser, setNewUser] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const initializeUsers = () => {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.length === 0) {
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
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            navigate('/dashboard');
        } else {
            setError('Invalid username or password.');
        }
    };

    const handleSignup = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const exists = users.some(u => u.username === newUser.username);
        if (exists) {
            alert('Username already exists!');
            return;
        }
        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setOpenSignup(false);
        setNewUser({ username: '', password: '' });
        alert('User registered successfully!');
    };

    return (
        <Container maxWidth="xs" sx={{
            mt: 8, p: 4, borderRadius: 2, boxShadow: 3,
            backgroundColor: 'var(--background-color)'
        }}>
            <Typography variant="h4" gutterBottom sx={{
                color: 'var(--primary-color)',
                fontWeight: 'bold', textAlign: 'center', mb: 4
            }}>
                Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{
                display: 'flex', flexDirection: 'column', gap: 2
            }}>
                <TextField
                    label="Username" variant="outlined" fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password" type="password" variant="outlined" fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <GradientButton type="submit" fullWidth sx={{ mt: 3 }}>
                    Login
                </GradientButton>
                <Button onClick={() => setOpenSignup(true)} fullWidth>
                    Don't have an account? Sign Up
                </Button>
            </Box>

            {/* Signup Dialog */}
            <Dialog open={openSignup} onClose={() => setOpenSignup(false)}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSignup(false)}>Cancel</Button>
                    <GradientButton onClick={handleSignup}>Register</GradientButton>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Login;

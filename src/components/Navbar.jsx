import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, InputBase, Menu, MenuItem, Box } from '@mui/material';

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const categories = [
        'Drinks',
        'Desserts',
        'Noodles',
        'Pasta',
        'Fried Rice',
    ];

    const handleDropdownOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = () => {
        setAnchorEl(null);
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        navigate(`/dashboard?search=${term}`);
    };

    return (
        <Box sx={{ position: 'fixed', top: '80px', width: '100%', zIndex: 999 }}>
            <AppBar position="static" sx={{ backgroundColor: '#FF6F1B', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <Toolbar sx={{ 
                    justifyContent: 'center',
                    padding: '0 30px',
                    gap: 4 
                }}>
                    {/* Home Link */}
                    <Button
                        component={Link}
                        to="/dashboard"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            backgroundColor: '#FFB347',
                            '&:hover': {
                                backgroundColor: '#FF6F1B',
                            },
                        }}
                    >
                        Home
                    </Button>

                    {/* Categories Dropdown */}
                    <Box
                        onMouseEnter={handleDropdownOpen}
                        onMouseLeave={handleDropdownClose}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <Button
                            sx={{
                                color: 'white',
                                fontWeight: 'bold',
                                textTransform: 'none',
                                backgroundColor: '#FFB347',
                                '&:hover': {
                                    backgroundColor: '#FF6F1B',
                                },
                            }}
                        >
                            Categories
                        </Button>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleDropdownClose}
                            MenuListProps={{ onMouseLeave: handleDropdownClose }}
                            sx={{
                                marginTop: '10px',
                            }}
                            PaperProps={{
                                sx: {
                                    backgroundColor: '#FF6F1B',
                                    color: 'white',
                                    minWidth: '160px',
                                    borderRadius: '8px',
                                },
                            }}
                        >
                            {categories.map((category) => (
                                <MenuItem
                                    key={category}
                                    component={Link}
                                    to={`/category/${category.toLowerCase()}`}
                                    onClick={handleDropdownClose}
                                    sx={{
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            backgroundColor: '#FFB347',
                                        },
                                    }}
                                >
                                    {category}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Profile Button */}
                    <Button
                        component={Link}
                        to="/profile"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            backgroundColor: '#FFB347',
                            '&:hover': {
                                backgroundColor: '#FF6F1B',
                            },
                        }}
                    >
                        Profile
                    </Button>

                    {/* Search Bar Section */}
                    <InputBase
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '5px 10px',
                            width: '200px',
                            '&:hover': { backgroundColor: '#FFB347' },
                        }}
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
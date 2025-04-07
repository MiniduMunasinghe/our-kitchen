import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(to right, #FFB347, #FF6F1B)', // Gradient background
                color: 'white',
                textAlign: 'center',
                padding: '16px 0',
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 999,
            }}
        >
            <Typography variant="body2" component="p">
                © {new Date().getFullYear()} Our Kitchen. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

const Login = ({ setUser  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setUser (response.data.user);
            localStorage.setItem('token', response.data.token);

            setError(null);
            setSuccessMessage('Login successful!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);

            // Redirect to dashboard after a brief delay
            setTimeout(() => {
                navigate('/dashboard'); // Redirect to /dashboard
            }, 1000);
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : 'An error occurred');
            setError(error.response ? error.response.data : 'An error occurred');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setSuccessMessage(null);
        setError(null);
    };

    const handleSignup = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    return (
        <form onSubmit={handleLogin}>
            <Typography variant="h4">Login</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">Login</Button>
            <Button color="secondary" onClick={handleSignup}>Signup</Button> {/* Add onClick handler for Signup */}
            
            {/* Snackbar for success and error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {error || successMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('manager');
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', { email, password, role });
            alert('User  registered successfully');
            // Optionally, you can redirect or clear the form here
        } catch (err) {
            // Check if the error response exists and has a data property
            const errorMessage = err.response && err.response.data ? err.response.data : 'An error occurred';
            setError(errorMessage);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <form onSubmit={handleSignup}>
            <Typography variant="h4">Signup</Typography>
            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField 
    label="Role" 
    value={role} 
    InputProps={{ readOnly: true }} // Make the field read-only
    required 
/>            <Button type="submit" variant="contained">Signup</Button>

            {/* Snackbar for error messages */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default Signup;

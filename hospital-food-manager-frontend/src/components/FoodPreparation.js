import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Snackbar,
    Alert,
    TextField,
    Grid,
} from '@mui/material';

const FoodPreparation = () => {
    const [meals, setMeals] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState(null);
    const [newMeal, setNewMeal] = useState({ type: '', details: '', preparationStatus: '', deliveryStatus: '' }); // State for new meal

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get('https://hospital-managment-system-9p11.onrender.com/api/meals');
                setMeals(response.data);
            } catch (err) {
                console.error('Error fetching meals:', err);
                setError('Failed to fetch meals');
                setOpenSnackbar(true);
            }
        };

        fetchMeals();
    }, []);

    const handleAddMeal = async () => {
        try {
            const response = await axios.post('https://hospital-managment-system-9p11.onrender.com/api/meals', newMeal);
            setMeals([...meals, response.data]); // Add the new meal to the state
            setNewMeal({ type: '', details: '', preparationStatus: '', deliveryStatus: '' }); // Reset the input fields
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error adding meal:', err);
            setError('Failed to add meal');
            setOpenSnackbar(true);
        }
    };

    const handleUpdatePreparationStatus = async (mealId, status) => {
        try {
            await axios.put(`https://hospital-managment-system-9p11.onrender.com/api/meals/${mealId}`, { preparationStatus: status });
            setMeals(meals.map(meal => meal._id === mealId ? { ...meal, preparationStatus: status } : meal));
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error updating preparation status:', err);
            setError('Failed to update preparation status');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <Typography variant="h4">Meal Preparation Dashboard</Typography>
            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Meal Type"
                        value={newMeal.type}
                        onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Meal Details"
                        value={newMeal.details}
                        onChange={(e) => setNewMeal({ ...newMeal, details: e.target.value })}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Preparation Status"
                        value={newMeal.preparationStatus}
                        onChange={(e) => setNewMeal({ ...newMeal, preparationStatus: e.target.value })}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddMeal}>
                        Add Meal
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Meal Type</TableCell>
                            <TableCell>Meals Details</TableCell>
                            <TableCell>Preparation Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meals.map((meal) => (
                            <TableRow key={meal._id}>
                                <TableCell>{meal.type}</TableCell>
                                <TableCell>{meal.details}</TableCell>
                                <TableCell>{meal.preparationStatus}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleUpdatePreparationStatus(meal._id, 'Prepared')}
                                    >
                                        Mark as Prepared
 </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
                    {error || 'Operation successful!'}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default FoodPreparation;

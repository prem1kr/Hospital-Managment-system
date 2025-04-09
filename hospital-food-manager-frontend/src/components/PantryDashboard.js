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
    CircularProgress,
    Snackbar,
    Alert,
    Button,
    TextField,
    Grid,
} from '@mui/material';

const PantryDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [meals, setMeals] = useState([]); // Define meals state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
    const [newPersonnel, setNewPersonnel] = useState({ name: '', contactInfo: '', otherDetails: '' });
    const [editingPersonnel, setEditingPersonnel] = useState(null);
    const [mealDeliveries, setMealDeliveries] = useState([]);
    const [newMealDelivery, setNewMealDelivery] = useState({ patientInfo: '', roomNumber: '', dietChartDetails: '' });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://hospital-managment-system-2rbv.onrender.com/api/tasks');
                setTasks(response.data);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setError(err.response ? err.response.data : 'Failed to fetch tasks');
                setOpenSnackbar(true);
            } finally {
                setLoading(false);
            }
        };

        const fetchMeals = async () => {
            try {
                const response = await axios.get('https://hospital-managment-system-2rbv.onrender.com/api/meals'); // Fetch meals data
                setMeals(response.data);
            } catch (err) {
                console.error('Error fetching meals:', err);
                setError(err.response ? err.response.data : 'Failed to fetch meals');
                setOpenSnackbar(true);
            }
        };

        const fetchDeliveryPersonnel = async () => {
            try {
                const response = await axios.get('https://hospital-managment-system-2rbv.onrender.com/api/delivery-personnel');
                setDeliveryPersonnel(response.data);
            } catch (err) {
                console.error('Error fetching delivery personnel:', err);
                setError(err.response ? err.response.data : 'Failed to fetch delivery personnel');
                setOpenSnackbar(true);
            }
        };

        const fetchMealDeliveries = async () => {
            try {
                const response = await axios.get('https://hospital-managment-system-2rbv.onrender.com/api/meal-deliveries');
                setMealDeliveries(response.data);
            } catch (err) {
                console.error('Error fetching meal deliveries:', err);
                setError(err.response ? err.response.data : 'Failed to fetch meal deliveries');
                setOpenSnackbar(true);
            }
        };

        fetchTasks();
        fetchMeals(); // Fetch meals data
        fetchDeliveryPersonnel();
        fetchMealDeliveries();
    }, []);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleAddPersonnel = async () => {
        try {
            const response = await axios.post('https://hospital-managment-system-2rbv.onrender.com/api/delivery-personnel', newPersonnel);
            setDeliveryPersonnel([...deliveryPersonnel, response.data]);
            setNewPersonnel({ name: '', contactInfo: '', otherDetails: '' });
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error adding delivery personnel:', err);
            setError('Failed to add delivery personnel');
            setOpenSnackbar(true);
        }
    };

    const handleEditPersonnel = (personnel) => {
        setEditingPersonnel(personnel);
        setNewPersonnel({ name: personnel.name, contactInfo: personnel.contactInfo, otherDetails: personnel.otherDetails });
    };

    const handleUpdatePersonnel = async () => {
        try {
            const response = await axios.put(`https://hospital-managment-system-2rbv.onrender.com/api/delivery-person nel/${editingPersonnel._id}`, newPersonnel);
            setDeliveryPersonnel(deliveryPersonnel.map(personnel => personnel._id === editingPersonnel._id ? response.data : personnel));
            setEditingPersonnel(null);
            setNewPersonnel({ name: '', contactInfo: '', otherDetails: '' });
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error updating delivery personnel:', err);
            setError('Failed to update delivery personnel');
            setOpenSnackbar(true);
        }
    };

    const handleUpdateDeliveryStatus = async (mealId) => {
        try {
            await axios.put(`https://hospital-managment-system-2rbv.onrender.com/api/meal-deliveries/${mealId}`, { status: 'Delivered' });
            setMealDeliveries(mealDeliveries.map(meal => meal._id === mealId ? { ...meal, status: 'Delivered' } : meal));
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error updating delivery status:', err);
            setError('Failed to update delivery status');
            setOpenSnackbar(true);
        }
    };

    const handleAddMealDelivery = async () => {
        try {
            const response = await axios.post('https://hospital-managment-system-2rbv.onrender.com/api/meal-deliveries', newMealDelivery);
            setMealDeliveries([...mealDeliveries, response.data]);
            setNewMealDelivery({ patientInfo: '', roomNumber: '', dietChartDetails: '' });
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error adding meal delivery:', err);
            setError('Failed to add meal delivery');
            setOpenSnackbar(true);
        }
    };

    return (
        <div>
            <Typography variant="h4">Inner Pantry Dashboard</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Meal Type</TableCell>
                                    <TableCell>Meals Details</TableCell>
                                    <TableCell>Preparation Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meals.length > 0 ? (
                                    meals.map((meal) => (
                                        <TableRow key={meal._id}>
                                            <TableCell>{meal.type}</TableCell>
                                            <TableCell>{meal.details}</TableCell>
                                            <TableCell>{meal.preparationStatus}</TableCell>
                                           
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">No meals available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant="h5" style={{ marginTop: '20px' }}>Meal Deliveries</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Patient Info"
                                value={newMealDelivery.patientInfo}
                                onChange={(e) => setNewMealDelivery({ ...newMealDelivery, patientInfo: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Room Number"
                                value={newMealDelivery.roomNumber}
                                onChange={(e) => setNewMealDelivery({ ...newMealDelivery, roomNumber: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Diet Chart Details"
                                value={newMealDelivery.dietChartDetails}
                                onChange={(e) => setNewMealDelivery({ ...newMealDelivery, dietChartDetails: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" onClick={handleAddMealDelivery}>
                                Add Meal Delivery
                            </Button>
                        </Grid>
                    </Grid>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Patient Info</TableCell>
                                    <TableCell>Room Number</TableCell>
                                    <TableCell>Diet Chart Details</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell> Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mealDeliveries.length > 0 ? (
                                    mealDeliveries.map((meal) => (
                                        <TableRow key={meal._id}>
                                            <TableCell>{meal.patientInfo}</TableCell>
                                            <TableCell>{meal.roomNumber}</TableCell>
                                            <TableCell>{meal.dietChartDetails}</TableCell>
                                            <TableCell>{meal.status}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleUpdateDeliveryStatus(meal._id)}
                                                >
                                                    Mark as Delivered
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">No meal deliveries available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
                    {error || 'Operation successful!'}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default PantryDashboard;

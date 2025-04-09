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
    TextField,
    Snackbar,
    Alert,
} from '@mui/material';

const Delivery = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [mealDeliveries, setMealDeliveries] = useState([]); // State for meal deliveries
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState(null);
    const [deliveryNotes, setDeliveryNotes] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState(null);

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get('https://hospital-managment-system-2rbv.onrender.com/api/deliveries');
                setDeliveries(response.data);
            } catch (err) {
                console.error('Error fetching deliveries:', err);
                setError('Failed to fetch deliveries');
                setOpenSnackbar(true);
            }
        };

        const fetchMealDeliveries = async () => {
            try {
                const response = await axios.get('https://hospital-managment-system-2rbv.onrender.com/api/meal-deliveries'); // Fetch meal deliveries
                setMealDeliveries(response.data);
            } catch (err) {
                console.error('Error fetching meal deliveries:', err);
                setError('Failed to fetch meal deliveries');
                setOpenSnackbar(true);
            }
        };

        fetchDeliveries();
        fetchMealDeliveries(); // Fetch meal deliveries on component mount
    }, []);

    const handleMarkAsDone = async (delivery) => {
        try {
            await axios.put(`https://hospital-managment-system-2rbv.onrender.com/api/deliveries/${delivery._id}`, {
                ...delivery,
                status: 'Done',
                deliveryTime: new Date(),
                deliveryNotes,
            });
            setDeliveries(deliveries.map(d => (d._id === delivery._id ? { ...d, status: 'Done', deliveryTime: new Date(), deliveryNotes } : d)));
            setDeliveryNotes('');
            setSelectedDelivery(null);
            setOpenSnackbar(true);
        } catch (err) {
            console.error('Error marking delivery as done:', err);
            setError('Failed to mark delivery as done');
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

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div>
            <TableContainer>
                <Table>
                   
                    <TableBody>
                        {deliveries.map((delivery) => (
                            <TableRow key={delivery._id}>
                                <TableCell>{delivery.patientInfo}</TableCell>
                                <TableCell>{delivery.roomNumber}</TableCell>
                                <TableCell >{delivery.status}</TableCell>
                                <TableCell>{delivery.deliveryPersonnel ? delivery.deliveryPersonnel.name : 'N/A'}</TableCell>
                                <TableCell>
                                    {delivery.status === 'Pending' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setSelectedDelivery(delivery);
                                                setDeliveryNotes('');
                                            }}
                                        >
                                            Mark as Done
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {selectedDelivery && (
                <div>
                    <TextField
                        label="Delivery Notes"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleMarkAsDone(selectedDelivery)}
                    >
                        Confirm Delivery
                    </Button>
                </div>
            )}
            <Typography variant="h5" style={{ marginTop: '20px' }}>Meal Deliveries</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Info</TableCell>
                            <TableCell>Room Number</TableCell>
                            <TableCell>Diet Chart Details</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mealDeliveries.map((meal) => (
                            <TableRow key={meal._id}>
                                <TableCell>{meal.patientInfo}</TableCell>
                                <TableCell>{meal.roomNumber}</TableCell>
                                <TableCell>{meal.dietChartDetails}</TableCell>
                                <TableCell>{meal.status}</TableCell>
                                <TableCell>
                                    {meal.status !== 'Delivered' && (
                                        <Button variant="contained" color="success" onClick={() => handleUpdateDeliveryStatus(meal._id)}>
                                            Mark as Delivered
                                        </Button>
                                    )}
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

export default Delivery;

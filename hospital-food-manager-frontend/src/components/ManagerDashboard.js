import React, { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import MenuIcon from '@mui/icons-material/Menu';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios'; // Import axios for making HTTP requests

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const drawerWidth = 240;

const ManagerDashboard = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [totalPatients, setTotalPatients] = useState(0);
    const [mealsPreparedToday, setMealsPreparedToday] = useState(0);
    const [pendingDeliveries, setPendingDeliveries] = useState(0);
    const [completedDeliveries, setCompletedDeliveries] = useState(0);
    const [recentDeliveries, setRecentDeliveries] = useState([]);
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Breakfast',
                data: [],
                backgroundColor: '#4caf50',
            },
            {
                label: 'Lunch',
                data: [],
                backgroundColor: '#2196f3',
            },
            {
                label: 'Dinner',
                data: [],
                backgroundColor: '#ff9800',
            },
        ],
    });
    const navigate = useNavigate();

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const patientResponse = await axios.get('https://hospital-managment-system-9p11.onrender.com/api/patients/count');
                setTotalPatients(patientResponse.data.count);

                const mealsResponse = await axios.get('https://hospital-managment-system-9p11.onrender.com/api/meals/prepared');
                setMealsPreparedToday(mealsResponse.data.count);

                const pendingResponse = await axios.get('https://hospital-managment-system-9p11.onrender.com/api/deliveries/pending');
                setPendingDeliveries(pendingResponse.data.count);

                const completedResponse = await axios.get('https://hospital-managment-system-9p11.onrender.com/api/deliveries/completed');
                setCompletedDeliveries(completedResponse.data.count);

                const recentDeliveriesResponse = await axios.get('https://hospital-managment-system-9p11.onrender.com/api/deliveries/recent');
                setRecentDeliveries(recentDeliveriesResponse.data);

                // Fetch meal data for the bar chart
                const mealDataResponse = await axios.get('https://hospital-managment-system-9p11.onrender.com/api/meals/data'); // Adjust this endpoint as needed
                const mealData = mealDataResponse.data; // Assuming this returns an array of meal counts by day

                // Prepare data for the bar chart
                const labels = mealData.map(meal => meal.day); // Assuming mealData has a 'day' field
                const breakfastData = mealData.map(meal => meal.breakfastCount); // Assuming mealData has a 'breakfastCount' field
                const lunchData = mealData.map(meal => meal.lunchCount); // Assuming mealData has a 'lunchCount' field
                const dinnerData = mealData.map(meal => meal.dinnerCount); // Assuming mealData has a 'dinnerCount' field

                setBarData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Breakfast',
                            data: breakfastData,
                            backgroundColor: '#4caf50',
                        },
                        {
                            label: 'Lunch',
                            data: lunchData,
                            backgroundColor: '#2196f3',
                        },
                        {
                            label: 'Dinner',
                            data: dinnerData,
                            backgroundColor: '#ff9800',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNavigation = (text) => {
        if (text === 'Pantry/Diet Charts') {
            navigate('/pantry-dashboard');
        }
        if (text === 'Patients') {
            navigate('/patients/new');
        }
        if (text === 'Deliveries') {
            navigate('/delivery');
        }
        if (text === 'Food Preparation') {
            navigate('/foodpreparation');
        }
        if (text === 'Dashboard') {
            navigate('/');
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Hospital Food Management</Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List>
                    {['Dashboard', 'Patients', 'Pantry/Diet Charts', 'Food Preparation', 'Deliveries', 'Settings'].map(
                        (text) => (
                            <ListItem button key={text} onClick={() => handleNavigation(text)}>
                                <ListItemText primary={text} />
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>

            <main style={{ flexGrow: 1, padding: '20px', marginTop: '64px' }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
                    Dashboard
                </Typography>

                <Grid container spacing={4}>
                    {/* Summary Cards */}
                    {[
                        { title: 'Total Patients', value: totalPatients, subtext: '+ from last week' },
                        { title: 'Meals Prepared Today', value: mealsPreparedToday, subtext: '+ since last hour' },
                        { title: 'Pending Deliveries', value: pendingDeliveries, subtext: 'Morning meals' },
                        { title: 'Completed Deliveries', value: completedDeliveries, subtext: 'Delivered today' },
                    ].map((card, index) => (
                        <Grid item xs={12} md={3} key={index}>
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 600 }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="h4" style={{ fontWeight: 700 }}>
                                        {card.value}
                                    </Typography>
                                    <Typography variant="body2" style={{ color: 'gray' }}>
                                        {card.subtext}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}

                    {/* Bar Chart */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '10px' }}>
                                    Meal Delivery Overview
                                </Typography>
                                <Bar data={barData} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Recent Deliveries */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '10px' }}>
                                    Recent Deliveries
                                </Typography>
                                {recentDeliveries.map((delivery, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <Typography variant="body1" style={{ fontWeight: 600 }}>
                                            {delivery.name}
                                        </Typography>
                                        <Typography variant="body2" style={{ color: 'gray' }}>
                                            {delivery.room} - {delivery.time}
                                        </Typography>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
};

export default ManagerDashboard;

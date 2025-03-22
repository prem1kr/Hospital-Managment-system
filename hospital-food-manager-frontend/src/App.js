import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/ManagerDashboard';
import PantryDashboard from './components/PantryDashboard';
import Patient from './components/Patient'; // Import the Patient component
import PatientList from './components/PatientList'; // Import the PatientList component
import Delivery from './components/Delivery';
import FoodPreparation from './components/FoodPreparation';

const App = () => {
    const [user, setUser ] = useState(null);

    return (
        <Router>
            <Container>
                <Routes>
                    <Route path="/" element={<Login setUser ={setUser } />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={user ? <Dashboard /> : <Login setUser ={setUser } />} />
                    <Route path="/pantry-dashboard" element={user ? <PantryDashboard /> : <Login setUser ={setUser } />} />
                    <Route path="/patients/new" element={user ? <Patient /> : <Login setUser ={setUser } />} /> {/* Route for adding a new patient */}
                    <Route path="/patients/edit/:id" element={user ? <Patient /> : <Login setUser ={setUser } />} /> {/* Route for editing a patient */}
                    <Route path="/patients" element={user ? <PatientList /> : <Login setUser ={setUser } />} /> {/* Route for viewing patient list */}
                    <Route path="/delivery" element= {<Delivery/>} />
                    <Route path='/foodpreparation' element= {<FoodPreparation/>}/>

                    < Route path="/" element={<h1>Welcome to Hospital Food Manager</h1>} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;

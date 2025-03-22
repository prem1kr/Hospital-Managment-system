import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const Patient = () => {
  const [patient, setPatient] = useState({
    name: '',
    diseases: [],
    allergies: [],
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergencyContact: '',
    others: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { id } = useParams(); // Get the patient ID from the URL
  const navigate = useNavigate(); // Use useNavigate for navigation
  const location = useLocation(); // Use useLocation to access passed state

  useEffect(() => {
    if (id) {
      // Fetch patient data if editing
      const fetchPatient = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
          setPatient(response.data);
        } catch (error) {
          console.error('Error fetching patient data:', error);
          setError('Failed to fetch patient data');
          setOpenSnackbar(true);
        }
      };
      fetchPatient();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing patient
        await axios.put(`http://localhost:5000/api/patients/${id}`, patient);
      } else {
        // Create new patient
        await axios.post('http://localhost:5000/api/patients', patient);
        // Call the function to update the patient count
        if (location.state && location.state.updatePatientCount) {
          location.state.updatePatientCount();
        }
      }
      setSuccess(true);
      setOpenSnackbar(true);
      // Redirect or reset form after successful submission
      navigate('/patients'); // Redirect to the patient list
    } catch (error) {
      console.error('Error saving patient data:', error);
      setError('Failed to save patient data'); // Set error message
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Patient' : 'Add Patient'}
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={patient.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Room Number"
                  name="roomNumber"
                  value={patient.roomNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Bed Number"
                  name="bedNumber"
                  value={patient.bedNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Floor Number"
                  name="floorNumber"
                  value={patient.floorNumber}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Age"
                  name="age"
                  type="number"
                  value={patient.age}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Gender"
                  name="gender"
                  value={patient.gender}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact Info"
                  name="contactInfo"
                  value={patient.contactInfo}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={patient.emergencyContact}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Others"
                  name="others"
                  value={patient.others}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {id ? 'Update Patient' : 'Add Patient'}
                </Button>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => navigate('/patients')} // Navigate to patient list
                  style={{ marginLeft: '10px' }}
                >
                  Go to Patient List
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={success ? 'success' : 'error'}>
 {success ? 'Patient saved successfully!' : error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Patient;
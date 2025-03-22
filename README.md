# Hospital Food Management System - MERN Stack Application

This is a **Hospital Food Management System** built using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js). The system is designed to streamline meal planning, ordering, and distribution in hospitals. It includes features for managing patients, meals, deliveries, and staff roles such as pantry staff and delivery personnel.

---

## Project Overview

The Hospital Food Management System is designed to improve the efficiency of meal planning and distribution in hospitals. It allows hospital staff to manage patient diets, meal deliveries, and pantry operations seamlessly. The system includes role-based access for different staff members, such as pantry staff, delivery personnel, and managers.

---

## Features

- **Role-Based Access Control**: Different roles for pantry staff, delivery personnel, and managers.
- **Patient Management**: Add and manage patient details and dietary requirements.
- **Meal Planning**: Create and manage meal plans for patients.
- **Delivery Management**: Track meal deliveries and assign delivery personnel.
- **Task Management**: Assign and track tasks for pantry staff and delivery personnel.
- **User Authentication**: Secure login and signup for staff members.
- **Responsive Design**: Fully responsive design for optimal viewing on all devices.

---

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Version Control**: Git, GitHub

---

## Folder Structure

```
hospital-food-management-system/
├── backend/
│   ├── middleware/
│   │   ├── auth.js
│   ├── models/
│   │   ├── Delivery.js
│   │   ├── DeliveryPersonnel.js
│   │   ├── Meal.js
│   │   ├── MealDelivery.js
│   │   ├── PantryStaff.js
│   │   ├── Patient.js
│   │   ├── Task.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── deliveries.js
│   │   ├── deliveryPersonnel.js
│   │   ├── dietCharts.js
│   │   ├── mealDeliveries.js
│   │   ├── meals.js
│   │   ├── patients.js
│   │   ├── tasks.js
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── vercel.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Delivery.js
│   │   │   ├── FoodPreparation.js
│   │   │   ├── Login.js
│   │   │   ├── ManagerDashboard.js
│   │   │   ├── PantryDashboard.js
│   │   │   ├── Patient.js
│   │   │   ├── PatientList.js
│   │   │   ├── Signup.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── setupTests.js
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
├── .gitignore
├── README.md
```

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/prem1kr/Hospital-Managment-system.git
   cd hospital-food-management-system
   ```

2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm start
     ```

5. **Open in Browser**:
   - The application will be available at `http://localhost:3000`.

---

## Usage

- **Login/Signup**: Staff members can log in or sign up to access the system.
- **Patient Management**: Add and manage patient details and dietary requirements.
- **Meal Planning**: Create and manage meal plans for patients.
- **Delivery Management**: Track meal deliveries and assign delivery personnel.
- **Task Management**: Assign and track tasks for pantry staff and delivery personnel.
- **Dashboard**: View and manage tasks, deliveries, and patient information.

---

## API Endpoints

- **Authentication**:
  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.

- **Patients**:
  - `GET /api/patients`: Get all patients.
  - `POST /api/patients`: Add a new patient.
  - `PUT /api/patients/:id`: Update a patient's details.
  - `DELETE /api/patients/:id`: Delete a patient.

- **Meals**:
  - `GET /api/meals`: Get all meals.
  - `POST /api/meals`: Add a new meal.
  - `PUT /api/meals/:id`: Update a meal.
  - `DELETE /api/meals/:id`: Delete a meal.

- **Deliveries**:
  - `GET /api/deliveries`: Get all deliveries.
  - `POST /api/deliveries`: Add a new delivery.
  - `PUT /api/deliveries/:id`: Update a delivery.
  - `DELETE /api/deliveries/:id`: Delete a delivery.

---

## Database Schema

- **User**:
  ```javascript
  {
    username: String,
    email: String,
    password: String,
    role: String
  }
  ```

- **Patient**:
  ```javascript
  {
    name: String,
    roomNumber: String,
    dietaryRequirements: String
  }
  ```

- **Meal**:
  ```javascript
  {
    name: String,
    description: String,
    dietaryRestrictions: [String]
  }
  ```

- **Delivery**:
  ```javascript
  {
    patientId: String,
    mealId: String,
    deliveryPersonnelId: String,
    status: String
  }


## Screenshoots  

![alt text](<Screenshot 2025-03-22 094611.png>)
![alt text](<Screenshot 2025-03-22 094624.png>)
![alt text](<Screenshot 2025-03-22 094635.png>)
![alt text](<Screenshot 2025-03-22 094655.png>)
![alt text](<Screenshot 2025-03-22 094729.png>)
![alt text](<Screenshot 2025-03-22 094744.png>)
![alt text](<Screenshot 2025-03-22 094812.png>)
![alt text](<Screenshot 2025-03-22 094820.png>)



---

## Author

- **Your Name**
- GitHub: [prem1kr](https://github.com/prem1kr)
- LinkedIn: [www.linkedin.com/in/prem-kumar-3b38b1290](https://www.linkedin.com/in/prem-kumar-3b38b1290/)

---

This `README.md` provides a comprehensive overview of the project, its structure, and how to run it. You can customize it further based on your specific requirements.
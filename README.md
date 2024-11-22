# **Transaction Management System**

A web application for managing user transactions, including features for transaction history, profile management, and secure authentication. Built using React.js for the frontend and a backend API for transaction and user data management.

---

## **Features**

- **User Authentication:**
  - Login and register with JWT-based authentication.
  - Protected routes to secure user data.

- **User Profile:**
  - View user details such as User ID, email, and account balance.
  - Logout functionality.

- **Transaction Management:**
  - View a detailed transaction history.
  - Update transaction status dynamically.
  - Responsive design for a seamless experience on any device.

- **Routing:**
  - Intuitive navigation using React Router.

---

## **Technologies Used**

### **Frontend:**
- React.js
- React Router
- `js-cookie` for managing authentication tokens
- `react-loader-spinner` for loading animations
- CSS for styling and responsiveness

### **Backend:**
- API endpoints for authentication and transaction management

---

## **Installation and Setup**

### **Prerequisites**
- Node.js installed
- A package manager (`npm` or `yarn`)

### **Steps**

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd transaction-management ```
2. Install dependencies:

   ```bash
   npm install ```
3. Set up environment variables:
- Create a .env file in the root directory.
- Add the API URL and other required configurations:

   ```bash
   REACT_APP_API_URL=https://transactions-management-backend-u1fz.onrender.com ```
4. Run the application:

   ```bash
   npm start ```
5. Open your browser and navigate to http://localhost:3000.

## **Usage**

### **Login/Register:**
- Use the `/login` or `/register` routes to authenticate.

### **View Profile:**
- Navigate to `/profile` to see user details.

### **Transaction Management:**
- View transaction history at `/transactions`.
- Click on a transaction to see more details or update its status.

---

## **API Endpoints**

### **User Details:**
- `GET /user/account`  
  Returns the authenticated user's account information.

### **Transaction History:**
- `GET /api/transactions/:userId`  
  Fetches transaction details for a specific user.

### **Update Transaction Status:**
- `PUT /api/transactions/:transactionId`  
  Updates the status of a specific transaction.


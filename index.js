const express = require('express');
const connectDB = require('./config/db');

// Create server
const app = express();

// Connect to DB
connectDB();

// App's port
const PORT = process.env.PORT || 4000;

// Import routes
app.use('/api/users', require('./routes/users'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is runnig in port ${PORT}`);
});

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Create server
const app = express();

// Connect to DB
connectDB();

// Enable cors
app.use(cors());

// Enable express.json
app.use(express.json({ extended: true }));

// App's port
const PORT = process.env.PORT || 4000;

// Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is runnig in port ${PORT}`);
});

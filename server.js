const express = require('express');
const app = express();

// DB
const connectDB = require('./config/db');
connectDB();

app.use(express.json());

// Routes
app.use('/api/url', require('./routes/url'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

const PORT = 3001;
app.listen(PORT, () => console.log('Server running on port '+PORT));
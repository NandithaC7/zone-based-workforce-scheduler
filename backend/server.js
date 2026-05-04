const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
//app.use('/events', require('./routes/eventRoutes'));
//app.use('/members', require('./routes/memberRoutes'));
app.use('/zones', require('./routes/zoneRoutes'));
app.use('/teams', require('./routes/teamRoutes'));
app.use('/workers', require('./routes/workerRoutes'));
app.use('/resources', require('./routes/resourceRoutes'));
app.use('/events', require('./routes/eventRoutes'));

// start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
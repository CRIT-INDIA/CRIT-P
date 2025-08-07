const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import routes
const contactRoutes = require('./routes/contact');
const ctaRoutes = require('./routes/cta');
const careerRoutes = require('./routes/career');
const opportunityRoutes = require('./routes/opportunity');
const reviewRoutes = require('./routes/review');

// Load environment variables
dotenv.config({ path: './environment.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'https://crit-p-wovp.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crit_forms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/cta', ctaRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/opportunity', opportunityRoutes);
app.use('/api/review', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CRIT Backend API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
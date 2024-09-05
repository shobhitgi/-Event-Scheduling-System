const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');  
const authRoutes = require('./routes/authRoutes');  
const availabilityRoutes = require('./routes/availabilityRoutes');  
const sessionRoutes = require('./routes/sessionRoutes');  


dotenv.config();


const app = express();


app.use(express.json()); 
app.use(cors());  


mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });


app.use('/api/auth', authRoutes);  
app.use('/api/availability', availabilityRoutes);
app.use('/api/session', sessionRoutes);  
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

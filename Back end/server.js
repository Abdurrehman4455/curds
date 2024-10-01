const express=require('express');
const connectDB=require('./config/db');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');
const departmentRoutes = require('./routes/Department'); 

connectDB().then(() => {
    console.log('Database connection successful');
  }).catch((error) => {
    console.log('Database connection failed:', error.message);

  });
  app.use(cors({ 
  }));
   // Enable CORS for all origins

app.use(express.json())
  
  

  

  
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', dataRoutes);
app.use('/api', dataRoutes);
app.use('/api/Department', departmentRoutes); 
app.get('/', (req, res) => {
  res.send('Server is running');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  
// Import attendance routes
const attendanceRoutes = require('./routes/attendanceRoutes');
app.use('/api', attendanceRoutes);

const express=require('express');
const connectDB=require('./config/db');
const dotenv=require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

connectDB().then(() => {
    console.log('Database connection successful');
  }).catch((error) => {
    console.log('Database connection failed:', error.message);

  });
  app.use(cors({ origin: 'https://curds-mu.vercel.app',
    credentials: true,
  }));
  
  
  
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/data', dataRoutes);
app.use('/api', dataRoutes);
app.get(5000, (req, res) => {
  res.send('Server is running');
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  
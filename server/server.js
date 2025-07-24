import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import formsRoutes from './routes/formsRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/forms', formsRoutes);
app.use('/api', applicationRoutes);

app.get('/', (req, res) => {
    res.send("API running successfully!");
});

mongoose.connect(mongoURI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });
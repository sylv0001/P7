const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const comsRoutes = require('./routes/coms');
const userRoutes = require('./routes/user');
const dotenv = require ('dotenv');
const resul = dotenv.config();

//Connect to DB
mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}`,

{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
 
app.use(express.json());
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/api/coms', comsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
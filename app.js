const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middlewares
app.use(bodyParser.json());
app.use(cors());

//Import Routes
const postRoute = require('./routes/posts');

app.use('/posts', postRoute);

//Routes
app.get('/', (req,res) => {
  res.send('We are on home');
});


//Connect to DB Atlas
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser:true},
() => console.log('Connected to DB!')
);

//listening to server
app.listen(3000);

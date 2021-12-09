const express = require('express');

const {register , login } = require('./controllers/auth.controllers')

const userPostController = require('./controllers/userPostController')

const app = express();

app.use(express.json());

app.post('/register' ,register);
app.post('/login' ,login);

app.use("/userposts" , userPostController)



module.exports = app;
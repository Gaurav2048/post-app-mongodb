const express = require('express');
const app = express(); 
const mongoose = require('mongoose')
const { CONNECTION_URL } = require('./constant')
const userRouter = require('./Controllers/User.Controller')
const postRouter = require('./Controllers/Post.controller')
app.use(express.json())

app.use(userRouter); 
app.use(postRouter)

mongoose.connect(CONNECTION_URL, () => {
    console.log('Connected to database');
}, (e) => {
    console.log(e);
})

app.listen(3000, () => {
    console.log('Server connected');
})

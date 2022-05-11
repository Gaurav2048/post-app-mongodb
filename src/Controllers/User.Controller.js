const express = require('express'); 
const router = express.Router(); 
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constant');

router.post('/sign_up', async (req, res) => {
    const userInfo = req.body;
    const password = bcrypt.hashSync(userInfo.password, 10);

    const serverInfo = {
        ... userInfo,
        password
    }

    UserModel.create(serverInfo).then(data => {
        res.status(200).send({
            statusCode: 0,
            message: "User Created",
            data
        });
    }).catch(error => {
        res.status(500).send({
            statusCode: 1,
            message: "Internal Server Error",
            error
        })
    })
})

router.post('/login', (req, res) => {
   const loginInfo = req.body;
   // find if the email is there in our database 
   UserModel.findOne({
       email: loginInfo.email
   }).then(data => {
       if (!data) {
           res.send({
               statusCode: 1,
               message: 'Email not found, Please register'
           })
           return;
       }

       // compare password 
       const isMatch = bcrypt.compareSync(loginInfo.password, data.password)
       if (!isMatch) {
           res.send({
               statusCode: 1,
               message: 'Password not correct'
           })
           return;
       }
       // create a jwt token 
       jwt.sign({
           email: data.email,
       }, JWT_SECRET, (err, token) => {
           if (err) {
               res.status(500).send({
                statusCode: 1,
                message: 'Internal Server Error',
                error: err
               })
               return;
           }
            data.token = token;
            data.save().then(user => {
                res.status(200).send({
                    statusCode: 0,
                    message: 'Login successful',
                    data: user
                })
            })
        })
   })
})

module.exports = router;

const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constant');
const AuthMiddleWare = require('../Middlewares/Auth.middleware');
const AuthorizationMiddleWare = require('../Middlewares/Authorization.middleware');
const TestMiddleWare = require('../Middlewares/Test.Middleware');
const PostModel = require('../models/PostModel')

router.post('/post', [ AuthMiddleWare, TestMiddleWare ] ,(req, res) => {
    const postInformation = {
        ...req.body,
        createdBy: req.email
    };
    PostModel.create(postInformation).then(data => {
        res.send({
            statusCode: 0,
            message: 'Post created successfully',
            data
        })
    }).catch(error => {
        res.send({
            statusCode: 1,
            message: 'Internal Server Error',
            error
        })
    })
    // 2. Data validation [DONE]
    // 3. Store the data in database 
})

router.get('/post', AuthMiddleWare, (req, res) => {
    const createdBy = req.email
    PostModel.find({
        createdBy
    }).then(data => {
        res.send({
            statusCode: 0,
            message: 'Fetched posts successfully',
            data
        })
    })

})

router.put('/post', [ AuthMiddleWare, AuthorizationMiddleWare ] ,(req, res) => {
    // token -> email
    // post body -> title, description, _id, createdBy
    const postInfo = {
        ...req.body,
        createdBy: req.email,
    }
    PostModel.findByIdAndUpdate(req.body._id, postInfo, { new: true }).then(data => {
        res.send({
            statusCode: 0,
            message: 'Updated post successfully',
            data
        })
    })
})

// delete route

module.exports = router;

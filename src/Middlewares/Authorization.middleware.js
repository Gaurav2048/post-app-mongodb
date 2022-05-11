const PostModel = require('../models/PostModel')

const AuthorizationMiddleWare = (req, res, next) => {
    const email = req.email;
    const postInfo = req.body;

    PostModel.findById(postInfo._id).then(data => {
        if (data.createdBy === email) {
            next(); 
            return
        }
        res.send({
            statusCode: 1,
            message: "This not your property"
        })
    })

}

module.exports = AuthorizationMiddleWare;
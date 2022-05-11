const TestMiddleWare = (req, res, next) => {
    console.log('Decoded email from test middleware', req.email);
    next()
}

module.exports = TestMiddleWare;
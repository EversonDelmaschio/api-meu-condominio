const express = require('express')
const DevController = require('../controllers/dev')
const LikeController = require('../controllers/like')
const DislikeController = require('../controllers/dislike')
const routes = express.Router()

// GET, POST, PUT, DELETE
routes.get("/", (req, res) => {
    return res.json({'messsage':'Hello World!'})
})

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.post('/devs/like', LikeController.store)
routes.post('/devs/dislike', DislikeController.store)
module.exports = routes

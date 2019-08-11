const Dev = require('../models/dev')
module.exports = {
    async store(req, res){
        try {           
            let {user} = req.headers
            let {devLikedId} = req.body
            let loggedDev = await Dev.findById(user)
            let likedDev = await Dev.findById(devLikedId)
            if(!likedDev) throw new Error('Dev não localizado.')
            loggedDev.dislikes.push(likedDev._id)
            await loggedDev.save()
            return res.json(loggedDev)
        } catch (error) {
            return res.status(400).json(
                {
                    "status": 400,
                    "message": error.message,
                    "data": {}
            })
        }
    }
}
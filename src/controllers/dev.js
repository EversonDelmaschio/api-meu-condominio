const axios = require('axios')
const Dev = require('../models/dev')

module.exports = {
    async index(req, res){
        try {
            let {user } = req.headers
            let loggedUser = await Dev.findById(user)
            let devs = await Dev.find({
                $and: [
                    {_id: {$ne: user}},
                    {_id: {$nin: loggedUser.likes}},
                    {_id: {$nin : loggedUser.dislikes}}
                ]
            })
            return res.json(devs)
        } catch (error) {
            return res.status(500).json(
                {"statusCode": "500", 
                "message": "Erro", 
                "data": error.message
            })
        }
    },
    async store(req, res){
        try {
            let { username} = req.body
            let userExist = await Dev.findOne({user :username})
            if(userExist) throw new Error('dev já cadastrado.')
            let response = await axios.get(`https://api.github.com/users/${username}`)
            console.log(response.data)
            let {name , bio, avatar_url : avatar} = response.data
            let newDev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            })
            return res.json(
                    {"statusCode": "ok", 
                    "message": "sucesso", 
                    "data": newDev
                })
        } catch (error) {
            return res.json(
                {"statusCode": "500", 
                "message": "Erro", 
                "data": error.message
            })
        }
    }
}
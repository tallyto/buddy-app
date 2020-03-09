const {Router} = require('express')
const User = require('./app/models/User')
const routes = Router()


routes.get("/", async (req, res)=> {
    const user = await User.create({
        name: "Tállyto Rodrigues",
        email: "rodrigues.tallyto@hotmail.com",
        password_hash: "1233211996"
    })


   return res.json(user)
})

module.exports = routes
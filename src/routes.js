const {Router} = require('express')
const routes = Router()


routes.get("/", (req, res)=> {
    res.json({message: "Olá mundo!"})
})

module.exports = routes
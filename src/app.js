const express = require('express')
const routes = require('./routes')
require('./database')
class App{
    constructor(){
        this.server = express()
        this.database()
        this.middlewares()
        this.routes()
    }

    database(){

    }

    middlewares(){
        this.server.use(express.json())
        this.server.use(express.urlencoded({extended: true}))
        this.server.use(routes)
    }

    routes(){

    }
}

module.exports = new App().server
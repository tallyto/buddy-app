const express = require('express')
const routes = require('./routes')

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
        this.server.use(routes)
    }

    routes(){

    }
}

module.exports = new App().server
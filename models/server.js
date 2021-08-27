const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express(); 
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
            users: '/api/users',

        }

        // Database connection
        this.connectDB();

        // Middlewares
        this.middlewares();
        
        // App routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Body's parsing and lecture
        this.app.use(express.json());
        
        // Public folder
        this.app.use(express.static('public'));
    }
    
    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.users, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running at port:', this.port)
        });
    }

}


module.exports = Server;
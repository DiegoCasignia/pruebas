//app.js
const express = require('express'); 
const userRoutes = require('./routes/user.routes');

function createApp() {
    const app = express();
    app.use(express.json());
    app.use('/api/users', userRoutes);
    app.use((req, res) => {
        res.status(404).json({ message: 'Route not found' });
    });
    return app;
}

module.exports = createApp;

//user.routes.js


// user.controller.js

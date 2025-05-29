const express = require('express');
const productRoutes = require('./routes/product.routes');

function createApp() {
    const app = express();
    app.use(express.json());
    app.use('/productsCasignia', productRoutes);

    app.use((req, res) => {
        res.status(404).json({ message: 'Route not found' });
    });

    return app;
}


module.exports = createApp;
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
    setTimeout(() => {
        res.json({ message: 'Hola mundo' });
    }, Math.random() * 500);
});

app.post('/api/data', (req, res) => {
    const data = req.body;
    setTimeout(() => {
        res.status(201).json({ received: data });
    }, Math.random() * 800);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
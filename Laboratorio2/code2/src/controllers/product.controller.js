let products = [];

function getAllProducts(req, res) {
    res.json(products);
}

function createProduct(req, res) {
    const { name, precio } = req.body;

    if (!name || typeof precio !== 'number') {
        return res.status(400).json({ message: 'Name and valid precio are required' });
    }

    const newProduct = {
        id: Date.now().toString(),
        name,
        precio
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
}

function getProductById(req, res) {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
}

function deleteProductById(req, res) {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
}

function resetProducts() {
    products = [];
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    deleteProductById,
    resetProducts
};

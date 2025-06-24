const express = require('express');
const {
    getAllProducts,
    createProduct,
    getProductById,
    deleteProductById
} = require('../controllers/product.controller');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/:id', getProductById);
router.delete('/:id', deleteProductById);

module.exports = router;

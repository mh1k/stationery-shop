import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// to create product route
router.post('/create-product', ProductController.createProduct);

// to get tha all product including category query route
router.get('/', ProductController.getAllProduct);

// to get single product route
router.get('/:productID', ProductController.getSingleProduct);

// to update the product route
router.put('/:productID', ProductController.updateProduct);

// to delete the product route
router.delete('/:productID', ProductController.deleteProduct);

export const ProductRoute = router;
